/* eslint-disable react/no-array-index-key */
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from '@reach/router';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import React, { useEffect, useState } from 'react';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import SelectFilter from '../../../components/SelectFilter';
import TruncateText from '../../../helpers/truncateText';

function AllEnsembles() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATA_URL}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.sort((a, b) => a.title.localeCompare(b.title)));
        setItems(json);
        setDataisLoaded(true);
      });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let filtered = [];
    if (value.length === 0) {
      setFilteredItems([]);
    } else {
      const valueAsIntegers = value.map((item) => parseInt(item, 10));

      if (valueAsIntegers.includes(13)) {
        filtered = items
          .filter((item) => item.category === 'Percussion Ensembles')
          .filter((item) => (item.max_players === null
            ? value.includes(item.min_players) || parseInt(item.min_players, 10) >= 13
            : parseInt(item.max_players, 10) >= 13 || findCommonPlayers(
              range(
                parseInt(item.min_players, 10),
                parseInt(item.max_players, 10),
                1,
              ),
              valueAsIntegers,
            )));
      } else {
        filtered = items.filter((item) => findCommonPlayers(
          range(
            parseInt(item.min_players, 10),
            parseInt(item.max_players, 10),
            1,
          ),
          valueAsIntegers,
        ));
      }
      setFilteredItems(filtered);
    }
    setNumberOfPlayers(value);
  };

  function findCommonPlayers(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }

  function range(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  }

  if (!DataisLoaded) {
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
                  <SpeedOutlinedIcon
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
                  <GroupsOutlinedIcon
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
  return (
    <Container className="App">
      <Paper sx={{ display: 'block', mt: 2 }}>
        <SelectFilter
          handleChange={handleChange}
          numberOfPlayers={numberOfPlayers}
        />

        <Typography
          variant="body"
          color="secondary.main"
          textAlign="center"
          sx={{ display: 'block' }}
        >
          {filteredItems.length !== 0
            ? filteredItems.filter(
              (item) => item.category === 'Percussion Ensembles',
            ).length
            : items.filter((item) => item.category === 'Percussion Ensembles')
              .length}
          {' '}
          results
        </Typography>
      </Paper>
      <Grid
        container
        sx={{ gap: 2, mt: 5 }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {filteredItems.length !== 0
          ? filteredItems
            .filter((item) => item.category === 'Percussion Ensembles')
            .map((item) => (
              <Card
                key={item.id}
                sx={{
                  ':hover': {
                    boxShadow: 10,
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
            ))
          : items
            .filter((item) => item.category === 'Percussion Ensembles')
            .map((item) => (
              <Card
                key={item.id}
                sx={{
                  ':hover': {
                    boxShadow: 10,
                  },
                  borderRadius: 2,
                  height: 224,
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

export default AllEnsembles;
