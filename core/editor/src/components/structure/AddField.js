import React, {Component} from 'react';
import OutlineButton from '../buttons/OutlineButton'

class AddField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFieldType:"",
            fieldName: ""
        }
    }

    onSelectChange(e){
        this.setState({selectedFieldType: e.target.value});
    }

    onNameChange(e){
        this.setState({fieldName: e.target.value});
    }

    addField = () => {
        this.props.addField(this.addFieldToEditorStructure(this.state.fieldName, this.state.selectedFieldType), this.props.updateField, this.props.id);
    }

    addFieldToEditorStructure(name, fieldType){
        let obj = {};
        this.setState({selectedFieldType:"",fieldName:""})
        if(fieldType === 'FieldText'){
            obj[name] = {
                type: 'text'
            };
            return {...obj};
        }else if(fieldType === 'FieldHTML'){
            obj[name] = {
                type: 'html'
            };
            return {...obj};
        }else if(fieldType === 'FieldRepeating'){
            obj[name] = {
                type: 'repeating',
                structure:{}
            };
            return obj;
        }
    }

    render() {
        return (
            <div>
                <hr />
                <select value={this.state.selectedFieldType} onChange={(e) => this.onSelectChange(e)}>
                    <option default>Pick a field</option>
                    <option value="FieldHTML">FieldHTML</option>
                    <option value="FieldText">FieldText</option>
                    <option value="FieldRepeating">FieldRepeating</option>
                </select>
                <input type="text" onChange={(e) => this.onNameChange(e)} />

                <OutlineButton classes='margin-top' onClick={this.addField} text='Add'/>
            </div>
        );
    }
}

export default AddField;