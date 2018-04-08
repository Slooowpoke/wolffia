
const initialState = {
    listOfStructures:[],
    currentEditorStructure:{}
}

export function structure(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_STRUCTURES_SUCCESS':
            return {
                ...state,
                listOfStructures: action.response
            }
        case 'LOAD_SINGLE_STRUCTURE_SUCCESS':
            return {
                ...state,
                currentEditorStructure: action.response
            }
        case 'UPDATE_EDITOR_STRUCTURE':
            return {
                ...state,
                currentEditorStructure: action.newStructure
            }
        default:
            return state
    }
}
