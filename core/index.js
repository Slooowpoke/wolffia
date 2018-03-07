import "babel-polyfill";
import Connection from './fetch/Connection'
import Retrieve from './fetch/Retrieve'
import Koa from 'koa'
import asyncBusboy from 'async-busboy';

const ejs = require('ejs')
const router = require('koa-route')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const serve = require('koa2-static-middleware');
const app = new Koa()
const retriever = new Retrieve()


app.use(views('./templates', {extension: 'ejs'}))
app.use(bodyParser())
app.use(cors())

const pages = {
	home: async(ctx) => {
        ctx.state.page = await retriever.getPage('home')
        ctx.state.getBlock = (name, data) => {

            return data[0].template;
        }

        await ctx.render(ctx.state.page.meta.template, ctx.state.page)
	},
    about: async(ctx) => {
        // ctx.body = JSON.stringify({heading: 'test'})
        ctx.state.page = await retriever.getPage('about')

        ctx.state.page.blocks = ctx.state.page.blocks.map((block, key) => {
            return ejs.renderFile('./templates' + block.template, block.data, {}, (err, html) => {
                return html
            })
        })

        await ctx.render(ctx.state.page.meta.template, ctx.state.page)
    },
    editor: async(ctx) => {
        ctx.body = '<h1>editor</h1>'
    },
}

// TODO Authentication on API Routes
const api = {
    getAllPagesMeta: async(ctx) => {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        let pageMetas = await retriever.getAllPageMetas()
    	ctx.body = JSON.stringify(pageMetas)
	},

    getBlocksForPage: async(ctx, pageID) => {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        let pageBlocks = await retriever.getBlocksForPage(pageID)
        ctx.body = JSON.stringify(pageBlocks)
    },

    getListOfBlocks: async(ctx) => {
        let listOfBlocks = await retriever.getListOfBlocks()
        ctx.body = JSON.stringify(listOfBlocks)
    },

    getBlockStructure: async(ctx, id) => {
        let requestBody = ctx.request.body
        ctx.body = JSON.stringify(await retriever.getBlockStructure(id))
    },

    savePageMeta: async(ctx, pageID) => {
        ctx.accepts('application/json')
        let requestBody = ctx.request.body
        ctx.body = await JSON.stringify(retriever.savePageMeta(requestBody.title, requestBody.name,requestBody.template, requestBody.id))
    },

    createPage: async(ctx) => {
        ctx.accepts('application/json')
        let requestBody = ctx.request.body
        console.log(requestBody)

        ctx.body = JSON.stringify(await retriever.createPage(requestBody.title, requestBody.name,requestBody.template))
    },


    addBlockToPage: async(ctx) => {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        ctx.accepts('application/json')
        let requestBody = ctx.request.body
       
        ctx.body = JSON.stringify(await retriever.addBlockToPage(requestBody))
    },

    updatePageData: async(ctx, id) => {
        ctx.accepts('application/json')
        let requestBody = ctx.request.body
        console.log(requestBody)
        ctx.body = JSON.stringify(await retriever.updatePageData(requestBody, id))
    },

    deletePageData: async(ctx, pageID, blockID) => {
        ctx.accepts('application/json')
        let requestBody = ctx.request.body
        ctx.body = JSON.stringify(await retriever.dropPageData(blockID))
    },

    uploadFile: async(ctx) => {
        let requestBody = ctx.request.body
        if ('POST' != ctx.method) return await next()
        const {files, fields} = await asyncBusboy(ctx.req)

        ctx.body = JSON.stringify(await retriever.uploadFile(files[0], fields.name))
    },

}

// Page routes
app.use(router.get('/wf-editor', pages.editor))

app.use(router.get('/', pages.home))
app.use(router.get('/about', pages.about))

// API Routes
app.use(router.get('/api/pages', api.getAllPagesMeta))
app.use(router.get('/api/pages/:pageID/blocks', api.getBlocksForPage))
app.use(router.get('/api/blocks', api.getListOfBlocks))
app.use(router.get('/api/blocks/:id', api.getBlockStructure))

app.use(router.post('/api/page/:pageID/blocks/:blockID/delete', api.deletePageData))
app.use(router.post('/api/page/:pageID/blocks', api.updatePageData))
app.use(router.post('/api/pages/:pageID/meta/save', api.savePageMeta))
app.use(router.post('/api/pages/:pageID/blocks/create', api.addBlockToPage))
app.use(router.post('/api/pages/create', api.createPage))

app.use(router.post('/api/upload', api.uploadFile))

app.use(serve('./public'))

app.listen(3001)
