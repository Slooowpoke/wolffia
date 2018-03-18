import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import PageEditor from '../screens/PageEditor'
import {push} from 'react-router-redux'

class PageEditorContainer extends Component {

    constructor(props) {
        super(props)

        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)

        dispatch(Actions.getPageByID(props.match.params.id))
    }

    render() {
        let props = this.props
        if(props.meta == undefined){
            return (
                <p>Page loading...</p>
            )
        }

        return (
            <PageEditor
                save={this.save}
                onChangeTitle={this.onChangeTitle}
                onChangeName={this.onChangeName}
                onChangeTemplate={this.onChangeTemplate}
                title={this.props.meta.title}
                name={this.props.meta.name}
                template={this.props.meta.template}
                id={this.props.meta.id}
            />
        )
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
    return state.app.pages.currentEditorPage
}

export default connect(mapStateToProps)(PageEditorContainer)
