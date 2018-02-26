import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './css/App.css'

// Redux based imports
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {app} from './components/reducers'
import { combineReducers } from 'redux'

import Root from './components/Root'

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// TODO Option to hydrate the state from server HERE

let store = createStore(combineReducers({
	app,
	router: routerReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk, routerMiddleware(history)))

const unsubscribe = store.subscribe(() => console.log(store.getState()))


ReactDOM.render(
	<Root store={store} history={history}/>, document.getElementById('root'))

registerServiceWorker()
