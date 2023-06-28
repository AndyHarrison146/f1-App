import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useSeasonResults = (season) => {
    const { data, error } = useSWR(season ? `http://ergast.com/api/f1/${season}/results.json?limit=1000` : null, fetcher);

    return { results: data?.MRData, error }
}

export default useSeasonResults;