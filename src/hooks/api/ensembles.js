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

  return flatArray.sort((a, b) => a[0].localeCompare(b[0]));
};

const fetchEnsembles = async (queryString = '') => {
  const res = await fetch(`${process.env.REACT_APP_DATA_URL}?${queryString}`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const useFetchEnsembles = (queryParams = {}) => {
  const flattenedParams = convertQueryParamsToFlatArray(queryParams);

  const queryString = new URLSearchParams(flattenedParams).toString();

  const queryFn = useCallback(() => fetchEnsembles(queryString), [queryString]);

  return useQuery({
    queryFn,
    queryKey: ['ensembles', queryString],
  });
};
