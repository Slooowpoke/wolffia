import {
    LOAD_BLOCKS_REQUEST,
    LOAD_BLOCKS_FAILURE,
    LOAD_BLOCKS_SUCCESS,
    CREATE_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK_SUCCESS,
    CREATE_BLOCK_EDITOR,
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
        case CREATE_BLOCK_EDITOR:
            return Object.assign({}, state, {
                currentEditorBlock: action.currentEditorBlock
            })
		case CREATE_BLOCK:
			return Object.assign({}, state, {
				list: [
					...state.list, action.block
				]
			})
        case UPDATE_BLOCK:
            if(action.blockID == undefined){

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
                return Object.assign({}, state, {
                    list: state.list.map(block => {
                        if(block.id == action.blockID){
                            block = action.block
                        }
                        return block
                    })
                })
            }
		case DELETE_BLOCK_SUCCESS:
			return Object.assign({}, state, {
				list: state.list.filter(block => block.id != action.remove)
			})
		case LOAD_BLOCKS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case LOAD_BLOCKS_SUCCESS:
            return {
                ...state,
                isFetching: false,
				didInvalidate: false,
				list: [
					...action.list
				],
				lastUpdated: action.receivedAt
            }
		case LOAD_BLOCKS_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
                error: action.error,
				lastUpdated: action.receivedAt
			})
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
