import {combineReducers} from 'redux'
import {authentication} from '../reducers/login'
import {pages} from '../reducers/pages'
import {blocks} from '../reducers/blocks'
import {files} from '../reducers/files'
import {structure} from '../reducers/structure'
export const app = combineReducers({ authentication, pages, blocks, files, structure})
