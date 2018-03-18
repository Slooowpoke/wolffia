import axios from 'axios/index'
import {deletePageFailure, deletePageSuccess} from './pages'

export const FETCH_STRUCTURES_REQUEST = 'FETCH_STRUCTURES_REQUEST',
    FETCH_STRUCTURES_SUCCESS = 'FETCH_STRUCTURES_SUCCESS',
    FETCH_STRUCTURES_FAILURE = 'FETCH_STRUCTURES_FAILURE'

export function fetchStructures(){
    const request = axios.get('http://localhost:3001/api/blocks')
    return (dispatch) => {

        dispatch({type: FETCH_STRUCTURES_REQUEST})
        request.then(({data}) => {
            if(data != undefined){
                dispatch(fetchStructuresSuccess(data))
            }else{
                throw('No pages available')
            }

        }).catch(({error}) => {
            dispatch(fetchStructuresFailure(error))
        })
    }
}

function fetchStructuresSuccess(listOfStructures){
    return {type: FETCH_STRUCTURES_SUCCESS, listOfStructures}
}
function fetchStructuresFailure(error){
    return {type: FETCH_STRUCTURES_FAILURE, error}
}