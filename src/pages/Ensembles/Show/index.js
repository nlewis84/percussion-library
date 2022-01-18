import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, List, ListItem, ListItemIcon, Paper, Skeleton, Stack, Typography } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ReactHtmlParser from 'react-html-parser'; 

import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import DescriptionFormatter from '../../../helpers/descriptionFormatter';
import InstrumentationFormatter from '../../../helpers/instrumentationFormatter';

import MusicNote from '../../../components/icons/MusicNote';

class Show extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			item: [],
			DataisLoaded: false,
		};
	}

	componentDidMount() {
		// eslint-disable-next-line no-undef
		fetch(`${process.env.REACT_APP_DATA_URL}ensembles/${this.props.ensembleId}`)
			.then((res) => res.json())
			.then(async (json) => {
				this.setState({
					item: json[0],
				});

				if (this.state.item.audio_link && this.state.item.audio_link.startsWith('https://soundcloud.com/')) {

					// Audio Link embed parsing
					const res = await fetch('https://soundcloud.com/oembed', {
						body: `format=json&url=${this.state.item.audio_link}`,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						method: 'POST'
					});
					const audioJson = await res.json();

					this.setState({
						... this.state,
						item: {
							... this.state.item,
							audio_embed: audioJson.html,
							audio_thumbnail: audioJson.thumbnail_url,
						},
						DataisLoaded: true,
					});
				} else {
					this.setState({
						...this.state,
						DataisLoaded: true,
					});
				}
			});
	}

	render() {
		const { DataisLoaded, item } = this.state;

		if (!DataisLoaded)
			return (
				<Container className="App" sx={{ mt: 3 }}>
					<Typography variant="body2" align={'center'} sx={{ px: '40%', mb: 1.5 }} color="text.secondary"><Skeleton animation="wave" /></Typography>
					<Typography variant="h3" align={'center'} sx={{ px: '33%', fontWeight: 700, mb: 1.5 }} color="secondary.main" ><Skeleton animation="wave" /></Typography>
					<Paper sx={{ width: '33%', float: 'right', pt: 0}}>
						<List dense={false}>
							<Typography variant="body2" color="text.secondary" align='center' sx={{ px: '30%' }}><Skeleton animation="wave" /></Typography>
							{new Array(8).fill().map((value) =>
								React.cloneElement(
									<ListItem>
										<ListItemIcon>
											<MusicNote color="secondary.main"/>
										</ListItemIcon>
										<Typography key={value} variant="body1" sx={{ mb: 1, width: '50%' }} ><Skeleton animation="wave" /></Typography>
									</ListItem>
								)
							)}
						</List>
					</Paper>
					<Paper sx={{ width: '66%', p: 5 }}>
						<Typography variant="h6" color="text.primary"><Skeleton animation="wave" /></Typography>
						<Box component={Stack} direction="row" alignItems="center" >
							<SpeedOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
							<Typography variant="body1" sx={{ width: '20%' }} color="text.primary"><Skeleton animation="wave" /></Typography>
						</Box>
						<Box component={Stack} direction="row" alignItems="center" >
							<AccessTimeOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
							<Typography variant="body1" sx={{ width: '20%' }} color="text.primary"><Skeleton animation="wave" /></Typography>
						</Box>
						<Box component={Stack} direction="row" alignItems="center" >
							<GroupsOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
							<Typography variant="body1" sx={{ width: '20%' }} color="text.primary"><Skeleton animation="wave" /></Typography>
						</Box>
						<Typography variant="body2" color="text.secondary" sx={{ width: '15%', mt: 5}} ><Skeleton animated="wave" /></Typography>
						<Typography variant="body1" sx={{ width: '"30%' }} color="secondary.main"><Skeleton animation="wave" /></Typography>
						<Typography variant="body1" sx={{ width: '"30%' }} color="secondary.main"><Skeleton animation="wave" /></Typography>
						<Typography variant="body1" sx={{ width: '"30%' }} color="secondary.main"><Skeleton animation="wave" /></Typography>
						<Typography variant="body1" sx={{ width: '"30%' }} color="secondary.main"><Skeleton animation="wave" /></Typography>
						<Typography variant="body1" sx={{ width: '"30%' }} color="secondary.main"><Skeleton animation="wave" /></Typography>
					</Paper>
				</Container>

			);

		return (
			<Container className="App" sx={{ mt: 3 }}>
				<Typography variant="body2" align={'center'} sx={{ mb: 1.5 }} color="text.secondary">{item.category}</Typography>
				<Typography variant="h3" align={'center'} sx={{ fontWeight: 700, mb: 1.5 }} color="secondary.main" >{item.title}</Typography>
				{item.instrumentation ? (
					InstrumentationFormatter(item.instrumentation)
				) : null}
				<Paper sx={{ width: '66%', p: 5 }}>
					{item.arranger ? <Typography variant="h6" color="text.primary">{item.arranger}</Typography> : <Typography variant="h6" color="text.primary">{item.composer}</Typography>}
					{item.compilation ? <Box component={Stack} direction="row" alignItems="center" >
						<MenuBookOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
						<Typography variant="body1" color="text.primary">{item.compilation}</Typography>
					</Box> : null}
					{/* {item.level ? <Typography variant="body2" color="text.secondary">Level</Typography> : null} */}
					{item.level ? <Box component={Stack} direction="row" alignItems="center" >
						<SpeedOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
						<Typography variant="body1" sx={{ display: 'inline' }} color="text.primary">{SanitizeDifficulty(item.level)}</Typography>
					</Box> : null}
					{/* {item.duration ? <Typography variant="body2" color="text.secondary">Duration</Typography> : null} */}
					{item.duration ? <Box component={Stack} direction="row" alignItems="center" >
						<AccessTimeOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
						<Typography variant="body1" color="text.primary">{item.duration}</Typography>
					</Box> : null}
					{/* {item.players ? <Typography variant="body2" color="text.secondary">Personnel</Typography> : null} */}
					{item.players ? <Box component={Stack} direction="row" alignItems="center" >
						<GroupsOutlinedIcon sx={{ color: 'secondary.main', display: 'inline', mr: 5 }} />
						<Typography variant="body1" color="text.primary">{item.players}</Typography> 
					</Box> : null}
					{/* split this on the bullet */}
					{item.description ? <Typography variant="body2" color="text.secondary">Description</Typography> : null}
					{item.description ? DescriptionFormatter(item.title, item.description) : null}
				</Paper>
				{/* embed Sound Cloud player here */}
				{item.audio_link ? <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">Recording</Typography> : null}
				{item.audio_link ? (
					<Box sx={{ width: '66%' }}>
						{ReactHtmlParser(item.audio_embed)}
					</Box>
				) : null}
				{/* make these reviews look cool */}
				<Paper sx={{ width: '66%', p: 5 }}>
					{item.reviews ? <Typography variant="body3" color="text.primary">{item.reviews}</Typography> : null}
				</Paper>
			</Container>
		);
	}
}

Show.propTypes = {
	ensembleId: PropTypes.string
};

export default Show;
