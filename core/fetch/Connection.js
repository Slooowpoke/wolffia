import mysql from 'mysql2/promise'

export default class Connection {

	constructor() {
        mysql.createConnection({host: 'localhost', user: 'root', password: 'butts12', database: 'wollfia'})
                    .then(db => this.db = db)
                    .catch(e => console.error(e))
	}

    async dropPageData(block){
        try {
            const [response] = await this.db.execute('DELETE FROM `page_data` WHERE `page_data`.`id` = ?', [block])
            return block
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async updatePageData(blocks, pageID){
        let currentBlocks = await this.queryForBlocks(pageID)
        let blocksExist = [], blocksToBeCreated = []
        for(let updateBlock of blocks){
            if(updateBlock.id != undefined){
                blocksExist.push(updateBlock)
            }else{
                blocksToBeCreated.push(updateBlock)
            }
        }

        try {
            let allResponses = []
            for(let block of blocksExist){
                const [updateResponse] = await this.db.execute('UPDATE `page_data` SET `name` = ?, `block` = ?, `data` = ? WHERE `page_data`.`id` = ?', [block.name, block.block,JSON.stringify(block.data), block.id])
                allResponses.push(updateResponse)
            }
            for(let block of blocksToBeCreated){
                console.log(block)
                const [insertResponse] = await this.db.execute('INSERT INTO `page_data` (`page`, `name`, `block`, `data`) VALUES ( ?, ?, ?, ?)', [pageID, block.name, block.block, JSON.stringify(block.data)])
                allResponses.push(insertResponse)
            }

            return allResponses
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async getBlockStructure(id){
        try {
            const [response] = await this.db.execute('SELECT * FROM `blocks` WHERE id = ? LIMIT 1', [id])
            response[0].structure = JSON.parse(response[0].structure)
            return response[0]
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async blocksList(title, name, template){
        try {
            const [response] = await this.db.execute('SELECT name, id FROM `blocks`')
            return response
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async createBlock(block){
        try {
            console.log(block)
            const [response] = await this.db.execute('INSERT INTO `page_data` (`page`, `name`, `block`, `data`) VALUES ( ?, ?, ?, ?)', [block.page, block.name, block.structureID, block.data])

            return {block, id: response.insertId}
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async createPage(title, name, template){
        try {
            const [response] = await this.db.execute('INSERT INTO `pages` (`name`, `title`, `template`) VALUES ( ?, ?, ?)', [name, title, template])
            console.log({title, name, template, id: response.insertId})
            return {title, name, template, id: response.insertId}
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async savePageMeta(title, name, template, pageID){
        try {
            const [response] = await this.db.execute('UPDATE `pages` SET `title` = ?,`name` = ?, `template` = ? WHERE `pages`.`id` = ?', [title, name,template, pageID])
            return response
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
    async queryAllPageMetas(){
        try {
            const [meta] = await this.db.execute('SELECT * FROM `pages`')
            return meta
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async queryForPage(pagename){
        try {
            const meta = await this.queryForPageMeta(pagename)
			const [blocks] = await this.db.execute('SELECT `data`,`blocks`.`template` FROM `page_data` LEFT JOIN `blocks` ON `page_data`.`block`=`blocks`.`id` WHERE `page_data`.`page`= ?', [meta.id])

            for(let block of blocks){
                // TODO Find a non-blocking method
                block.data = JSON.parse(block.data)
            }
			return {meta, blocks}
		} catch (error) {
			console.log(error)
			ctx.throw(400, 'INVALID_DATA')
		}
    }

	async queryForPageMeta(pagename) {
		try {
			const [results, fields] = await this.db.execute('SELECT * FROM `pages` WHERE `name` = ? LIMIT 1', [pagename])
            
			return results[0]
		} catch (error) {
			console.log(error)
			ctx.throw(400, 'INVALID_DATA')
		}
	}

}
