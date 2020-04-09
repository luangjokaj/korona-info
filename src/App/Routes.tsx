import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Home, NotFound } from '../Views';
import '../assets/css/styles.css';

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" render={(routeProps) => <Home />} />
			<Route render={(routeProps) => <NotFound />} />
		</Switch>
	</BrowserRouter>
);
