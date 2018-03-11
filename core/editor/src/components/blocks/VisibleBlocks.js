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
                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <span className="box-label">Save page data</span>
                            <button className="btn btn-outline btn-full margin-top" onClick={this.saveBlocks}>Save Blocks</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <span className="box-label">Create a new block</span>
                            <div className="row">
                                <div className="col col-sm-6">
                                    <label>
                                        <span>
                                            Block Type Selector:
                                        </span>
                                        <FieldSelector selectType={this.selectType}/>
                                    </label>
                                </div>
                                <div className="col col-sm-6">
                                    <button className="btn btn-primary align-right" onClick={this.createBlock} >Create block</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.props.currentEditorBlock && <NewBlock block={this.props.currentEditorBlock}/>}
                </div>
                {this.props.list.map((block,index) => {
                    return (<Block key={index} block={block} />	)
                })}
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
