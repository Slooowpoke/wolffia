import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import {Link, Route} from 'react-router-dom'

class PageEditor extends Component {
	constructor(props) {
		super(props)

		const {dispatch} = props
		this.boundActionCreators = bindActionCreators(Actions, dispatch)
        console.log(props)

        let page = props.list[this.getPageByID(props.list, props.match.params.id)]

        console.log(props.list)

        this.state = {
            id: page.id,
            title: page.title,
            name: page.name,
            template: page.template
        }
	}

    getPageByID = (array, id) =>{
        for(let i = 0; i < array.length; i++){
            let page = array[i]
            if(page.id == id){
                return i
            }
        }
        return -1
    }

	render() {
		return (
			<div>
				<p>Viewing page: {this.props.match.params.id}</p>
                <input type="text" name="title" value={this.state.title}/>
                <input type="text" name="title" value={this.state.name}/>


                <button onClick={this.save}>Save page meta</button>
			</div>
		)
	}

    save = () => {
        const { dispatch } = this.props
        let meta = {title: this.state.title, name: this.state.name}
        dispatch(Actions.updatePage(meta))
    }

}

function mapStateToProps(state) {
	return state.app.pages
}

export default connect(mapStateToProps)(PageEditor)
