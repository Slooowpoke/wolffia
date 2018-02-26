import { SAVE_USER } from '../actions/login'
const initialState = {
    token:'',
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER:
            return Object.assign({}, state, {
                token:action.token
            })
        default:
			return state
	}
}
