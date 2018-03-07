import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import Block from './Block'
import NewBlock from './NewBlock'
import FieldSelector from '../fields/FieldSelector'

class VisibleBlocks extends Component {

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

    createBlock = () =>{
        const { dispatch } = this.props
        dispatch(Actions.createBlockEditor(this.state.selectedType.id, this.props.pageID))
    }

	render() {
        if(!this.props.list){
            return (
                <div>
                    <p>No blocks created yet.</p>
                </div>
            )
        }
		return (
			<div>
                {this.props.list.map((block,index) => {
        			return (<Block key={index} block={block} />	)
        		})}
                {this.props.currentEditorBlock && <NewBlock block={this.props.currentEditorBlock}/>}
                <FieldSelector selectType={this.selectType}/>
                <button onClick={this.createBlock} >Create block</button>
                <button onClick={this.saveBlocks}>Save Blocks</button>
			</div>
		)
	}

    selectType = (value) => {
	    this.setState({selectedType: value})
    }

    saveBlocks = () =>{
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

export default connect(mapStateToProps)(VisibleBlocks)
