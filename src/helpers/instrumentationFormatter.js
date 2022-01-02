import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import BlurOn from '@mui/icons-material/BlurOn';

function InstrumentationFormatter(instrumentation) {
  
	let stringArray = instrumentation
		.split('\t•\t')
		.filter(
			(item) => 
				item !== '')
		.join()
		.split('\n,');

	console.log(stringArray);
	
	return <List dense={false} sx={{ pt: 0}}>
		{stringArray.map((value) =>
			React.cloneElement(<ListItem disableGutters disablePadding>
				<ListItemIcon>
					<BlurOn color="primary" sx={{fontSize: 12 }} />
				</ListItemIcon>
				<ListItemText primary={value} />
			</ListItem>),
		)}
	</List>;
}

export default InstrumentationFormatter;