import axios from 'axios/index'
import { createActionTypes, requestCreator } from './utils';

export const FETCH_STRUCTURES = 'FETCH_STRUCTURES'

export function fetchStructures(){
    return requestCreator(() => fetchStructuresRequest(), createActionTypes(FETCH_STRUCTURES))
}
async function fetchStructuresRequest() {
    const response = await axios.get('http://localhost:3001/api/blocks')
    return response.data
}
