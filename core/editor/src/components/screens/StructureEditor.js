import React, {Component} from 'react';
import ReactJson from 'react-json-view';
import Header from '../Header';
import AddField from '../structure/AddField';
import FieldSelector from '../structure/FieldSelector';

export const InternalStructure = ({structure, update, deleteField}) => {
    return (
        <ul>
            {
                Object.keys(structure).map((key) => {
                    return (<FieldSelector key={key} id={key} field={structure[key]} update={update} deleteField={deleteField}/>);
                })
            }
        </ul>
    );
};

class StructureEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentEditorStructure } = this.props;
        return (
            <div className="container-fluid">
                <Header title="Editing Structure "/>
                <button onClick={this.props.save}>Save structure</button>
                <AddField addField={this.props.addField}/>
                {(this.props.currentEditorStructure.structure !== undefined ) 
                && <InternalStructure
                    structure={this.props.currentEditorStructure.structure}
                    update={this.props.updateField}
                    deleteField={this.props.deleteField}/>}
            </div>
        );
    }
}
export default (StructureEditor);
