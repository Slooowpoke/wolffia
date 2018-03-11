import React from 'react'
import PropTypes from 'prop-types'

// Redux based imports
import {Provider} from 'react-redux'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Landing from './screens/Landing'
import Dashboard from './screens/Dashboard'
import PageEditor from './screens/PageEditor'
import Settings from './screens/Settings'

import {ConnectedRouter} from 'react-router-redux'
import AuthenticatedComponent from './signin/AuthenticatedComponent'

const Root = ({store, history}) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/landing" component={Landing}/>
                <Route exact path="/" component={AuthenticatedComponent(Dashboard)}/>
                <Route exact path="/pages/:id" component={AuthenticatedComponent(PageEditor)}/>
                <Route exact path="/settings" component={AuthenticatedComponent(Settings)}/>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root;
