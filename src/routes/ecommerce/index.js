/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Shop from './shop';
import Ofertas from './Ofertas';
// async components
import { 
	AsyncShopComponent,
	AsyncCartComponent,
	AsyncHistorialComponent
} from 'Components/AsyncComponent/AsyncComponent';


const Ecommerce = ({ match }) => {
	return (
		<div className="content-wrapper">
			<Helmet>
				<title>ON THE GO</title>
				<meta name="description" content="Reactify Ecommerce Shop" />
			</Helmet>
			<Switch>
				<Redirect exact from={`${match.url}/`} to={`${match.url}/accessories`} />
				<Route exact path={`${match.url}/accessories`} render={(props) => <Shop {...props} categoria='accessories'/>} />
				<Route exact path={`${match.url}/parts`} render={(props) => <Shop {...props} categoria='parts'/>} />
				<Route exact path={`${match.url}/batteries`} render={(props) => <Shop {...props} categoria='batteries'/>} />
				<Route exact path={`${match.url}/Lensun`} render={(props) => <Shop {...props} categoria='lensun'/>} />
				<Route exact path={`${match.url}/offers`} render={(props) => <Ofertas {...props} categoria='offers'/>} />
				<Route exact path={`${match.url}/sales`} render={(props) => <Ofertas {...props} categoria='sales'/>} />
				<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
				<Route path={`${match.url}/historial`} component={AsyncHistorialComponent} />
			</Switch>
		</div>
	);
};

export default Ecommerce;
