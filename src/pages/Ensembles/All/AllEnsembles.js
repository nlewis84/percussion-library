/* eslint-disable react/no-array-index-key */
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid, Pagination,
  Paper, TextField,
  Typography,
} from '@mui/material';
import { Link } from '@reach/router';
import { useDebounce } from 'use-debounce';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useFetchDifficultyLevels } from '../../../hooks/api/difficulties';
import { useFetchEnsembles } from '../../../hooks/api/ensembles';
import { useTextField } from '../../../hooks/useTextField';
import DifficultyFilter from '../../../components/DifficultyFilter';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import NumberOfPlayersFilter from '../../../components/NumberOfPlayersFilter';
import PublisherFilter from '../../../components/PublisherFilter';
import SmallCardActions from '../../../components/SmallCardActions';
import SmallCardContent from '../../../components/SmallCardContent';

// TODO: Save Filters in the query params so that links can be shared to a
// specific filter also so when you press back your filters are saved

const pageSize = 50;

function AllEnsembles() {
  const [filters, setFilters] = useState({
    difficulty_level_id: [],
    number_of_players: [],
    page: 1,
    publisher: [],
    q: '',
  });

  const handleChangePage = useCallback((event, value) => {
    setFilters((f) => ({
      ...f,
      page: value,
    }));
  }, []);

  const searchTextField = useTextField();

  const [q] = useDebounce(searchTextField.value, 300);

  const {
    data: difficultyLevels,
  } = useFetchDifficultyLevels();

  const queryParams = useMemo(() => ({
    category: 'Percussion Ensembles',
    difficulty_level_id: filters.difficulty_level_id
      .map((d) => difficultyLevels.find((dl) => dl.name === d).id),
    number_of_players: filters.number_of_players,
    page: filters.page,
    page_size: pageSize,
    publisher: filters.publisher,
    q: filters.q,
  }), [difficultyLevels, filters]);

  const {
    data: ensemblesData,
    isLoading,
  } = useFetchEnsembles(queryParams);

  const ensembles = useMemo(
    () =>
      (ensemblesData ? ensemblesData.ensembles : []),
    [ensemblesData],
  );

  console.log('data : ', ensemblesData);

  const fullCount = ensemblesData ? ensemblesData.fullCount : 0;

  const pageCount = Math.ceil(fullCount / pageSize);

  console.log({ pageCount });

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      page: 1,
      q,
    }));
  }, [q]);

  const handleChange = useCallback((event) => {
    const { target } = event;

    setFilters((f) => ({
      ...f,
      page: 1,
      [target.name]: target.value,
    }));
  }, []);

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
            alignItems: 'center',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            mr: 2,
            mt: 2,
            py: 1,
            width: '99%',
          }}
        >
          <NumberOfPlayersFilter
            handleChange={handleChange}
            name="number_of_players"
            numberOfPlayers={filters.number_of_players}
          />
          <DifficultyFilter
            handleChange={handleChange}
            name="difficulty_level_id"
            difficulty={filters.difficulty_level_id}
          />
          <PublisherFilter
            handleChange={handleChange}
            name="publisher"
            publisher={filters.publisher}
          />

          <TextField
            id="search"
            label="Search"
            name="search"
            size="small"
            {...searchTextField}
            value={searchTextField.value}
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

      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
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
      )}

      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Pagination
          count={pageCount}
          page={filters.page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
}

export default AllEnsembles;
