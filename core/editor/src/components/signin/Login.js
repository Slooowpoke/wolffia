import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from './actions'

class Login extends Component {
	constructor(props) {
		super(props);

		const {dispatch} = props;
		this.boundActionCreators = bindActionCreators(Actions, dispatch)
	}

	render() {
		return (
			<div>
				<button onClick={this.login}>Login</button>
			</div>
		)
	}

    login = () => {
        const { dispatch } = this.props
        dispatch(Actions.login())
    }
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Login)
