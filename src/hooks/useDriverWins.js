import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useDriverWins = (driver) => {
    const { data, error } = useSWR(driver ? `http://ergast.com/api/f1/drivers/${driver}/results/1.json?limit=1000` : null, fetcher);

    return { driverWins: data?.MRData, error }
}

export default useDriverWins;