import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useWikiImage = (title) => {
	const { data } = useSWR(title ? `https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&list=&titles=${title}&iiprop=timestamp%7Cuser%7Curl` : null, fetcher);

	let error = undefined

	const getWikiImage = () => {
		const pages = data.query.pages;
		for (const page in pages) {
			if (pages[page].imageinfo) {
				return pages[page].imageinfo[0].url;
			} else {
				error = true
			}
		}
	}

	const wikiImage = data && getWikiImage()
	console.log(wikiImage)

	return { wikiImage, error }
}

export default useWikiImage;