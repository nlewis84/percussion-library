import React from 'react';
import { Link } from '@reach/router';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import SanitizeDifficulty from '../../helpers/sanitizeDifficuty';

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
								<Typography variant="h7" color="primary.main" component="div">
									{item.title}
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									{item.composer}
								</Typography>
								<Typography variant="body2">
									{SanitizeDifficulty(item.level)}
									<br />
									Player(s): {item.players}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Grid>
			</Container>
		);
	}
}

export default All;
