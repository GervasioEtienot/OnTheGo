/**
 * Shop Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

 
class Shop extends Component {
	state = {
		     products: [],
			 loading: true,
			 paginaActual: 1,
			 dataCompleta: {},
			 filtros: ['', '', '', '', '', '']
			}

    componentWillMount(){
	    const { paginaActual } = this.state;
	// 	const { match } = this.props;
	//   let cat = match.url.split("/")
	//   console.log(cat[3]);
	//   if(cat[3] === 'Lensun'){
	// 	  cat[3] = 'lensun'
	//   }
	  
	  this.busquedaDePrueba(this.props.categoria, paginaActual);
	}
	
	componentWillReceiveProps(nextProps) {
		let cate = this.props.categoria;
		if(nextProps.categoria){
			cate = nextProps.categoria;
		}
							
		this.busquedaDePrueba(cate, 0, nextProps.wordToSearch);
	}

	async busquedaDePrueba( categoria, actualPage, term) {
	  const { paginaActual, filtros } = this.state;
	  
	  const params = {
		params: {
			page: actualPage === 0 ? paginaActual : actualPage,
			marca: term === undefined ? filtros[0] : term[0],
			modelo: term === undefined ? filtros[1] : term[1],
			color: term === undefined ? filtros[2] : term[2],
			calidad: term === undefined ? filtros[3] : term[3],
			marcaAcc: term === undefined ? filtros[4] : term[4],
			tipo: term === undefined ? filtros[5] : term[5]
		},
		headers: {
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": localStorage.getItem('user_id')
          }
	}
	//   console.log(params);
	  	  	  
	//   const respuesta = await Productos.get(categoria , params);
	axios.get(`http://149.56.237.70:81/api/shop/${categoria}`, params
		 
	 )
	 .then((respuesta) => {
		console.log(respuesta);
		this.setState( { dataCompleta: respuesta.data, products: respuesta.data.data, loading: false } );
		// console.log(wordToSearch);
		
	 })
	 .catch((error) => {
		console.log(error);
	 })
	
	}
// No se usa mientras los filtros estén en la sidebar
	/* filtrarTermino(term){
		const { wordToSearch } = this.props;
	       
		   this.setState({ filtros: wordToSearch });
		   console.log(wordToSearch);
		     
		   this.busquedaDePrueba(this.props.categoria, 0, wordToSearch);
	   
	} */
	
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
		this.busquedaDePrueba(this.props.categoria, actualPage);
	}

	render() {
		const { match } = this.props;
		const { products, loading, paginaActual, dataCompleta } = this.state;
		const flechas = {
			flechaIzq: "<",
			flechaDer: ">",
			dobleFlechaIzq: "<<",
			dobleFlechaDer: ">>"
		}
		return (
			<div className="shop-wrapper">
				<PageTitleBar title={<IntlMessages id={`sidebar.${this.props.categoria ? this.props.categoria : 'shop'}`} />} match={match} />
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
							{/* <div className="col-lg-3 col-md-4 d-none d-md-block">
								<Filters onFiltrarTermino={ this.filtrarTermino.bind(this)} categoria={this.props.categoria} />
							</div> */}
						<div className="col-lg-12 col-md-12 col-sm-12">  {/*Para filtros dentro del shop content className= "col-lg-12 col-md-8 col-sm-12" */}
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
										<Grid container spacing={2} justify="center">
											{
											   Array.isArray(products) && products.map((product, index) => {
											     return(
													<Grid key={index} item xs={6} sm={4} md={3} lg={3} xl={3}>
														<Hit hit={product} key={index} />
													</Grid>
											     );
											   })
											}
										</Grid>
										)
									}
						</div>	
									<div className="text-center">
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

const mapStateToProps = ({ ecommerce }) => {
	const { wordToSearch } = ecommerce;
	return { wordToSearch };
}

export default connect(mapStateToProps)(Shop);

