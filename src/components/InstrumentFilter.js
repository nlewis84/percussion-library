import * as React from 'react';
import { useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import { useFetchInstruments } from '../hooks/api/instruments';

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

export default function InstrumentFilter({ handleChange, instrument, name }) {
  const {
    data: instrumentLabels,
  } = useFetchInstruments();
  const selectedInstrumentLabels = useMemo(
    () =>
      (instrument || [])
        .sort((a, b) => a.id - b.id)
        .map((inst) => inst),
    [instrument, instrumentLabels],
  );

  return (
    <FormControl
      size="small"
      sx={{
        '@media (max-width: 599px)': {
          minWidth: '100%',
        },
        minWidth: 132,
      }}
    >
      <InputLabel
        id="multiple-checkbox-label"
        color="secondary"
        size="small"
        sx={{
          bgcolor: 'background.default',
          color: 'secondary.dark',
          fontWeight: 'bold',
          pr: 1,
        }}
      >
        Instrument
      </InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        name={name}
        multiple
        value={instrument || []}
        onChange={handleChange}
        input={(
          <OutlinedInput
            label="Tag"
            color="secondary"
          />
        )}
        renderValue={() => selectedInstrumentLabels.join(', ')}
        MenuProps={MenuProps}
      >
        {(instrumentLabels || []).map((inst, index) => (
          <MenuItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${inst.id}-${index}`}
            value={inst.instrument}
            dense
          >
            <Checkbox checked={instrument && instrument.indexOf(inst.instrument) > -1} />
            <ListItemText primary={inst.instrument} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
