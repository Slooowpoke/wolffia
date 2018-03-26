import React, {Component} from 'react'

import VisibleBlocksContainer from '../containers/VisibleBlocksContainer'
import Header from '../Header'

class PageEditor extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        let title = 'Editing page:' + this.props.name
        return (
            <div className="container-fluid">
                <Header title={title}/>
                <div className="row">
                    <div className="col">
                        <div className="block-outline">
                            <span className="box-label">Page Meta</span>
                            <div className="row">
                                <div className="col col-sm-4">
                                    <label>
                                        <span>
                                        Page Title:
                                        </span>
                                        <input type="text" name="title" value={this.props.title}
                                               onChange={this.props.onChangeTitle}/>
                                    </label>
                                </div>
                                <div className="col col-sm-4">
                                    <label>
                                        <span>
                                            Page Name:
                                        </span>
                                        <input type="text" name="name" value={this.props.name}
                                               onChange={this.props.onChangeName}/>
                                    </label>
                                </div>
                                <div className="col col-sm-4">
                                    <label>
                                        <span>
                                          Page Template:
                                        </span>
                                        <input type="text" name="name" value={this.props.template}
                                               onChange={this.props.onChangeTemplate}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-outline align-right margin-top"
                                            onClick={this.props.save}>Save page
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <VisibleBlocksContainer pageID={this.props.id}/>
            </div>
        )
    }

}

export default (PageEditor)
