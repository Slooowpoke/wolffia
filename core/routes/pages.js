const ejs = require('ejs')

export default {
    home: async(ctx) => {
        ctx.state.page = await ctx.fetch.getPage('home')
        return await ctx.render(ctx.state.page.meta.template, ctx.state.page)
    },
    about: async (ctx) => {
        let page = await ctx.fetch.getPage('about')

        // TODO Refactor into Page class with Block class
        page.blocks = page.blocks.map((block) => {
            return ejs.renderFile('./templates' + block.template, block.data, {}, (err, html) => {
                return html
            })
        })

        ctx.state.page = page
        return await ctx.render(ctx.state.page.meta.template, ctx.state.page)
    },
    editor: async (ctx) => {
        ctx.body = '<h1>editor</h1>'
    },
}

