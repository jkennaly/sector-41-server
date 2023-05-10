// server/views/vm/vm-wiki.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet';

import _ from 'lodash';
// src/store/list/mixins/remote/www/getWikiPromise.js

	function getWikiId(model) {
		const enc = encodeURIComponent(model.name).replace('#', '%23')
		const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${enc}`
		//console.log('getWikiId', model, url)
		return cachedGet(url)
			.then(res => res.data)

			.then(wiki => {
				//console.log('getWikiId got url', wiki)
				const noResult = !wiki || !wiki.pages || !wiki.pages.filter
				if (noResult) return
				const artistName = model.name
				const matches = wiki.pages.filter(x => x.title.indexOf(artistName) > -1)
				const possibles = matches.length ? matches : wiki.pages
				const bands = possibles.filter(x => /band\)$/i.test(x.title))
				const musicians = possibles.filter(x => /musician\)$/i.test(x.title))
				const choice = [...bands, ...musicians, ...possibles][0]

				//console.log('getWikiId', possibles, bands, musicians)

				return _.get(choice, 'id')
			})
			.catch(err => {
				console.error("getWikiPromise error", model, err)
			})
	}
	function getWikiPromise(model) {
		return getWikiId(model)
			.then(
				n =>
					`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&pageids=${n}`
			)
			//.then(id => console.log('getWikiPromise url', id) || id)
			.then(url => cachedGet(url))
			.then(res => res.data)
			.then(wiki => {
				const wikiExtract = _.get(
					_.values(_.get(wiki, "query.pages", {})),
					"[0].extract",
					""
				)
				const wikiPage = parseInt(
					_.get(_.keys(_.get(wiki, "query.pages", {})), "[0]", "0"),
					10
				)
				const wikiGraphStart = wikiExtract.indexOf("<p")
				const wikiGraphEnd = wikiExtract.lastIndexOf("</p>") + 4
				const wikiGraph = wikiExtract.slice(wikiGraphStart, wikiGraphEnd)
				const wikiLink = `https://en.wikipedia.org/?curid=${wikiPage}`
				//console.log('getWikiPromise summary', wiki, wikiGraph, wikiLink)
				return [wikiGraph, wikiLink]
			})
			.catch(err => {
				_.set(stash, key, ["", ""])
				console.error("getWikiPromise error", model, err)
			})
	}

export default getWikiPromise