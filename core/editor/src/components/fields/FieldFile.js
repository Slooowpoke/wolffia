import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import Field from './Field'

class FieldFile extends Field {

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
		return (
            <div className="col">
				<input
					key={this.props.field.name}
					name={this.props.field.name}
					type='file'
					label='Upload'
					accept={this.props.types}
					buttonAfter={this.update}
					ref={(ref) => this.fileUpload = ref}/>
			</div>
		)
	}
}

export default connect()(FieldHTML)
