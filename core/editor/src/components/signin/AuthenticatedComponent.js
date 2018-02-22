import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from './actions'

import Login from './Login'

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

export default(ChildComponent) => {
	class AuthenticatedComponent extends Component {
		render() {
			if (this.props.app.authentication.token) {
                return <ChildComponent {...this.props}/>
			} else {
				return <Redirect to={{
					pathname: '/landing',
				}}/>
			}

		}
	}
    function mapStateToProps(state) {
        return state;
    }
    return connect(mapStateToProps)(AuthenticatedComponent)
}
