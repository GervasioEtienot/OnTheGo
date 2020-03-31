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
import CartHisto from './CartHisto';
import './Historial.css';

const Historial = (props) => {
    const [carritos, setCarritos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showCart, setShowCart] = useState(null);

    useEffect(() => {
        getResponse();
    },[]);

    const getResponse = async () => {
        const response = await axios.get('http://149.56.237.70:81/api/cart/history',{
            headers: {
               'Content-Type': 'application/json',
               "X-Requested-With": "XMLHttpRequest",
               "Authorization": localStorage.getItem('user_id')
            }
        }
        );
        console.log(response.data);
        setCarritos(response.data.carts);
        setCargando(false); 
    }

    //Is Cart Empty
   const isCartEmpty = () => {
      if(carritos == null){
         return true;
      }
      else{
         if (carritos.length === 0) {
            return true;
       }
      }
    }

    const mostrarCarrito = (index) => {
      if(showCart !== index){
         setShowCart(index);
      }
      else{
         setShowCart(null);
      }
        
      console.log(showCart);
       
    }
    
    return (
        <div className="cart-wrapper">
           <PageTitleBar title={<IntlMessages id="sidebar.historial" />} match={props.match} />
           <RctCard>
              <RctCardContent noPadding>
                 <Table hover responsive className="mb-0">
                    <thead>
                       <tr>
                          <th className="w-10 text-center"><IntlMessages id="components.id" /></th>
                          {/* <th className="w-50"><IntlMessages id="components.id" /></th> */}
                          <th className="w-10 text-center"><IntlMessages id="components.dateOfPurchase" /></th>
                          <th className="w-10 text-center"><IntlMessages id="components.status" /></th>
                          <th className="w-10 text-center"><IntlMessages id="components.cartPrice" /></th>
                          <th className="w-10 text-center">Ver</th>
                          {/* <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th> */}
                       </tr>
                    </thead>
                    <tbody >
                    {!isCartEmpty() ? carritos.map((carro, key) => (
                          <React.Fragment>
                              <tr key={key}>
                                 <td className="w-10 text-center">{carro.id}</td>
                                 <td className="w-10 text-center">{carro.created_at}</td>
                                 <td className="text-bold text-center">
                                    <span className={`badge ${carro.status}`}>{carro.status}</span>
                                 </td>
                                 <td className="text-danger text-center">$ {carro.total_price}</td>
                                 <td className="w-10 text-center">
                                    <Button variant="contained" color="primary" onClick={ () => mostrarCarrito(key) } >
                                       <i className="zmdi zmdi-shopping-cart"></i>
                                    </Button>
                                 </td>
                              </tr>
                              {showCart === key ? <CartHisto cart={carro.cart}/> : ''}
                          </React.Fragment>
                        ))   
                     : (
                    
                          <tr>
                             <td colSpan="6" className="text-center h-25">
                                <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                <span className="mb-20 font-3x"><IntlMessages id="components.historyEmptyText" /></span>
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