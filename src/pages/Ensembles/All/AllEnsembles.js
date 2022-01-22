import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import {
	Box,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	Skeleton,
	Stack,
	Typography
} from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import TruncateText from '../../../helpers/truncateText';

function AllEnsembles() {
// class AllEnsembles extends React.Component {
	// Constructor
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		items: [],
	// 		DataisLoaded: false,
	// 		numberOfPlayers: [],
	// 	};
	// }

	// componentDidMount() {
	// 	// eslint-disable-next-line no-undef
	// 	fetch(`${process.env.REACT_APP_DATA_URL}`)
	// 		.then((res) => res.json())
	// 		.then((json) => {
	// 			this.setState({
	// 				items: json,
	// 				DataisLoaded: true,
	// 			});
	// 		});
	// }

	const [state, setState] = useState([]);
	// TODO: Define each bit of state individually here

	useEffect(() => {
		fetch(`${process.env.REACT_APP_DATA_URL}`)
			.then((res) => res.json())
			.then((json) => {
				setState({
					items: json,
					filteredItems: json,
					numberOfPlayers: [],
					DataisLoaded: true,
				});
			});
	}, []);
		
	// const { DataisLoaded, filteredItems, items, numberOfPlayers } = this.state;
		
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
		
	const handleChange = (event) => {
		console.log('test');
		const {
			target: { value },
		} = event;
		let filteredItems = state.items.filter(item => value.includes(item.min_players));
		console.log(state);
		setState({
			filteredItems: filteredItems,
			// numberOfPlayers: typeof value === 'string' ? value.split(',') : value,
			DataisLoaded: true,
		});
	};

	console.log('right before return', state.DataisLoaded);
	if (!state.DataisLoaded)
		return (
			<Container>
				<Container  sx={{ mt: 5, display: 'grid' }} alignItems="center" justifyContent="center">
					<Typography variant="body" color="secondary.main" textAlign="center"><Skeleton animation="wave" /></Typography>
				</Container>
				<Grid container sx={{ gap: 2, mt: 5 }} spacing={2} alignItems="center" justifyContent="center">
					{new Array(42).fill().map((item, index) => (
						<Card key={index} sx={{ borderRadius: 2, height: 196, width: 196 }} variant="outlined" style={{ textDecoration: 'none' }} >
							<CardContent>
								<Typography variant='h7'><Skeleton animation="wave" /></Typography>
								<Typography variant='body2'><Skeleton animation="wave" /></Typography>
								<Box component={Stack} direction="row" alignItems="center" sx={{ mt: 2 }}>
									<SpeedOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }} />
									<Typography variant="body2" sx={{ width: '50%' }} color="text.primary">
										<Skeleton animated='wave' />
									</Typography>
								</Box>
								<Box component={Stack} direction="row" alignItems="center" >
									<GroupsOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }} />
									<Typography variant="body2"  sx={{ width: '50%' }} color="text.primary">
										<Skeleton animation="wave" />
									</Typography> 
								</Box>
							</CardContent>
						</Card>
					))}
				</Grid>
			</Container>
		);
	return (
		<Container className="App">
			<Paper  sx={{ mt: 2, display: 'block' }} alignItems="center" justifyContent="center">
					
				<FormControl sx={{ m: 2, width: 300 }}>
					<InputLabel id="multiple-checkbox-label" sx={{bgcolor: 'background.paper', pr: 1}}>Number of Players</InputLabel>
					<Select
						labelId="multiple-checkbox-label"
						id="multiple-checkbox"
						multiple
						value={state.numberOfPlayers}
						onChange={handleChange}
						input={<OutlinedInput label="Tag" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
						labelWidth={300}
					>
						{number.map((num) => (
							<MenuItem key={num} value={num}>
								<Checkbox checked={state.numberOfPlayers.indexOf(num) > -1} />
								<ListItemText primary={num} />
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Typography variant="body" color="secondary.main" textAlign="center" sx={{ display: 'block'}}>{state.filteredItems.filter((item) => item.category === 'Percussion Ensembles').length} results</Typography>
			</Paper>
			<Grid container sx={{ gap: 2, mt: 5 }} spacing={2} alignItems="center" justifyContent="center">
				{state.filteredItems.filter((item) => item.category === 'Percussion Ensembles').map((item) => (
					<Card key={item.id} sx={{ borderRadius: 2, height: 196, width: 196, ':hover': {
						boxShadow: 10, // theme.shadows[20]
					}, }}  variant="outlined" style={{ textDecoration: 'none' }} component={Link} to={`/ensembles/${item.id}`}>
						<CardContent>
							<Typography variant="h7" color="secondary.main" sx={{ fontWeight: 'bold' }} component="div">
								{TruncateText(item.title, 32)}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{TruncateText(item.composer, 25)}
							</Typography>
							<Box component={Stack} direction="row" alignItems="center" >
								<SpeedOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }} />
								<Typography variant="body2" sx={{ display: 'inline' }} color="text.primary">
									{SanitizeDifficulty(item.level)}
								</Typography>
							</Box>
							<Box component={Stack} direction="row" alignItems="center" >
								<GroupsOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }} />
								<Typography variant="body2" color="text.primary">
									Player(s): {item.min_players} {item.max_players ? `- ${item.max_players}` : ''}</Typography> 
							</Box>
						</CardContent>
					</Card>
				))}
			</Grid>
		</Container>
	);

}

export default AllEnsembles;
