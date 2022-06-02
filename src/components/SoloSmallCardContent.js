/* eslint-disable camelcase */
import {
  Box,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import React from 'react';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

import SanitizeDifficulty from '../helpers/sanitizeDifficuty';
import SanitizeInstrument from '../helpers/sanitizeInstrument';
import TruncateText from '../helpers/truncateText';

export default function SoloSmallCardContent(item) {
  const {
    item: {
      category, composer, level, min_players, publisher, title,
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
        <SpeedOutlinedIcon
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
        <GroupsOutlinedIcon
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
        <MenuBookOutlinedIcon
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
