import {combineReducers} from 'redux'
import {projects} from '../reducers/projects'
import {authentication} from '../reducers/login'
import {pages} from '../reducers/pages'
export const app = combineReducers({projects, authentication, pages})
