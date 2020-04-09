/**
* Main App
*/
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// css
import './lib/reactifyCss';

// firebase
// import './firebase';

// app component
import App from './container/App';

import { configureStore } from './store';

const MainApp = () => (
	<Provider store={configureStore()}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<HashRouter hashType="slash">
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</HashRouter>
		</MuiPickersUtilsProvider>
	</Provider>
);

export default MainApp;
