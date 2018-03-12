import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import VisiblePages from '../pages/VisiblePages'
import {push} from 'react-router-redux'
import Navigation from '../Navigation'

class Dashboard extends Component {

	constructor(props) {
		super(props)
	}


	render() {
		return(
			<div className="container">
				<div className="row">
                    <div className="col">
                        <h1>Welcome Name.</h1>
						<p className="small">Go make something special.</p>
					</div>
				</div>
                <Navigation />

                <VisiblePages />
			</div>
		)
	}

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Dashboard)
