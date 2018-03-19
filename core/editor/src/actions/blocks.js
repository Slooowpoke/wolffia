import axios from 'axios'
import { createActionTypes, requestCreator } from './utils';

export const
    LOAD_BLOCKS = 'LOAD_BLOCKS',
	LOAD_BLOCKS_REQUEST = 'LOAD_BLOCKS_REQUEST',
	LOAD_BLOCKS_FAILURE = 'LOAD_BLOCKS_FAILURE',
	LOAD_BLOCKS_SUCCESS = 'LOAD_BLOCKS_SUCCESS',
    CREATE_BLOCK = 'CREATE_BLOCK',
    UPDATE_BLOCK = 'UPDATE_BLOCK',
    DELETE_BLOCK = 'DELETE_BLOCK',
    SAVE_BLOCKS = 'SAVE_BLOCKS',
    UPDATE_REQUEST = 'UPDATE_REQUEST',
    UPDATE_FAILURE = 'UPDATE_FAILURE',
    UPDATE_SUCCESS = 'UPDATE_SUCCESS',
    CREATE_BLOCK_FAILURE = 'CREATE_BLOCK_FAILURE',
    CREATE_BLOCK_SUCCESS = 'CREATE_BLOCK_SUCCESS',

    CREATE_BLOCK_EDITOR = 'CREATE_BLOCK_EDITOR',
    FETCH_BLOCK_DETAILS = 'FETCH_BLOCK_DETAILS',
    SAVE_BLOCKS_REQUEST = 'SAVE_BLOCKS_REQUEST',
    SAVE_BLOCKS_SUCCESS = 'SAVE_BLOCKS_SUCCESS',
    SAVE_BLOCKS_FAILURE = 'SAVE_BLOCKS_FAILURE',

    DELETE_BLOCK_REQUEST = 'DELETE_BLOCK_REQUEST',
    DELETE_BLOCK_SUCCESS = 'DELETE_BLOCK_SUCCESS',
    DELETE_BLOCK_FAILURE = 'DELETE_BLOCK_FAILURE',
    CLEAR_CURRENT_EDITOR = 'CLEAR_CURRENT_EDITOR',

    SAVE_NEW_BLOCK_REQUEST = 'SAVE_NEW_BLOCK_REQUEST',
    SAVE_NEW_BLOCK_SUCCESS = 'SAVE_NEW_BLOCK_SUCCESS',
    SAVE_NEW_BLOCK_FAILURE = 'SAVE_NEW_BLOCK_FAILURE';



