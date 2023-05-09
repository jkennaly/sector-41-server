// server/views/site/stats.js

if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}
import m from 'mithril';

const stats = {
	view: ({ attrs }) =>
		m(`div.bg-white.px-4.py-3.flex.items-center.justify-between.border-t.border-gray-200.sm:px-6`,
	[
		m(`div.flex-1.flex.justify-between.sm:hidden`,
			[
				attrs.pageNo && attrs.pageNo > 1 ? m(`a.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.text-sm.font-medium.rounded-md.text-gray-700.bg-white.hover:text-gray-500[href="${attrs.path + (attrs.pageNo - 1)}"]`, 
					` Previous `
				) : ``,
				attrs.pageNo && attrs.pageCount && attrs.pageNo < attrs.pageCount ? m(`a.ml-3.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.text-sm.font-medium.rounded-md.text-gray-700.bg-white.hover:text-gray-500[href="${attrs.path + (attrs.pageNo + 1)}"]`, 
					` Next `
				) : ``
			]
		),
		m(`div.hidden.sm:flex-1.sm:flex.sm:items-center.sm:justify-between`,
			[
				m(`div`, 
					m(`p.text-sm.text-gray-700`,
						[
							` Showing `,
							m(`span.font-medium`, 
								`${(attrs.pageNo - 1) * 100 + 1}`
							),
							` to `,
							m(`span.font-medium`, 
								`${Math.min(attrs.pageNo * 100, attrs.totalCount)}`
							),
							` of `,
							m(`span.font-medium`, 
								`${attrs.totalCount}`
							),
							` results `
						]
					)
				),
				m(`div`, 
					m(`nav.relative.z-0.inline-flex.rounded-md.shadow-sm.-space-x-px[aria-label="Pagination"]`,
						[
							m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-l-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (1)}"]`,
								[
									m(`span.sr-only`, 
										`Start`
									),
									`|-`
								]
							),
							attrs.pageNo < 11 ? `` : m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-l-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo - 10)}"]`,
								[
									m(`span.sr-only`, 
										`Ten previous`
									),
									[
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"][clip-rule="evenodd"]`)
									),
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"][clip-rule="evenodd"]`)
									)
									]
								]
							),
							attrs.pageNo < 2 ? `` : m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-l-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo - 1)}"]`,
								[
									m(`span.sr-only`, 
										`Previous`
									),
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"][clip-rule="evenodd"]`)
									)
								]
							),
							attrs.pageNo < 4 ? `` : m(`a.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo - 3)}"]`, attrs.pageNo - 3
							),
							attrs.pageNo < 3 ? `` : m(`a.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo - 2)}"]`, attrs.pageNo - 2
							),
							attrs.pageNo < 2 ? `` : m(`a.hidden.md:inline-flex.relative.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo - 1)}"]`, attrs.pageNo - 1 
							),
							m(`span.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700`, 
								attrs.pageNo
							),
							attrs.pageNo > attrs.pageCount - 1 ? `` : m(`a.hidden.md:inline-flex.relative.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo + 1)}"]`, attrs.pageNo + 1 
							),
							attrs.pageNo > attrs.pageCount - 2 ? `` : m(`a.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo + 2)}"]`, attrs.pageNo + 2 
							),
							attrs.pageNo > attrs.pageCount - 3 ? `` : m(`a.relative.inline-flex.items-center.px-4.py-2.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-700.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo + 3)}"]`, attrs.pageNo + 3 
								
							),
							attrs.pageNo > attrs.pageCount - 1 ? `` : m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-r-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo + 1)}"]`,
								[
									m(`span.sr-only`, 
										`Next`
									),
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"][clip-rule="evenodd"]`)
									)
								]
							),

							attrs.pageNo > attrs.pageCount - 10 ? `` : m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-r-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (attrs.pageNo + 10)}"]`,
								[
									m(`span.sr-only`, 
										`Ten Next`
									),
									[
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"][clip-rule="evenodd"]`)
									),
									m(`svg.h-5.w-5[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 20 20"][fill="currentColor"][aria-hidden="true"]`, 
										m(`path[fill-rule="evenodd"][d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"][clip-rule="evenodd"]`)
									)
									]
								]
							),
							m(`a.relative.inline-flex.items-center.px-2.py-2.rounded-r-md.border.border-gray-300.bg-white.text-sm.font-medium.text-gray-500.hover:bg-gray-50[href="${attrs.path + (attrs.pageCount)}"]`,
								[
									m(`span.sr-only`, 
										`End`
									),
									`-|`
								]
							)
						]
					)
				)
			]
		)
	]
)
}

export default stats
