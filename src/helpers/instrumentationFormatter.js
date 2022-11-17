/* eslint-disable react/destructuring-assignment */
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import Asterisk from '../components/icons/Asterisk';
import MusicNote from '../components/icons/MusicNote';

function InstrumentationFormatter(instrumentation) {
  let stringArray = [];
  let cleanedInstrumentation = instrumentation;

  let noteOne = '';
  let noteTwo = '';
  let noteThree = '';
  let noteFour = '';
  if (instrumentation.includes(' \u2028* ')) {
    noteOne = instrumentation.slice(instrumentation.indexOf(' \u2028* '));
    cleanedInstrumentation = instrumentation.slice(0, instrumentation.indexOf(' \u2028* '));
    if (noteOne.includes(' \u2028* * ')) {
      noteTwo = noteOne.slice(noteOne.indexOf(' \u2028* * '));
      noteOne = noteOne.slice(0, noteOne.indexOf(' \u2028* * '));
    }
  }

  if (instrumentation.includes('   *')) {
    noteOne = instrumentation.slice(instrumentation.indexOf('   *'));
    cleanedInstrumentation = instrumentation.slice(0, instrumentation.indexOf('   *'));
    if (noteOne.includes(' **')) {
      noteTwo = noteOne.slice(noteOne.indexOf(' **'));
      noteOne = noteOne.slice(0, noteOne.indexOf(' **'));
      noteTwo = noteTwo.slice(3);
      noteOne = noteOne.slice(4);
    }
  }

  if (cleanedInstrumentation.includes('*  *')) {
    noteThree = cleanedInstrumentation.slice(cleanedInstrumentation.indexOf('  *'));
    cleanedInstrumentation = cleanedInstrumentation.slice(0, cleanedInstrumentation.indexOf('  *'));
    noteThree = noteThree.slice(3);
  }

  if (cleanedInstrumentation.includes('  * ')) {
    noteFour = cleanedInstrumentation.slice(cleanedInstrumentation.indexOf('  * '));
    cleanedInstrumentation = cleanedInstrumentation.slice(0, cleanedInstrumentation.indexOf('  * '));
    noteFour = noteFour.slice(4);
  }

  let noteFive = '';
  if (cleanedInstrumentation.includes('*   *')) {
    noteFive = cleanedInstrumentation.slice(cleanedInstrumentation.indexOf('*   *'));
    cleanedInstrumentation = cleanedInstrumentation.slice(0, cleanedInstrumentation.indexOf('*   *'));
    noteFive = noteFive.slice(5);
  }

  console.log(noteFive);

  // TODO: Search for '**' in instrumentation and make
  // sure all the asterisk cases are covered by the above

  if (cleanedInstrumentation.startsWith('Soloist:')) {
    stringArray = cleanedInstrumentation
      .split('Soloist: ')
      .filter((item) => item !== '')
      .join('')
      .split('Accompaniment: ')
      .join('')
      // .filter((item) => item !== '')
      .split('•')
      .filter((item) => item !== '');
  } else if (cleanedInstrumentation.startsWith('•')) {
    stringArray = cleanedInstrumentation
      .split('•')
      .filter((item) => item !== '')
      .join()
      .split('\n,');
  } else if (cleanedInstrumentation.startsWith('\t•\t')) {
    stringArray = cleanedInstrumentation
      .split('\t•\t')
      .filter((item) => item !== '');
    // .join()
    // .split('\n,');
  } else {
    stringArray = cleanedInstrumentation
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
        <Divider
          light
          variant="center"
        />
        {noteOne !== '' && (
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={noteOne} />
          </ListItem>
        )}
        {/* TODO: Make two asterisks look better ensembles/752 */}
        {noteTwo !== '' && (
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={noteTwo} />
          </ListItem>
        )}
        {noteThree !== '' && (
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={noteThree} />
          </ListItem>
        )}
        {noteFour !== '' && (
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={noteFour} />
          </ListItem>
        )}
        {noteFive !== '' && (
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <ListItemIcon>
              <Asterisk
                color="secondary.main"
                secondaryColor="secondary.light"
              />
            </ListItemIcon>
            <ListItemText primary={noteFive} />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

export default InstrumentationFormatter;
