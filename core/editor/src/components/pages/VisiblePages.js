import React, {Component} from 'react'

const PageListItem = ({page, index, edit}) =>{
    return (
        <div className="row">
            <div className="col col-sm-6">
                <p>{page.name} - {page.title}</p>
            </div>
            <div className="col col-sm-6">
                <button onClick={(e) => edit(page.id, e)} className="btn btn-primary align-right">Edit Page</button>
            </div>
        </div>
    )
}

class VisiblePages extends Component {

	constructor(props) {
		super(props)
	}

	render() {
        if(!this.props.pages){
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
			<div className="block-outline">
                {this.props.pages.map((page,index) => {
                    return (
                      <PageListItem key={index} page={page} index={index} edit={this.props.edit} />
                    )
                })}
			</div>
		)
	}
}

export default VisiblePages
