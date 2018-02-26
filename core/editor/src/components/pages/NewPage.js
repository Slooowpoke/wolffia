import React, {Component} from 'react'

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
            <div>
                <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>
                <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
                <input type="text" name="name" value={this.state.template} onChange={this.onChangeTemplate}/>
                <button onClick={this.save}>Create page</button>
            </div>
        )
	}

    save = () => {
        this.props.createPage(this.state.title, this.state.name, this.state.template)
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
