/* eslint-disable no-eval */
import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MusicNote(props) {
	// eslint-disable-next-line no-unused-vars
	const theme = useTheme();
	// eslint-disable-next-line react/destructuring-assignment
	const color = eval(`theme.palette.${props.color}`);

	const icon = (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={color} viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none" />
			<circle cx="88" cy="184" r="40" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
			<polyline points="128 184 128 40 208 64" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
		</svg>
	);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<SvgIcon {...props}>
			{icon}
		</SvgIcon>
	);
}

MusicNote.propTypes = {
	// eslint-disable-next-line react/require-default-props
	color: PropTypes.string,
};

export default MusicNote;
