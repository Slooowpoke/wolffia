import {
    CREATE_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK_SUCCESS,
    CLEAR_CURRENT_EDITOR
} from '../actions/blocks'

const initialState = {
	list: [],
	isFetching: true,
    error: '',
    currentEditorBlock: null,
}

export function blocks(state = initialState, action) {
	switch (action.type) {
        case 'LOAD_BLOCK_EDITOR_STRUCTURE_SUCCESS':
            return {
                ...state,
                currentEditorBlock: action.response
            }
        case CREATE_BLOCK:
		    return {
                ...state,
                list: [
                    ...state.list, action.block
                ]
            }
        case UPDATE_BLOCK:
            if(action.blockID === undefined){
                return {
                    ...state,
                    list:[
                        ...state.list, {
                            ...action.block,
                            id: action.createID
                        }
                    ]
                }
            }else{
                return {
                    ...state,
                    list: state.list.map(block => {
                        if(block.id == action.blockID){
                            block = action.block
                        }
                        return block
                    })
                }
            }
        case DELETE_BLOCK_SUCCESS:
		    return {
                ...state,
               list: state.list.filter(block => block.id !== action.remove)
            }
        case 'LOAD_BLOCKS_REQUEST':
		    return {
                ...state,
                isFetching: true
            }
		case 'LOAD_BLOCKS_SUCCESS':
            return {
                ...state,
                isFetching: false,
				list: [
					...action.response
				],
				lastUpdated: action.receivedAt
            }
        case 'LOAD_BLOCKS_FAILURE':
		    return {
                ...state,
                isFetching: false,
                error: action.error,
                lastUpdated: action.receivedAt
            }
        case CLEAR_CURRENT_EDITOR:
            return {
                ...state,
                currentEditorBlock:null
            }
		default:
			return state
	}
}

function arrayIncludesByID(array, id){
    for(let data of array){
        if(data.id == id){
            return true
        }
    }
    return false
}
