/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Shop from './shop';
// async components
import { 
	AsyncShopComponent,
	AsyncCartComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Ecommerce = ({ match }) => {
	return (
		<div className="content-wrapper">
			<Helmet>
				<title>ON THE GO</title>
				<meta name="description" content="Reactify Ecommerce Shop" />
			</Helmet>
			<Switch>
				<Redirect exact from={`${match.url}/`} to={`${match.url}/accesorios/accesorios`} />
				<Route exact path={`${match.url}/accesorios/:categoria`} component={Shop} />} />
				<Route exact path={`${match.url}/partes/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/baterias/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/Lensum/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/promos/:categoria`} component={Shop} />
				<Route exact path={`${match.url}/liquidacion/:categoria`} component={Shop} />
				<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
			</Switch>
		</div>
	);
};

export default Ecommerce;
