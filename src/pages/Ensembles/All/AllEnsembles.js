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
import React, { useEffect, useState } from 'react';

import DifficultyFilter from '../../../components/DifficultyFilter';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import NumberOfPlayersFilter from '../../../components/NumberOfPlayersFilter';
import PublisherFilter from '../../../components/PublisherFilter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficulty';
import SmallCardActions from '../../../components/SmallCardActions';
import SmallCardContent from '../../../components/SmallCardContent';
import findCommonPlayers from '../../../helpers/findCommonPlayers';
import range from '../../../helpers/range';

// TODO: Save Filters in the query params so that links can be shared to a
// specific filter also so when you press back your filters are saved

function AllEnsembles() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [filterIsOn, setFilterIsOn] = useState(false);

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
    const { target } = event;

    if (!!numberOfPlayers || !!difficulty || !!publisher) {
      setFilterIsOn(true);
    }
    // We need to check to see if all the filters are blank, but to do that we need to
    // check the target.value instead of the state of the filter that triggered this
    // handlePublisherChange due to the async nature of setState()

    switch (!!target.value.length) {
      case true:
        // this is where we do the work of figuring out what to filter

        switch (target.name) {
          case 'Players':
            // Check the other two filters to see if they are false
            if (!difficulty.length && !publisher.length) {
              PlayerFilterAction(target.value);
              break;
            }
            if (!difficulty.length && publisher.length) {
              PublisherAndPlayerFilterAction(publisher, target.value);
              break;
            }
            if (difficulty.length && !publisher.length) {
              DifficultyAndPlayerFilterAction(difficulty, target.value);
              break;
            }
            if (difficulty.length && publisher.length) {
              FilterAllAction(target.value, difficulty, publisher);
              break;
            }
            break;
          case 'Difficulty':
            if (!numberOfPlayers.length && !publisher.length) {
              DifficultyFilterAction(target.value);
              break;
            }
            if (numberOfPlayers.length && !publisher.length) {
              DifficultyAndPlayerFilterAction(target.value, numberOfPlayers);
              break;
            }
            if (!numberOfPlayers.length && publisher.length) {
              PublisherAndDifficultyFilterAction(publisher, target.value);
              break;
            }
            if (numberOfPlayers.length && publisher.length) {
              FilterAllAction(numberOfPlayers, target.value, publisher);
              break;
            }
            break;
          case 'Publisher': // Publisher
            if (!difficulty.length && !numberOfPlayers.length) {
              PublisherFilterAction(target.value);
              break;
            }
            if (difficulty.length && !numberOfPlayers.length) {
              PublisherAndDifficultyFilterAction(target.value, difficulty);
              break;
            }
            if (!difficulty.length && numberOfPlayers.length) {
              PublisherAndPlayerFilterAction(target.value, numberOfPlayers);
              break;
            }
            if (difficulty.length && numberOfPlayers.length) {
              FilterAllAction(numberOfPlayers, difficulty, target.value);
              break;
            }
            break;
          default:
            break;
        }
        break;
      case false:
        // This current event.target.value is blank, so we need to
        // check if the other filters are also blank. If so,
        // then we will setFilteredItems([]) and call it a day.
        // If not, then we will incorporate the logic on line 108.
        switch (target.name) {
          case 'Players':
            // Check the other two filters to see if they are false
            if (!difficulty.length && !publisher.length) {
              setFilteredItems([]);
              setFilterIsOn(false);
              break;
            }
            if (!difficulty.length && publisher.length) {
              PublisherFilterAction(publisher);
              break;
            }
            if (difficulty.length && !publisher.length) {
              DifficultyFilterAction(difficulty);
              break;
            }
            if (difficulty.length && publisher.length) {
              PublisherAndDifficultyFilterAction(publisher, difficulty);
              break;
            }
            break;
          case 'Difficulty':
            if (!numberOfPlayers.length && !publisher.length) {
              setFilteredItems([]);
              setFilterIsOn(false);
              break;
            }
            if (numberOfPlayers.length && !publisher.length) {
              PlayerFilterAction(numberOfPlayers);
              break;
            }
            if (!numberOfPlayers.length && publisher.length) {
              PublisherFilterAction(publisher);
              break;
            }
            if (numberOfPlayers.length && publisher.length) {
              PublisherAndPlayerFilterAction(publisher, numberOfPlayers);
              break;
            }
            break;
          case 'Publisher': // Publisher
            if (!difficulty.length && !numberOfPlayers.length) {
              setFilteredItems([]);
              setFilterIsOn(false);
              break;
            }
            if (difficulty.length && !numberOfPlayers.length) {
              DifficultyFilterAction(difficulty);
              break;
            }
            if (!difficulty.length && numberOfPlayers.length) {
              PlayerFilterAction(numberOfPlayers);
              break;
            }
            if (difficulty.length && numberOfPlayers.length) {
              DifficultyAndPlayerFilterAction(difficulty, numberOfPlayers);
              break;
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    // This logic sets the correct state based on the event.target.name
    if (target.name === 'Players') {
      setNumberOfPlayers(target.value);
    } else if (target.name === 'Difficulty') {
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      setPublisher(target.value);
    }
  };

  let filtered = [];

  // TODO: Break these functions out into separate files.

  // Individual functions for all filtering cases.

  function FilterAllAction(play, diff, pub) {
    const valueAsIntegers = play.map((item) => parseInt(item, 10));
    if (valueAsIntegers.includes(13)) {
      filtered = items
        .filter((item) => item.category === 'Percussion Ensembles')
        .filter((item) =>
          (item.max_players === null
            ? play.includes(item.min_players)
              || parseInt(item.min_players, 10) >= 13
            : parseInt(item.max_players, 10) >= 13
              || findCommonPlayers(
                range(
                  parseInt(item.min_players, 10),
                  parseInt(item.max_players, 10),
                  1,
                ),
                valueAsIntegers,
              )))
        .filter((item) => pub.includes(item.publisher))
        .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    } else {
      filtered = items
        .filter((item) =>
          findCommonPlayers(
            range(
              parseInt(item.min_players, 10),
              item.max_players
                ? parseInt(item.max_players, 10)
                : parseInt(item.min_players, 10),
              1,
            ),
            valueAsIntegers,
          ))
        .filter((item) => pub.includes(item.publisher))
        .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    }
    setFilteredItems(filtered);
  }

  function PublisherAndDifficultyFilterAction(pub, diff) {
    filtered = items
      .filter((item) => pub.includes(item.publisher))
      .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    setFilteredItems(filtered);
  }

  function PublisherAndPlayerFilterAction(pub, play) {
    const valueAsIntegers = play.map((item) => parseInt(item, 10));
    if (valueAsIntegers.includes(13)) {
      filtered = items
        .filter((item) => item.category === 'Percussion Ensembles')
        .filter((item) =>
          (item.max_players === null
            ? play.includes(item.min_players)
              || parseInt(item.min_players, 10) >= 13
            : parseInt(item.max_players, 10) >= 13
              || findCommonPlayers(
                range(
                  parseInt(item.min_players, 10),
                  parseInt(item.max_players, 10),
                  1,
                ),
                valueAsIntegers,
              )))
        .filter((item) => pub.includes(item.publisher));
    } else {
      filtered = items
        .filter((item) =>
          findCommonPlayers(
            range(
              parseInt(item.min_players, 10),
              item.max_players
                ? parseInt(item.max_players, 10)
                : parseInt(item.min_players, 10),
              1,
            ),
            valueAsIntegers,
          ))
        .filter((item) => pub.includes(item.publisher));
    }
    setFilteredItems(filtered);
  }

  function DifficultyAndPlayerFilterAction(diff, play) {
    const valueAsIntegers = play.map((item) => parseInt(item, 10));
    if (valueAsIntegers.includes(13)) {
      filtered = items
        .filter((item) => item.category === 'Percussion Ensembles')
        .filter((item) =>
          (item.max_players === null
            ? play.includes(item.min_players)
              || parseInt(item.min_players, 10) >= 13
            : parseInt(item.max_players, 10) >= 13
              || findCommonPlayers(
                range(
                  parseInt(item.min_players, 10),
                  parseInt(item.max_players, 10),
                  1,
                ),
                valueAsIntegers,
              )))
        .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    } else {
      filtered = items
        .filter((item) =>
          findCommonPlayers(
            range(
              parseInt(item.min_players, 10),
              item.max_players
                ? parseInt(item.max_players, 10)
                : parseInt(item.min_players, 10),
              1,
            ),
            valueAsIntegers,
          ))
        .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    }
    setFilteredItems(filtered);
  }

  function PublisherFilterAction(target) {
    filtered = items.filter((item) => target.includes(item.publisher));
    setFilteredItems(filtered);
  }

  function DifficultyFilterAction(target) {
    filtered = items.filter((item) =>
      target.includes(SanitizeDifficulty(item.level)));
    setFilteredItems(filtered);
  }

  function PlayerFilterAction(target) {
    const valueAsIntegers = target.map((item) => parseInt(item, 10));
    if (valueAsIntegers.includes(13)) {
      filtered = items
        .filter((item) => item.category === 'Percussion Ensembles')
        .filter((item) =>
          (item.max_players === null
            ? target.includes(item.min_players)
              || parseInt(item.min_players, 10) >= 13
            : parseInt(item.max_players, 10) >= 13
              || findCommonPlayers(
                range(
                  parseInt(item.min_players, 10),
                  parseInt(item.max_players, 10),
                  1,
                ),
                valueAsIntegers,
              )));
    } else {
      filtered = items.filter((item) =>
        findCommonPlayers(
          range(
            parseInt(item.min_players, 10),
            item.max_players
              ? parseInt(item.max_players, 10)
              : parseInt(item.min_players, 10),
            1,
          ),
          valueAsIntegers,
        ));
    }
    setFilteredItems(filtered);
  }

  if (!DataisLoaded) {
    return <LoadingSkeleton />;
  }
  return (
    <Container className="App">
      <Container
        className="Filters"
        sx={{ textAlign: 'center' }}
      >
        <Paper
          elevation={0}
          sx={{
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
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {
          // eslint-disable-next-line no-nested-ternary
          filterIsOn ? (
            filteredItems.length === 0 ? (
              <Card
                key="no_items_to_show"
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
              filteredItems
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
                    rel="noreferrer"
                    target="_blank"
                    to={`/ensembles/${item.id}`}
                  >
                    <SmallCardContent item={item} />
                    <SmallCardActions item={item} />
                  </Card>
                ))
            )
          ) : (
            // TODO: Change this to be some sort of landing screen with
            // multiple different horizontal view swipers
            items
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
                  rel="noreferrer"
                  target="_blank"
                  to={`/ensembles/${item.id}`}
                >
                  <SmallCardContent item={item} />
                  <SmallCardActions item={item} />
                </Card>
              ))
          )
        }
      </Grid>
    </Container>
  );
}

export default AllEnsembles;
