import React from 'react';

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
				<div>
					<h1> Loading...</h1>{' '}
				</div>
			);
		console.log(item);
		return (
			<div className="App">
				<h1> {item.title} </h1>
				<ol>Title: {item.title}</ol>
				{item.compilation ? <ol>Compilation: {item.compilation}</ol> : null}
				<ol>Composer: {item.composer}</ol>
				{item.arranger ? <ol>Arranger: {item.arranger}</ol> : null}
				{item.level ? <ol>Difficulty: {item.level}</ol> : null}
				{item.duration ? <ol>Duration: {item.duration}</ol> : null}
				{item.players ? <ol>Players: {item.players}</ol> : null}
				{item.instrumentation ? (
					<ol>Instrumentation: {item.instrumentation}</ol>
				) : null}
				<ol>Category: {item.category}</ol>
				{item.overview ? <ol>Overview: {item.overview}</ol> : null}
				{item.description ? <ol>Description: {item.description}</ol> : null}
				{item.audio_link ? (
					<ol>
            Audio Link: <a href={item.audio_link}>Sound Cloud</a>
					</ol>
				) : null}
				{item.reviews ? <ol>Reviews: {item.reviews}</ol> : null}
			</div>
		);
	}
}

export default Show;
