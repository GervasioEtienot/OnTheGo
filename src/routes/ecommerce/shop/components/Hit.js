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

const foto = "data:image/jpeg;base64,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";
class Hit extends Component {
	state = {
		loading: false,
		showCantidad: false,
		cantidad: 1
	}

	//Add Item to cart
	onPressAddToCart(cartItem, e) {
		this.setState({ loading: true })
		console.log(cartItem);
		cartItem.precio_producto = parseFloat(cartItem.precio_producto);
		console.log(cartItem);
		
		
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
						{/* <img src={require('../product-2.png')} className="img-fluid" alt="product" /> */}
						<img src={foto} className="img-fluid" alt="product" />
					</div>
					<Collapse in={showCantidad} timeout={500} > 
						<div style={{margin: "1rem"}}>Disponibles: {hit.cantidad_deposito_item} </div>
						<div style={{flexDirection: "row", margin: "1rem"}} >
							<label>Cantidad:  </label>
							<Input
								type="number"
								value={cantidad}
								max={hit.cantidad_deposito_item}
								min={0}
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
						<h4 className="text-dark">{hit.codigo}</h4>
						<p className="mb-5 text-muted font-xs">
							{hit.descripcion}
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