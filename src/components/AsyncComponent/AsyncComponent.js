/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';




// shop 
const AsyncShopComponent = Loadable({
	loader: () => import("Routes/ecommerce/shop"),
	loading: () => <RctPageLoader />,
});

// cart 
const AsyncCartComponent = Loadable({
	loader: () => import("Routes/ecommerce/cart"),
	loading: () => <RctPageLoader />,
});


export { 
	AsyncShopComponent,
	AsyncCartComponent
};
