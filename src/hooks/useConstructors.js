import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useConstructors = () => {
    const { data, error } = useSWR(`http://ergast.com/api/f1/current/constructorStandings.json?limit=1000`, fetcher);

    return { constructors: data?.MRData, error }
}

export default useConstructors;