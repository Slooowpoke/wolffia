 import axios from 'axios'
import {push} from 'react-router-redux'

export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

export const LOAD_PROJECTS = "LOAD_PROJECTS";
export const LOAD_PROJECTS_REQUEST = "LOAD_PROJECTS_REQUEST";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";
export const LOAD_PROJECTS_FAILURE = "LOAD_PROJECTS_FAILURE";

export const VIEW_PROJECT = "VIEW_PROJECT";
export const LOAD_SINGLE_PROJECT_SUCCESS = "LOAD_SINGLE_PROJECT_SUCCESS";

let totalProjects = 0
export function addProject(name) {
	return {
		type: ADD_PROJECT,
		name,
		index: totalProjects++
	}
}

export function removeProject(index) {
	return {type: DELETE_PROJECT, index}
}

export function loadProjectsRequest(){
    return {
        type: LOAD_PROJECTS_REQUEST
    }
}

export function loadProjectsSuccess(data){
    return {
        type: LOAD_PROJECTS_SUCCESS,
        projects: data,
        receivedAt: Date.now()
    }
}

export function loadProjectsFailure(data){
    return {
        type: LOAD_PROJECTS_FAILURE,
        error: data,
        receivedAt: Date.now()
    }
}

export function loadProjects(){
    const request = axios.get('https://iicog.azurewebsites.net/api/Main/1/myprojects')
    // const request = axios.get('projects.json')

    return (dispatch) => {
        dispatch(loadProjectsRequest());
        request.then(({data}) => {
            if(data.length > 0){
                dispatch(loadProjectsSuccess(data))
            }else{
                throw('No projects available')
            }

        }).catch(({error}) => {
            dispatch(loadProjectsFailure(error))
        })
    };
}

export function viewProject(id){
    return (dispatch) => {
        dispatch(loadProject(id));
    }
}

export function loadProject(id){
    // const request = axios.get('http://liberation-redux.local/loadProject.php?id=' + id)
    const request = axios.get('https://iicog.azurewebsites.net/api/Main/projects/' + id)

    return (dispatch) => {
        request.then(({data}) => {
            dispatch(loadSingleProjectSuccess(data))
            dispatch(push('/projects/' + id))
        }).catch(({error}) => {
            dispatch(loadProjectsFailure(error))
        })
    };
}

export function loadSingleProjectSuccess(data){
    return {
        type: LOAD_SINGLE_PROJECT_SUCCESS,
        project: data
    }
}
