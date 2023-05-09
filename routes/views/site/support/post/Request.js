// server/views/site/support/post/Request.js

// Make Mithril happy
if (!global.window) {
	global.window = global.document = global.requestAnimationFrame = undefined
}

import nodemailer from 'nodemailer';

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

let transporter = user && pass && nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: { user, pass }
})

const page = options =>
	function(req, res, next) {
		const { email, notes, festival_website } = req.body
		console.log('request', req.body)
		if(!transporter) return next()

		let mailOptions = {
		    from: 'support@festigram.app', 
		    to: 'support@festigram.app',
		    cc: email ? email : undefined,
		    subject: 'FestiGram Festival Request',
		    text: `
Website: ${festival_website}
Notes: ${notes}
		    `
		}

		transporter.sendMail(mailOptions)
		next()
				
		
	}

export default page
