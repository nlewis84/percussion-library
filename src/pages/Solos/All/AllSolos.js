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
import InstrumentFilter from '../../../components/InstrumentFilter';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import PublisherFilter from '../../../components/PublisherFilter';
import SanitizeDifficulty from '../../../helpers/sanitizeDifficulty';
import SanitizeInstrument from '../../../helpers/sanitizeInstrument';
import SmallCardActions from '../../../components/SmallCardActions';
import SoloSmallCardContent from '../../../components/SoloSmallCardContent';

function AllSolos() {
  const [solos, setSolos] = useState([]);
  const [filteredSolos, setFilteredSolos] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [instrument, setInstrument] = useState([]);
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

    if (!!instrument || !!difficulty || !!publisher) {
      setFilterIsOn(true);
    }
    // We need to check to see if all the filters are blank, but to do that we need to
    // check the target.value instead of the state of the filter that triggered this
    // handlePublisherChange due to the async nature of setState()

    switch (!!target.value.length) {
      case true:
        // this is where we do the work of figuring out what to filter

        switch (target.name) {
          case 'Instrument':
            // Check the other two filters to see if they are false
            if (!difficulty.length && !publisher.length) {
              InstrumentFilterAction(target.value);
              break;
            }
            if (!difficulty.length && publisher.length) {
              PublisherAndInstrumentFilterAction(publisher, target.value);
              break;
            }
            if (difficulty.length && !publisher.length) {
              DifficultyAndInstrumentFilterAction(difficulty, target.value);
              break;
            }
            if (difficulty.length && publisher.length) {
              FilterAllAction(target.value, difficulty, publisher);
              break;
            }
            break;
          case 'Difficulty':
            if (!instrument.length && !publisher.length) {
              DifficultyFilterAction(target.value);
              break;
            }
            if (instrument.length && !publisher.length) {
              DifficultyAndInstrumentFilterAction(target.value, instrument);
              break;
            }
            if (!instrument.length && publisher.length) {
              PublisherAndDifficultyFilterAction(publisher, target.value);
              break;
            }
            if (instrument.length && publisher.length) {
              FilterAllAction(instrument, target.value, publisher);
              break;
            }
            break;
          case 'Publisher': // Publisher
            if (!difficulty.length && !instrument.length) {
              PublisherFilterAction(target.value);
              break;
            }
            if (difficulty.length && !instrument.length) {
              PublisherAndDifficultyFilterAction(target.value, difficulty);
              break;
            }
            if (!difficulty.length && instrument.length) {
              PublisherAndInstrumentFilterAction(target.value, instrument);
              break;
            }
            if (difficulty.length && instrument.length) {
              FilterAllAction(instrument, difficulty, target.value);
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
        // then we will setFilteredSolos([]) and call it a day.
        // If not, then we will incorporate the logic on line 108.
        switch (target.name) {
          case 'Instrument':
            // Check the other two filters to see if they are false
            if (!difficulty.length && !publisher.length) {
              setFilteredSolos([]);
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
            if (!instrument.length && !publisher.length) {
              setFilteredSolos([]);
              setFilterIsOn(false);
              break;
            }
            if (instrument.length && !publisher.length) {
              InstrumentFilterAction(instrument);
              break;
            }
            if (!instrument.length && publisher.length) {
              PublisherFilterAction(publisher);
              break;
            }
            if (instrument.length && publisher.length) {
              PublisherAndInstrumentFilterAction(publisher, instrument);
              break;
            }
            break;
          case 'Publisher': // Publisher
            if (!difficulty.length && !instrument.length) {
              setFilteredSolos([]);
              setFilterIsOn(false);
              break;
            }
            if (difficulty.length && !instrument.length) {
              DifficultyFilterAction(difficulty);
              break;
            }
            if (!difficulty.length && instrument.length) {
              InstrumentFilterAction(instrument);
              break;
            }
            if (difficulty.length && instrument.length) {
              DifficultyAndInstrumentFilterAction(difficulty, instrument);
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
    if (target.name === 'Instrument') {
      setInstrument(target.value);
    } else if (target.name === 'Difficulty') {
      setDifficulty(target.value);
    } else if (target.name === 'Publisher') {
      setPublisher(target.value);
    }
  };

  let filtered = [];

  // TODO: Break these functions out into separate files.

  // Individual functions for all filtering cases.

  function FilterAllAction(inst, diff, pub) {
    filtered = solos
      .filter((item) => inst.includes(SanitizeInstrument(item.min_players, item.category)))
      .filter((item) => pub.includes(item.publisher))
      .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    setFilteredSolos(filtered);
  }

  function PublisherAndDifficultyFilterAction(pub, diff) {
    filtered = solos
      .filter((item) => pub.includes(item.publisher))
      .filter((item) => diff.includes(SanitizeDifficulty(item.level)));
    setFilteredSolos(filtered);
  }

  function PublisherAndInstrumentFilterAction(pub, inst) {
    filtered = solos
      .filter((item) => inst.includes(SanitizeInstrument(item.min_players, item.category)))
      .filter((item) => pub.includes(item.publisher));
    setFilteredSolos(filtered);
  }

  function DifficultyAndInstrumentFilterAction(diff, inst) {
    filtered = solos
      .filter((item) => inst.includes(SanitizeInstrument(item.min_players, item.category)))
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

  function InstrumentFilterAction(target) {
    filtered = solos
      .filter((item) => target.includes(SanitizeInstrument(item.min_players, item.category)));
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
        className="Filters"
        sx={{ textAlign: 'center' }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'inline-block', mr: 2, mt: 2, width: '99%',
          }}
        >
          <InstrumentFilter
            handleChange={handleChange}
            name="Instrument"
            instrument={instrument}
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
              ? filteredSolos.length === 0
                ? '0'
                : filteredSolos.length
              : solos.length
            }
            {' '}
            {filteredSolos.length === 1 ? 'result' : 'results'}
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
                  <SmallCardActions item={item} />
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
                <SmallCardActions item={item} />
              </Card>
            ))
        }
      </Grid>
    </Container>
  );
}

export default AllSolos;
