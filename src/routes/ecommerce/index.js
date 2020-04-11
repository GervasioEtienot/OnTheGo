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
				<Redirect exact from={`${match.url}/`} to={`${match.url}/accessories/accessories`} />
				<Route exact path={`${match.url}/accessories/:categoria`} component={Shop} />} />
				<Route exact path={`${match.url}/parts/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/batteries/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/Lensun/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/offers/:categoria`} component={Ofertas} />
				<Route exact path={`${match.url}/sales/:categoria`} component={Ofertas} />
				<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
				<Route path={`${match.url}/historial`} component={AsyncHistorialComponent} />
			</Switch>
		</div>
	);
};

export default Ecommerce;
