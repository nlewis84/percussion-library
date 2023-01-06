import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchEnsembles = async (queryString = '') => {
  const res = await fetch(`${process.env.REACT_APP_DATA_URL}?${queryString}`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return {
    ensembles: data,
    fullCount: res.headers.get('X-Full-Count'),
  };
};

export const useFetchEnsembles = (queryString = '') => {
  const queryFn = useCallback(() => fetchEnsembles(queryString), [queryString]);

  return useQuery({
    queryFn,
    queryKey: ['ensembles', queryString],
  });
};
