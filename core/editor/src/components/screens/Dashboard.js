import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import VisiblePages from '../pages/VisiblePages'

class Dashboard extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col col-sm-6">
                        <p>Welcome blah, make something special.</p>
					</div>
				</div>
                <VisiblePages />
			</div>
		)
	}

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Dashboard)
