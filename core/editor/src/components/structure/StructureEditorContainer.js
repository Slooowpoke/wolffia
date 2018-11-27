import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/structure';
import StructureEditor from '../screens/StructureEditor';
import {push} from 'react-router-redux';

class StructureEditorContainer extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = props;
        this.boundActionCreators = bindActionCreators(Actions, dispatch);
        // Fetch all the structures
        dispatch(Actions.loadSingleStructure(props.match.params.id));
    }

    render() {
        if(this.props.currentEditorStructure === undefined) return (<p>Loading..</p>);
        return (
            <StructureEditor
                currentEditorStructure={this.props.currentEditorStructure}
                addField={this.addField}
                updateEditorStructure={this.updateEditorStructure}
                updateField={this.updateField}
                save={this.save}
                deleteField={this.deleteField}
                />
        );
    }

    deleteField = (key) => {
        const { currentEditorStructure } = this.props;
        let newStructure = currentEditorStructure.structure;

        delete newStructure[key];

        this.updateEditorStructure({
            ...currentEditorStructure,
            structure:newStructure,
        });
    }

    updateEditorStructure(newStructure){
        const {dispatch} = this.props;
        dispatch(Actions.updateEditorStructure(newStructure));
    }

    updateField = (key, field) => {
        const { currentEditorStructure } = this.props;
        let newStructure = currentEditorStructure.structure;

        newStructure[key] = field;

        this.updateEditorStructure({
            ...currentEditorStructure,
            structure:newStructure,
        });
    }

    addField = (field) => {
        const { currentEditorStructure } = this.props;

        this.updateEditorStructure({
            ...currentEditorStructure,
            structure:{
                ...currentEditorStructure.structure,
                ...field
            }
        });
    }

    save = () => {
        const {dispatch} = this.props;
        dispatch(Actions.saveEditorStructure(this.props.currentEditorStructure.structure, this.props.match.params.id));
    }

}

function mapStateToProps(state) {
    return state.app.structure;
}

export default connect(mapStateToProps)(StructureEditorContainer);
