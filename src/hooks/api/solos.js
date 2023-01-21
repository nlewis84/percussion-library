import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchSolos = async (queryString = '') => {
  const res = await fetch(`${process.env.REACT_APP_DATA_URL}solos?${queryString}`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return {
    fullCount: res.headers.get('X-Full-Count'),
    solos: data,
  };
};

export const useFetchSolos = (queryString = '') => {
  const queryFn = useCallback(() => fetchSolos(queryString), [queryString]);

  return useQuery({
    queryFn,
    queryKey: ['solos', queryString],
  });
};
