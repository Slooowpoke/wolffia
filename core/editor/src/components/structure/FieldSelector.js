import React, {Component} from 'react';
import AddField  from './AddField';
import { InternalStructure } from '../screens/StructureEditor';
import Ionicon from 'react-ionicons'


const FieldListItem = ({deleteField, id, type}) => {
    return (
        <li className="field">
            <Ionicon className="delete-icon" color="#ff5a5f" icon="ios-close-circle" fontSize="21px"
                     onClick={() => deleteField(id)} />
            {type} - {id}</li>
    );
};



class FieldSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFieldType:'',
            fieldName:''
        }
    }

    addField = (field,update, id) => {
        let parentField = this.props.field;
        parentField.structure = {
            ...parentField.structure,
            ...field
        };
        update(id, parentField);
    };

    updateField = (key, field) => {
        let newStructure = this.props.field;

        newStructure.structure[key] = field;

        this.props.update(this.props.id, newStructure);
    }

    deleteField = (key) => {
        let newStructure = this.props.field;

        newStructure.structure[key] = null;
        delete newStructure.structure[key];
        this.props.update(this.props.id, newStructure);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let field = this.props.field;

        this.props.update(this.props.id, field);
    };

    render(){
        if(this.props.field.type === 'repeating'){
            return (
                <section className="field">

                    <p>
                        <Ionicon className="delete-icon" color="#ff5a5f" icon="ios-close-circle" fontSize="21px" onClick={() => this.props.deleteField(this.props.id)} />
                        Repeating - {this.props.id}
                        </p>
                    <AddField addField={this.addField} updateField={this.props.update} id={this.props.id}/>
                    <InternalStructure
                        structure={this.props.field.structure}
                        update={this.updateField}
                        deleteField={this.deleteField}
                    />
                </section>
            );
        }else{
            return (
                <FieldListItem type={this.props.field.type} id={this.props.id} deleteField={this.props.deleteField}/>
            )
        }
    }
}

export default FieldSelector;