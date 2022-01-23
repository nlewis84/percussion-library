import { Router } from '@reach/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';

import AllEnsembles from './pages/Ensembles/All/AllEnsembles';
import AllSolos from './pages/Solos/All/AllSolos';
import SearchAppBar from './components/SearchAppBar';
import Show from './pages/Ensembles/Show/index';

function Copyright() {
  return (
    <Container sx={{ p: 5 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {'Copyright © '}
        <Link
          color="inherit"
          href="https://nathanlewis.dev/"
          target="_blank"
        >
          Percussion Library
        </Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    </Container>
  );
}

function App() {
  return (
    <Box className="wrapper">
      <SearchAppBar />
      <Router>
        <AllEnsembles path="/" />
        <AllSolos path="/solos" />
        <Show path="ensembles/:ensembleId" />
      </Router>
      <Copyright />
    </Box>
  );
}

export default App;
