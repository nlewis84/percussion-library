import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import React from 'react';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';

export default function LoadingSkeleton() {
  return (
    <Container>
      <Container sx={{ display: 'grid', mt: 5 }}>
        <Typography
          variant="body"
          color="secondary.main"
          textAlign="center"
        >
          <Skeleton animation="wave" />
        </Typography>
      </Container>
      <Grid
        container
        sx={{ gap: 2, mt: 5 }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {new Array(42).fill().map((item, index) => (
          <Card
            key={index.toString()}
            sx={{ borderRadius: 2, height: 224, width: 196 }}
            variant="outlined"
            style={{ textDecoration: 'none' }}
          >
            <CardContent>
              <Typography variant="h7">
                <Skeleton animation="wave" />
              </Typography>
              <Typography variant="body2">
                <Skeleton animation="wave" />
              </Typography>
              <Box
                component={Stack}
                direction="row"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <SpeedTwoToneIcon
                  sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ width: '50%' }}
                  color="text.primary"
                >
                  <Skeleton animated="wave" />
                </Typography>
              </Box>
              <Box
                component={Stack}
                direction="row"
                alignItems="center"
              >
                <GroupsTwoToneIcon
                  sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ width: '50%' }}
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
                <BusinessCenterTwoToneIcon
                  sx={{ color: 'secondary.main', display: 'inline', mr: 1.5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ width: '50%' }}
                  color="text.primary"
                >
                  <Skeleton animation="wave" />
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
