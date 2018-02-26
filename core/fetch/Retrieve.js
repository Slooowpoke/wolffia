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
    async getAllPageMetas(){
        let pageMetas = await this.connection.queryAllPageMetas()
        return pageMetas
    }


    async savePageMeta(title, name,template, pageID){
        let response = await this.connection.savePageMeta(title, name,template, pageID)
        return response
    }

    async createPage(title, name, template){
        let response = await this.connection.createPage(title, name, template)
        return response
    }

    async getBlocksList(){
        let response = await this.connection.blocksList()
        return response
    }

    async getBlockStructure(id){
        let response = await this.connection.getBlockStructure(id)
        return response
    }

    async updatePageData(blocks, pageID){
        let response = await this.connection.updatePageData(blocks, pageID)
        return response
    }

    async dropPageData(block){
        let response = await this.connection.dropPageData(block)
        return response
    }
}
