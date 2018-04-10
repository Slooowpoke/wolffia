import React, {Component} from 'react';
import ReactJson from 'react-json-view';
import Header from '../Header';
import AddField from '../structure/AddField';
import FieldSelector from '../structure/FieldSelector';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Card from '../layout/Card';
import PrimaryButton from '../buttons/PrimaryButton'

export const InternalStructure = ({structure, update, deleteField}) => {
    return (
        <ul className="internalstructure">
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

        // Convert structure to array?
    }

    render() {
        const { currentEditorStructure } = this.props;
        return (
            <div className="container-fluid">

                <Header title="Editing Structure "/>
                <div className="row">
                    <div className="col">
                        <Card title={this.props.currentEditorStructure.name}>
                            <PrimaryButton classes='align-right' onClick={this.props.save} text='Save structure'/>
                            <AddField addField={this.props.addField}/>
                            {(this.props.currentEditorStructure.structure !== undefined )
                            && <InternalStructure
                                structure={this.props.currentEditorStructure.structure}
                                update={this.props.updateField}
                                deleteField={this.props.deleteField}/>}

                                </Card>
                    </div>
                </div>
            </div>
        );
    }
}


export default (StructureEditor);
