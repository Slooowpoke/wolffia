import {
	ADD_PROJECT,
	DELETE_PROJECT,
	LOAD_PROJECTS_REQUEST,
	LOAD_PROJECTS_SUCCESS,
	LOAD_PROJECTS_FAILURE,
	LOAD_SINGLE_PROJECT_SUCCESS
} from '../actions/projects'

const initialState = {
	projectList: [],
	isFetching: true,
	didInvalidate: false,
    error: "",
}

// MUST REMAIN A PURE FUNCTION
export function projects(state = initialState, action) {
	switch (action.type) {
		case ADD_PROJECT:
			return Object.assign({}, state, {
				projectList: [
					...state.projectList, {
						id: action.index,
						name: action.name
					}
				]
			})
		case DELETE_PROJECT:
			return Object.assign({}, state, {
				projectList: state.projectList.filter(project => project.id != action.index)
			})
		case LOAD_PROJECTS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case LOAD_PROJECTS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				projectList: [
					...state.projectList,
                    ...(action.projects.filter(project => !arrayIncludesByID(state.projectList, project.projectId)))
				],
				lastUpdated: action.receivedAt
			})
		case LOAD_PROJECTS_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
                error: action.error,
				lastUpdated: action.receivedAt
			})
		case LOAD_SINGLE_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				projectList: [
					...state.projectList
				]
			})
		default:
			return state;
	}
}

function arrayIncludesByID(array, id){
    for(let data of array){
        if(data.projectId == id){
            return true;
        }
    }
    return false;
}
