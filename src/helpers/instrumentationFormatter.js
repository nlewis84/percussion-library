/* eslint-disable react/destructuring-assignment */
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import MusicNote from '../components/icons/MusicNote';

// TODO: Figure out how to deal with * extra notes like *  *

function InstrumentationFormatter(instrumentation) {
  let stringArray = [];
  if (instrumentation.startsWith('Soloist:')) {
    // remove Soloist: from the start of it and also remove Accompaniment: from the middle of it
    stringArray = instrumentation
      .split('Soloist: ')
      .filter((item) => item !== '')
      .join('')
      .split('Accompaniment: ')
      .join('')
      // .filter((item) => item !== '')
      .split('•')
      .filter((item) => item !== '');
  } else if (instrumentation.startsWith('•')) {
    stringArray = instrumentation
      .split('•')
      .filter((item) => item !== '')
      .join()
      .split('\n,');
  } else if (instrumentation.startsWith('\t•\t')) {
    stringArray = instrumentation
      .split('\t•\t')
      .filter((item) => item !== '');
    // .join()
    // .split('\n,');
  } else {
    stringArray = instrumentation
      .split('\n')
      .filter((item) => item !== '')
      .join()
      .split('\t•\t')
      .filter((item) => item !== '')
      .map((item) => (item[item.length - 1] === ',' ? item.slice(0, -1) : item));
    if (stringArray[0] === ' ') {
      stringArray.splice(0, 1);
    }
  }

  return (
    <Paper
      sx={{
        float: 'right', pb: 2, pt: 1, px: 5, width: '33%',
      }}
    >
      <List dense={false}>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          Instrumentation
        </Typography>
        {stringArray.map((value) => React.cloneElement(
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <MusicNote
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={value} />
          </ListItem>,
        ))}
      </List>
    </Paper>
  );
}

export default InstrumentationFormatter;
