import React, {Component} from 'react'

class BaseButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className={'btn ' + this.props.classes} onClick={this.props.onClick}>{this.props.text}</button>
        )
    }

}

export default BaseButton
