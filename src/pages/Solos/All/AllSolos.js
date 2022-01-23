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
import { Link } from '@reach/router';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import React from 'react';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import TruncateText from '../../../helpers/truncateText';

// TODO: make this a functional component, matching AllEnsembles
class AllSolos extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      DataisLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_DATA_URL}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          DataisLoaded: true,
          items: json,
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded) {
      return (
        <Container>
          <Container
            sx={{ display: 'grid', mt: 5 }}
            alignItems="center"
            justifyContent="center"
          >
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
            {new Array(42).fill().map((item) => (
              <Card
                key={item.id}
                sx={{ borderRadius: 2, height: 196, width: 196 }}
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
                    <SpeedOutlinedIcon
                      sx={{
                        color: 'secondary.main',
                        display: 'inline',
                        mr: 1.5,
                      }}
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
                    <GroupsOutlinedIcon
                      sx={{
                        color: 'secondary.main',
                        display: 'inline',
                        mr: 1.5,
                      }}
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
    console.log(items);
    return (
      <Container className="App">
        <Container
          sx={{ display: 'grid', mt: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="body"
            color="secondary.main"
            textAlign="center"
          >
            {items.filter((item) => item.category.startsWith('Solo')).length}
            {' '}
            results
          </Typography>
        </Container>
        <Grid
          container
          sx={{ gap: 2, mt: 5 }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {items
            .filter((item) => item.category.startsWith('Solo'))
            .map((item) => (
              <Card
                key={item.id}
                sx={{
                  ':hover': {
                    boxShadow: 10, // theme.shadows[20]
                  },
                  borderRadius: 2,
                  height: 196,
                  width: 196,
                }}
                variant="outlined"
                style={{ textDecoration: 'none' }}
                component={Link}
                to={`/ensembles/${item.id}`}
              >
                <CardContent>
                  <Typography
                    variant="h7"
                    color="secondary.main"
                    sx={{ fontWeight: 'bold' }}
                    component="div"
                  >
                    {TruncateText(item.title, 32)}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                  >
                    {TruncateText(item.composer, 25)}
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
                      {SanitizeDifficulty(item.level)}
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
                      Player(s):
                      {' '}
                      {item.min_players}
                      {' '}
                      {item.max_players ? `- ${item.max_players}` : ''}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Grid>
      </Container>
    );
  }
}

export default AllSolos;
