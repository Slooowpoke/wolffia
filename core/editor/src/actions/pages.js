import axios from 'axios'
import {push} from 'react-router-redux'

export const VIEW_PAGE = 'VIEW_PAGE', CREATE_PAGE = 'CREATE_PAGE', UPDATE_PAGE = 'UPDATE_PAGE', DELETE_PAGE = 'DELETE_PAGE', LOAD_PAGES = 'LOAD_PAGES'
export const LOAD_PAGES_REQUEST = 'LOAD_PAGES_REQUEST'
export const LOAD_PAGES_SUCCESS = 'LOAD_PAGES_SUCCESS'
export const LOAD_PAGES_FAILURE = 'LOAD_PAGES_FAILURE'

export const LOAD_SINGLE_PAGE_SUCCESS = 'LOAD_SINGLE_PAGE_SUCCESS'

export const SAVE_META = 'SAVE_PAGE_META',SAVE_META_REQUEST = 'SAVE_META_REQUEST', SAVE_META_FAILURE = 'SAVE_META_FAILURE'
export const CREATE_PAGE_REQUEST = 'CREATE_PAGE_REQUEST', CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS', CREATE_PAGE_FAILURE = 'CREATE_PAGE_FAILURE'
export const DELETE_PAGE_REQUEST = 'DELETE_PAGE_REQUEST', DELETE_PAGE_SUCCESS ='DELETE_PAGE_SUCCESS', DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE'

export function savePageMeta(meta){
    const request = axios.post('http://localhost:3001/api/pages/' + meta.id + '/meta/save', meta)

    return (dispatch) => {
        dispatch(savePageMetaRequest())

        request.then(({data}) => {
            if(data.length > 0){
                dispatch(savePageMetaSuccess(data))
            }else{
                throw('No pages available')
            }

        }).catch(({error}) => {
            dispatch(savePageMetaFailure(error))
        })
    }
}

export function savePageMetaRequest(){
    return {
        type: SAVE_META_REQUEST,
    }
}

export function savePageMetaSuccess(meta){
    return {
        type: UPDATE_PAGE,
        meta,
        id: meta.id
    }
}

export function savePageMetaFailure(error){
    return {
        type: SAVE_META_FAILURE,
        error,
    }
}


let totalPages = 0
export function createPage(title, name, template) {
    const request = axios.post('http://localhost:3001/api/pages/create', {title, name, template})

    return (dispatch) => {
        dispatch(createPageRequest())

        request.then(({data}) => {
            console.log(data)
            if(data != undefined){
                dispatch(createPageSuccess(data))
            }else{
                throw('No pages available')
            }

        }).catch(({error}) => {
            dispatch(createPageFailure(error))
        })
    }
}

export function createPageRequest(){
    return {
        type: CREATE_PAGE_REQUEST
    }
}

export function createPageFailure(error){
    return {
        type: CREATE_PAGE_FAILURE,
        error
    }
}

export function createPageSuccess(page){
    return {
       type: CREATE_PAGE,
       title: page.title,
       name: page.name,
       template: page.template,
       id:page.id
    }
}

export function updatePage(meta) {
    console.log(meta)
    return (dispatch) => {
        dispatch(savePageMeta(meta))
    }
}

export function deletePage(id) {
    const request = axios.get('http://localhost:3001/api/pages/' + id + '/delete')

    return (dispatch) => {
        dispatch(deletePageRequest())

        request.then(({data}) => {
            console.log(data)
            if(data != undefined){
                dispatch(deletePageSuccess(data))
            }else{
                throw('No pages available')
            }

        }).catch(({error}) => {
            dispatch(deletePageFailure(error))
        })
    }
}

export function deletePageRequest(){
    return {
        type: DELETE_PAGE_REQUEST
    }
}

export function deletePageFailure(error){
    return {
        type: DELETE_PAGE_FAILURE,
        error
    }
}

export function deletePageSuccess(id){
    return {
       type: DELETE_PAGE,
       id
    }
}


export function loadPagesRequest(){
   return {
       type: LOAD_PAGES_REQUEST
   }
}

export function loadPagesSuccess(data){
   return {
       type: LOAD_PAGES_SUCCESS,
       list: data,
       receivedAt: Date.now()
   }
}

export function loadPagesFailure(data){
   return {
       type: LOAD_PAGES_FAILURE,
       error: data,
       receivedAt: Date.now()
   }
}

export function loadPages(){
   const request = axios.get('http://localhost:3001/api/pages')

   return (dispatch) => {
       dispatch(loadPagesRequest())

       request.then(({data}) => {
           if(data.length > 0){
               dispatch(loadPagesSuccess(data))
           }else{
               throw('No pages available')
           }

       }).catch(({error}) => {
           dispatch(loadPagesFailure(error))
       })
   }
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
