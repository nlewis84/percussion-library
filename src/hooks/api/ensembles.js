import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const convertQueryParamsToFlatArray = (queryParams) => {
  const flatArray = [];

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    // if value is an array, push each value in the array
    if (Array.isArray(value)) {
      queryParams[key].forEach((val) => {
        flatArray.push([key, val]);
      });
    } else {
      flatArray.push([key, value]);
    }
  });

  return flatArray;
};

const fetchEnsembles = async (queryParams = {}) => {
  const flattenedParams = convertQueryParamsToFlatArray(queryParams);

  const queryString = new URLSearchParams(flattenedParams);

  const res = await fetch(`${process.env.REACT_APP_DATA_URL}?${queryString}`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const useFetchEnsembles = (queryParams = {}) => {
  const queryFn = useCallback(() => fetchEnsembles(queryParams), [queryParams]);

  return useQuery({
    queryFn,
    queryKey: ['ensembles', queryParams],
  });
};
