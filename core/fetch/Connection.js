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
