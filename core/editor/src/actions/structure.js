import axios from 'axios/index'
import {push} from 'react-router-redux'
import { createActionTypes, requestCreator } from './utils';

export const
    FETCH_STRUCTURES = 'FETCH_STRUCTURES',
    EDIT_STRUCTURE = 'EDIT_STRUCTURE',
    LOAD_SINGLE_STRUCTURE = 'LOAD_SINGLE_STRUCTURE',
    UPDATE_EDITOR_STRUCTURE = 'UPDATE_EDITOR_STRUCTURE',
    SAVE_EDITOR_STRUCTURE = 'SAVE_EDITOR_STRUCTURE';

export function fetchStructures(){
    return requestCreator(() => fetchStructuresRequest(), createActionTypes(FETCH_STRUCTURES))
}
async function fetchStructuresRequest() {
    const response = await axios.get('http://localhost:3001/api/blocks')
    return response.data
}

export function saveEditorStructure(structure, id){
    return requestCreator(() => saveEditorStructureRequest(structure, id), createActionTypes(SAVE_EDITOR_STRUCTURE))
}
async function saveEditorStructureRequest(structure, id) {
    const response = await axios.post('http://localhost:3001/api/blocks/save/' + id, structure)
    return response.data
}



export function editStructure(index) {
    return (dispatch) => {
        dispatch(push('/structure/' + index))
    }
}


export function loadSingleStructure(index){
    return requestCreator(() => loadSingleStructureRequest(index), createActionTypes(LOAD_SINGLE_STRUCTURE))
}
async function loadSingleStructureRequest(index) {
    const response = await axios.get('http://localhost:3001/api/blocks/' + index)
    return response.data
}

export function updateEditorStructure(newStructure){
    return {
        type: UPDATE_EDITOR_STRUCTURE,
        newStructure
    }
}
