import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchDifficultyLevels = async () => {
  const res = await fetch(`${process.env.REACT_APP_DATA_URL}difficulty_levels`);

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const useFetchDifficultyLevels = () => {
  const queryFn = useCallback(() => fetchDifficultyLevels(), []);

  return useQuery({
    queryFn,
    queryKey: ['difficultyLevels'],
  });
};
