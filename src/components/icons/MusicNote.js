/* eslint-disable no-eval */
import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

function MusicNote(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const { color } = props;
  const fill = eval(`theme.palette.${color}`);
  // This generates a secondary color that is the primary color with 30% opacity
  let secondaryFill = eval(`theme.palette.${color}`);
  secondaryFill += '4D';

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect
        width="256"
        height="256"
        fill="none"
      />
      <circle
        cx="88"
        cy="184"
        r="40"
        fill={secondaryFill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="128 184 128 40 208 64"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );

  return (
    <SvgIcon {...props}>
      {icon}
    </SvgIcon>
  );
}

MusicNote.propTypes = {
  fill: PropTypes.string,
};

export default MusicNote;
