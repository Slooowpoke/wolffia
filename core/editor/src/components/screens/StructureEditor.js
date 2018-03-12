import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import VisiblePages from '../pages/VisiblePages'
import ReactJson from 'react-json-view'

import Navigation from '../Navigation'

class StructureEditor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            json: {
                array: [1, 2, 3],
                bool: true,
                object: {
                    foo: 'bar'
                },
            }
        }
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Structure</h1>
                    </div>
                </div>
                <Navigation />

                <div className="row">
                    <div className="col">

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <ReactJson className="margin-top" src={this.state.json} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(StructureEditor)
