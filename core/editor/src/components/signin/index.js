import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/login'

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		}

		const {dispatch} = props;
		this.boundActionCreators = bindActionCreators(Actions, dispatch)

        dispatch(Actions.login("test","test"))
	}

	render() {
		return (
			<div>
				<label>
					Username:
					<input type="text" name="name" value={this.state.username} onChange={this.usernameChange}/>
				</label>
				<label>
					Password:
					<input type="password" name="password" value={this.state.password} onChange={this.passwordChange}/>
				</label>
				<button onClick={this.login}>Login</button>
			</div>
		)
	}

	usernameChange = (event) => {
		this.setState({username: event.target.value})
	}

	passwordChange = (event) => {
		this.setState({password: event.target.value})
	}

	login = () => {
		const {dispatch} = this.props
		dispatch(Actions.login(this.state.username, this.state.password))
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Login)
