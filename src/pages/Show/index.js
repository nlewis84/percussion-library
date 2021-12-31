import React from 'react';
import { Card, CardContent, Container, Link, Typography } from '@mui/material';

class Show extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
		};
	}

	componentDidMount() {
		fetch(`${process.env.REACT_APP_DATA_URL}ensembles/${this.props.ensembleId}`)
			.then((res) => res.json())
			.then((json) => {
				console.log('json', json[0]);
				this.setState({
					item: json[0],
					DataisLoaded: true,
				});
			});
	}
	render() {
		const { DataisLoaded, item } = this.state;
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
		// console.log(item);
		return (
			<Container className="App">
				<Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">{item.category}</Typography>
				<Typography variant="h3" sx={{ mb: 1.5 }} color="primary.main" >{item.title}</Typography>
				{item.compilation ? <Typography variant="h6" color="text.secondary">{item.compilation}</Typography> : null}
				{item.arranger ? <Typography variant="h6" color="text.secondary">{item.arranger}</Typography> : <Typography variant="h6" color="text.secondary">{item.composer}</Typography>}
				{item.level ? <Typography variant="body" color="text.secondary"><strong>Level: </strong>{item.level}</Typography> : null}
				{item.duration ? <Typography variant="body1" color="text.secondary"><strong>Duration: </strong>{item.duration}</Typography> : null}
				{item.players ? <Typography variant="body1" color="text.secondary"><strong>Personnel: </strong>{item.players}</Typography> : null}
				{/* split this on the bullet */}
				{item.instrumentation ? (
					<Typography variant="body1" color="text.secondary">{item.instrumentation}</Typography>
				) : null}
				<br />
				{item.description ? <Typography variant="body1" color="text.secondary">{item.description}</Typography> : null}
				<br />
				{/* embed Sound Cloud player here */}
				{item.audio_link ? (
					<Typography variant="body2" color="text.secondary">
            Audio Link: <Link href={item.audio_link}>Sound Cloud</Link>
					</Typography>
				) : null}
				<br />
				{/* make these reviews look cool */}
				{item.reviews ? <Typography variant="body3" color="text.secondary">{item.reviews}</Typography> : null}
			</Container>
		);
	}
}

export default Show;
