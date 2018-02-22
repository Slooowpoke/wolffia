import {
    VIEW_PAGE,
    CREATE_PAGE,
    UPDATE_PAGE,
    DELETE_PAGE,
    LOAD_PAGES_REQUEST,
    LOAD_PAGES_FAILURE,
    LOAD_PAGES_SUCCESS,
    LOAD_SINGLE_PAGE_SUCCESS
} from '../actions/pages'

const initialState = {
	list: [],
	isFetching: true,
    error: '',
    currentPage: 0
}

export function pages(state = initialState, action) {
	switch (action.type) {
		case CREATE_PAGE:
			return Object.assign({}, state, {
				list: [
					...state.list, {
						index: action.index,
						meta: action.meta
					}
				]
			})
        case UPDATE_PAGE:
            return Object.assign({}, state, {
                list: state.list.map(page => {
                    return page
                })
            })
		case DELETE_PAGE:
			return Object.assign({}, state, {
				list: state.list.filter(page => page.index != action.index)
			})
		case LOAD_PAGES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case LOAD_PAGES_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				list: [
					...state.list,
                    ...(action.list.filter(page => !arrayIncludesByID(state.list, page.index)))
				],
				lastUpdated: action.receivedAt
			})
		case LOAD_PAGES_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
                error: action.error,
				lastUpdated: action.receivedAt
			})
		case LOAD_SINGLE_PAGE_SUCCESS:
			return Object.assign({}, state, {
				list: [
					...state.list
				],
                currentPage: action.index
			})
		default:
			return state
	}
}

function arrayIncludesByID(array, id){
    for(let data of array){
        if(data.index == id){
            return true
        }
    }
    return false
}
