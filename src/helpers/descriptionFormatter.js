/* eslint-disable no-nested-ternary */
import { Typography } from '@mui/material';
import React from 'react';

function DescriptionFormatter(title, description) {
  const regex = title;
  const myArray = description.split(regex);

  return myArray.map((item) =>
  // Check for first and last items being the title of the piece, and styles appropriately.
    (item === '' ? (
      <Typography
        key={item.id}
        component="span"
        variant="body1"
        sx={{ display: 'inline' }}
        color="secondary.main"
      >
        {title}
      </Typography>
    ) // Check for last item of array and don't add a title to the end.
      : item === myArray[myArray.length - 1] ? (
        <Typography
          key={item.id}
          variant="body1"
          sx={{ display: 'inline' }}
          color="text.primary"
        >
          {item}
        </Typography>
      ) : (
        <Typography
          key={item.id}
          variant="body1"
          sx={{ display: 'inline' }}
          color="text.primary"
        >
          {item}
          <Typography
            key={item.id}
            component="span"
            variant="body1"
            sx={{ display: 'inline' }}
            color="secondary.main"
          >
            {title}
          </Typography>
        </Typography>
      )));
}

export default DescriptionFormatter;
