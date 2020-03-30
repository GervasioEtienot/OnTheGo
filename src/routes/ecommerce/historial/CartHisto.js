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

const CartHisto = (props) => {
    // const [carritos, setCarritos] = useState([]);
    // const [cargando, setCargando] = useState(true);

    

    //Is Cart Empty
   /* const isCartEmpty = () => {
      if (carritos.length === 0) {
         return true;
    }
    } */

    return (
        <tr className="cart-wrapper">
            <td colSpan="4">
              <RctCard>
                <RctCardContent noPadding>
                    <Table hover responsive className="mb-0">
                        <thead>
                            <tr>
                            {/* <th className="w-10"></th> */}
                            <th className="w-50"><IntlMessages id="components.product" /></th>
                            {/* <th className="w-10 text-center"><IntlMessages id="components.availables" /></th> */}
                            <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                            <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                            <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                            {/* <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            { props.cart.map((cart, key) => (
                            <tr key={key}>
                                {/* <td className="w-10 text-center"><img src={require('../../../assets/img/product-2.png')} alt="products" className="media-object" width="100" height="100" /></td> */}
                                <td className="w-50">
                                    <h3>{cart.codigo}</h3>
                                    {/* <span className="fs-14 d-block text-muted">{cart.descripcion}</span> */}
                                    {/* <span className="fs-14 d-block text-muted">{cart.brand}</span> */}
                                </td>
                                {/* <td className="text-bold text-center">{cart.cantidad_deposito_item}</td> */}
                                <td className="text-center">{cart.productQuantity}</td>
                                <td className="text-danger text-center">$ {cart.precio_producto}</td>
                                <td className="text-bold text-center">$ {cart.totalPrice}</td>
                                {/* <td className="text-center">
                                    <IconButton >
                                        <i className="zmdi zmdi-close"></i>
                                    </IconButton>
                                </td> */}
                            </tr>
                            )) 
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