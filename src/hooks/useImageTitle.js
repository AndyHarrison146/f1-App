import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useImageTitle = (noImage, name) => {
	const { data} = useSWR(noImage ? `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${name}&format=json` : null, fetcher);

	let error = undefined

	const getImageTitle = () => {
		let title = undefined
		if (data?.query.pages) {
			const pages = data.query.pages;
			for (const page in pages) {
				if (pages[page].images) {
						for (const img of pages[page].images) {
						if (img.title.includes(".jpg", ".JPG", ".png", ".PNG")) {
								title = img.title.replace(/\s/g, "_");
								break;
						} else {
							error = true
						}
					}
				} else {
					error = true
				}
			}
		}
		return title
	}

	const imageTitle = data && getImageTitle()

	return { imageTitle, error}
}

export default useImageTitle;