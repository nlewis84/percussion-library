/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';

import DescriptionFormatter from '../../../helpers/descriptionFormatter';
import InstrumentationFormatter from '../../../helpers/instrumentationFormatter';
import ReviewFormatter from '../../../helpers/reviewFormatter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficulty';

import MusicNote from '../../../components/icons/MusicNote';

// TODO: make this a functional component, matching AllEnsembles
class Show extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      DataisLoaded: false,
      item: [],
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

        if (
          this.state.item.audio_link
          && this.state.item.audio_link.startsWith('https://soundcloud.com/')
        ) {
          // Audio Link embed parsing
          const res = await fetch('https://soundcloud.com/oembed', {
            body: `format=json&url=${this.state.item.audio_link}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
          });
          const audioJson = await res.json();

          this.setState({
            ...this.state,
            DataisLoaded: true,
            item: {
              ...this.state.item,
              audio_embed: audioJson.html,
              audio_thumbnail: audioJson.thumbnail_url,
            },
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

    if (!DataisLoaded) {
      return (
        <Container
          className="App"
          sx={{ mt: 3 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 1.5, px: '40%' }}
            color="text.secondary"
          >
            <Skeleton animation="wave" />
          </Typography>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontWeight: 700, mb: 1.5, px: '33%' }}
            color="secondary.main"
          >
            <Skeleton animation="wave" />
          </Typography>
          <Paper sx={{ float: 'right', pt: 0, width: '33%' }}>
            <List dense={false}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ px: '30%' }}
              >
                <Skeleton animation="wave" />
              </Typography>
              {new Array(8).fill().map((value) => React.cloneElement(
                <ListItem>
                  <ListItemIcon>
                    <MusicNote
                      color="secondary.main"
                      secondaryColor="secondary.light"
                    />
                  </ListItemIcon>
                  <Typography
                    key={value}
                    variant="body1"
                    sx={{ mb: 1, width: '50%' }}
                  >
                    <Skeleton animation="wave" />
                  </Typography>
                </ListItem>,
              ))}
            </List>
          </Paper>
          <Paper sx={{ p: 5, width: '66%' }}>
            <Typography
              variant="h6"
              color="text.primary"
            >
              <Skeleton animation="wave" />
            </Typography>
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
            >
              <SpeedTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                sx={{ width: '20%' }}
                color="text.primary"
              >
                <Skeleton animation="wave" />
              </Typography>
            </Box>
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
            >
              <AccessTimeTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                sx={{ width: '20%' }}
                color="text.primary"
              >
                <Skeleton animation="wave" />
              </Typography>
            </Box>
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
            >
              <GroupsTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                sx={{ width: '20%' }}
                color="text.primary"
              >
                <Skeleton animation="wave" />
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 5, width: '15%' }}
            >
              <Skeleton animated="wave" />
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '"30%' }}
              color="secondary.main"
            >
              <Skeleton animation="wave" />
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '"30%' }}
              color="secondary.main"
            >
              <Skeleton animation="wave" />
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '"30%' }}
              color="secondary.main"
            >
              <Skeleton animation="wave" />
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '"30%' }}
              color="secondary.main"
            >
              <Skeleton animation="wave" />
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '"30%' }}
              color="secondary.main"
            >
              <Skeleton animation="wave" />
            </Typography>
          </Paper>
        </Container>
      );
    }

    return (
      <Container
        className="App"
        sx={{ mt: 3 }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {item.category}
        </Typography>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 700, mb: 1.5 }}
          color="secondary.main"
        >
          {item.title}
        </Typography>
        {item.instrumentation
          ? InstrumentationFormatter(item.instrumentation)
          : null}
        <Paper sx={{ p: 5, width: '66%' }}>
          {item.arranger ? (
            <Typography
              variant="h6"
              color="text.primary"
            >
              {item.arranger}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              color="text.primary"
            >
              {item.composer}
            </Typography>
          )}
          {item.compilation ? (
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1.5 }}
            >
              <MenuBookTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                color="text.primary"
              >
                {item.compilation}
              </Typography>
            </Box>
          ) : null}
          {item.level ? (
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1.5 }}
            >
              <SpeedTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                sx={{ display: 'inline' }}
                color="text.primary"
              >
                {SanitizeDifficulty(item.level)}
              </Typography>
            </Box>
          ) : null}
          {item.duration ? (
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1.5 }}
            >
              <AccessTimeTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                color="text.primary"
              >
                {item.duration}
              </Typography>
            </Box>
          ) : null}
          {item.min_players ? (
            <Box
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1.5 }}
            >
              <GroupsTwoToneIcon
                sx={{ color: 'secondary.main', display: 'inline', mr: 5 }}
              />
              <Typography
                variant="body1"
                color="text.primary"
              >
                {item.min_players}
                {' '}
                {item.max_players ? `- ${item.max_players}` : ''}
              </Typography>
            </Box>
          ) : null}
          {/* split this on the bullet */}
          {item.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 5 }}
            >
              Description
            </Typography>
          ) : null}
          {item.description
            ? DescriptionFormatter(item.title, item.description)
            : null}
        </Paper>
        {item.audio_link ? (
          <Box sx={{ mt: 1.5, width: '66%' }}>{ReactHtmlParser(item.audio_embed)}</Box>
        ) : null}
        {/* TODO: make these reviews look cool */}
        {item.reviews ? (
          <Paper sx={{ p: 5, width: '66%' }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Reviews
            </Typography>
            <Typography
              variant="body3"
              color="text.primary"
            >
              {ReviewFormatter(item.reviews)}
            </Typography>
          </Paper>
        ) : null}
      </Container>
    );
  }
}

Show.propTypes = {
  ensembleId: PropTypes.string,
};

export default Show;
