import React from 'react';
import { Typography } from '@mui/material';

function DescriptionFormatter(title, description) {
	let regex = title;
	let myArray = description.split(regex);
  
	return (myArray.map((item, i) => 
	// Check for first and last items being the title of the piece, and styles appropriately.
		item === '' 
			? <Typography key={i} component={'span'} variant="body1" sx={{ display: 'inline' }} color="secondary.main">{title}</Typography> 

		// Check for last item of array and don't add a title to the end.
			: item === myArray[myArray.length - 1]
				? <Typography key={i} variant="body1" sx={{ display: 'inline' }} color="text.primary">{item}</Typography>
				: <Typography key={i} variant="body1" sx={{ display: 'inline' }} color="text.primary">{item}
					<Typography key={i} component={'span'} variant="body1" sx={{ display: 'inline' }} color="secondary.main">{title}</Typography>
				</Typography>
	));
}

export default DescriptionFormatter;