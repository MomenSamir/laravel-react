import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'

class Index extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			products     : [],
			editProduct : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Fetch all users info before the component render ---//
	componentDidMount()
	{
		axios.get('/api/products')
			.then(response => {
				this.setState({
					products : response.data
				})
			})
	}
	//--- Update state variable while any user insert or update ---//
	handleUpdateState(data, operation)
	{
		//--- 'operation==1' means update user ---//
		if(operation === 1) {
			this.setState(prevState => ({
				products : prevState.products.filter(product => {
					if(product.id === data.id)
						return Object.assign(product, data);
					else
						return product;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert user ---//
		var new_products = this.state.products.concat(data);
		this.setState({
			products : new_products
		})
	}
	//--- Find editable user and update state variable ---//
	handleEditUser(productId)
	{
		axios.get(`/api/products/${productId}/edit`)
			.then(response => {
				this.setState({
					editProduct : response.data
				})
			})
	}
	//--- Delete user and update state ---//
	handleDeleteUser(productId)
	{
		axios.delete(`/api/products/${productId}`)
			.then(response => {
				toastr.error('User has been deleted successfully!', {position : 'top-right', heading: 'Done'});
				
				this.setState(prevState => ({
					products : prevState.products.filter(product => {
						return product.id !== productId
					})
				}))
			})
	}

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Products </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add Product </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Name </th>
                                    <th> Image </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map((product, i) => (
                                <tr key={i}>
                                    <td> {product.id} </td>
                                    <td> {product.name} </td>
                                    <td> <img src={"images/"+product.image} ></img> </td>
                                    <td>
                                        <button className="btn btn-secondary btn-sm mr-2" onClick={this.handleEditUser.bind(this, product.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser.bind(this, product.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} product = {this.state.editProduct} />
			</div>
        )
    }
}
export default Index