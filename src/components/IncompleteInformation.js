/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import React from 'react';

function IncompleteInformation() {
  return (
    <Paper
      sx={{
        '@media (max-width: 959px)': {
          width: '100%',
        },
        mt: 1.5,
        p: 5,
        width: '66%',
      }}
    >
      <Box
        component={Stack}
        direction="row"
        alignItems="center"
        sx={{ mt: 1.5 }}
      >
        <ErrorOutlineTwoToneIcon
          sx={{ color: 'error.main', display: 'inline', mr: 5 }}
        />
        <Typography
          variant="body1"
          color="text.primary"
        >
          We realize there is some missing content from the publisher on this
          page. In the future, you will be able to submit suggestions, video links, or
          other information to help complete the Percussion Library. Use the Report an
          Issue button to let us know if there is weird formatting or typos on this
          page. Stay tuned for future updates to this page!
        </Typography>
      </Box>
    </Paper>
  );
}

export default IncompleteInformation;
