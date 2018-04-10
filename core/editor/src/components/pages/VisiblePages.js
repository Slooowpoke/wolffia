import React, {Component} from 'react';
import PrimaryButton from '../buttons/PrimaryButton';

const PageListItem = ({page, index, edit}) => {
    return (
        <li>
            {page.name} - {page.title}
            <PrimaryButton onClick={(e) => edit(page.id, e)} text='Edit Page' classes='align-right' />
        </li>
    )
}

class VisiblePages extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.pages) {
            return (
                <div className="block-outline">
                    <div className="row">
                        <div className="col">
                            <p>No pages created yet.</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col">
                    <div className="block-outline">
                        <ul className="flex-list">
                            {this.props.pages.map((page, index) => {
                                return (
                                    <PageListItem key={index} page={page} index={index} edit={this.props.edit}/>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default VisiblePages
