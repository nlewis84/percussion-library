import React from 'react';
import { Router } from '@reach/router';
import { Box, Container, Link, Typography } from '@mui/material';

import All from './pages/All/index';
import Show from './pages/Show/index';
import SearchAppBar from '../src/components/SearchAppBar';

function Copyright() {
	return (
		<Container sx={{ p: 5 }}>
			<Typography variant="body2" color="text.secondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://mui.com/">
        Percussion Library
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Container>
	);
}

function App() {
	return (
		<Box className="wrapper">
			<SearchAppBar />
			<Router>
				<All path="/" />
				<Show path="ensembles/:ensembleId" />
			</Router>
			<Copyright />
		</Box>
	);
}

export default App;
