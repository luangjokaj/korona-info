import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Routes from './Routes';
import ScrollToTop from '../Components/ScrollToTop';

const App = () => {
	return (
		<Router>
			<ScrollToTop>
				<Routes />
			</ScrollToTop>
		</Router>
	);
};

const AppRoot = hot(module)(() => <App />);

export default AppRoot;
