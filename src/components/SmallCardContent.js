import React from 'react';
/* eslint-disable camelcase */
import {
  Box,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';

import SanitizeDifficulty from '../helpers/sanitizeDifficulty';
import TruncateText from '../helpers/truncateText';

export default function SmallCardContent(item) {
  const {
    item: {
      composer, level, max_players, min_players, publisher, title,
    },
  } = item;

  return (
    <CardContent>
      <Typography
        variant="h7"
        color="secondary.main"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        {TruncateText(title, 32)}
      </Typography>
      <Typography
        sx={{ mb: 1.5 }}
        color="text.secondary"
      >
        {TruncateText(composer, 25)}
      </Typography>
      <Box
        component={Stack}
        direction="row"
        alignItems="center"
      >
        <SpeedTwoToneIcon
          sx={{
            color: 'secondary.main',
            display: 'inline',
            mr: 1.5,
          }}
        />
        <Typography
          variant="body2"
          sx={{ display: 'inline' }}
          color="text.primary"
        >
          {SanitizeDifficulty(level)}
        </Typography>
      </Box>
      <Box
        component={Stack}
        direction="row"
        alignItems="center"
      >
        <GroupsTwoToneIcon
          sx={{
            color: 'secondary.main',
            display: 'inline',
            mr: 1.5,
          }}
        />
        <Typography
          variant="body2"
          color="text.primary"
        >
          Player(s):
          {' '}
          {min_players}
          {' '}
          {max_players ? `- ${max_players}` : ''}
        </Typography>
      </Box>
      <Box
        component={Stack}
        direction="row"
        alignItems="center"
      >
        <BusinessCenterTwoToneIcon
          sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }}
        />
        <Typography
          variant="body2"
          color="text.primary"
        >
          {publisher}
        </Typography>
      </Box>
    </CardContent>
  );
}
