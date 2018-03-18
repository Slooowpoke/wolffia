import busboy from 'async-busboy'

export default {
    getListOfPagesMetas: async(ctx) => {
        let listOfPageMetas = await ctx.fetch.getAllPageMetas()
        ctx.body = JSON.stringify(listOfPageMetas)
    },

    getPageByID: async(ctx) => {
        let page = await ctx.fetch.getPageByID(ctx.params.pageID)
        ctx.body = JSON.stringify(page)
    },

    getBlocksForPage: async(ctx) => {
        let listOfBlocksForPage = await ctx.fetch.getBlocksForPage(ctx.params.pageID)
        ctx.body = JSON.stringify(listOfBlocksForPage)
    },

    getListOfBlocks: async(ctx) => {
        let listOfBlocks = await ctx.fetch.getListOfBlocks()
        ctx.body = JSON.stringify(listOfBlocks)
    },

    getBlockStructure: async(ctx) => {
        let blockStructure = await ctx.fetch.getBlockStructure(ctx.params.id)
        ctx.body = JSON.stringify(blockStructure)
    },

    updatePageMeta: async(ctx) => {
        ctx.accepts('application/json')
        let request = ctx.request.body
        ctx.body = await JSON.stringify(ctx.fetch.updatePageMeta(request.title, request.name,request.template, request.id))
    },

    updatePageData: async(ctx) => {
        ctx.accepts('application/json')
        let request = ctx.request.body
        ctx.body = JSON.stringify(await ctx.fetch.updatePageData(request, ctx.params.id))
    },

    createPage: async(ctx) => {
        ctx.accepts('application/json')
        let request = ctx.request.body
        let pageCreationResponse = await ctx.fetch.createPage(request.title, request.name,request.template)
        ctx.body = JSON.stringify(pageCreationResponse)
    },

    createPageData: async(ctx) => {
        ctx.accepts('application/json')
        let request = ctx.request.body
        let createPageDataResponse = await ctx.fetch.createPageData(request)
        ctx.body = JSON.stringify(createPageDataResponse)
    },

    deletePageData: async(ctx) => {
        ctx.accepts('application/json')
        let dropDataResponse = await ctx.fetch.dropPageData(ctx.params.blockID)
        ctx.body = JSON.stringify(dropDataResponse)
    },

    uploadFile: async(ctx) => {
        if ('POST' != ctx.method) return await next()

        // TODO Handle multiple files?
        const {files, fields} = await busboy(ctx.req)
        let uploadFileResponse = await ctx.fetch.uploadFile(files[0], fields.name)
        ctx.body = JSON.stringify(uploadFileResponse)
    },
}