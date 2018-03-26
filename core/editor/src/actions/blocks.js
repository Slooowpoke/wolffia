import axios from 'axios'
import { createActionTypes, requestCreator } from './utils';

export const
    LOAD_BLOCKS = 'LOAD_BLOCKS',
    LOAD_BLOCK_EDITOR_STRUCTURE = 'LOAD_BLOCK_EDITOR_STRUCTURE',
    SAVE_NEW_BLOCK = 'SAVE_NEW_BLOCK',
    CLEAR_CURRENT_EDITOR = 'CLEAR_CURRENT_EDITOR',
    DELETE_BLOCK = 'DELETE_BLOCK',
    SAVE_BLOCKS = 'SAVE_BLOCKS',
    UPDATE_BLOCK = 'UPDATE_BLOCK'

export function loadBlocks(pageID){
    return requestCreator(() => loadBlocksRequest(pageID), createActionTypes(LOAD_BLOCKS))
}
async function loadBlocksRequest(id) {
    const response = await axios.get('http://localhost:3001/api/pages/' + id + '/blocks')
    return response.data
}

// export function fetchBlockTypesList(){
//     return requestCreator(() => loadBlockTypesList, createActionTypes('BLOCK_LIST'))
// }
// async function loadBlockTypesList() {
//     const response = await axios.get('http://localhost:3001/api/blocks')
//     return response.data
// }

export function getBlockEditorStructure(blockID, pageID, display){
    return requestCreator(() => loadBlockEditorStructure(blockID, pageID, display), createActionTypes(LOAD_BLOCK_EDITOR_STRUCTURE))
}
async function loadBlockEditorStructure(id, pageID, display) {
    const response = await axios.get('http://localhost:3001/api/blocks/' + id)
    if(response.data === undefined){
        throw 'Response was empty.'
    }
    response.data.page = pageID
    response.data.block = id
    response.data.display = display
    return response.data
}

export function updateBlock(block) {
    if(block.id !== undefined){
        return {
            type: UPDATE_BLOCK,
            block
        }
    }else{
        return async (dispatch) => {
            dispatch(requestCreator(() => saveNewBlockRequest(block), createActionTypes(SAVE_NEW_BLOCK)))
            dispatch({type: CLEAR_CURRENT_EDITOR})
        }
    }
}

async function saveNewBlockRequest(block) {
    const response = await axios.post('http://localhost:3001/api/pages/' + block.page + '/blocks/create',block)
    if(response.data === undefined){
        throw 'Response was empty.'
    }
    console.log(response.data)
    return {...response.data}
}

export function deleteBlock(pageID, blockID){
    return requestCreator(() => deleteBlockRequest(pageID, blockID), createActionTypes(DELETE_BLOCK))
}
async function deleteBlockRequest(pageID, blockID) {
    const response = await axios.post('http://localhost:3001/api/page/' + pageID + '/blocks/' + blockID + '/delete')
    return response.data
}

export function saveBlocks(blocks, pageID){
    return requestCreator(() => saveBlocksRequest(blocks, pageID), createActionTypes(SAVE_BLOCKS))
}
async function saveBlocksRequest(blocks, pageID) {
    const response = await axios.post('http://localhost:3001/api/page/' + pageID + '/blocks/', blocks)
    return response.data
}
