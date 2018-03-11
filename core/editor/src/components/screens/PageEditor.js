import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import {Link, Route} from 'react-router-dom'
import VisibleBlocks from '../blocks/VisibleBlocks'
import {push} from 'react-router-redux'

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

            if(page.id === parseInt(id)){
                return i
            }
        }
        return -1
    }

	render() {
		return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Editing page: {this.state.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/')}>Pages</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/static')}>Static Content</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/settings')}>Settings</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <span className="box-label">Page Meta</span>
                            <div className="row">
                                <div className="col col-sm-4">
                                    <label>
                                        <span>
                                        Page Title:
                                        </span>
                                        <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>
                                    </label>
                                </div>
                                <div className="col col-sm-4">
                                    <label>
                            <span>
                                Page Name:
                            </span>
                                        <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
                                    </label>
                                </div>
                                <div className="col col-sm-4">
                                    <label>
                            <span>
                              Page Template:
                            </span>
                                        <input type="text" name="name" value={this.state.template} onChange={this.onChangeTemplate}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-outline align-right margin-top" onClick={this.save}>Save page</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <VisibleBlocks pageID= {this.state.id}/>

			</div>
		)
	}

    navigate= (e,page) => {
        const { dispatch } = this.props
        dispatch(push(page))
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
