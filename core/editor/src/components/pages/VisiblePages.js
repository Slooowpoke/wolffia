import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

class VisiblePages extends Component {

	constructor(props) {
		super(props)
		const {dispatch} = props
		this.boundActionCreators = bindActionCreators(Actions, dispatch)

        dispatch(Actions.loadPages())
	}

	render() {
        if(!this.props.list){
            return (
                <div>
                    <p>No pages created yet.</p>
                </div>
            )
        }
		return (
			<div>
                {this.props.list.map((page,index) => {
        			return (
                        <div key={index}>
                            <p>{page.name} - {page.title}</p>
                            <button onClick={(e) => this.editPage(page.index, e)}>Edit page</button>
                        </div>
        			)
        		})}
			</div>
		)
	}

    editPage = (id, e) => {
    	const {dispatch} = this.props
        dispatch(Actions.viewPage(id))
    }
}

function mapStateToProps(state) {
	return state.app.pages
}

export default connect(mapStateToProps)(VisiblePages)
