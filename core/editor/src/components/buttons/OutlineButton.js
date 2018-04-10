import React, {Component} from 'react'
import BaseButton from './BaseButton'

class OutlineButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BaseButton {...this.props} classes={this.props.classes + ' btn-outline '} />
        )
    }

}

export default OutlineButton
