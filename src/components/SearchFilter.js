import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
  '& .MuiOutlinedInput-input': {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
  },
}));

export default function SearchFilter({ handleChange, search }) {
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
        Search
      </InputLabel>
      <StyledOutlinedInput
        placeholder="pickering has no skill..."
        value={search}
        onChange={handleChange}
      />
    </FormControl>
  );
}
