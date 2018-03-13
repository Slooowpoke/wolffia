import Connection from './Connection'
import Page from '../models/Page'
import Block from '../models/Block'
import FileWriter from './FileWriter'

export default class Retrieve {

    constructor(){
        this.connection = new Connection()
        this.filewriter = new FileWriter()
    }

    async getPage(pagename){
        let {blocks, meta} = await this.connection.fetchPage(pagename)
        return new Page(meta, blocks)
    }

    async getAllPageMetas(){
        return await this.connection.fetchPageMetas()
    }

    async getBlocksForPage(pageID){
        let blocks = await this.connection.fetchBlocksForPage(pageID)
        return blocks
    }

    async getListOfBlocks(){
        return await this.connection.fetchListOfBlocks()
    }

    async updatePageMeta(title, name,template, pageID){
        let response = await this.connection.updatePageMeta(title, name,template, pageID)
        return response
    }

    async createPage(title, name, template){
        let response = await this.connection.createPage(title, name, template)
        return response
    }



    async getBlockStructure(id){
        let response = await this.connection.fetchSingleBlockStructure(id)
        return response
    }

    async createPageData(block){
        return await this.connection.insertPageData(block)
    }

    async updatePageData(blocks, pageID){
        let response = await this.connection.updatePageData(blocks, pageID)
        return response
    }

    async dropPageData(block){
        let response = await this.connection.dropPageData(block)
        return response
    }

    async uploadFile(file, name){
        let response = await this.filewriter.writeFile(file, name)
        return response
    }
}
