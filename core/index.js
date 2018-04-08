import "babel-polyfill";
import Retrieve from './fetch/Retrieve'
import Koa from 'koa'
import Pages from './routes/pages'
import API from './routes/api'
import Router from 'koa-router'

const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const serve = require('koa2-static-middleware');

const app = new Koa()
let router = new Router();

app.context.fetch = new Retrieve()

app.use(views('./templates', {extension: 'ejs'}))
app.use(bodyParser())
app.use(cors())

// TODO Eventually though, this is going to need to query available routes

// Page routes
router.get('/', Pages.home)
router.get('/about', Pages.about)
router.get('/wf-editor', Pages.editor)


// TODO Figure out a way to do all these at once and in a more sensible way?
// TODO Authentication on API Routes

// API Routes
router.post('/api/pages/:pageID/blocks/create', API.createPageData)
router.post('/api/pages/create', API.createPage)

router.get('/api/pages', API.getListOfPagesMetas)
router.get('/api/blocks', API.getListOfBlocks)
router.get('/api/pages/:pageID/', API.getPageByID)
router.get('/api/pages/:pageID/blocks', API.getBlocksForPage)
router.get('/api/blocks/:id', API.getBlockStructure)

router.post('/api/page/:pageID/blocks', API.updatePageData)
router.post('/api/pages/meta/save', API.updatePageMeta)
router.post('/api/blocks/save/:id', API.updateStructure)

router.post('/api/page/:pageID/blocks/:blockID/delete', API.deletePageData)

router.post('/api/upload', API.uploadFile)

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(serve('./public'))

app.listen(3001)
