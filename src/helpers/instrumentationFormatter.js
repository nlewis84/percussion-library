import React from 'react';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import MusicNote from '../components/icons/MusicNote';

function InstrumentationFormatter(instrumentation) {
	let stringArray = [];

	if (instrumentation.startsWith('•')) {
		stringArray = instrumentation
			.split('•')
			.filter(
				(item) => 
					item !== '')
			.join()
			.split('\n,');
	} else if (instrumentation.startsWith('\t•\t')) {
		stringArray = instrumentation
			.split('\t•\t')
			.filter(
				(item) => 
					item !== '')
			.join()
			.split('\n,');
	} else {
		stringArray = instrumentation.split('\n').filter(
			(item) => 
				item !== '')
			.join()
			.split('\t•\t')
			.filter(
				(item) => 
					item !== '')
			.map((item) => item[item.length - 1] === ',' ? item.slice(0, -1) : item);
	}
	
	return (
		<Paper sx={{ width: '33%', float: 'right', pt: 0}}>
			<List dense={false}>
				<Typography variant="body2" color="text.secondary" align='center'>Instrumentation</Typography>
				{stringArray.map((value) =>
					React.cloneElement(
						<ListItem>
							<ListItemIcon>
								<MusicNote color="secondary.main"/>
							</ListItemIcon>
							<ListItemText primary={value} />
						</ListItem>
					)
				)}
			</List>
		</Paper>
	);}

export default InstrumentationFormatter;