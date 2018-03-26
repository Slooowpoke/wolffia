import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/structure'
import StructuresList from '../screens/StructuresList'
import {push} from 'react-router-redux'

class StructuresListContainer extends Component {

    constructor(props) {
        super(props)

        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)
        // Fetch all the structures
        dispatch(Actions.fetchStructures())
    }

    render() {
        return (
            <StructuresList listOfStructures={this.props.listOfStructures}/>
        )
    }
}

function mapStateToProps(state) {
    return state.app.structure
}

export default connect(mapStateToProps)(StructuresListContainer)
