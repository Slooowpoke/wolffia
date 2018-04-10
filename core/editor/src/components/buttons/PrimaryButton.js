import React, {Component} from 'react'
import BaseButton from './BaseButton'

class PrimaryButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BaseButton {...this.props} classes={this.props.classes + ' btn-primary '} />
        )
    }

}

export default PrimaryButton
