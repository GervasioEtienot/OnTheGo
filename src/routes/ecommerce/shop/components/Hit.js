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
import { onAddItemToCart, onChangeProductQuantity, deleteItemFromCart } from "../../../../actions/EcommerceActions";

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
	onPressAddToCart(cartItem, e) {
		this.setState({ loading: true })
		setTimeout(() => {
			this.props.onAddItemToCart(cartItem);
		}, 1000)
		e.preventDefault();
		this.setState({showCantidad: true})
	}

	
	
	handleClose = () => {
		this.setState({open: false});
	};
	/* handleToggle = () => {
		this.setState({open: !this.state.open});
	}; */
	onChangeQuantity(quantity) {
		const { cart } = this.props;
		
		if (quantity > 0) {
		   this.props.onChangeProductQuantity(quantity, cart[cart.length-1]);
		}
	
	 }

	/**
	 * Function to check either the item exist in cart or not
	 * Return boolean
	 * @param {boolean} id 
	 */
	isItemExistInCart(id) {
		const { cart } = this.props;
		// debugger;
		let existence = false
		for (const item of cart) {
			if (item.id === id) {
				existence = true
			}
		}
		return existence;
	}

	cancelarItem(e){
		const { cart, deleteItemFromCart } = this.props;
		event.preventDefault(e);
		deleteItemFromCart(cart[cart.length-1]);
		this.setState({ showCantidad: false, loading: false });
	}

	render() {
		const { hit, cart } = this.props;
		const { loading, cantidad, showCantidad } = this.state;
		
		return (
			<RctCard customClasses="d-flex  mb-0 flex-column justify-content-between overflow-hidden">
				<div className="overlay-wrap overflow-hidden">
					<div className="text-center p-4">
						<img src={require('../product-2.png')} className="img-fluid" alt="product" />
					</div>
					<Collapse in={showCantidad} timeout={500} > 
						<div style={{margin: "1rem"}}>Disponibles: {hit.cantidad_deposito_item} </div>
						<div style={{flexDirection: "row", margin: "1rem"}} >
							<label>Cantidad:  </label>
							<Input
								type="number"
								value={cantidad}
								max={hit.cantidad_deposito_item}
								onChange={(e) => {
											this.onChangeQuantity(e.target.value);
											this.setState({ cantidad: e.target.value });
										}}
								style={{ maxWidth: '90px', display:"inline", marginLeft:"5px"}}
							/>
						</div>
						<div style={{display: "block", textAlign: "center", margin: "2rem 0" }}>
							<Button disabled={ hit.cantidad_deposito_item === 0 ? true : false } color="primary" variant="contained" style={{margin: "0 5px"}} onClick={ (e) => this.setState({showCantidad: false})} >Confirmar</Button>
							<Button color="default" variant="contained" style={{margin: "0 5px"}} onClick={ (e) => this.cancelarItem(e) } >Cancelar</Button>
						</div>
					</Collapse>
					<div className="d-flex align-items-end">
						{!this.isItemExistInCart(hit.id) ? (
							<a hidden={showCantidad} href="#" className="bg-primary text-center w-100 cart-link text-white py-2" onClick={(e) => this.onPressAddToCart(hit, e) }>
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
						<h2 className="text-danger">${hit.precio_producto}</h2>
						</div>
						<h4 className="text-dark">{textTruncate(hit.codigo, 25)}</h4>
						<p className="mb-5 text-muted font-xs">
							{textTruncate(hit.descripcion, 70)}
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

export default connect(mapStateToProps, { onAddItemToCart, onChangeProductQuantity, deleteItemFromCart })(Hit);