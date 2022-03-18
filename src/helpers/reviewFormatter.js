/* eslint-disable no-nested-ternary */
import { Typography } from '@mui/material';
import React from 'react';

function ReviewFormatter(review) {
  const hyphenOne = /\s–/;
  const hyphenTwo = /\s—/;
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
  console.log(author);
  return (
    <>
      <Typography
        variant="body1"
        // sx={{ display: 'inline' }}
        color="text.primary"
      >
        {reviewText}
      </Typography>
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
