import mysql from 'mysql2/promise'

export default class Connection {

    constructor() {
        this.knex = require('knex')({
            client: 'mysql2',
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            }
        })
        mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        })
            .then(db => this.db = db)
            .catch(e => console.error(e))
    }

    async dropPageData(block) {
        try {
            let success = await this.knex('page_data').where({'id': block}).del()
            return parseInt(block)
        } catch (error) {
            console.log(error)
        }
    }

    async updatePageData(blocks, pageID) {
        let currentBlocks = await this.fetchBlocksForPage(pageID)
        let blocksExist = [], blocksToBeCreated = []
        for (let updateBlock of blocks) {
            if (updateBlock.id !== undefined) {
                blocksExist.push(updateBlock)
            } else {
                blocksToBeCreated.push(updateBlock)
            }
        }

        try {
            let allResponses = []
            for (let block of blocksExist) {
                const [updateResponse] = await this.db.execute('UPDATE `page_data` SET `name` = ?, `block` = ?, `data` = ? WHERE `page_data`.`id` = ?', [block.name, block.block, JSON.stringify(block.data), block.id])
                allResponses.push(updateResponse)
            }
            for (let block of blocksToBeCreated) {
                console.log(block)
                const [insertResponse] = await this.db.execute('INSERT INTO `page_data` (`page`, `name`, `block`, `data`) VALUES ( ?, ?, ?, ?)', [pageID, block.name, block.block, JSON.stringify(block.data)])
                allResponses.push(insertResponse)
            }
            return allResponses
        } catch (error) {
            console.log(error)
        }
    }

    async updateStructure(structure, id) {
        const [updateResponse] = await this.db.execute('UPDATE `blocks` SET `structure` = ? WHERE `blocks`.`id` = ?', [structure, id])
        return updateResponse
    }

    async fetchSingleBlockStructure(id) {
        try {
            let blockStructure = await this.knex.select('*').from('blocks').where({'id': id}).first();
            console.log(blockStructure);
            blockStructure.structure = JSON.parse(blockStructure.structure)
            return blockStructure
        } catch (error) {
            console.log(error)
        }
    }

    async fetchListOfBlocks() {
        try {
            return await this.knex.select('name', 'id').from('blocks')
        } catch (error) {
            console.log(error)
        }
    }

    async insertPageData(data) {
        try {
            console.log(data.data)

            let response = await this.knex('page_data').insert({
                page: data.page,
                name: data.name,
                block: data.block,
                display: data.display,
                data: JSON.stringify(data.data)
            }).returning('id')
            console.log(response)

            return {...data, id: response[0]}
        } catch (error) {
            console.log(error)
        }
    }

    async insertPage(title, name, template) {
        try {
            let page = {
                name,
                title,
                template
            }
            let id = await this.knex('pages').returning('id').insert(page)
            return {...page, ...id}
        } catch (error) {
            console.log(error)
        }
    }

    async updatePageMeta(title, name, template, pageID) {
        try {
            const [response] = await this.db.execute('UPDATE `pages` SET `title` = ?,`name` = ?, `template` = ? WHERE `pages`.`id` = ?', [title, name, template, pageID])
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async fetchBlocksForPage(pageID) {
        try {
            let blocks = await this.knex.select('page_data.*', 'blocks.template', 'blocks.structure')
                .from('page_data')
                .leftJoin('blocks', 'blocks.id', 'page_data.block')
                .where({'page_data.page': pageID})

            return blocks.map((block) => {
                // TODO Find a non-blocking method of parsing json
                // Does kNEX have anything?

                block.data = JSON.parse(block.data)
                block.structure = JSON.parse(block.structure)
                return block
            })
        } catch (error) {
            console.log(error)
        }
    }

    async fetchPageMetas() {
        try {
            return await this.knex.select('*').from('pages')
        } catch (error) {
            console.log(error)
        }
    }


    async fetchPage(pagename) {
        try {
            const meta = await this.fetchPageMeta(pagename)
            let blocks = await this.knex.select('page_data.name', 'data', 'blocks.template').from('page_data').leftJoin('blocks', 'blocks.id', 'page_data.block').where({'page_data.page': meta.id})
            blocks = blocks.map((block) => {

                // TODO Find a non-blocking method of parsing json
                // Does kNEX have anything?
                block.data = JSON.parse(block.data)
                return block
            })
            return {meta, blocks}
        } catch (error) {
            console.log(error)
        }
    }

    async fetchPageByID(id) {
        try {
            const meta = await this.knex.select('*').from('pages').where({'id': id}).first()
            let blocks = await this.knex.select('page_data.name', 'data', 'blocks.template').from('page_data').leftJoin('blocks', 'blocks.id', 'page_data.block').where({'page_data.page': meta.id})
            blocks = blocks.map((block) => {

                // TODO Find a non-blocking method of parsing json
                // Does kNEX have anything?
                block.data = JSON.parse(block.data)
                return block
            })
            return {meta, blocks}
        } catch (error) {
            console.log(error)
        }
    }


    async fetchPageMeta(pagename) {
        try {
            return await this.knex.select('*').from('pages').where({'name': pagename}).first()
        } catch (error) {
            console.log(error)
        }
    }

}
