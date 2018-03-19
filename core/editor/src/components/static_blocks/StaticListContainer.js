import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/structure'
import StaticList from '../screens/StaticList'

class StaticListContainer extends Component {

    constructor(props) {
        super(props)

        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)
    }

    render() {
        return (
            <StaticList />
        )
    }
}

function mapStateToProps(state) {
    return state.app
}

export default connect(mapStateToProps)(StaticListContainer)
