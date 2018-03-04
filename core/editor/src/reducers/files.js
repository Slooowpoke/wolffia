import {
    UPLOAD_FILE_SUCCESS
} from '../actions/files'

const initialState = {
    currentlyUploading:false,
    file: null,
}

export function files(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                file:action.file,
            }
        default:
            return state
    }
}
