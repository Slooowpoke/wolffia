import React from 'react'

import { Provider } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import PagesContainer from './containers/PagesContainer'
import PageEditorContainer from './containers/PageEditorContainer'
import StructuresListContainer from './structure/StructuresListContainer'
import SettingsContainer from './settings/SettingsContainer'

import {ConnectedRouter} from 'react-router-redux'
import AuthenticatedComponent from './signin/AuthenticatedComponent'

const Root = ({store, history}) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div className="flex">
				<div className="navigation">
                    <Link to="/" className="nav-link"><p><button className="btn btn-outline btn-full">Pages</button></p></Link>
                    <Link to="/structure" className="nav-link"><p><button className="btn btn-outline btn-full">Structure</button></p></Link>
                    <Link to="/settings" className="nav-link"><p><button className="btn btn-outline btn-full">Settings</button></p></Link>
				</div>
				<div className="wolffia-editor">
					<Route exact path="/" component={PagesContainer}/>
					<Route exact path="/pages/:id" component={AuthenticatedComponent(PageEditorContainer)}/>
					<Route exact path="/settings" component={AuthenticatedComponent(SettingsContainer)}/>
					<Route exact path="/structure" component={AuthenticatedComponent(StructuresListContainer)}/>
				</div>
			</div>
		</ConnectedRouter>
	</Provider>
)

export default Root;
