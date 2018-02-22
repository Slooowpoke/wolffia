import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from './actions'

class OAuth extends Component{

    constructor(props){
        super(props)

        const { dispatch } = props;
        this.boundActionCreators = bindActionCreators(Actions, dispatch)

        let callbackToken = window.location.search.substr(1);

        if(callbackToken){
            callbackToken = callbackToken.split("=")[1]
        }else{
            callbackToken =  "";
        }

        this.state = {
            callbackToken: callbackToken
        }

        if(this.state.callbackToken !== ""){
            dispatch(Actions.fetchAccessToken(this.state.callbackToken))
        }
    }

    render(){
        // Determine how to return from here
        const { token } = this.props
        // redirect them to callback
        return(
            <div>

            </div>
        )
    }

}
function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(OAuth)
