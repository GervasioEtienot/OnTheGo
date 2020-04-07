/**
 * Cart Component
 */
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, Dropdown } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from "react-router-dom";

//Helper
import { textTruncate, getAppLayout } from "Helpers/helpers";

//Actions
import { deleteItemFromCart } from "Actions";

//intl Messages
import IntlMessages from 'Util/IntlMessages';

class Carts extends Component {

	state = {
		dropdownOpen: false,
	};

	toggle = () => {
		// debugger;
		this.setState( { dropdownOpen: !this.state.dropdownOpen });
	}

	//Get Total Price
	getTotalPrice() {
		const { cart } = this.props;
		let totalPrice = 0;
		for (const item of cart) {
			totalPrice = parseFloat(totalPrice) + parseFloat(item.totalPrice);
		}
		return totalPrice.toFixed(2);
	}

	//Is Cart Empty
	isCartEmpty() {
		const { cart } = this.props;
		if (cart.length === 0) {
			return true;
		}
	}

	render() {
		const { cart, deleteItemFromCart, location } = this.props;
		return (
			<Dropdown nav className="list-inline-item cart-dropdown" isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
				<DropdownToggle nav className="p-0" >
					<Tooltip title="Carro" placement="bottom">
						<IconButton aria-label="bag">
							<i className="zmdi zmdi-shopping-cart"></i>
							<Badge
								color="success"
								className="badge-xs badge-top-right"
							>
								{cart.length}
							</Badge>
						</IconButton>
					</Tooltip>
				</DropdownToggle>
				<DropdownMenu>
					<div className="dropdown-content">
						<div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
							<span className="text-white font-weight-bold"><IntlMessages id="components.cart" /></span>
							{/* <Badge color="warning">4 NEW</Badge> */}
						</div>
						{this.isCartEmpty() ? (
							<div className="text-center p-4">
								<span className="d-block font-3x mb-15 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
								<h3><IntlMessages id="components.CartEmptyText" /></h3>
							</div>
						) : (
								<Fragment>
									<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280} autoHide>
										<ul className="list-unstyled dropdown-list">
											{cart.map((cart, key) => (
												<li className="d-flex justify-content-between" key={key}>
													<div className="media overflow-hidden w-75">
														<div className="mr-15">
															<img src={require('../../assets/img/product-2.png')} alt="products" className="media-object" width="63" height="63" />
														</div>
														<div className="media-body">
															<span className="fs-14 d-block">{textTruncate(cart.codigo, 25)}</span>
															<span className="fs-12 d-block text-muted">{textTruncate(cart.descripcion, 50)}</span>
															{/* <span className="fs-12 d-block text-muted">{cart.brand}</span> */}
														</div>
													</div>
													<div className="text-center">
														<span className="text-muted fs-12 d-block mb-10">$ {cart.precio_producto} X {cart.productQuantity}</span>
														<a
															 href="#"
															className="hover-close"
															onClick={() => deleteItemFromCart(cart)}>
															<i className="ti-close"></i>
														</a>
													</div>
												</li>
											))}
										</ul>
									</Scrollbars>
									<div className="dropdown-foot d-flex justify-content-between align-items-center p-2 bg-white rounded-bottom">
										<div>
											<Button
												variant="contained"
												component={Link}
												to={`/${getAppLayout(location)}/ecommerce/cart`}
												color="primary"
												className="mr-10 btn-xs bg-primary text-white"
												onClick={ () => this.toggle() }
											>
												<IntlMessages id="components.viewCart" />
											</Button>
											{/* <Button
												variant="contained"
												component={Link}
												to={`/${getAppLayout(location)}/ecommerce/checkout`}
												color="secondary"
												className="btn-xs text-white"
											>
												<IntlMessages id="components.checkout" />
											</Button> */}
										</div>
										<span className="fw-normal text-dark font-weight-bold font-xs">
											<IntlMessages id="widgets.total" /> $ {this.getTotalPrice()}
										</span>
									</div>
								</Fragment>
							)
						}
					</div>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

// map state to props
const mapStateToProps = ({ ecommerce }) => {
	const { cart } = ecommerce;
	return { cart };
}

export default withRouter(connect(mapStateToProps, {
	deleteItemFromCart
})(Carts));
