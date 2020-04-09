/**
 * Shop Page
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
//Components
// import Hit from './components/Hit';
// import Filters from './components/Filters';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// Api de prueba

import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import TopSelling from './TopSelling';

 
const Liquidacion = (props) => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getProducts();
    },[]);
    
	const getProducts = async () => {
        axios.get("http://www.mocky.io/v2/5e8e4145300000700064baa7"
            
        )
        .then((respuesta) => {
            console.log(respuesta.data.data);
            setProducts(respuesta.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
        
	}
	
	
	/* const changePage = (pagToGo, actualPage) => {
	   const { dataCompleta } = this.state;
	   const { match } = this.props;
		switch(pagToGo){
			case "prev":  actualPage -= 1;
			              this.setState( (prevState) => { return { paginaActual: prevState.paginaActual - 1 } });
						  break;
			case "next":  actualPage += 1;
			              this.setState( (prevState) => { return { paginaActual: prevState.paginaActual + 1 } });
						  break;
			case "first": actualPage = 1;
			              this.setState( (prevState) => { return { paginaActual: 1 } });
						  break;
			case "last":  actualPage = dataCompleta.last_page;
			              this.setState( (prevState) => { return { paginaActual: dataCompleta.last_page } });
			              break;
		}
		getProducts(actualPage);
	}
 */
	
		
		/* const flechas = {
			flechaIzq: "<",
			flechaDer: ">",
			dobleFlechaIzq: "<<",
			dobleFlechaDer: ">>"
		} */
		return (
			<div className="shop-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.liquidacion" />} match={props.match} />
				<div className="ais-InstantSearch">
					
						
						<div className="row" >
							{/* <div className="col-lg-3 col-md-4 d-none d-md-block">
								<Filters onFiltrarTermino={ this.filtrarTermino.bind(this)} categoria={match.params.categoria} />
							</div> */}
																						
									
									{loading == true ? 'Cargando...'  : ( 
                                        <React.Fragment>
                                            <div className="col-sm-12 col-md-4 col-lg-1 w-xs-full"></div>
                                            <RctCollapsibleCard
                                                colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                                                heading={<IntlMessages id="widgets.liquidaciones" />}
                                                // collapsible
                                                // reloadable
                                                // closeable
                                                fullBlock
                                            >
                                                <TopSelling products={products} />
                                            </RctCollapsibleCard>
                                            <div className="col-sm-12 col-md-4 col-lg-2 w-xs-full"></div>
                                            <RctCollapsibleCard
                                                colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                                                heading={<IntlMessages id="widgets.liquidaciones" />}
                                                // collapsible
                                                // reloadable
                                                // closeable
                                                fullBlock
                                            >
                                                <TopSelling products={products} />
                                            </RctCollapsibleCard>
                                            <div className="col-sm-12 col-md-4 col-lg-1 w-xs-full"></div>
                                        </React.Fragment>
                                        )
									}
									
									{/* <div className="pagination mb-30" style={{ marginTop: "15px" }} >
										<div className="ui pagination tiny blue menu">
											<a className={`${paginaActual === 1 ? "disabled" : "" } item`} onClick={ () => this.changePage("first", paginaActual)} >{flechas.dobleFlechaIzq}</a>
											{paginaActual === 1 ? <div className="disabled item" >{ flechas.flechaIzq }</div> 
											: <a className="item" onClick={ () => this.changePage("prev", paginaActual)} > { flechas.flechaIzq } </a>}
											{
											  paginaActual === 1 ? '' : <a className="item" onClick={ () => this.changePage("prev", paginaActual)} > { paginaActual-1 } </a>
											}
											<a className="active item">{ paginaActual }</a>
											<a className="item" 
											   hidden={paginaActual === dataCompleta.last_page ? true : false }
											   onClick={ () => this.changePage("next", paginaActual)} 
											>
												{ paginaActual+1 } 
											</a>
											{paginaActual === dataCompleta.last_page ? <div className="disabled item" >{ flechas.flechaDer }</div>
											: <a className="item" onClick={ () => this.changePage("next", paginaActual)} >{flechas.flechaDer}</a>
										    }
											<a className={`${paginaActual === dataCompleta.last_page ? "disabled" : "" } item`} onClick={ () => this.changePage("last", paginaActual)} >{flechas.dobleFlechaDer}</a>
										</div>
									</div> */}
								
							
						</div>
					
				</div>
			</div>
		)
	}


const mapStateToProps = ({ ecommerce }) => {
	const { wordToSearch } = ecommerce;
	return { wordToSearch };
}

export default connect(mapStateToProps)(Liquidacion);

const data = [
    {
      "id": 5,
      "codigo": "PAR-ALC-OTI6030-T-NG-O",
      "descripcion": "PARTES DE CELULARES (REPUESTOS)",
      "precio_producto": "4.1",
      "cantidad_deposito_item": 3,
      "descuento": "-20%",
      "cantidad_paquete": 250
    },
    {
      "id": 9,
      "codigo": "PAR-ALC-IX6040-LT-NG-O",
      "descripcion": "PARTES DE CELULARES (REPUESTOS)",
      "precio_producto": "20.45",
      "cantidad_deposito_item": 4,
      "descuento": "-20%",
      "cantidad_paquete": 80
    },
    {
      "id": 16,
      "codigo": "PAR-APL-IPADM-L-XX-O",
      "descripcion": "PARTES DE CELULARES (REPUESTOS)",
      "precio_producto": "23.45",
      "cantidad_deposito_item": 7,
      "descuento": "-8%",
      "cantidad_paquete": 40
    },
    {
      "id": 2211,
      "codigo": "CAB-USB2-MUSB-BA/CAMUN/01-NG-1",
      "descripcion": "CABLE BASEUS YAVEN LIGHTNING CABLE FOR MICRO 1M BLACK",
      "precio_producto": "0.94",
      "cantidad_deposito_item": 148,
      "descuento": "-12%",
      "cantidad_paquete": 100
    },
    {
      "id": 2527,
      "codigo": "GEN-DOBOT/MOOZ2",
      "descripcion": "DOBOT MOOZ2 IMPRESORA 3D PUNTERO LASER Y CNC",
      "precio_producto": "479",
      "cantidad_deposito_item": 10,
      "descuento": "-10%",
      "cantidad_paquete": 60
    }
];