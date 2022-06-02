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
import PublisherFilter from '../../../components/PublisherFilter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficuty';
import SoloSmallCardContent from '../../../components/SoloSmallCardContent';

function AllSolos() {
  const [solos, setSolos] = useState([]);
  const [filteredSolos, setFilteredSolos] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [filterIsOn, setFilterIsOn] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DATA_URL}solos`)
      .then((res) => res.json())
      .then((json) => {
        setSolos(json);
        setDataisLoaded(true);
      });
  }, []);

  const handleChange = (event) => {
    const {
      target,
    } = event;

    if (!!difficulty || !!publisher) {
      setFilterIsOn(true);
    }
    // We need to check to see if all the filters are blank, but to do that we need to
    // check the target.value instead of the state of the filter that triggered this
    // handlePublisherChange due to the async nature of setState()

    switch (!!target.value.length) {
      case true:
        // this is where we do the work of figuring out what to filter

        switch (target.name) {
          case 'Difficulty':
            if (!publisher.length) {
              DifficultyFilterAction(target.value);
              break;
            } else {
              PublisherAndDifficultyFilterAction(publisher, target.value);
              break;
            }
          case 'Publisher': // Publisher
            if (!difficulty.length) {
              PublisherFilterAction(target.value);
              break;
            } else {
              PublisherAndDifficultyFilterAction(target.value, difficulty);
              break;
            }
          default:
            break;
        }
        break;
      case false:
        // This current event.target.value is blank, so we need to
        // check if the other filters are also blank. If so,
        // then we will setFilteredSolos([]) and call it a day.
        // If not, then we will incorporate the logic on line 108.
        switch (target.name) {
          case 'Difficulty':
            if (!publisher.length) {
              setFilteredSolos([]);
              setFilterIsOn(false);
              break;
            } else {
              PublisherFilterAction(publisher);
              break;
            }
          case 'Publisher': // Publisher
            if (!difficulty.length) {
              setFilteredSolos([]);
              setFilterIsOn(false);
              break;
            } else {
              DifficultyFilterAction(difficulty);
              break;
            }
          default:
            break;
        }
        break;
      default:
        break;
    }

    // This logic sets the correct state based on the event.target.name
    if (target.name === 'Difficulty') {
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      setPublisher(target.value);
    }
  };

  let filtered = [];

  // TODO: Break these functions out into separate files.

  // Individual functions for all filtering cases.

  function PublisherAndDifficultyFilterAction(pub, diff) {
    filtered = solos
      .filter((item) => pub.includes(item.publisher))
      .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    setFilteredSolos(filtered);
  }

  function PublisherFilterAction(target) {
    filtered = solos.filter((item) => target.includes(item.publisher));
    setFilteredSolos(filtered);
  }

  function DifficultyFilterAction(target) {
    filtered = solos.filter((item) => target.includes(SanitizeDifficulty(item.level)));
    setFilteredSolos(filtered);
  }

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

          <Typography
            variant="body"
            color="secondary.main"
            textAlign="center"
            sx={{ display: 'block' }}
          >
            {
            // eslint-disable-next-line no-nested-ternary
            filterIsOn
              ? filteredSolos.length === 0
                ? '0'
                : filteredSolos.length
              : solos.length
            }
            {' '}
            {filteredSolos.length === 1 ? 'result' : 'results'}
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
        {
        // eslint-disable-next-line no-nested-ternary
        filterIsOn
          ? filteredSolos.length === 0
            ? (
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
            )
            : filteredSolos
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
                  to={`/solos/${item.id}`}
                >
                  <SoloSmallCardContent item={item} />
                </Card>
              ))
        // TODO: Change this to be some sort of landing screen with
        // multiple different horizontal view swipers
        // TODO: Actually disply 0 items if the filters cause there to be none with the filters
          : solos
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
                to={`/solos/${item.id}`}
              >
                <SoloSmallCardContent item={item} />
              </Card>
            ))
        }
      </Grid>
    </Container>
  );
}

export default AllSolos;
