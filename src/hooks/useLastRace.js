import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useLastRace = () => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/current/last/results.json?limit=1000`, fetcher);

    return { lastRace: data?.MRData, error }
}

export default useLastRace;