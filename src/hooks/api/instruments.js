import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchInstruments = async () => {
  const res = await fetch(`${process.env.REACT_APP_DATA_URL}instruments`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  const filteredInstruments = data.filter((item) => !['Books & Education', 'Cadences', 'Chamber Music', 'Marching Ensembles', 'Marching Features', 'Percussion Ensembles', 'Steel Band'].includes(item.name));

  return filteredInstruments;
};

export const useFetchInstruments = () => {
  const queryFn = useCallback(() => fetchInstruments(), []);

  return useQuery({
    queryFn,
    queryKey: ['instrument'],
  });
};
