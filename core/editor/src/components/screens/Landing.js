import React, {Component} from 'react'
import {connect} from 'react-redux'

import Login from '../signin/index'

class Landing extends Component {

	constructor(props) {
		super(props)
		console.log("landing")
		console.log(props)
	}

	render() {
		return (
			<div className="central">
                <h1>Welcome..</h1>
                <input autoFocus="true"
                       type="text"
                       name="username"
                       className="outline font-xxl fadein margin-bottom"
                       autocomplete="off"
                       placeholder=""
                       onChange={(e) => this.props.update(e)}/>
                {this.props.hasContent && <button className="btn btn-outline fadein ">Continue</button> }
			</div>
		)
	}
}

export default Landing
