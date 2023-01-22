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
import { useFetchSolos } from '../../../hooks/api/solos';
import { useTextField } from '../../../hooks/useTextField';
import { useUIDispatch } from '../../../state/UIContext/hooks';
import DifficultyIdFilter from '../../../components/DifficultyIdFilter';
import InstrumentFilter from '../../../components/InstrumentFilter';
import LoadingOverlay from '../../../components/LoadingOverlay';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import PublisherFilter from '../../../components/PublisherFilter';
import SmallCardActions from '../../../components/SmallCardActions';
import SoloSmallCardContent from '../../../components/SoloSmallCardContent';

const pageSize = 60;

function AllSolos() {
  const [localData, setLocalData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const uiDispatch = useUIDispatch();

  useEffect(() => {
    uiDispatch({
      payload: {
        solosQueryString: location.search,
      },
      type: 'updateSolosQueryString',
    });
  }, [location.search, uiDispatch]);

  const filtersFromQueryString = useMemo(() => {
    /* eslint-disable camelcase */
    const {
      category,
      difficulty_level_id,
      page = 1,
      page_size = 60,
      publisher,
      q,
    } = convertQueryStringToParams(location.search);
    const filters = {
      category: arrayify(category),
      difficulty_level_id: arrayify(difficulty_level_id),
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

    navigate(`solos?${queryString}`, { replace: true });
  }, [filtersFromQueryString]);

  const searchTextField = useTextField(filtersFromQueryString.q || '');

  const [q] = useDebounce(searchTextField.value, 300);

  const {
    data: solosData,
    isLoading,
  } = useFetchSolos(stripLeadingQuestionMarkFromSearch(location.search));

  useEffect(() => {
    if (solosData && solosData.solos) {
      setLocalData(solosData.solos);
    }
  }, [solosData]);

  const fullCount = solosData ? solosData.fullCount : 0;

  const pageCount = Math.ceil(fullCount / pageSize);

  useEffect(() => {
    const newFilters = {
      ...filtersFromQueryString,
      page: 1,
      q,
    };

    const queryString = getQueryStringFromParams(newFilters);

    navigate(`solos?${queryString}`, { replace: true });
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

    navigate(`solos?${queryString}`, { replace: true });
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
          <InstrumentFilter
            handleChange={handleChange}
            name="category"
            instrument={filtersFromQueryString.category || []}
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
          item
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
                to={`/solos/${item.id}`}
              >
                <SoloSmallCardContent item={item} />
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
          page={parseInt(filtersFromQueryString.page, 10)}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
}

export default AllSolos;
