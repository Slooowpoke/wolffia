import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import {push} from 'react-router-redux'
import Pages from '../screens/Pages'

class PagesContainer extends Component {
    constructor(props) {
        super(props)

        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)
        dispatch(Actions.loadPages())
    }

    render() {
        return (
            <Pages pages={this.props.list} editPage={this.editPage} createPage={this.createPage}/>
        )
    }

    createPage = (title, name, template) => {
        const {dispatch} = this.props;
        dispatch(Actions.createPage(title, name, template));
    }

    editPage = (id, e) => {
        const {dispatch} = this.props;
        dispatch(Actions.viewPage(id));
    }


}

function mapStateToProps(state) {
    return state.app.pages
}

export default connect(mapStateToProps)(PagesContainer)
