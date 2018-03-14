import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/pages'

import {push} from 'react-router-redux'
import Landing from '../screens/Landing'

class LandingContainer extends Component {
    constructor(props) {
        super(props)

        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)
        this.state = {
            hasContent:false,
            name: "",
        }

    }

    onNameChange = (e) => {
        if(e.target.value !== ""){
            this.setState({hasContent: true, name: e.target.value})
        }else{
            this.setState({hasContent:false})
        }
    }

    render() {
        return (
            <Landing update={this.onNameChange} hasContent={this.state.hasContent}/>
        )
    }


}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(LandingContainer)
