import React, {Component} from 'react'

import VisiblePages from '../pages/VisiblePages'
import Header from '../Header'
import NewPage from '../pages/NewPage';

class Pages extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <Header title="Pages"/>
                <NewPage createPage={this.props.createPage}/>
                <VisiblePages pages={this.props.pages} edit={this.props.editPage}/>
            </div>
        )
    }

}

export default (Pages)
