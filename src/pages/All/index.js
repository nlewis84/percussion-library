import React from 'react';
import { Link } from '@reach/router';
import { Card, CardContent, Container, Paper, Typography } from '@mui/material';
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
			<Container className="App">
				{items.map((item) => (
					<Paper key={item.id} >
						<Card sx={{ maxWidth: 275 }} variant="outlined">
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
									{item.players}
								</Typography>
								<Link to={`ensembles/${item.id}`}>{item.title}</Link> by{' '}
								{item.composer}
							</CardContent>
						</Card>
					</Paper>
				))}
			</Container>
		);
	}
}

export default All;
