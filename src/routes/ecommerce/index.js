/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import { 
	AsyncShopComponent,
	AsyncCartComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Ecommerce = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Ecommerce | Shop</title>
			<meta name="description" content="Reactify Ecommerce Shop" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/shop-list`} />
			<Route path={`${match.url}/accesorios`} component={AsyncShopComponent} />
			<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
		</Switch>
	</div>
);

export default Ecommerce;
