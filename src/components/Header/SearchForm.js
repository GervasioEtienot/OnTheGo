/**
 * Search Form
 */
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Input } from 'reactstrap';

import { searchProduct } from "../../actions/EcommerceActions";


class SearchForm extends Component {
	state = {
		busqueda: ''
	}
	
	render() {
		const { busqueda } = this.state;
		
    	return (
			<div className="search-wrapper" >
				<Input type="search" 
						className="search-input-lg" 
						placeholder="Buscar.."
						value={busqueda}
						onChange={ (e) => this.setState({ busqueda: e.target.value })}
						// this.props.searchProduct(busqueda);
						/>
			</div>
		)
	}
}

export default connect(null, {
	searchProduct,
  })(SearchForm);
