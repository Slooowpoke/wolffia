import axios from 'axios'
import {push} from 'react-router-redux'
import { createActionTypes, requestCreator } from './utils';

export const VIEW_PAGE = 'VIEW_PAGE'

export const
    SAVE_PAGE_META = 'SAVE_PAGE_META',
    CREATE_PAGE = 'CREATE_PAGE',
    DELETE_PAGE = 'DELETE_PAGE',
    LOAD_PAGES = 'LOAD_PAGES',
    FETCH_PAGE_BY_ID = 'FETCH_PAGE_BY_ID'

export function savePageMeta(meta){
    return requestCreator(() => savePageMetaRequest(meta), createActionTypes(SAVE_PAGE_META))
}
async function savePageMetaRequest(meta) {
    const response = await axios.post('http://localhost:3001/api/pages/meta/save', meta)
    return response.data
}


export function createPage(title, name, template){
    return requestCreator(() => createPageRequest(title, name, template), createActionTypes(CREATE_PAGE))
}
async function createPageRequest(title, name, template) {
    const response = await axios.post('http://localhost:3001/api/pages/create', {title, name, template})
    return {...response.data}
}


export function deletePage(id){
    return requestCreator(() => deletePageRequest(id), createActionTypes(DELETE_PAGE))
}
async function deletePageRequest(id) {
    const response = await axios.get('http://localhost:3001/api/pages/' + id + '/delete')
    return {...response.data}
}


export function loadPages(){
    return requestCreator(() => loadPagesRequest(), createActionTypes(LOAD_PAGES))
}
async function loadPagesRequest() {
    const response = await axios.get('http://localhost:3001/api/pages')
    return response.data
}


export function fetchPageByID(id){
    return requestCreator(() => fetchPageByIDRequest(id), createActionTypes(FETCH_PAGE_BY_ID))
}
async function fetchPageByIDRequest(id) {
    const response = await axios.get('http://localhost:3001/api/pages/' + id)
    return {...response.data}
}

export function viewPage(index){
    return (dispatch) => {
        dispatch(push('/pages/' + index))
        dispatch(loadSinglePage(index))
    }
}

export function loadSinglePage(index){
    return {
        type: VIEW_PAGE,
        index
    }
}