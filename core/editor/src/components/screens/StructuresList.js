import React, {Component} from 'react'

import ReactJson from 'react-json-view'

import Header from '../Header'

const StructureListItem = ({block, index}) => {
    return (
        <div className="row">
            <div className="col col-sm-6">
                <p>{block.name}</p>
            </div>
            <div className="col col-sm-6">
                <button className="btn btn-primary align-right">TODO EDIT STRUCTURE</button>
            </div>
        </div>
    )
}

class StructuresList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <Header title="Block Structures"/>

                {/*<div className="row">*/}
                {/*<div className="col">*/}
                {/*<div className="block-outline">*/}
                {/*<ReactJson className="margin-top" src={this.state.json} />*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}

                {this.listStructures()}
            </div>
        )
    }

    listStructures() {
        if (this.props.listOfStructures === undefined) {
            return (
                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <p>No block structures created yet.</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col">
                    <div className="block-outline">
                        {this.props.listOfStructures.map((block, index) => {
                            return (

                                <StructureListItem key={index} block={block} index={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default (StructuresList)
