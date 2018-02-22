import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import logo from '../logo.svg';
import '../css/App.css';

class App extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="App">
				<p>{this.props.router.location.pathname}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App)