export function loadBlocks(pageID){
    return requestCreator(() => loadBlocksRequest(pageID), createActionTypes('LOAD_BLOCKS'))
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

export function getBlockEditorStructure(blockID, pageID){
    return requestCreator(() => loadBlockEditorStructure(blockID, pageID), createActionTypes('LOAD_BLOCK_EDITOR_STRUCTURE'))
}
async function loadBlockEditorStructure(id, pageID) {
    const response = await axios.get('http://localhost:3001/api/blocks/' + id)
    if(response.data === undefined){
        throw 'Response was empty.'
    }
    response.data.page = pageID
    response.data.block = id
    return response.data
}

export function updateBlock(block) {
    let pageID, blockID
    if(block.id != undefined){
        blockID = block.id

        return {
            type: UPDATE_BLOCK,
            blockID,
            block
        }
    }else{
        return async (dispatch) => {
            dispatch(requestCreator(() => saveNewBlockRequest(block), createActionTypes('SAVE_NEW_BLOCK'))),
            dispatch({type: CLEAR_CURRENT_EDITOR})
        }

        // pageID = block.page
        // return async (dispatch) => {
        //     let url = 'http://localhost:3001/api/pages/' + pageID + '/blocks/create'
        //     console.log(block.data)
        //     // block.data = JSON.stringify(block.data)
        //     dispatch({type: SAVE_NEW_BLOCK_REQUEST, url})
        //     try {
        //         console.log(block.data)
        //         const response = await axios.post(url,block)
        //         let id = response.data.response[0]
        //         console.log('block id')
        //         console.log(id)
        //
        //         dispatch({type: CLEAR_CURRENT_EDITOR})
        //         dispatch({
        //             type: UPDATE_BLOCK,
        //             pageID,
        //             createID: id,
        //             block
        //         })
        //     } catch (e) {
        //         console.log(e)
        //         dispatch(saveNewBlockFailure(e));
        //     }
        // }
    }
}

export function uBlock(block){
    if(block.id !== undefined){
        return {
            type: UPDATE_BLOCK,
            block
        }
    }else{
        return async (dispatch) => {
            dispatch(requestCreator(() => saveNewBlockRequest(block), createActionTypes('CREATE_BLOCK')))
            dispatch({type: CLEAR_CURRENT_EDITOR})
        }
    }
}
async function saveNewBlockRequest(block) {
    const response = await axios.post('http://localhost:3001/api/pages/' + block.page + '/blocks/create',block)
    if(response.data === undefined){
        throw 'Response was empty.'
    }
    const id = response.data.response[0]
    return {...block, id}
}


function saveNewBlockFailure(error) {
    return {type: SAVE_NEW_BLOCK_FAILURE, error}
}

export function clearCurrentEditor(){
	return{ type:CLEAR_CURRENT_EDITOR }
}

export function deleteBlock(pageID, blockID) {
	const request = axios.post('http://localhost:3001/api/page/' + pageID + '/blocks/' + blockID + '/delete')

	return (dispatch) => {
		dispatch(deleteBlockRequest())

		request.then(({data}) => {
			if (data != undefined) {
				dispatch(deleteBlockSuccess(blockID))
			} else {
				throw('No blocks available')
			}

		}).catch(({error}) => {
			dispatch(deleteBlockFailure(error))
		})
	}
}

export function deleteBlockRequest() {
	return {type: DELETE_BLOCK_REQUEST}
}

export function deleteBlockSuccess(data) {
	return {type: DELETE_BLOCK_SUCCESS, remove: data}
}

export function deleteBlockFailure(error) {
	return {type: DELETE_BLOCK_FAILURE, error}
}

export function saveBlocks(blocks, pageID) {
    console.log(blocks)
	const request = axios.post('http://localhost:3001/api/page/' + pageID + '/blocks/', blocks)

	return (dispatch) => {
		dispatch(saveBlocksRequest())

		request.then(({data}) => {
			if (data != undefined) {
				dispatch(saveBlocksSuccess(data))
			} else {
				throw('No blocks available')
			}

		}).catch(({error}) => {
			dispatch(saveBlocksFailure(error))
		})
	}
}

export function saveBlocksRequest() {
	return {type: SAVE_BLOCKS_REQUEST}
}

export function saveBlocksSuccess(data) {
	return {type: SAVE_BLOCKS, list: data}
}

export function saveBlocksFailure(error) {
	return {type: SAVE_BLOCKS_FAILURE, error}
}

// export function updateBlock(pageID, blockID, block) {
// 	const request = axios.post('http://localhost:3001/api/pages/' + pageID + '/blocks/' + blockID, block)
//
// 	return (dispatch) => {
// 		dispatch(updateBlockRequest())
//
// 		request.then(({data}) => {
// 			if (data.length > 0) {
// 				dispatch(updateBlockSuccess(data))
// 			} else {
// 				throw('No blocks available')
// 			}
//
// 		}).catch(({error}) => {
// 			dispatch(updateBlockSuccess(error))
// 		})
// 	}
// }

export function updateBlockRequest() {
	return {type: UPDATE_REQUEST}
}

export function updateBlockSuccess(data) {
	return {type: UPDATE_SUCCESS, list: data}
}

export function updateBlockFailure(error) {
	return {type: UPDATE_FAILURE, error}
}

