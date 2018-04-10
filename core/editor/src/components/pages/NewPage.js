import React, {Component} from 'react'
import Card from '../layout/Card'

class NewPage extends Component {

	constructor(props) {
		super(props)
        this.state = {
            title:'',
            name: '',
            template:''
        }
	}

	render() {
        return (
            <div className="row">
                <div className="col">
                    <Card title='Create new page'>

                        <div className="row">
                        <div className="col col-sm-4">
                            <label>
                                <span>
                                Page Title:
                                </span>
                                <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>
                            </label>
                        </div>
                        <div className="col col-sm-4">
                        <label>
                            <span>
                                Page Name:
                            </span>
                            <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
                        </label>
                        </div>
                        <div className="col col-sm-4">
                        <label>
                            <span>
                              Page Template:
                            </span>
                            <input type="text" name="name" value={this.state.template} onChange={this.onChangeTemplate}/>
                        </label>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-outline align-right margin-top" onClick={this.save}>Create page</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
	}

    save = () => {
        this.props.createPage(this.state.title, this.state.name, this.state.template);
        this.setState({title: "", name: "", template: ""})
    }

    onChangeTemplate = (e) => {
        this.setState({template: e.target.value})
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value})
    }

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    }
}

export default NewPage
