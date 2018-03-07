import React, {Component} from 'react'
import {connect} from 'react-redux'

import Login from '../signin/index'

class Landing extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
                <Login />
			</div>
		)
	}


}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(Landing)
