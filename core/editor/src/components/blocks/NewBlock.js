import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import * as FieldFactory from '../fields/FieldFactory'

class NewBlock extends Component {

	constructor(props) {
		super(props)
		const {dispatch} = props
		this.boundActionCreators = bindActionCreators(Actions, dispatch)

        let block = this.props.block
        block.data = {}

        block.data = this.generateDataObject(block)

        this.state = {
            block
        }
	}

	generateDataObject(block){
	    let data = {}
        Object.keys(block.structure).map((key,index) => {
            if(block.structure[key].hasOwnProperty('structure')){
                data[key] = {value: [], type: block.structure[key].type, objectToCreate:this.generateDataObject(block.structure[key])}
            }else{
                // TODO add something for default values from structure file :)
                data[key] = {value: '', type: block.structure[key].type}
            }
        })
        return data
    }

    updateBlock = (value,field, key) => {
	    console.log('update block')

        let updatedBlock = this.state.block
        updatedBlock.changed = true
        updatedBlock.data[key].value = value
        updatedBlock.id = undefined

        this.setState({block: updatedBlock})
    }

    saveNewBlock = () => {
        const { dispatch } = this.props
        console.log(this.state.block)
        dispatch(Actions.updateBlock(this.state.block))
    }

	render() {
        return (
            <div>
                <button onClick={this.saveNewBlock}>Save this new block</button>
                {
                    Object.keys(this.state.block.data).map((key) => {
                        return FieldFactory.create(key, this.state.block.data[key], this.updateBlock)
                    })
                }
            </div>
        )
	}


}

export default connect()(NewBlock)
