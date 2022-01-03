import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MusicNote(props) {
	// eslint-disable-next-line no-unused-vars
	const theme = useTheme();
	const color = eval(`theme.palette.${props.color}`);

	const icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={color} viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="88" cy="184" r="40" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><polyline points="128 184 128 40 208 64" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline></svg>;

	return (
		<SvgIcon {...props}>
			{icon}
		</SvgIcon>
	);
}

MusicNote.propTypes = {
	color: PropTypes.string,
};

export default MusicNote;