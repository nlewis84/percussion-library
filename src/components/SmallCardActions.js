import React from 'react';
/* eslint-disable camelcase */
import {
  CardActions,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import HeadsetTwoToneIcon from '@mui/icons-material/HeadsetTwoTone';
import Zoom from '@mui/material/Zoom';

export default function SmallCardActions(item) {
  const {
    item: { audio_link, likes, reviews },
  } = item;

  return (
    <CardActions
      disableSpacing
      sx={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Container
        component={Stack}
        direction="row"
        alignItems="center"
        justifySelf="flex-start"
        sx={{ px: '8px !important' }}
      >
        {likes > 1 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: !reviews && !audio_link ? '10px' : '0' }}
          >
            {likes} likes
          </Typography>
        ) : null}
      </Container>
      {reviews ? (
        <Tooltip
          arrow
          title="Reviews"
          TransitionComponent={Zoom}
        >
          <IconButton disableRipple>
            <ForumTwoToneIcon sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Tooltip>
      ) : null}
      {audio_link ? (
        <Tooltip
          arrow
          title="Recording Provided"
          TransitionComponent={Zoom}
        >
          <IconButton disableRipple>
            <HeadsetTwoToneIcon sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Tooltip>
      ) : null}
    </CardActions>
  );
}
