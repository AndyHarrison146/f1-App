import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useYearResults = (year) => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/${year}/results.json?limit=1000`, fetcher);

    return { results: data?.MRData, error }
}

export default useYearResults;