const initialState = {
	list: [],
	isFetching: true,
    error: '',
    currentPage: 0,
	currentEditorPage: {}
}

export function pages(state = initialState, action) {
	switch (action.type) {
		case 'CREATE_PAGE_SUCCESS':
			return {
				...state,
                list: [
                    ...state.list, {
                        id: action.response.id,
                        title: action.response.title,
                        name: action.response.name,
                        template: action.response.template
                    }
                ]
			}
		case 'SAVE_PAGE_META_SUCCESS':
        	return {
				...state,
                list: state.list.map(page => {
                    return page
                })
			}
		case 'DELETE_PAGE_SUCCESS':
			return {
				...state,
                list: state.list.filter(page => page.id !== action.id)
			}
		case 'LOAD_PAGES_SUCCESS':
			return {
				...state,
                list: [
                    ...action.response
                ],
			}
		case 'LOAD_SINGLE_PAGE_SUCCESS':
			return {
				...state,
                list: [
                    ...state.list
                ],
                currentPage: action.index
			}
		case 'FETCH_PAGE_BY_ID_SUCCESS':
        	return {
				...state,
                currentEditorPage: action.response
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
