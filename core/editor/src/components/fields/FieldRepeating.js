import React, {Component} from 'react';
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

	update = (e) => {
		let field = this.state.field
		field.value = e.target.value
		this.setState({field: field})
		this.props.update(e, field, this.state.key)
	}

	render() {
		return (<div>
			{
				this.props.field.value.map((object, index) => {
					return Object.keys(object).map((key) => {
						return FieldFactory.create(this.state.key + '.value' + '[' + index + ']' + '.' +  key, object[key], this.props.update)
					})
				})
			}
		</div>)
	}

}

export default connect()(FieldRepeating)
