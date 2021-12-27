import React from 'react';
import { Link } from '@reach/router';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
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
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography variant='h1'> Loading...</Typography>{' '}
						</CardContent>
					</Card>
				</Container>
			);

		return (
			<Container className="App" sx={{ mt: 2}}>
				<Grid container sx={{ gap: 2 }} spacing={2}>
					{items.map((item) => (
						<Card key={item.id} sx={{ width: 175 }} variant="outlined">
							<CardContent>
								<Typography variant="h5" component="div">
									{item.title}
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									{item.composer}
								</Typography>
								<Typography variant="body2">
									{SanitizeDifficulty(item.level)}
									<br />
									Players: {item.players}
								</Typography>
							</CardContent>
							<CardActions>
								<Button>
									<Link to={`ensembles/${item.id}`}>{item.title}</Link>
								</Button>
			
							</CardActions>
						</Card>
					))}
				</Grid>
			</Container>
		);
	}
}

export default All;
