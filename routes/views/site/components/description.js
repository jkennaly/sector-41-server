// server/views/site/components/stats.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';
import _ from 'lodash';

const summary = text => _.get(/(^.*?[a-z]{2,}[.!?])\s+\W*[A-Z]/.exec(text.replace(/\r?\n|\r/g, '')), '[0]', '')
const stats = {
	view: ({ attrs }) =>
		m.trust(!summary(attrs.text) ? '' : `<div class="sm:col-span-2 py-2 cursor-pointer">
            <details>
    			<dt class="text-sm font-medium text-gray-500">
	            	<a target="_blank" href="${attrs.link}">
	                	<button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								${attrs.heading}
						</button>
					</a>
	            </dt>
				<summary>
		
                  ${summary(attrs.text).slice(0, -3)}<span class="text-blue-700">...(expand)</span>
                </summary>
	            <dd class="mt-1 text-sm text-gray-900">
					<span class="cursor-default" >${attrs.text}</span>
	            </dd>
			</details>
        </div>`)
}

export default stats
