import { AUTH_SUCCESS } from './actions'
const initialState = {
    token:'',
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                token:action.token
            })
        default:
			return state;
	}
}
