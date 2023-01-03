/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import {
  Box,
  Container,
  IconButton,
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
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import DescriptionFormatter from '../../../helpers/descriptionFormatter';
import InstrumentationFormatter from '../../../helpers/instrumentationFormatter';
import ReviewFormatter from '../../../helpers/reviewFormatter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficulty';
import TruncateText from '../../../helpers/truncateText';

import MusicNote from '../../../components/icons/MusicNote';

function Show(props) {
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [likedThisLoad, setLikedThisLoad] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATA_URL}ensembles/${props.ensembleId}`)
      .then((res) => res.json())
      .then(async (json) => {
        setItem(json[0]);
        setLikeCount(json[0].likes);
        setViewCount(json[0].views);

        // TODO: Simplfy this using async calls. This is not working right now.
        if (
          json[0].audio_link
          && json[0].audio_link.startsWith('https://soundcloud.com/')
        ) {
          // Audio Link embed parsing
          const res = await fetch('https://soundcloud.com/oembed', {
            body: `format=json&url=${json[0].audio_link}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
          });
          const audioJson = await res.json();
          setItem({
            ...item,
            audio_embed: audioJson.html,
            audio_thumbnail: audioJson.thumbnail_url,
          });
        } else {
          setItem({
            ...item,
            non_sound_cloud_audio_link: json[0].audio_link,
          });
        }

        if (json[0].video_link1 || json[0].video_link2) {
          const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
          let link1 = '';

          if (json[0].video_link1) {
            link1 = json[0].video_link1.match(regExp);
            if (link1 && link1[7].length === 11) {
              // eslint-disable-next-line prefer-destructuring
              link1 = link1[7];
            }
          }

          let link2 = '';
          if (json[0].video_link2) {
            link2 = json[0].video_link2.match(regExp);
            if (link2 && link2[7].length === 11) {
              // eslint-disable-next-line prefer-destructuring
              link2 = link2[7];
            }
          }

          setItem({ ...item, video_link1: link1, video_link2: link2 });
        }
        setDataisLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        fetch(`${process.env.REACT_APP_DATA_URL}ensembles/${props.ensembleId}/views`, {
          body: JSON.stringify({
            views: item.views + 1,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })
          .then((res) => res.json())
          .then((json) => {
            setItem({
              ...item,
              views: json.views,
            });
            setViewCount(json.views);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            {new Array(8).fill().map((value, i) =>
              React.cloneElement(
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={i}>
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

  const handleLike = () => {
    fetch(`${process.env.REACT_APP_DATA_URL}ensembles/${props.ensembleId}`, {
      body: JSON.stringify({
        likes: item.likes + 1,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((json) => {
        setItem({
          ...item,
          likes: json.likes,
        });
        setLikeCount(json.likes);
        setLikedThisLoad(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      className="App"
      sx={{ mt: 3 }}
    >
      {console.log(item)}
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
      <Container
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          pt: 0,
          width: '50%',
        }}
      >
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            pt: 0,
            width: '50%',
          }}
        >
          <IconButton
            aria-label="like"
            onClick={() => handleLike(item.id)}
            disabled={likedThisLoad}
            sx={{
              '&:active': {
                transform: 'scale(1.1) rotate(-30deg)',
                transition: 'transform 0.1s',
                transitionTimingFunction: 'ease-out',
              },
            }}
          >
            <ThumbUpTwoToneIcon sx={{ color: 'secondary.main' }} />
          </IconButton>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'inline' }}
          >
            {likeCount}
          </Typography>
          {/* TODO: Add a WarningTwoToneIcon that links to an
            action for users to report an issue with this page */}
        </Container>
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            pt: 0,
            width: '50%',
          }}
        >
          <IconButton
            aria-label="view"
            disabled
          >
            <VisibilityTwoToneIcon sx={{ color: 'secondary.main' }} />
          </IconButton>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'inline' }}
          >
            {viewCount}
          </Typography>
        </Container>
      </Container>
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
              {item.min_players}{' '}
              {item.max_players ? `- ${item.max_players}` : ''}
            </Typography>
          </Box>
        ) : null}
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
          ? DescriptionFormatter(TruncateText(item.title, 100), item.description)
          : null}
      </Paper>
      {item.audio_link ? (
        <Box sx={{ mt: 1.5, width: '66%' }}>
          {ReactHtmlParser(item.audio_embed)}
        </Box>
      ) : null}
      {item.non_sound_cloud_audio_link ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            controls
            src={item.non_sound_cloud_audio_link}
          />
        </Box>
      ) : null}
      {item.video_link1 ? (
        <Box sx={{ mt: 1.5, width: '66%' }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <iframe
            id="ytplayer"
            frameBorder="0"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${item.video_link1}`}
            title={item.title}
            type="text/html"
          />
        </Box>
      ) : null}
      {item.video_link2 ? (
        <Box sx={{ mt: 0.5, width: '66%' }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <iframe
            id="ytplayer"
            frameBorder="0"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${item.video_link2}`}
            title={item.title}
            type="text/html"
          />
        </Box>
      ) : null}
      {item.reviews ? (
        <Paper sx={{ p: 5, width: '66%' }}>
          <Box sx={{ pb: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Reviews
            </Typography>
          </Box>
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

Show.propTypes = {
  ensembleId: PropTypes.string,
};

export default Show;
