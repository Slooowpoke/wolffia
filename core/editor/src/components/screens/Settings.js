import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import VisiblePages from '../pages/VisiblePages'

class Settings extends Component {

    constructor(props) {
        super(props)
    }

    navigate= (e, page) => {
        const { dispatch } = this.props
        dispatch(push(page))
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Settings</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/')}>Pages</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/static')}>Static Content</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline btn-full" onClick={(e) => this.navigate(e, '/settings')}>Settings</button>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Settings)
