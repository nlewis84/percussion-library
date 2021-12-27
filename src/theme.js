import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: '#C6DC0C',
		},
		secondary: {
			main: '#210cdc',
		},
		tertiary: {
			main: '#dc890c'
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
