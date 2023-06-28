import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useYearChampion = (year) => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/${year}/driverStandings.json?limit=1000`, fetcher);

    return { champion: data?.MRData, error }
}

export default useYearChampion;