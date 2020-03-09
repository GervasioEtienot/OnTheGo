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
			 dataCompleta: {}
			}

    componentWillMount(){
	  const { match } = this.props;
	//   debugger;
	  this.busquedaDePrueba(match.params);
	}
	
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.match.params);
		
		
		this.busquedaDePrueba(nextProps.match.params);
	}

	async busquedaDePrueba({ categoria }, actualPage, term) {
	  const { paginaActual } = this.state;
	  console.log("lo que recibo: " + categoria);
	  	  
	  const respuesta = await Productos.get(categoria,{
		params: {
			page: actualPage === 0 ? paginaActual : actualPage,
			data: [term]
		}
	});
		console.log(respuesta.data);
		this.setState( { dataCompleta: respuesta.data, videos: respuesta.data.data, loading: false } );
	
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
								<Filters onFiltrarTermino={ this.filtrarTermino.bind(this)} />
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
											<a className={`${paginaActual === 1 ? "disabled" : "" } item`} item onClick={ () => this.changePage("first", paginaActual)} >{flechas.dobleFlechaIzq}</a>
											<a className={`${paginaActual === 1 ? "disabled" : "" } item`} onClick={ () => this.changePage("prev", paginaActual)} >{flechas.flechaIzq}</a>
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
											<a className={`${paginaActual === dataCompleta.last_page ? "disabled" : "" } item`} onClick={ () => this.changePage("next", paginaActual)} >{flechas.flechaDer}</a>
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