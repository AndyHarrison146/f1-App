import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useDriverChampionships = (driver) => {
    const { data, error } = useSWR(driver ? `http://ergast.com/api/f1/drivers/${driver}/driverStandings/1.json?limit=1000` : null, fetcher);

    return { driverChampionships: data?.MRData, error }
}

export default useDriverChampionships;