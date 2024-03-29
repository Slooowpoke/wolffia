import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

class BlockSelector extends Component{

    constructor(props) {
        super(props)
        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)

        this.state = {
            field: props.field,
            key: props.name,
            blockTypes:[{name: 'heading', id: 1}, {name: 'blog', id: 2}]
        }
    }

    render() {
        const menuItems = this.state.blockTypes.map((type, i) => {
            return (
                <li key={i}>
                    <MenuItem className='MyMenuButton-menuItem'>
                        {type.name}
                    </MenuItem>
                </li>
            );
        });
        return (
            <Wrapper
                onSelection={this.handleSelection}
            >
                <Button className='btn btn-outline'>
                    Select Block
                </Button>
                <Menu className='dropdown-menu'>
                    <ul>{menuItems}</ul>
                </Menu>
            </Wrapper>
        )
    }

    handleSelection = (value, event) => {
        let type = this.state.blockTypes.find((block) => block.name === value)
        this.props.selectType(type)
        return type
    }
}

export default connect()(BlockSelector)
