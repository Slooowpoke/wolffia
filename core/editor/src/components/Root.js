import React from 'react'
import PropTypes from 'prop-types'

// Redux based imports
import {Provider} from 'react-redux'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import PagesContainer from './containers/PagesContainer'
import PageEditorContainer from './containers/PageEditorContainer'
import StructuresListContainer from './structure/StructuresListContainer'
import SettingsContainer from './settings/SettingsContainer'
import StaticListContainer from './static_blocks/StaticListContainer'


import {ConnectedRouter} from 'react-router-redux'
import AuthenticatedComponent from './signin/AuthenticatedComponent'

const Root = ({store, history}) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={PagesContainer}/>

                <Route exact path="/pages/:id" component={AuthenticatedComponent(PageEditorContainer)}/>
                <Route exact path="/settings" component={AuthenticatedComponent(SettingsContainer)}/>
                <Route exact path="/structure" component={AuthenticatedComponent(StructuresListContainer)}/>
                <Route exact path="/static" component={AuthenticatedComponent(StaticListContainer)}/>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root;
