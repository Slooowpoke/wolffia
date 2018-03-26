import {combineReducers} from 'redux'
import {authentication} from './login'
import {pages} from './pages'
import {blocks} from './blocks'
import {files} from './files'
import {structure} from './structure'

export const app = combineReducers({ authentication, pages, blocks, files, structure})
