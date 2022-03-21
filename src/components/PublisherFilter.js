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

const publishers = ['C. Alan', 'Tapspace'];

export default function PublisherFilter({ handleChange, name, publisher }) {
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
        Publisher
      </InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        name={name}
        multiple
        value={publisher}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {publishers.map((num) => (
          <MenuItem
            key={num}
            value={num}
          >
            <Checkbox checked={publisher.indexOf(num) > -1} />
            <ListItemText primary={num} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
