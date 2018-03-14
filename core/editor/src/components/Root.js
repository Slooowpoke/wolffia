import React from 'react'
import PropTypes from 'prop-types'

// Redux based imports
import {Provider} from 'react-redux'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import LandingContainer from './containers/LandingContainer'
import PagesContainer from './containers/PagesContainer'
import Dashboard from './screens/Dashboard'
import PageEditor from './screens/PageEditor'
import Settings from './screens/Settings'
import StructureEditor from './screens/StructureEditor'
import StaticEditor from './screens/StaticEditor'

import {ConnectedRouter} from 'react-router-redux'
import AuthenticatedComponent from './signin/AuthenticatedComponent'

const Root = ({store, history}) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={PagesContainer}/>

                <Route exact path="/pages/:id" component={AuthenticatedComponent(PageEditor)}/>
                <Route exact path="/settings" component={AuthenticatedComponent(Settings)}/>
                <Route exact path="/structure" component={AuthenticatedComponent(StructureEditor)}/>
                <Route exact path="/static" component={AuthenticatedComponent(StaticEditor)}/>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root;
