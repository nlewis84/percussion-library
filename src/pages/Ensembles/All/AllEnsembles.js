/* eslint-disable react/no-array-index-key */
import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from '@reach/router';
import React, { useMemo, useState } from 'react';

import { useFetchDifficultyLevels } from '../../../hooks/api/difficulties';
import { useFetchEnsembles } from '../../../hooks/api/ensembles';
import DifficultyFilter from '../../../components/DifficultyFilter';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import NumberOfPlayersFilter from '../../../components/NumberOfPlayersFilter';
import PublisherFilter from '../../../components/PublisherFilter';
import SmallCardActions from '../../../components/SmallCardActions';
import SmallCardContent from '../../../components/SmallCardContent';

// TODO: Save Filters in the query params so that links can be shared to a
// specific filter also so when you press back your filters are saved

function AllEnsembles() {
  const [numberOfPlayers, setNumberOfPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [publisher, setPublisher] = useState([]);

  const {
    data: difficultyLevels,
  } = useFetchDifficultyLevels();

  const queryParams = useMemo(() => ({
    category: 'Percussion Ensembles',
    difficulty_level_id: difficulty.map((d) => difficultyLevels.find((dl) => dl.name === d).id),
    number_of_players: numberOfPlayers,
    publisher,
  }), [difficulty, difficultyLevels, numberOfPlayers, publisher]);

  const {
    data: ensembles,
    isLoading,
  } = useFetchEnsembles(queryParams);

  // TODO: Move all this filtering to the backend.
  const handleChange = (event) => {
    const { target } = event;

    // This logic sets the correct state based on the event.target.name
    if (target.name === 'Players') {
      setNumberOfPlayers(target.value);
    } else if (target.name === 'Difficulty') {
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      setPublisher(target.value);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Container
      className="App"
      maxWidth="none"
    >
      <Container
        className="Filters"
        sx={{ textAlign: 'center' }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'transparent',
            display: 'inline-block',
            mr: 2,
            mt: 2,
            py: 1,
            width: '99%',
          }}
        >
          <NumberOfPlayersFilter
            handleChange={handleChange}
            name="Players"
            numberOfPlayers={numberOfPlayers}
          />
          <DifficultyFilter
            handleChange={handleChange}
            name="Difficulty"
            difficulty={difficulty}
          />
          <PublisherFilter
            handleChange={handleChange}
            name="Publisher"
            publisher={publisher}
          />

          {/* <Typography
            variant="body"
            color="secondary.main"
            textAlign="center"
            sx={{ display: 'block' }}
          >
            {
            // eslint-disable-next-line no-nested-ternary
            filterIsOn
              ? filteredItems.length === 0
                ? '0'
                : filteredItems.filter(
                  (item) => item.category === 'Percussion Ensembles',
                ).length
              : items.filter((item) => item.category === 'Percussion Ensembles').length
            }
            {' '}
            {filteredItems.length === 1 ? 'result' : 'results'}
          </Typography> */}
        </Paper>
      </Container>

      <Grid
        container
        sx={{ gap: 2, mt: 2 }}
        spacing={0}
        alignItems="center"
        justifyContent="center"
        xs={12}
      >
        {(ensembles && ensembles.length === 0) ? (
          <Card
            key="no_items_to_show"
            sx={{
              ':hover': {
                boxShadow: 10,
              },
              '@media (max-width:599px)': {
                width: '99%',
              },
              borderRadius: 2,
              height: 224,
              width: 196,
            }}
            variant="outlined"
            style={{ textDecoration: 'none' }}
          >
            <CardContent>
              <Typography
                variant="h7"
                color="secondary.main"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
                component="div"
              >
                Whoops
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center' }}
                color="text.primary"
              >
                No items match that criteria
              </Typography>
            </CardContent>
          </Card>
        ) : (
          (ensembles || []).map((item) => (
            <Card
              key={item.id}
              sx={{
                ':hover': {
                  boxShadow: 10,
                },
                '@media (max-width:599px)': {
                  width: '99%',
                },
                borderRadius: 2,
                height: 224,
                width: 196,
              }}
              variant="outlined"
              style={{ textDecoration: 'none' }}
              component={Link}
              rel="noreferrer"
              target="_blank"
              to={`/ensembles/${item.id}`}
            >
              <SmallCardContent item={item} />
              <SmallCardActions item={item} />
            </Card>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default AllEnsembles;
