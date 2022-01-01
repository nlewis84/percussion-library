import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Container, Link, Typography } from '@mui/material';

import SanitizeDifficulty from '../../helpers/sanitizeDifficuty';
import DescriptionFormatter from '../../helpers/descriptionFormatter';

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
				<Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }} color="primary.main" >{item.title}</Typography>
				{item.compilation ? <Typography variant="h6" color="text.primary">{item.compilation}</Typography> : null}
				{item.arranger ? <Typography variant="h6" color="text.primary">{item.arranger}</Typography> : <Typography variant="h6" color="text.primary">{item.composer}</Typography>}
				{item.level ? <Typography variant="body2" color="text.secondary">Level</Typography> : null}
				{item.level ? <Typography variant="body1" color="text.primary">{SanitizeDifficulty(item.level)}</Typography> : null}
				{item.duration ? <Typography variant="body2" color="text.secondary">Duration</Typography> : null}
				{item.duration ? <Typography variant="body1" color="text.primary">{item.duration}</Typography> : null}
				{item.players ? <Typography variant="body2" color="text.secondary">Personnel</Typography> : null}
				{item.players ? <Typography variant="body1" color="text.primary">{item.players}</Typography> : null}
				{item.instrumentation ? <Typography variant="body2" color="text.secondary">Instrumentation</Typography> : null}
				{/* split this on the bullet */}
				{item.instrumentation ? (
					<Typography variant="body1" sx={{ mb: 1.5 }} color="text.primary">{item.instrumentation}</Typography>
				) : null}
				{item.description ? DescriptionFormatter(item.title, item.description) : null}
				{/* embed Sound Cloud player here */}
				{item.audio_link ? (
					<Typography variant="body2" sx={{ mb: 1.5 }} color="text.primary">
            Audio Link: <Link href={item.audio_link}>Sound Cloud</Link>
					</Typography>
				) : null}
				{/* make these reviews look cool */}
				{item.reviews ? <Typography variant="body3" color="text.primary">{item.reviews}</Typography> : null}
			</Container>
		);
	}
}

Show.propTypes = {
	ensembleId: PropTypes.string
};

export default Show;
