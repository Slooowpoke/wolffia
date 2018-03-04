import axios from 'axios/index'

export const
    UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST',
    UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
    UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'

export function uploadFile(file, name){
    return async (dispatch) => {
        try {
            const response = await dispatch(uploadFileRequest(file, name))
            dispatch(uploadFileSuccess(response))
        } catch (e) {
            dispatch(uploadFileFailure(e))
        }
    }
}

async function uploadFileRequest(file, name){
    let payload = new FormData()
    payload.append('file', file)
    payload.append('name', name)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const response = await axios.post('http://localhost:3001/api/upload',payload, config)
    console.log(response)
    return response
}

function uploadFileSuccess(name){return {type:UPLOAD_FILE_SUCCESS, name}}
function uploadFileFailure(error){return {type: UPLOAD_FILE_FAILURE, error}}