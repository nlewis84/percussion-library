import React from 'react';
/* eslint-disable camelcase */
import {
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import HeadsetTwoToneIcon from '@mui/icons-material/HeadsetTwoTone';
import Zoom from '@mui/material/Zoom';

export default function SmallCardActions(item) {
  const {
    item: {
      audio_link, reviews,
    },
  } = item;

  return (
    <CardActions
      disableSpacing
      sx={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      {reviews ? (
        <Tooltip
          arrow
          title="Reviews"
          TransitionComponent={Zoom}
        >
          <IconButton disableRipple>
            <ForumTwoToneIcon
              sx={{ color: 'text.secondary' }}
            />
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
            <HeadsetTwoToneIcon
              sx={{ color: 'text.secondary' }}
            />
          </IconButton>
        </Tooltip>
      ) : null}
    </CardActions>
  );
}
