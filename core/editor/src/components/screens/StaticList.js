import React, {Component} from 'react';

import Navigation from '../Navigation'
import Header from '../Header'

const StaticListItem = ({block}) =>{
    return (
        <div className="row">
            <div className="col">
                <div className="block-outline">
                    <div className="row">
                        <div className="col col-sm-6">
                            <p>{block.name}</p>
                        </div>
                        <div className="col col-sm-6">
                            <button  className="btn btn-primary align-right">TODO EDIT STRUCTURE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class StaticList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container-fluid">
                <Header title="Block Structures" />

                {this.listStructures()}
            </div>
        )
    }

    listStructures(){
        if(this.props.listOfBlocks === undefined){
            return (
                <p>WILL STATIC CONTENT EVER EXIST LIKE THIS? IS IT NOT REALLY BAD?</p>
            )
        }
        return(
            this.props.listOfBlocks.map((block,index) => {
                return (
                    <StaticListItem key={index} block={block} index={index}  />
                )
            })
        )
    }

}

export default (StaticList)
