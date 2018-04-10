import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import * as FieldFactory from '../fields/FieldFactory'
import Card from '../layout/Card'

class Block extends Component {

	constructor(props) {
		super(props)
		const {dispatch} = props
		this.boundActionCreators = bindActionCreators(Actions, dispatch)

		let block = this.props.block

		Object.keys(block.data).map((key) => {
			Object.keys(block.structure).map((structureKey) => {
				if (key === structureKey) {
					block.data[key].type = this.props.block.structure[structureKey].type
				}
			})
		})

		this.state = {
			block,
			totalChanges: 0
		}
	}

	updateBlock = (updateValue, field, key) => {
		const {dispatch} = this.props
        let updatedBlock = this.state.block
        updatedBlock.changed = true
        updatedBlock.data[key].value = updateValue
		this.setState({block: updatedBlock})

		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			dispatch(Actions.updateBlock(updatedBlock))
		}, 500)
	}

	deleteThisBlock = () => {
		const {dispatch} = this.props
		dispatch(Actions.deleteBlock(this.state.block.page, this.state.block.id))
	}

	render() {
		return (
		<div className="row">
			<div className="col">
                <Card title={this.state.block.name}>
                    {
                        Object.keys(this.state.block.data).map((key) => {
                            return FieldFactory.create(key, this.state.block.data[key], this.updateBlock)
                        })
                    }
                    <button className="btn btn-primary btn-full" onClick={this.deleteThisBlock}>Delete Block</button>
				</Card>
			</div>
		</div>)
	}

}

export default connect()(Block)
