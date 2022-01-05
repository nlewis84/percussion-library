import React from 'react';
import { Router } from '@reach/router';
import { Container, Link, Paper, Typography } from '@mui/material';

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
		<Paper className="wrapper">
			<SearchAppBar />
			{/* <Paper className="wrapper" sx={{ mt: 2 }}> */}
			<Router>
				<All path="/" />
				<Show path="ensembles/:ensembleId" />
			</Router>
			{/* </Paper> */}
			<Copyright />
		</Paper>
	);
}

export default App;
