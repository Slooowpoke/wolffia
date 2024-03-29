import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import Field from './Field'

class FieldHTML extends Field {

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
                <label>
                    <span>
                        {this.state.key}
                    </span>
                    <textarea
                        key={this.props.field.id}
                        name={this.props.field.name}
                        value={this.props.field.value}
                        onChange={(e) => this.update(e)}/>
                    <div className="preview"
                         dangerouslySetInnerHTML={{__html: this.props.field.value}}>
                    </div>
                </label>
            </div>
        )
	}
}

export default connect()(FieldHTML)
