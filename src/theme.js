import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			light: '#F7C948',
			main: '#F0B429',
			dark: '#DE911D',
		},
		secondary: {
			light: '#2BB0ED',
			main: '#1992D4',
			dark: '#127FBF',
		},
		text: {
			primary: '#222222',
			secondary: '#9E9E9E',
			disabled: '#E1E1E1'
		},
		background: {
			paper: '#F7F7F7',
			default: '#E1E1E1',
		},
	},
});

export default theme;
