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
				<title>Ecommerce | Shop</title>
				<meta name="description" content="Reactify Ecommerce Shop" />
			</Helmet>
			<Switch>
				<Redirect exact from={`${match.url}/`} to={`${match.url}/shop-list`} />
				<Route exact path={`${match.url}/accesorios/:id`} component={Shop} />
				<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
			</Switch>
		</div>
	);
};

export default Ecommerce;
