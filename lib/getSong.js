import searchSong from './searchSong';
import extractLyrics from './utils/extractLyrics';
import { checkOptions } from './utils';

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
export async function getSong(options) {
	try {
		checkOptions(options);
		let results = await searchSong(options);
		if (!results) return null;
		let lyrics = await extractLyrics(results[0].url);
		return {
			id: results[0].id,
			title: results[0].title,
			url: results[0].url,
			lyrics,
			albumArt: results[0].albumArt
		};
	} catch (e) {
		throw e;
	}
};
