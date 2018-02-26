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
let totalPages = 0
export function createPage(meta) {
   return {
       type: CREATE_PAGE,
       meta,
       index: totalPages++
   }
}

export function updatePage(meta) {
   return {
       type: UPDATE_PAGE,
       meta,
       index: meta.index
   }
}

export function deletePage(index) {
   return {type: DELETE_PAGE, index}
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
   const request = axios.get('pages.json')

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
