import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import Field from './Field'
import * as FieldFactory from '../fields/FieldFactory'

class FieldRepeating extends Field {

	constructor(props) {
		super(props)
		const {dispatch} = props
		this.boundActionCreators = bindActionCreators(Actions, dispatch)

		this.state = {
			field: props.field,
			key: props.name
		}
	}

	update = (value, updateField, key, index) => {
        console.log('update block')
        console.log(updateField)
        console.log(value)
        console.log(key)

		let field = this.state.field

        field.value[index][key].value = value
		this.setState({field: field})
		this.props.update(field.value, field, this.state.key, this.props.index)
	}

    deleteRow(e, deletionIndex){
		let updatedField = this.state.field
		updatedField.value = updatedField.value.filter((object, index) => {
			if(index != deletionIndex){
				return object
			}
		})
		this.setState({field:updatedField})
		this.props.update(updatedField.value, updatedField, this.state.key, this.props.index)
	}

	render() {
		if(this.props.field.value.length === 0){
			return (
                <div className="col">
					<p>No rows added yet, trying adding some.</p>
                    <button className="btn btn-primary align-right" onClick={this.addRow}>Add row</button>
                    <br /><br />
				</div>

			)
		}else{
            return (
            	<div className="col" key={this.state.key}>
                    <button className="btn btn-primary align-right" onClick={this.addRow}>Add row</button>
                    <br /><br />
                {
                    this.state.field.value.map((object, index) => {
                    	return (
                    		<div className="repeater-row">
								{Object.keys(object).map((key) => {
                                    return FieldFactory.create(key, object[key], this.update, index)
                                })}
                                <button className="btn btn-outline" onClick={(e) => this.deleteRow(e, index)}>Delete Row</button>
							</div>
						)
                    })
                }
            	</div>
			)
		}
	}

	addRow = () =>{
        let field = this.state.field
		console.log(field)
        field.value.push({...field.objectToCreate})
        console.log(field)
        this.setState({field: field})
        this.props.update(field.value, field, this.state.key, this.props.index)
    }
}

export default connect()(FieldRepeating)
