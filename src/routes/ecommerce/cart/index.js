/**
 * View Cart Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteItemFromCart, onChangeProductQuantity } from "Actions";

//Helper
import { textTruncate } from "Helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import axios from 'axios';
import qs from 'qs';
import SweetAlert from 'react-bootstrap-sweetalert'

// Api de prueba
import EnviarCarrito from '../../../apis/EnviarCarrito';

class Carts extends Component {
   state = {
      success: false,
      redirect: false
   }

   onChangeQuantity(quantity, cartItem) {
      if (quantity > 0) {
         this.props.onChangeProductQuantity(quantity, cartItem);
      }
   }

   //Get Total Price
   getTotalPrice() {
      const { cart } = this.props;
      let totalPrice = 0;
      for (const item of cart) {
         totalPrice = parseFloat(totalPrice) + parseFloat(item.totalPrice);
      }
      return Math.round(totalPrice*1000)/1000;
   }

   //Is Cart Empty
   isCartEmpty() {
      const { cart } = this.props;
      if (cart.length === 0) {
         return true;
      }
   }
     
   onConfirm(key) {
      this.setState({ [key]: false, redirect: true });
   }

	openAlert(key) {
      const { cart, deleteItemFromCart } = this.props;
      if (cart.length > 0) {
         console.log(cart);
         let data = {
            "cart": cart
         }
         
         console.log(data);
         
         EnviarCarrito.get('checkout', {
            params: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
               "X-Requested-With": "XMLHttpRequest",
               "Authorization": localStorage.getItem('user_id')
             }
          })
          .then(response => {
            console.log(response);
            cart.map( item => deleteItemFromCart(item) );
            this.setState({ [key]: true});
          }).catch(e => {
            console.log("El error es:" + e);
        });
      }
      // this.setState({ [key]: true });
   }

   

   // async probandoMocky(){
   //    const response = await axios.get('http://www.mocky.io/v2/5e7bd5742d0000610011a7d0');
   //    console.log(response.data);
   //    console.log(this.props.cart);
                 
   // }

   render() {
      const { cart, deleteItemFromCart, match } = this.props;
      const { success, redirect } = this.state;
      
      if(redirect){
         return (<Redirect to={'/app/ecommerce/historial'} />);
      }
      
      return (
         <div className="cart-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.cart" />} match={match} />
            <RctCard>
               <RctCardContent noPadding>
                  <Table hover responsive className="mb-0">
                     <thead>
                        <tr>
                           <th className="w-10"></th>
                           <th className="w-50"><IntlMessages id="components.product" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.availables" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                           <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th>
                        </tr>
                     </thead>
                     <tbody>
                        {!this.isCartEmpty() ? cart.map((cart, key) => (
                           <tr key={key}>
                              <td className="w-10 text-center"><img src={require('../../../assets/img/product-2.png')} alt="products" className="media-object" width="100" height="100" /></td>
                              <td className="w-50">
                                 <h3>{textTruncate(cart.codigo, 40)}</h3>
                                 <span className="fs-14 d-block text-muted">{textTruncate(cart.descripcion, 80)}</span>
                                 {/* <span className="fs-14 d-block text-muted">{cart.brand}</span> */}
                              </td>
                              <td className="text-bold text-center">{cart.cantidad_deposito_item}</td>
                              <td>
                                 <Input
                                    type="number"
                                    value={cart.productQuantity}
                                    max={cart.cantidad_deposito_item}
                                    onChange={(e) => this.onChangeQuantity(e.target.value, cart)}
                                 />
                              </td>
                              <td className="text-danger text-center">$ {cart.precio_producto}</td>
                              <td className="text-bold text-center">$ {cart.totalPrice}</td>
                              <td className="text-center">
                                 <IconButton onClick={() => deleteItemFromCart(cart)}>
                                    <i className="zmdi zmdi-close"></i>
                                 </IconButton>
                              </td>
                           </tr>
                        )) :
                           <tr>
                              <td colSpan="6" className="text-center h-25">
                                 <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                 <span className="mb-20 font-3x"><IntlMessages id="components.CartEmptyText" /></span>
                              </td>
                           </tr>
                        }
                     </tbody>
                     <tfoot>
                        <tr className="text-center">
                           <td colSpan="2">{/* <Input type="text" placeholder="Enter Promo Code" /> */}</td>
                           <td>{/* <Button variant="contained" color="secondary" className="text-white"><IntlMessages id="widgets.apply" /></Button> */}</td>
                           <td><span className="font-weight-bold"><IntlMessages id="widgets.total" /></span></td>
                           <td><span className="font-weight-bold">$ {this.getTotalPrice()}</span></td>
                           <td>
                              {/* <Button variant="contained" size="large" color="primary" className="text-white" component={Link} to="/app/ecommerce/checkout">
                                 <IntlMessages id="components.checkout" />
                              </Button> */}
                              <Button variant="contained" size="large" color="primary" className="text-white" onClick={() => this.openAlert('success')} >
                                 <IntlMessages id="components.checkout" />
                              </Button>
                              <SweetAlert
                                 success
                                 show={success}
                                 title="Tu pedido se realizó con éxito!"
                                 btnSize="sm"
                                 onConfirm={() => this.onConfirm('success')}
                              />
                                                                                             
                           </td>
                        </tr>
                     </tfoot>
                  </Table>
               </RctCardContent>
            </RctCard>
         </div>
      )
   }
}

const mapStateToProps = ({ ecommerce }) => {
   const { cart } = ecommerce;
   return { cart };
}

export default connect(mapStateToProps, {
   deleteItemFromCart,
   onChangeProductQuantity
})(Carts);