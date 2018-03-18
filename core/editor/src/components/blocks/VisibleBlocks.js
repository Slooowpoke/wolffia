import React, {Component} from 'react';
import Block from './Block'
import NewBlock from './NewBlock'
import FieldSelector from '../fields/FieldSelector'

class VisibleBlocks extends Component {

	constructor(props) {
		super(props)
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
                            <button className="btn btn-outline btn-full margin-top" onClick={this.props.save}>Save Blocks</button>
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
                                        <FieldSelector selectType={this.props.selectType}/>
                                    </label>
                                </div>
                                <div className="col col-sm-6">
                                    <button className="btn btn-primary align-right" onClick={this.props.create} >Create block</button>
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

}

export default (VisibleBlocks)
