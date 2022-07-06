/* eslint-disable no-nested-ternary */
import { Box, Typography } from '@mui/material';
import React from 'react';

function ReviewFormatter(review) {
  const hyphenOne = /\s–/;
  const hyphenTwo = /\s—+]*}*(?!.*—)/;
  let reviewText = '';
  let author = '';

  // eslint-disable-next-line react/destructuring-assignment
  if (review.split(hyphenOne)[0] !== review) {
    // eslint-disable-next-line react/destructuring-assignment
    [reviewText, author] = review.split(hyphenOne);
    // eslint-disable-next-line react/destructuring-assignment
  } else if (review.split(hyphenTwo)[0] !== review) {
    // eslint-disable-next-line react/destructuring-assignment
    [reviewText, author] = review.split(hyphenTwo);
  } else {
    reviewText = review;
  }

  return (
    <>
      <Box
        sx={{
          border: 4, borderBottom: 0, borderColor: 'secondary.main', borderRight: 0, borderTop: 0, pl: 4,
        }}
      >

        <Typography
          variant="body1"
        // sx={{ display: 'inline' }}
          color="text.primary"
        >
          {reviewText}
        </Typography>
      </Box>
      <Typography
        // component="span"
        variant="body1"
        sx={{ mt: 2 }}
        color="secondary.main"
      >
        {author}
      </Typography>
    </>
  );
}

export default ReviewFormatter;
