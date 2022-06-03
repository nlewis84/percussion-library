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
import SanitizeInstrument from '../helpers/sanitizeInstrument';
import TruncateText from '../helpers/truncateText';

export default function SoloSmallCardContent(item) {
  const {
    item: {
      arranger, category, composer, level, min_players, publisher, title,
    },
  } = item;

  return (
    <CardContent>
      <Typography
        variant="h7"
        noWrap
        color="secondary.main"
        sx={{ fontWeight: 'bold' }}
        component="div"
      >
        {title}
      </Typography>
      {arranger ? (
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {TruncateText(arranger, 25, true)}
        </Typography>
      ) : (
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
        >
          {TruncateText(composer, 25, true)}
        </Typography>
      )}
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
          {SanitizeInstrument(min_players, category)}
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
