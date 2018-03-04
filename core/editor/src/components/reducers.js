import {combineReducers} from 'redux'
import {projects} from '../reducers/projects'
import {authentication} from '../reducers/login'
import {pages} from '../reducers/pages'
import {blocks} from '../reducers/blocks'
import {files} from '../reducers/files'
export const app = combineReducers({projects, authentication, pages, blocks, files})
