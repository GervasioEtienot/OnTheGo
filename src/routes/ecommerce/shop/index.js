/**
 * Shop Page
 */
import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	Hits,
	Stats,
	SortBy,
	Pagination,
	Configure,
	MenuSelect,
	Panel,
	SearchBox
} from 'react-instantsearch-dom';
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
import Youtube from '../../../apis/Youtube';

import Grid from '@material-ui/core/Grid';

 

/* const client = algoliasearch(
	'latency',
	'6be0576ff61c053d5f9a3225e2a90f76'
); */

export default class Shop extends Component {
	state = {
		     videos: [],
			 loading: true,
			//  categ: 'accesorios' 
			}

    componentWillMount(){
	   this.busquedaDePrueba();
	}
	
	componentWillReceiveProps(nextProps){
		this.busquedaDePrueba();
	}

	async busquedaDePrueba() {
	  
	  const { match } = this.props;
	  var categ = match.params.categoria;
	//   const { categ } = this.state;
	  console.log(match.params.categoria);
	  
	  
	  const respuesta = await Productos.get(match.params.categoria,{
		params: {
			maxResults: 30,
			
		}
	});
		console.log(respuesta.data.data);
		this.setState( { videos: respuesta.data.data, loading: false } );
	
	}
	// prueba(){
	//    const { match } = this.props;
	//    const { categ } = this.state;
	//    if(match.params.categoria === categ){
	// 	   this.setState({ categ: match.params.categoria })
	//    } 
    // }
	render() {
		const { match } = this.props;
		const { videos, loading } = this.state;
		
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
								{/* <Filters /> */}
							</div>
							<div className="col-lg-9 col-md-8 col-sm-12">
								<div className="shop-content">
									<div className="stats-info d-flex mb-30 justify-content-between align-items-center">
										<div className="app-selectbox-sm w-30">
											
										</div>
										
									</div>
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
									
									<div className="pagination mb-30">
										
									</div>
								</div>
							</div>
						</div>
					
				</div>
			</div>
		)
	}
}