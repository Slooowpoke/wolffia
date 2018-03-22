import React, {Component} from 'react';

import Navigation from '../Navigation'
import Header from '../Header'

class Settings extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container-fluid">
                <Header title="Settings"/>
            </div>
        )
    }

}
export default Settings
