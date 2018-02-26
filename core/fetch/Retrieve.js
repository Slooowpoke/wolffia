import Connection from './Connection'
import Page from '../models/Page'

export default class Retrieve {

    constructor(){
        this.connection = new Connection()
    }
    async getPage(pagename){
        let {blocks, meta} = await this.connection.queryForPage(pagename)
        return new Page(meta, blocks)
    }
    async dropPageData(block){
        let response = await this.connection.dropPageData(block)
        return response
    }
}
