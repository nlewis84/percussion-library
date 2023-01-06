/* eslint-disable react/no-array-index-key */
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from '@reach/router';
import { useDebounce } from 'use-debounce';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { arrayify } from '../../../utils/arrayify';
import { convertQueryStringToParams } from '../../../utils/convertQueryStringToParams';
import { getQueryStringFromParams } from '../../../utils/getQueryStringFromParams';
import { stripLeadingQuestionMarkFromSearch } from '../../../utils/stripLeadingQuestionMarkFromSearch';
import { useFetchEnsembles } from '../../../hooks/api/ensembles';
import { useTextField } from '../../../hooks/useTextField';
import { useUIDispatch } from '../../../state/UIContext/hooks';
import DifficultyIdFilter from '../../../components/DifficultyIdFilter';
import LoadingOverlay from '../../../components/LoadingOverlay';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import NumberOfPlayersFilter from '../../../components/NumberOfPlayersFilter';
import PublisherFilter from '../../../components/PublisherFilter';
import SmallCardActions from '../../../components/SmallCardActions';
import SmallCardContent from '../../../components/SmallCardContent';

const pageSize = 60;

function AllEnsembles() {
  const [localData, setLocalData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const uiDispatch = useUIDispatch();

  useEffect(() => {
    uiDispatch({
      payload: {
        ensemblesQueryString: location.search,
      },
      type: 'updateEnsemblesQueryString',
    });
  }, [location.search, uiDispatch]);

  const filtersFromQueryString = useMemo(() => {
    /* eslint-disable camelcase */
    const {
      difficulty_level_id,
      number_of_players,
      page = 1,
      page_size = 60,
      publisher,
      q,
    } = convertQueryStringToParams(location.search);

    const filters = {
      category: 'Percussion Ensembles',
      difficulty_level_id: arrayify(difficulty_level_id),
      number_of_players: arrayify(number_of_players),
      page,
      page_size,
      publisher: arrayify(publisher),
      q: q || '',
    };

    // Remove null values from object
    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {});
    /* eslint-enable camelcase */
  }, [location.search]);

  const handleChangePage = useCallback((event, value) => {
    const newFilters = {
      ...filtersFromQueryString,
      page: value,
    };

    const queryString = getQueryStringFromParams(newFilters);

    navigate(`?${queryString}`, { replace: true });
  }, [filtersFromQueryString]);

  const searchTextField = useTextField(filtersFromQueryString.q || '');

  const [q] = useDebounce(searchTextField.value, 300);

  const {
    data: ensemblesData,
    isLoading,
  } = useFetchEnsembles(stripLeadingQuestionMarkFromSearch(location.search));

  useEffect(() => {
    if (ensemblesData && ensemblesData.ensembles) {
      setLocalData(ensemblesData.ensembles);
    }
  }, [ensemblesData]);

  const fullCount = ensemblesData ? ensemblesData.fullCount : 0;

  const pageCount = Math.ceil(fullCount / pageSize);

  useEffect(() => {
    const newFilters = {
      ...filtersFromQueryString,
      page: 1,
      q,
    };

    const queryString = getQueryStringFromParams(newFilters);

    navigate(`?${queryString}`, { replace: true });
    // we only listen for q to change
    // intentionally not passing in filtersFromQueryString
  }, [q]);

  const handleChange = useCallback((event) => {
    const { target } = event;

    const newFilters = {
      ...filtersFromQueryString,
      page: 1,
      [target.name]: target.value,
    };

    const queryString = getQueryStringFromParams(newFilters);

    navigate(`?${queryString}`, { replace: true });
  }, [filtersFromQueryString, navigate]);

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
            flexWrap: 'wrap',
            gap: 1,
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
            numberOfPlayers={filtersFromQueryString.number_of_players || []}
          />
          <DifficultyIdFilter
            handleChange={handleChange}
            name="difficulty_level_id"
            difficulty={(filtersFromQueryString.difficulty_level_id || []).map(Number)}
          />
          <PublisherFilter
            handleChange={handleChange}
            name="publisher"
            publisher={filtersFromQueryString.publisher || []}
          />

          <TextField
            color="secondary"
            id="search"
            label="Search"
            InputLabelProps={{
              sx: { color: 'secondary.dark', fontWeight: 'bold' },
            }}
            name="search"
            size="small"
            sx={{
              width: {
                sm: 'auto',
                xs: '100%',
              },
            }}
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

      {isLoading && !localData && <LoadingSkeleton />}

      <LoadingOverlay loading={isLoading}>
        <Grid
          container
          sx={{ gap: 2, mt: 2 }}
          spacing={0}
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          {(localData && localData.length === 0) ? (
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
            (localData || []).map((item) => (
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
      </LoadingOverlay>

      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Pagination
          color="secondary"
          count={pageCount}
          page={filtersFromQueryString.page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
}

export default AllEnsembles;
