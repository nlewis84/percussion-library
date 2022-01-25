/* eslint-disable react/no-array-index-key */
import {
  Card,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from '@reach/router';
import React, { useEffect, useState } from 'react';

import LoadingSkeleton from '../../../components/LoadingSkeleton';
import SelectFilter from '../../../components/SelectFilter';
import SmallCardContent from '../../../components/SmallCardContent';
import findCommonPlayers from '../../../helpers/findCommonPlayers';
import range from '../../../helpers/range';

function AllEnsembles() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATA_URL}`)
      .then((res) => res.json())
      .then((json) => {
        json.sort((a, b) => a.title.localeCompare(b.title));
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

  if (!DataisLoaded) {
    return (
      <LoadingSkeleton />
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
                  height: 224,
                  width: 196,
                }}
                variant="outlined"
                style={{ textDecoration: 'none' }}
                component={Link}
                to={`/ensembles/${item.id}`}
              >
                <SmallCardContent item />
              </Card>
            ))
        // TODO: Change this to be some sort of landing screen with
        // multiple different horizontal view swipers
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
                <SmallCardContent item={item} />
              </Card>
            ))}
      </Grid>
    </Container>
  );
}

export default AllEnsembles;
