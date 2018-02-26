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
        block.id = undefined

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
