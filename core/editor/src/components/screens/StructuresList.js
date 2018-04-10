import React, {Component} from 'react';
import Header from '../Header';
import Card from '../layout/Card'
import PrimaryButton from '../buttons/PrimaryButton'

const StructureListItem = ({block, index, edit}) => {
    return (
        <li>
            <p>{block.name}</p>
            <PrimaryButton classes='align-right' onClick={() => edit(block.id)} text='Edit Structure'/>
        </li>
    );
};

class StructuresList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <Header title="Block Structures"/>

                {this.listStructures()}
            </div>
        )
    }

    listStructures() {
        if (this.props.listOfStructures === undefined) {
            return (
                <div className="row">
                    <div className="col">
                        <Card>
                            <p>No block structures created yet.</p>
                        </Card>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col">
                    <Card title='Structures available'>
                        <ul className='flex-list'>
                            {this.props.listOfStructures.map((block, index) => {
                                return (
                                    <StructureListItem key={index} block={block} index={index} edit={this.props.edit}/>
                                )
                            })}
                        </ul>
                    </Card>
                </div>
            </div>
        )
    }

}

export default (StructuresList)
