import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const number = [
	'2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13+'
];

export default function MultipleSelectCheckmarks() {
	const [numberOfPlayers, setNumberOfPlayers] = React.useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setNumberOfPlayers(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<FormControl sx={{ m: 2, width: 300 }}>
			<InputLabel id="multiple-checkbox-label" sx={{bgcolor: 'background.paper', pr: 1}}>Number of Players</InputLabel>
			<Select
				labelId="multiple-checkbox-label"
				id="multiple-checkbox"
				multiple
				value={numberOfPlayers}
				onChange={handleChange}
				input={<OutlinedInput label="Tag" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
				labelWidth={300}
			>
				{number.map((num) => (
					<MenuItem key={num} value={num}>
						<Checkbox checked={numberOfPlayers.indexOf(num) > -1} />
						<ListItemText primary={num} />
					</MenuItem>
				))}
			</Select>
		</FormControl>

	);
}