import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useSchedule = (year) => {
    const season = year ? year : new Date().getFullYear()
    const { data, error } = useSWR(`http://ergast.com/api/f1/${season}.json`, fetcher);

    return { schedule: data?.MRData, error }
}

export default useSchedule;