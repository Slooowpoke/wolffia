import axios from 'axios'

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
    FETCH_BLOCKS = 'FETCH_BLOCKS',
    FETCH_BLOCKS_REQUEST = 'FETCH_BLOCKS_REQUEST',
    FETCH_BLOCKS_FAILURE = 'FETCH_BLOCKS_FAILURE',
    FETCH_BLOCKS_SUCCESS = 'FETCH_BLOCKS_SUCCESS',
    CREATE_BLOCK_REQUEST = 'CREATE_BLOCK_REQUEST',
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
    SAVE_NEW_BLOCK_FAILURE = 'SAVE_NEW_BLOCK_FAILURE'

// export function saveNewBlock(block) {
//     return async dispatch => {
//         // TODO Add the id to the url when we have access to the real API
//         let url = 'http://localhost:3001/api/page'
//         const response = await axios.get(url)
//         let data = response.data
//         dispatch({type: SAVE_NEW_BLOCK_REQUEST, url})
//
//         try {
//             let response = await saveNewBlockRequest(url);
//             dispatch(saveNewBlockSuccess({
//                 ...response
//             }));
//         } catch (e) {
//             console.log(e)
//             dispatch(saveNewBlockFailure(e));
//         }
//     }
// }

function saveNewBlockSuccess(details) {
    return dispatch => {
        dispatch({type: SAVE_NEW_BLOCK_SUCCESS, details})
    }
}
function saveNewBlockFailure(error) {
    return {type: SAVE_NEW_BLOCK_FAILURE, error}
}


export function clearCurrentEditor(){
	return{
		type:CLEAR_CURRENT_EDITOR
	}
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

export function createBlockEditor(id, pageID){
    const request = axios.get('http://localhost:3001/api/blocks/' + id)

    return (dispatch) => {
        dispatch(fetchBlockDetails())

        request.then(({data}) => {
            if (data != undefined) {
                data.page = pageID
                data.block = id
                dispatch(createBlockEditorSuccess(data))
            } else {
                throw('No blocks available')
            }
        }).catch(({error}) => {
            dispatch(createBlockEditorFailure(error))
        })
    }
}

export function fetchBlockDetails() {
	return {type: FETCH_BLOCK_DETAILS}
}

export function createBlockEditorSuccess(data) {
	return {type: CREATE_BLOCK_EDITOR, currentEditorBlock: data}
}

export function createBlockEditorFailure(error) {
	return {type: CREATE_BLOCK_FAILURE, error}
}

export function createBlock(block){
    return {
        type: CREATE_BLOCK,
        block
    }
    // const request = axios.post('http://localhost:3001/api/blocks/create', block)
}

export function createBlockRequest() {
	return {type: CREATE_BLOCK_REQUEST}
}

export function createBlockSuccess(data) {
	return {type: CREATE_BLOCK, block: data}
}

export function createBlockFailure(error) {
	return {type: CREATE_BLOCK_FAILURE, error}
}

export function loadBlocks(pageID) {
	const request = axios.get('http://localhost:3001/api/pages/' + pageID + '/blocks')

	return (dispatch) => {
		dispatch(loadBlocksRequest())

		request.then(({data}) => {
			if (data.length > 0) {
				dispatch(loadBlocksSuccess(data))
			} else {
				throw('No blocks available')
			}

		}).catch(({error}) => {
			dispatch(loadBlocksFailure(error))
		})
	}
}

export function loadBlocksRequest() {
	return {type: LOAD_BLOCKS_REQUEST}
}

export function loadBlocksSuccess(data) {
	return {type: LOAD_BLOCKS_SUCCESS, list: data}
}

export function loadBlocksFailure(error) {
	return {type: LOAD_BLOCKS_FAILURE, error}
}

export function updateBlock(block) {
    let pageID, blockID
    if(block.id != undefined){
        pageID = block.page
        blockID = block.id

        return {
            type: UPDATE_BLOCK,
            pageID,
            blockID,
            block
        }
    }else{
        pageID = block.page
        return async (dispatch) => {
            let url = 'http://localhost:3001/api/pages/' + pageID + '/blocks/create'
            console.log(block.data)
            // block.data = JSON.stringify(block.data)
            dispatch({type: SAVE_NEW_BLOCK_REQUEST, url})
            try {
                console.log(block.data)
                const response = await axios.post(url,block)
                let id = response.data.response[0]
                console.log('block id')
                console.log(id)

                dispatch({type: CLEAR_CURRENT_EDITOR})
                dispatch({
                    type: UPDATE_BLOCK,
                    pageID,
                    createID: id,
                    block
                })
            } catch (e) {
                console.log(e)
                dispatch(saveNewBlockFailure(e));
            }
        }

    }

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
			dispatch(fetchBlocksListFailure(error))
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


export function fetchBlocksList() {
	const request = axios.get('http://localhost:3001/api/blocks')

	return (dispatch) => {
		dispatch(fetchBlocksListRequest())

		request.then(({data}) => {
			if (data.length > 0) {
				dispatch(fetchBlocksListSuccess(data))
			} else {
				throw('No blocks available')
			}

		}).catch(({error}) => {
			dispatch(fetchBlocksListFailure(error))
		})
	}
}

export function fetchBlocksListRequest() {
	return {type: FETCH_BLOCKS_REQUEST}
}

export function fetchBlocksListSuccess(data) {
	return {type: FETCH_BLOCKS_SUCCESS, list: data}
}

export function fetchBlocksListFailure(error) {
	return {type: FETCH_BLOCKS_FAILURE, error}
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
