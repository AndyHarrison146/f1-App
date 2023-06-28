import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useRaceResults = (season, round) => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/${season}/${round}/results.json?limit=1000`, fetcher);

    return { raceResults: data?.MRData, error }
}

export default useRaceResults;