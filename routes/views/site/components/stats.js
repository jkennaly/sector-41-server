// server/views/site/stats.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

const stats = {
	view: ({ attrs }) =>
		m.trust(`<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div id="stat1"></div>
    

      <div id="stat2"></div>

    
      <div id="stat3"></div>
  </dl>
</div>`)
}

export default stats
