import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import Field from './Field'

class FieldText extends Field {

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
        this.setState({field:field})
        this.props.update(field.value, field, this.state.key, this.props.index)
    }

	render() {
        return (
            <div className="col">
                <input key={this.state.key}
                       type='text'
                       name={this.props.field.name}
                       value={this.props.field.value}
                       onChange={(e) => this.update(e)}/>
            </div>
        )
	}
}

export default connect()(FieldText)
