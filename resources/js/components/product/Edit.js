import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor()
	{
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			id        : '',
			name 	  : '',
			image 	  : ''
		}
		this.fileHolder = null;
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(product_data) 
	{
		this.setState({
			id        : product_data.product.id,
			name 	  : product_data.product.name,
			image 	  : product_data.product.image,
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e)
	{
		if(e.target.name == 'name'){
			this.setState({
				[e.target.name] : e.target.value
			})
		}else{
			this.fileHolder = e.target.files[0];
		}
	}
	//--- Update state users variable by props method ---//
	handleUpdateUser(e)
	{
		e.preventDefault()
		var formData = new FormData();
		formData.append('image', this.fileHolder);
		formData.append('name', this.state.name);

		axios.post(`/api/products/${this.state.id}`, formData,  { 
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
				this.props.updateState(data, 1);
				this.setState(this.baseState);
				document.getElementById("closeEditModal").click();
				toastr.info('User data updated successfully!', {position : 'top-right', heading: 'Done'});
			})
			.catch(error => {
				this.setState({
					errors : error.response.data.errors
				})
			})
	}
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName)
	{
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName)
	{
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateUser}>
			      		<div className="modal-body">
						  <div className="form-group">
			            		<label htmlFor="name" className="col-form-label">Name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
			            		 id="name" name="name" placeholder="Full name" onChange={this.handleInputFieldChange} value={this.state.name}/>
			            		{this.renderErrorFor('name')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="image" className="col-form-label">Image:</label>
			            		<input type="file" className={`form-control form-control-sm ${this.hasErrorFor('image') ? 'is-invalid' : ''}`}
			            		 id="image" name="image" onChange={this.handleInputFieldChange} placeholder={this.state.image}/>
			            		{this.renderErrorFor('image')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit