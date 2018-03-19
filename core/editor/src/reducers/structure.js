import { FETCH_STRUCTURES_SUCCESS } from '../actions/structure'
const initialState = {
    listOfStructures:[],
}

export function structure(state = initialState, action) {
    switch (action.type) {
        case FETCH_STRUCTURES_SUCCESS:
            return {
                ...state,
                listOfStructures: action.listOfStructures
            }
        default:
            return state
    }
}