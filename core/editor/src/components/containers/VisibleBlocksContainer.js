import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'

import VisibleBlocks from '../blocks/VisibleBlocks'

class VisibleBlocksContainer extends Component {

    constructor(props) {
        super(props)
        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)

        this.state = {
            selectedType:{name:'heading', id:1},
        }
        dispatch(Actions.loadBlocks(props.pageID))
        dispatch(Actions.fetchBlocksList())
    }

    create = () =>{
        const { dispatch } = this.props
        dispatch(Actions.createBlockEditor(this.state.selectedType.id, this.props.pageID))
    }

    render() {
        return(
            <VisibleBlocks
                save={this.save}
                list={this.props.list}
                create={this.create}
                selectType={this.selectType}
                currentEditorBlock={this.props.currentEditorBlock}
            />
        )
    }

    selectType = (value) => {
        this.setState({selectedType: value})
    }

    save = () =>{
        const { dispatch, list } = this.props
        let blocks = []
        for(let block of list){
            if(block.changed){
                blocks.push(block)
            }
        }

        dispatch(Actions.saveBlocks(blocks, this.props.pageID))
    }

}

function mapStateToProps(state) {
    return state.app.blocks
}

export default connect(mapStateToProps)(VisibleBlocksContainer)
