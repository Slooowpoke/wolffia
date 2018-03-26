
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
        case 'SAVE_NEW_BLOCK_SUCCESS':
            console.log(action)
            return {
                ...state,
                list:[
                    ...state.list, {
                        ...action.response,
                    }
                ]
            }
        case 'UPDATE_BLOCK':
            return {
                ...state,
                list: state.list.map(block => {
                    if(block.id === action.block.id){
                        block = action.block
                    }
                    return block
                })
            }
        case 'DELETE_BLOCK_SUCCESS':
		    return {
                ...state,
               list: state.list.filter(block => block.id !== action.response)
            }
		case 'LOAD_BLOCKS_SUCCESS':
            let sortedResponse = action.response.sort(function(a, b) {
                let keyA = a.display,
                    keyB = b.display;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            return {
                ...state,
				list: [
					...sortedResponse
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
        case 'CLEAR_CURRENT_EDITOR':
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

function orderByDisplay(a, b){
    let keyA = new Date(a.display),
        keyB = new Date(b.display);
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
}