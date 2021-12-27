import React from 'react';
import { Router } from '@reach/router';
import { Container, Link, Typography } from '@mui/material';

import All from './pages/All/index';
import Show from './pages/Show/index';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
        Percussion Library
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function App() {
	return (
		<Container className="wrapper">
			<Typography variant="h1" component="h1">
        Percussion Library
			</Typography>
			<Router>
				<All path="/" />
				<Show path="ensembles/:ensembleId" />
			</Router>
			<Copyright />
		</Container>
	);
}

export default App;
