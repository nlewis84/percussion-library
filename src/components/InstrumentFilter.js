import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const levels = [
  'Snare',
  'Keyboard',
  'Drumset',
  'Multi Perc',
  'Timpani',
  'Tenors',
  'Steel Drum',
  'Djembe',
];

export default function InstrumentFilter({ handleChange, instrument, name }) {
  return (
    <FormControl
      sx={{
        mb: 2, mt: 4, mx: 5, width: 200,
      }}
    >
      <InputLabel
        id="multiple-checkbox-label"
        sx={{ bgcolor: 'background.paper', pr: 1 }}
      >
        Instrument
      </InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        name={name}
        multiple
        value={instrument}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {levels.map((num) => (
          <MenuItem
            key={num}
            value={num}
          >
            <Checkbox checked={instrument.indexOf(num) > -1} />
            <ListItemText primary={num} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
