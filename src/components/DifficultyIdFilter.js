import * as React from 'react';
import { useMemo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import { useFetchDifficultyLevels } from '../hooks/api/difficulties';

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

export default function DifficultyIdFilter({ difficulty, handleChange, name }) {
  const {
    data: difficultyLevels,
  } = useFetchDifficultyLevels();

  const selectedDifficultyLabels = useMemo(
    () =>
      (difficultyLevels || [])
        .filter((difficultyLevel) => difficulty.includes(difficultyLevel.id))
        .sort((a, b) => a.id - b.id)
        .map((difficultyLevel) => difficultyLevel.name),
    [difficulty, difficultyLevels],
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
        Difficulty
      </InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        name={name}
        multiple
        value={difficulty}
        onChange={handleChange}
        input={(
          <OutlinedInput
            label="Tag"
            color="secondary"
          />
        )}
        renderValue={() => selectedDifficultyLabels.join(', ')}
        MenuProps={MenuProps}
      >
        {(difficultyLevels || []).map((diff) => (
          <MenuItem
            key={diff.id}
            value={diff.id}
            dense
          >
            <Checkbox checked={difficulty.indexOf(Number(diff.id)) > -1} />
            <ListItemText primary={diff.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
