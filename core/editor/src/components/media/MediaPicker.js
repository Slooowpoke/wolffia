import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../../actions/blocks'
import FieldImage from '../fields/FieldImage'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class MediaPicker extends Component {

    constructor(props) {
        super(props)
        const {dispatch} = props
        this.boundActionCreators = bindActionCreators(Actions, dispatch)

        let pickerOpen = (props.field.value == undefined);
        this.state = {
            pickerOpen: pickerOpen,
        }
    }

    pickMedia = (e) => {
    }

    render() {
        if(!this.state.pickerOpen){
            return(
                <div className="col">
                    <div className="editor-image-wrap">
                        <img src={'http://localhost:3001/' + this.props.field.value} className='aspect-ratio img-wrapped'/>

                        <button className="btn btn-outline" onClick={this.open}>Change image</button>
                    </div>

                </div>
            )
        }

        return (
            <div className="col">

                <Tabs>
                    <TabList>
                        <Tab>Choose from uploaded</Tab>
                        <Tab>Upload</Tab>
                    </TabList>

                    <TabPanel>
                        <p>Choose from uploaded images</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Upload new image</p>
                        <FieldImage
                            key={this.props.name}
                            field={this.props.field}
                            name={this.props.name}
                            update={this.props.updateBlock}
                            index={this.props.index}/>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }

    open = () => {
        this.setState({pickerOpen: true})
    }

    close = () => {
        this.setState({pickerOpen: false})
    }
}

export default connect()(MediaPicker)
