import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import * as FileActions from '../../actions/files'
import Field from './Field'

class FieldImage extends Field {

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
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        const {dispatch} = this.props


        reader.onloadend = () => {
            let field = this.state.field
            this.setState({
                file: file,
                base64Preview: reader.result,
                field:field
            })

            let extension = file.name.split('.').pop()
            let newFilename = 'test' + '.' + extension
            dispatch(FileActions.uploadFile(file, newFilename))
            field.value = '/uploads/' + newFilename
            this.props.update(field.value, field, this.state.key, this.props.index)
        }
        reader.readAsDataURL(file)
    }

	render() {
	    if(this.state.field.value === undefined){
	        return (
                <input
                    key={this.props.field.id}
                    name={this.props.field.name}
                    type='file'
                    key={this.props.field.name}
                    label='Upload'
                    accept={this.props.types}
                    ref={(ref) => this.fileUpload = ref}
                    onChange={this.update}/>
            )
        }
        return (
            <div>
                <img src={'http://localhost:3001/' + this.state.field.value} className='aspect-ratio'/>
                <p>Change image</p>
                <input
                    key={this.props.field.id}
                    name={this.props.field.name}
                    type='file'
                    key={this.props.field.name}
                    label='Upload'
                    accept={this.props.types}
                    ref={(ref) => this.fileUpload = ref}
                    onChange={this.update}/>
            </div>
        )
	}
}

export default connect()(FieldImage)
