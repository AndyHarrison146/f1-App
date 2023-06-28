import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useChampionship = (year) => {
    const season = year ? year : 'current';
    const { data, error } = useSWR(`http://ergast.com/api/f1/${season}/driverStandings.json?limit=1000`, fetcher);

    return { championship: data?.MRData, error }
}

export default useChampionship;