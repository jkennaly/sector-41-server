// server/views/site/support/post/Problem.js

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
		const { email, notes } = req.body
		//console.log('request', req.body)
		if(!transporter) return next()

		let mailOptions = {
		    from: 'support@festigram.app', 
		    to: 'support@festigram.app',
		    cc: email ? email : undefined,
		    subject: 'FestiGram Other Issue',
		    text: `
Issue: ${notes}
		    `
		}

		transporter.sendMail(mailOptions)
		next()
				
		
	}

export default page
