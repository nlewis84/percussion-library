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

import DifficultyFilter from '../../../components/DifficultyFilter';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import NumberOfPlayersFilter from '../../../components/NumberOfPlayersFilter';
import PublisherFilter from '../../../components/PublisherFilter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import SmallCardContent from '../../../components/SmallCardContent';
import findCommonPlayers from '../../../helpers/findCommonPlayers';
import range from '../../../helpers/range';

function AllEnsembles() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [publisher, setPublisher] = useState([]);
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
      target,
    } = event;
    let filtered = [];

    // Psuedo code
    //
    // check for num of players
    // then, check for difficulty
    // then, check publisher

    // We need to check to see if all the filters are blank, but to do that we need to
    // check the target.value instead of the state of the filter that triggered this
    // handlePublisherChange due to the async nature of setState()
    console.log(target.value.length);

    switch (!!target.value.length) {
      case true:
        // this is where we do the work of figuring out what to filter
        console.log('figure out what to filter');
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
              console.log('stop filtering now 1');
            }
            break;
          case 'Difficulty':
            if (!numberOfPlayers.length && !publisher.length) {
              console.log('stop filtering now 2');
            }
            break;
          case 'Publisher': // Publisher
            if (!difficulty.length && !numberOfPlayers.length) {
              console.log('stop filtering now 3');
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    if (!target.value.length || numberOfPlayers || difficulty || publisher) {
      console.log('we should be filtering by something here');
    }

    // This logic sets the correct state based on the event.target.name
    if (target.name === 'Players') {
      setNumberOfPlayers(target.value);
    } else if (target.name === 'Difficulty') {
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      setPublisher(target.value);
    }

    // This is the actual filtering process based on the event.target.name
    // Needs to be incorporated above and take into account other
    // filters than the currently selected one.

    if (target.name === 'Players') {
      // this needs to be overhauled, because it is
      // overwriting filteredItems with no regard for other filters
      if (target.value.length === 0) {
        setFilteredItems([]);
      } else {
        const valueAsIntegers = target.value.map((item) => parseInt(item, 10));
        if (valueAsIntegers.includes(13)) {
          filtered = items
            .filter((item) => item.category === 'Percussion Ensembles')
            .filter((item) => (item.max_players === null
              ? target.value.includes(item.min_players) || parseInt(item.min_players, 10) >= 13
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
      setNumberOfPlayers(target.value);
    } else if (target.name === 'Difficulty') {
      if (target.value.length === 0) {
        setFilteredItems([]);
      } else {
        filtered = items.filter((item) => target.value.includes(SanitizeDifficulty(item.level)));
        setFilteredItems(filtered);
      }
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      if (target.value.length === 0) {
        setFilteredItems([]);
      } else {
        filtered = items.filter((item) => target.value.includes(item.publisher));
        setFilteredItems(filtered);
      }
      setPublisher(target.value);
    }
  };

  // This is the original way that we were handling this, but the code above this is the new way

  // const handleNumberOfPlayersChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   let filtered = [];
  //   if (value.length === 0) {
  //     setFilteredItems([]);
  //   } else {
  //     const valueAsIntegers = value.map((item) => parseInt(item, 10));
  //     if (valueAsIntegers.includes(13)) {
  //       filtered = items
  //         .filter((item) => item.category === 'Percussion Ensembles')
  //         .filter((item) => (item.max_players === null
  //           ? value.includes(item.min_players) || parseInt(item.min_players, 10) >= 13
  //           : parseInt(item.max_players, 10) >= 13 || findCommonPlayers(
  //             range(
  //               parseInt(item.min_players, 10),
  //               parseInt(item.max_players, 10),
  //               1,
  //             ),
  //             valueAsIntegers,
  //           )));
  //     } else {
  //       filtered = items.filter((item) => findCommonPlayers(
  //         range(
  //           parseInt(item.min_players, 10),
  //           parseInt(item.max_players, 10),
  //           1,
  //         ),
  //         valueAsIntegers,
  //       ));
  //     }
  //     setFilteredItems(filtered);
  //   }
  //   setNumberOfPlayers(value);
  // };

  // const handleDifficultyChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   let filtered = [];
  //   if (value.length === 0) {
  //     setFilteredItems([]);
  //   } else {
  //     filtered = items.filter((item) => value.includes(SanitizeDifficulty(item.level)));
  //     setFilteredItems(filtered);
  //   }
  //   setDifficulty(value);
  // };

  // const handlePublisherChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   let filtered = [];
  //   console.log(value);
  //   if (value.length === 0) {
  //     setFilteredItems([]);
  //   } else {
  //     filtered = items.filter((item) => value.includes(item.publisher));
  //     setFilteredItems(filtered);
  //   }
  //   setPublisher(value);
  // };

  if (!DataisLoaded) {
    return (
      <LoadingSkeleton />
    );
  }
  return (
    <Container className="App">
      <Container
        className="App"
        sx={{ textAlign: 'center' }}
      >
        <Paper sx={{ display: 'inline-block', mr: 2, mt: 2 }}>
          <NumberOfPlayersFilter
            handleChange={handleChange}
            // handleChange={handleNumberOfPlayersChange}
            name="Players"
            numberOfPlayers={numberOfPlayers}
          />
          <DifficultyFilter
            handleChange={handleChange}
            // handleChange={handleDifficultyChange}
            name="Difficulty"
            difficulty={difficulty}
          />
          <PublisherFilter
            handleChange={handleChange}
            // handleChange={handlePublisherChange}
            name="Publisher"
            publisher={publisher}
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
      </Container>
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
                <SmallCardContent item={item} />
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
