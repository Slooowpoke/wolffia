import React, {Component} from 'react'

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1 className="h1">{this.props.title}</h1>
        )
    }

}

export default Header
