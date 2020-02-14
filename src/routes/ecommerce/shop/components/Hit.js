/**
 * Hits Component
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// Card Component
import { RctCard } from 'Components/RctCard';

import { Button, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Actions
import { onAddItemToCart, onChangeProductQuantity } from "../../../../actions/EcommerceActions";

//Helper
import { textTruncate } from "Helpers/helpers"
import { Dialog } from '@material-ui/core';

import Modal from '../../../../components/Modal';
import { Table, Input } from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';


class Hit extends Component {
	state = {
		loading: false,
		showCantidad: false,
		cantidad: 1
	}

	//Add Item to cart
	/* onPressAddToCart(cartItem, e) {
		this.setState({ loading: true })
		setTimeout(() => {
			this.props.onAddItemToCart(cartItem);
		}, 1000)
		e.preventDefault();
		this.setState({showCantidad: true})
	} */

	
	
	handleClose = () => {
		this.setState({open: false});
	};
	/* handleToggle = () => {
		this.setState({open: !this.state.open});
	}; */
	onChangeQuantity(quantity, cartItem) {
		if (quantity > 0) {
		   this.props.onChangeProductQuantity(quantity, cartItem);
		}
		this.setState({showCantidad: false});
	 }

	/**
	 * Function to check either the item exist in cart or not
	 * Return boolean
	 * @param {boolean} id 
	 */
	isItemExistInCart(id) {
		const { cart } = this.props;
		let existence = false
		for (const item of cart) {
			if (item.objectID === id) {
				existence = true
			}
		}
		return existence;
	}

	render() {
		const { hit } = this.props;
		const { loading, cantidad, showCantidad } = this.state;
		
		return (
			<RctCard customClasses="d-flex  mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={hit.snippet.thumbnails.medium.url} className="img-fluid" alt="product" />
					</div>
					<Collapse in={showCantidad} timeout={500} > 
						<div style={{margin: "1rem"}}>Disponibles: 11</div>
						<div style={{flexDirection: "row", margin: "1rem"}} >
							<label>Cantidad:  </label>
							<Input
								type="number"
								value={cantidad}
								onChange={(e) => this.setState({cantidad: e.target.value})}
								style={{ maxWidth: '90px', display:"inline", marginLeft:"5px"}}
							/>
						</div>
						<div style={{display: "block", textAlign: "center", margin: "2rem 0" }}>
							<Button color="primary" variant="contained" style={{margin: "0 5px"}} onClick={ (cantidad, hit) => this.onChangeQuantity(cantidad, hit)} >Confirmar</Button>
							<Button color="default" variant="contained" style={{margin: "0 5px"}} onClick={ (e) => this.setState({showCantidad: false}) } >Cancelar</Button>
						</div>
					</Collapse>
					<div className="d-flex align-items-end">
						{!this.isItemExistInCart(hit.id.videoId) ? (
							<a hidden={showCantidad} href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => this.setState({showCantidad: true}) }>
								{loading ? <CircularProgress className="text-white" color="inherit" size={20} /> : 'Agregar al carrito'}
							</a>
						) : (
								<Link to="/app/ecommerce/cart" className="bg-secondary text-center w-100 cart-link text-white py-2">
									Ver carro
								</Link>
							)
						}
					</div>
				</div>
				<div hidden={showCantidad} className="product-info border-top p-3">
					
					<div  >
						<div className="d-flex justify-content-between">
						<h2 className="text-danger">$ 100{/* hit.price */}</h2>
						</div>
						<h4 className="text-dark">{textTruncate(hit.snippet.title, 25)}</h4>
						<p className="mb-5 text-muted font-xs">
							{textTruncate(hit.snippet.description, 70)}
						</p>
					</div>
					
				    
				</div>
			</RctCard>
		)
	}
}

const mapStateToProps = ({ ecommerce }) => {
	const { cart } = ecommerce;
	return { cart };
}

const useStyles = makeStyles(theme => ({
	backdrop: {
	  zIndex: theme.zIndex.drawer + 1,
	  color: '#fff',
	},
  }));

export default connect(mapStateToProps, { onAddItemToCart, onChangeProductQuantity })(Hit);