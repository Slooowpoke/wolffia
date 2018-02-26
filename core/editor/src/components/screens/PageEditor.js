import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import {Link, Route} from 'react-router-dom'
import VisibleBlocks from '../blocks/VisibleBlocks'

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
                <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>
                <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
                <input type="text" name="name" value={this.state.template} onChange={this.onChangeTemplate}/>
                <button onClick={this.save}>Save page meta</button>

                <VisibleBlocks pageID= {this.state.id}/>
			</div>
		)
	}

    onChangeTemplate = (e) =>{
        this.setState({template: e.target.value})
    }

    onChangeTitle = (e) =>{
        this.setState({title: e.target.value})
    }

    onChangeName = (e) =>{
        this.setState({name: e.target.value})
    }

    save = () => {
        const { dispatch } = this.props
        let meta = {title: this.state.title, name: this.state.name,template: this.state.template, id: this.state.id}
        dispatch(Actions.updatePage(meta))
    }

}

function mapStateToProps(state) {
	return state.app.pages
}

export default connect(mapStateToProps)(PageEditor)
