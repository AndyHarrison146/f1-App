import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useDriver = (driver) => {
    const { data, error } = useSWR(driver ? `http://ergast.com/api/f1/drivers/${driver}.json?limit=1000` : null, fetcher);
    // const data = {}
    // const error = undefined

    return { driver: data?.MRData, error };
}

export default useDriver;