import React, { useState, useEffect, ReactFragment } from 'react';

import { Table, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

//Helper
import { textTruncate } from "Helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import axios from 'axios';

const Historial = (props) => {
    const [carritos, setCarritos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        getResponse();
    },[]);

    const getResponse = async () => {
        const response = await axios.get('http://www.mocky.io/v2/5e7d06df350000de2006a31b');
        console.log(response.data.carts);
        setCarritos(response.data.carts);
        setCargando(false); 
    }

    //Is Cart Empty
   const isCartEmpty = () => {
      if (carritos.length === 0) {
         return true;
    }
    }

    return (
        <div className="cart-wrapper">
           <PageTitleBar title={<IntlMessages id="sidebar.historial" />} match={props.match} />
           <RctCard>
              <RctCardContent noPadding>
                 <Table hover responsive className="mb-0">
                    <thead>
                       <tr>
                          <th className="w-10"></th>
                          <th className="w-50"><IntlMessages id="components.product" /></th>
                          {/* <th className="w-10 text-center"><IntlMessages id="components.availables" /></th> */}
                          <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                          <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                          <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                          <th className="w-10 text-center">{/* <IntlMessages id="components.removeProduct" /> */}</th>
                       </tr>
                    </thead>
                    <tbody >
                    {!isCartEmpty() ? carritos.map((carros, claves) => (
                    
                        <React.Fragment key={claves}>
                        {cargando !== true  ? carros.cart.map((cart, key) => (
                            
                            <tr key={key}>
                                <td className="w-10 text-center"><img src={require('../../../assets/img/product-2.png')} alt="products" className="media-object" width="100" height="100" /></td>
                                <td className="w-50">
                                    <h3>{textTruncate(cart.codigo, 40)}</h3>
                                    <span className="fs-14 d-block text-muted">{textTruncate(cart.descripcion, 80)}</span>
                                    {/* <span className="fs-14 d-block text-muted">{cart.brand}</span> */}
                                </td>
                                <td className="text-bold text-center">{cart.productQuantity}</td>
                                {/* <td>
                                    <Input
                                    type="number"
                                    value={cart.productQuantity}
                                    max={cart.cantidad_deposito_item}
                                    onChange={(e) => this.onChangeQuantity(e.target.value, cart)}
                                    />
                                </td> */}
                                <td className="text-danger text-center">$ {cart.precio_producto}</td>
                                <td className="text-bold text-center">$ {cart.totalPrice}</td>
                                <td className="text-center">
                                    <IconButton /*onClick={ () => deleteItemFromCart(cart) }*/>
                                    <i className="zmdi zmdi-close"></i>
                                    </IconButton>
                                </td>
                            </tr>
                            
                            
                        )) : 'Cargando...' 
                        }
                        <tr>
                              <td><Divider light={true} /></td>
                              <td><Divider light={true} /></td>
                              <td><Divider light={true} /></td>
                              <td><Divider light={true} /></td>
                              <td><Divider light={true} /></td>
                              <td><Divider light={true} /></td>
                        </tr>
                        </React.Fragment>
                        ))   
                     
                        
                        
                        // <tfoot>
                        // <tr className="text-center">
                        //     <td colSpan="2">{/* <Input type="text" placeholder="Enter Promo Code" /> */}</td>
                        //     <td>{/* <Button variant="contained" color="secondary" className="text-white"><IntlMessages id="widgets.apply" /></Button> */}</td>
                        //     <td><span className="font-weight-bold"><IntlMessages id="widgets.total" /></span></td>
                        //     <td><span className="font-weight-bold">$ {/* this.getTotalPrice() */}</span></td>
                        //     <td>
                        //         {/* <Button variant="contained" size="large" color="primary" className="text-white" component={Link} to="/app/ecommerce/checkout">
                        //             <IntlMessages id="components.checkout" />
                        //         </Button> */}
                        //         <Button variant="contained" size="large" color="secondary" className="text-white" onClick={() => this.probando()} >
                        //             Pedir
                        //         </Button>
                                
                                
                        //     </td>
                        // </tr>
                        // </tfoot>
                            
                    
                     : (
                    
                          <tr>
                             <td colSpan="6" className="text-center h-25">
                                <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                <span className="mb-20 font-3x"><IntlMessages id="components.CartEmptyText" /></span>
                             </td>
                          </tr>
                       
                    
                    )}
                    </tbody> 
                 </Table>
              </RctCardContent>
           </RctCard>
        </div>
     )
}

export default Historial;