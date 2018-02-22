import Connection from './fetch/Connection'
import Retrieve from './fetch/Retrieve'
import Koa from 'koa'
import PageBuilder from './PageBuilder'

const views = require('koa-views')

const app = new Koa()
const retriever = new Retrieve()

app.use(views('./templates', {
	extension: 'ejs'
}))

app.use(async(ctx, next) => {
	ctx.state.page = await retriever.getPage('home')
	await next()
})

app.use(async function(ctx, next) {
	await ctx.render(ctx.state.page.meta.template, ctx.state.page)
})

app.listen(3000)
