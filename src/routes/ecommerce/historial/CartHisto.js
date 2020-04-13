import React, { useState, useEffect, ReactFragment } from 'react';

import { Table, Input, CardGroup } from 'reactstrap';
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
import './CartHisto.css';

const CartHisto = (props) => {
    
    
   const carro = [];
   
   const mapeo = () => {
       for (const key in props.cart) {
           if (props.cart.hasOwnProperty(key)) {
                carro.push(props.cart[key])
           }
       }
       return true
   }
    

    return (
        <tr className="cart-wrapper">
            <td colSpan="5">
              <RctCard>
                <RctCardContent noPadding>
                    <Table hover responsive className="mb-0">
                        <thead className= 'tablaDetalle' >
                            <tr className= 'tablaDetalle'>
                            {/* <th className="w-10"></th> */}
                            <th className="w-40"><IntlMessages id="components.product" /></th>
                            {/* <th className="w-10 text-center"><IntlMessages id="components.availables" /></th> */}
                            <th className="w-20 text-center"><IntlMessages id="components.quantity" /></th>
                            <th className="w-20 text-center"><IntlMessages id="widgets.price" /></th>
                            <th className="w-20 text-center"><IntlMessages id="components.totalPrice" /></th>
                            {/* <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th> */}
                            </tr>
                        </thead>
                        <tbody className= 'tablaDetalle tbodyDetalle' >
                            { mapeo() ? carro.map((item, index) => (
                                <tr key={index} className= 'tablaDetalle' >
                                    {/* <td className="w-10" ></td> */}
                                    <td className="w-40">
                                        <h5>{item.name}</h5>
                                        {/* <span className="fs-14 d-block text-muted">{cart.descripcion}</span> */}
                                        {/* <span className="fs-14 d-block text-muted">{cart.brand}</span> */}
                                    </td>
                                    {/* <td className="text-bold text-center">{cart.cantidad_deposito_item}</td> */}
                                    <td className="text-center">{item.qty}</td>
                                    <td className="text-danger text-center">$ {item.price}</td>
                                    <td className="text-bold text-center">$ {item.subtotal}</td>
                                    {/* <td className="text-center">
                                        <IconButton >
                                            <i className="zmdi zmdi-close"></i>
                                        </IconButton>
                                    </td> */}
                                </tr>
                            )) : null 
                            }
                        </tbody>
                        
                    </Table>
                </RctCardContent>
              </RctCard>
            </td> 
         </tr>
     )
}

export default CartHisto;