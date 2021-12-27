import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#dc890c',
		},
		secondary: {
			main: '#5243d4',
		},
		background: {
			default: '#eeeeee',
		},
	},
});

export default theme;
