import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 198,
    },
  },
};

const publishers = ['C. Alan', 'Tapspace'];

export default function PublisherFilter({ handleChange, name, publisher }) {
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 132, mx: 1, my: 1,
      }}
    >
      <InputLabel
        id="multiple-checkbox-label"
        color="secondary"
        size="small"
        sx={{
          bgcolor: 'background.default', color: 'secondary.dark', fontWeight: 'bold', pr: 1,
        }}
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
        input={(
          <OutlinedInput
            label="Tag"
            autoFocus
            color="secondary"
          />
        )}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {publishers.map((num) => (
          <MenuItem
            key={num}
            value={num}
            dense
          >
            <Checkbox checked={publisher.indexOf(num) > -1} />
            <ListItemText primary={num} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
