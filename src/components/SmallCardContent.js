import React from 'react';
/* eslint-disable camelcase */
import {
  Box, CardContent, Stack, Typography,
} from '@mui/material';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';

import SanitizeDifficulty from '../helpers/sanitizeDifficulty';
import TruncateText from '../helpers/truncateText';

export default function SmallCardContent(item) {
  const [hover, setHover] = React.useState(false);
  const {
    item: {
      arranger,
      composer,
      level,
      max_players,
      min_players,
      publisher,
      title,
    },
  } = item;

  return (
    <CardContent>
      <Typography
        variant="h7"
        noWrap={!hover}
        color="secondary.main"
        sx={{ fontWeight: 'bold' }}
        component="div"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {TruncateText(title, 100)}
      </Typography>
      {arranger ? (
        <Typography
          sx={{
            height: hover && TruncateText(title, 100).length > 20 ? 0 : 'auto',
            mb: 1.5,
            opacity: hover && TruncateText(title, 100).length > 20 ? 0 : 1,
            transform:
              hover && TruncateText(title, 100).length > 20
                ? 'translateY(15px)'
                : 'translateY(0px)',
            transition: 'transform 0.2s, opacity 0.2s, height 0.2s',
          }}
          color="text.secondary"
        >
          {TruncateText(arranger, 25, true, publisher === 'C. Alan')}
        </Typography>
      ) : (
        <Typography
          sx={{
            height: hover && TruncateText(title, 100).length > 20 ? 0 : 'auto',
            mb: 1.5,
            opacity: hover && TruncateText(title, 100).length > 20 ? 0 : 1,
            transform:
              hover && TruncateText(title, 100).length > 20
                ? 'translateY(15px)'
                : 'translateY(0px)',
            transition: 'transform 0.2s, opacity 0.2s, height 0.2s',
          }}
          color="text.secondary"
        >
          {TruncateText(composer, 25, true, publisher === 'C. Alan')}
        </Typography>
      )}
      <Box
        component={Stack}
        direction="row"
        alignItems="center"
        sx={{
          height: hover && TruncateText(title, 100).length > 40 ? 0 : 'auto',
          opacity: hover && TruncateText(title, 100).length > 40 ? 0 : 1,
          transform:
            hover && TruncateText(title, 100).length > 40
              ? 'translateY(15px)'
              : 'translateY(0px)',
          transition: 'transform 0.2s, opacity 0.2s, height 0.2s',
        }}
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
        sx={{
          height: hover && TruncateText(title, 100).length > 55 ? 0 : 'auto',
          opacity: hover && TruncateText(title, 100).length > 55 ? 0 : 1,
          transform:
            hover && TruncateText(title, 100).length > 55
              ? 'translateY(15px)'
              : 'translateY(0px)',
          transition: 'transform 0.2s, opacity 0.2s, height 0.2s',
        }}
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
          {min_players} {max_players ? `- ${max_players}` : ''}
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
