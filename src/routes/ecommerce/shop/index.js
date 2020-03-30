/**
 * Shop Page
 */
import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
/* import {
	InstantSearch,
	Hits,
	Stats,
	SortBy,
	Pagination,
	Configure,
	MenuSelect,
	Panel,
	SearchBox
} from 'react-instantsearch-dom'; */
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

//Components
import Hit from './components/Hit';
import Filters from './components/Filters';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// Api de prueba
import Productos from '../../../apis/Productos';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

 

/* const client = algoliasearch(
	'latency',
	'6be0576ff61c053d5f9a3225e2a90f76'
); */

export default class Shop extends Component {
	state = {
		     videos: [],
			 loading: true,
			 paginaActual: 1,
			 dataCompleta: {},
			 filtros: ['', '', '', '']
			}

    componentWillMount(){
	    const { paginaActual } = this.state;
		const { match } = this.props;
	//   debugger;
	  this.busquedaDePrueba(match.params, paginaActual);
	}
	
	componentWillReceiveProps(nextProps) {
		const { paginaActual } = this.state;
					
		this.busquedaDePrueba(nextProps.match.params);
	}

	async busquedaDePrueba({ categoria }, actualPage, term) {
	  const { paginaActual, filtros } = this.state;
	  const params = {
		params: {
			page: actualPage === 0 ? paginaActual : actualPage,
			marca: term === undefined ? filtros[0] : term[0],
			modelo: term === undefined ? filtros[1] : term[1],
			color: term === undefined ? filtros[2] : term[2],
			calidad: term === undefined ? filtros[3] : term[3]
		},
		headers: {
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": localStorage.getItem('user_id')
          }
	}
	  console.log(params);
	  	  	  
	//   const respuesta = await Productos.get(categoria , params);
	axios.get(`http://149.56.237.70:81/api/shop/${categoria}`,
		 {
			headers: {
			  'Content-Type': 'application/json',
			  "X-Requested-With": "XMLHttpRequest",
			  "Authorization": localStorage.getItem('user_id')
			}
		 } 
	 )
	 .then((respuesta) => {
		console.log(respuesta);
		this.setState( { dataCompleta: respuesta.data, videos: respuesta.data.data, loading: false } );
	 })
	 .catch((error) => {
		console.log(error);
	 })
	
	}
	filtrarTermino(term){
	   const { match } = this.props;
	       
		   this.setState({ filtros: term });
		   console.log(term);
		     
		   this.busquedaDePrueba(match.params, 0, term);
	   
	}
	
	changePage = (pagToGo, actualPage) => {
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
		this.busquedaDePrueba(match.params, actualPage);
	}

	render() {
		const { match } = this.props;
		const { videos, loading, paginaActual, dataCompleta } = this.state;
		const flechas = {
			flechaIzq: "<",
			flechaDer: ">",
			dobleFlechaIzq: "<<",
			dobleFlechaDer: ">>"
		}
		return (
			<div className="shop-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.shop" />} match={match} />
				<div className="ais-InstantSearch">
					
						<div className="mb-30 filter-sm-wrap d-block d-md-none">
							<ExpansionPanel>
								<ExpansionPanelSummary className="filter-icon" expandIcon={<i className="zmdi zmdi-tune"></i>}>
									<span className="p-0">Filters</span>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<div className="d-sm-flex justify-content-between w-100">
										
										
										
										
									</div>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
						<div className="row">
							<div className="col-lg-3 col-md-4 d-none d-md-block">
								<Filters onFiltrarTermino={ this.filtrarTermino.bind(this)} categoria={match.params.categoria} />
							</div>
							<div className="col-lg-9 col-md-8 col-sm-12">
								<div className="shop-content">
									{/* <div className="stats-info d-flex mb-30 justify-content-between align-items-center">
										<div className="app-selectbox-sm w-30">
											
										</div>
										
									</div> */}
									{/* <Configure hitsPerPage={9} /> */}
									{/* <Hits
										hitComponent={(props) => <Hit {...props} />}
										className="mb-30"
										showLoadingIndicator
									/> */}
									
									{loading == true ? 'Cargando...'  : ( 
										<Grid container spacing={3}>
											{
											   videos.map((video, index) => {
											     return(
													<Grid item xs={4}>
														<Hit hit={video} key={index} />
													</Grid>
											     );
											   })
											}
										</Grid>
										)
									}
									
									<div className="pagination mb-30" style={{ marginTop: "15px" }} >
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
									</div>
								</div>
							</div>
						</div>
					
				</div>
			</div>
		)
	}
}

