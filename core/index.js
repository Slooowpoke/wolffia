import Connection from './fetch/Connection'
import Retrieve from './fetch/Retrieve'
import Koa from 'koa'
const router = require('koa-route')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const app = new Koa()
const retriever = new Retrieve()

app.use(views('./templates', {
	extension: 'ejs'
}))
const pages = {
	home: async(ctx) => {
        ctx.state.page = await retriever.getPage('home')
        await ctx.render(ctx.state.page.meta.template, ctx.state.page)
	},
    about: async(ctx) => {
        // ctx.body = JSON.stringify({heading: 'test'})
        ctx.state.page = await retriever.getPage('about')
        console.log()
        await ctx.render(ctx.state.page.meta.template, ctx.state.page)
    },
    editor: async(ctx) => {
        ctx.body = '<h1>editor</h1>'
    },
}

// Page routes
app.use(router.get('/wf-editor', pages.editor))

app.use(router.get('/', pages.home))
app.use(router.get('/about', pages.about))

app.use(async(ctx, next) => {
	ctx.state.page = await retriever.getPage('home')
	await next()
})

app.use(async function(ctx, next) {
	await ctx.render(ctx.state.page.meta.template, ctx.state.page)
})

app.listen(3000)
