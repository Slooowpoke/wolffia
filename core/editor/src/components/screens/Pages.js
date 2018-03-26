import React, {Component} from 'react'

import VisiblePages from '../pages/VisiblePages'
import Header from '../Header'

class Pages extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                <Header title="Pages"/>
                <VisiblePages pages={this.props.pages} edit={this.props.editPage}/>
            </div>
        )
    }

}

export default (Pages)
