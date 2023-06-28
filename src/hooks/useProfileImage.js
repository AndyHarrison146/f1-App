import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useProfileImage = (name) => {
	const { data } = useSWR(name ? `https://en.wikipedia.org/w/api.php?origin=*&action=query&maxlag=1&prop=pageimages&list=&titles=${name}&piprop=thumbnail%7Cname%7Coriginal&format=json` : null, fetcher);

	const pages = data?.query?.pages;
	let error = undefined;
	
	
	const getProfileImage = () => {
		let _image = undefined
		for (const page in pages) {
			if (pages[page].original?.source) {
				console.log(pages[page].original)
				_image = pages[page].original.source;
				break;
			} else {
				error = true
			}
		}
		return _image
	}

	const image = getProfileImage()

	return { profileImage: image, error }
}

export default useProfileImage;