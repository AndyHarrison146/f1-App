import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useDrivers = () => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/drivers.json?limit=1000`, fetcher);
    // const data = {}
    // const error = undefined

    return { drivers: data?.MRData, error };
}

export default useDrivers;