/* eslint-disable no-eval */
import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

function Asterisk(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const { color } = props;
  const fill = eval(`theme.palette.${color}`);

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={fill}
      viewBox="0 0 256 256"
    >
      <line
        x1="128"
        y1="40"
        x2="128"
        y2="216"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="51.8"
        y1="84"
        x2="204.2"
        y2="172"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        x1="51.8"
        y1="172"
        x2="204.2"
        y2="84"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );

  return <SvgIcon {...props}>{icon}</SvgIcon>;
}

Asterisk.propTypes = {
  fill: PropTypes.string,
};

export default Asterisk;
