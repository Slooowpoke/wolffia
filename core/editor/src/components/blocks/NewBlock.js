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

        Object.keys(block.structure).map((key,index) => {
            block.data[key] = {value: '', type: block.structure[key].type}
        })

        this.state = {
            block
        }
	}

    updateBlock = (e,field, name) => {
        const { dispatch } = this.props
        let block = this.state.block


        block.data[name].value = e.target.value
        block.changed = true
        this.setState({block: block})
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
	    console.log(field)
        console.log(value)
        console.log(key)
        let updatedBlock = this.state.block
        updatedBlock.changed = true
        updatedBlock.data[key].value = value

        updatedBlock.id = undefined
        console.log(updatedBlock)
        this.setState({block: updatedBlock})
    }

    getDescendantProp(obj, desc) {
        var arr = desc.split('.')
        while (arr.length && (obj = obj[arr.shift()]))
        ;
        return obj
    }

    saveNewBlock = () => {
        const { dispatch } = this.props
        dispatch(Actions.updateBlock(this.state.block))
    }

	render() {
        return (
            <div>
                <button onClick={this.saveNewBlock}>Save this new block</button>
                {Object.keys(this.state.block.data).map((key) => {
                    return FieldFactory.create(key, this.state.block.data[key], this.updateBlock)
                })}
            </div>
        )
	}


}

export default connect()(NewBlock)
