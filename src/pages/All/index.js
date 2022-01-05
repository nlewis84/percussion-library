import React from 'react';
import { Link } from '@reach/router';
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SanitizeDifficulty from '../../helpers/sanitizeDifficuty';
import TruncateText from '../../helpers/truncateText';

class All extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
		};
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_DATA_URL}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true,
				});
			});
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded)
			return (
				<Container>
					<Card>
						<CardContent>
							<Typography variant='h1'> Loading...</Typography>{' '}
						</CardContent>
					</Card>
				</Container>
			);

		return (
			<Container className="App">
				<Grid container sx={{ gap: 2, mt: 5 }} spacing={2} alignItems="center" justifyContent="center">
					{items.filter((item) => item.category === 'Percussion Ensembles').map((item) => (
						<Card key={item.id} sx={{ borderRadius: 2, height: 175, width: 175, ':hover': {
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
									Player(s): {item.players}</Typography> 
								</Box>
							</CardContent>
						</Card>
					))}
				</Grid>
			</Container>
		);
	}
}

export default All;
