'use strict';

import m from 'mithril';
import render from 'mithril-node-render';

import login from '../views/login/Login.js';
import register from '../views/login/Register.js';
import forgot from '../views/login/ForgotPassword.js';
import logout from '../views/login/ConfirmLogout.js';
import recovering from '../views/login/RecoveringPassword.js';
import change from '../views/login/ChangePassword.js';
import verifyRefresh from '../../bin/verify_refresh.js';
import createRefresh from '../../bin/create_refresh.js';
import createAccess from '../../bin/create_access.js';
import addUser from '../../bin/add_user.js';
import getUser from '../../bin/get_user.js';
import { updateUser } from '../../bin/user.js';
import { storeRecovery, validRecovery, clearRecovery } from '../../bin/recovery.js';
import { send } from '../../bin/mail.js';
import mysql from 'mysql2';
import crypto from 'crypto';
import path from "path"
import url from 'url';

import fs from 'fs';

// Extract the relevant environment variables
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

// Construct the MySQL URL using the extracted variables
const mysqlUrl = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = fs.readFileSync(path.resolve(__dirname, '../views/login/login.html'), 'utf8')

const allowLocalLogins = Boolean(process.env.LOCAL_SECRET)


export const authRouter = function (app) {
	// Make Mithril happy
	if (!global.window) {
		global.window = global.document = global.requestAnimationFrame = undefined
	}


	const loginMiddle = options => function (req, res, next) {

		const reqCb = decodeURIComponent(req.query.cb)
		const reqDomainArray = typeof reqCb === 'string' && /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/.exec(reqCb)
		const reqDomain = reqDomainArray && reqDomainArray[0]
		const cbDomainOk = reqDomain && ((reqDomain.indexOf('festigram.app') === (reqDomain.length - 13) || reqDomain.includes(req.hostname)))
		//console.log('req cb', reqCb, cbDomainOk, reqDomain, reqDomainArray)
		if (cbDomainOk) res.cookie('cbd', reqCb, {
			httpOnly: true,
			sameSite: 'None', secure: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
	}

	app.get('/keys', function (req, res) {
		//console.log('keys', req.app.get('jwks'))
		res.send(req.app.get('jwks'))
	})

	app.get(/authorize\/login/, loginMiddle({
		formHeader: '0441 Design Login',
		//submit: evt => {console.log(evt)},
		imgSrc: '/img/Crowdshot.jpg',
		form: login

	}))
	app.post(/authorize\/login/, async function (req, res, next) {
		if (!allowLocalLogins) return res.status(403).render()
		let con
		try {
			con = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false')
			//console.log('routes-auth-local user', user)
			const user = await getUser(con, req.body.Email, req.body.Password)
			const jwksValue = req.app.get('jwks')
			console.log('routes-auth-local jwksValue', jwksValue)
			const access = createAccess(jwksValue, req.body.scopes, user)
			const refresh = createRefresh(user)
			res.cookie('jwt', refresh, {
				httpOnly: true,
				sameSite: 'None', secure: true,
				maxAge: 90 * 24 * 60 * 60 * 1000,
				domain: process.env.COOKIE_DOMAIN
			});
			const storedCb = req.cookies && req.cookies.cbd
			const cbUrl = storedCb ?? `${req.get('origin')}/site`
			res.redirect(`${cbUrl}?token=${access}`)
		} catch (err) {
			if(err.message === 'Invalid Credentials') {
				return loginMiddle({
					formHeader: 'Invalid Credentials',
					action: '/authorize/login',
					imgSrc: '/img/Crowdshot.jpg',
					form: login
				})(req, res, next)
			}
			console.log('Create JWT Error', err)
			res.status(500)
			next(err)

		} finally {
			con && con.end && con.end()

		}
	})
	app.get(/authorize\/register/, loginMiddle({
		formHeader: '0441 Design Registration',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: register
	}))
	app.post(/authorize\/register/, async function (req, res, next) {

		if (!allowLocalLogins) return res.status(403).render()
		//console.log(req.body)
		let con
		try {
			con = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false')
			const user = await addUser(con, req.body.Username, req.body.Email, req.body.Password)
			if (!user.access) console.log('user', user)
			const token = await createAccess(req.app.get('jwks'), undefined, user)
			const storedCb = req.cookies && req.cookies.cbd
			const cbUrl = storedCb ?? `${req.get('origin')}/site`
			res.redirect(`${cbUrl}?token=${token}`)
		} catch (err) {
			if (err.code && err.code.includes('ER_DUP_ENTRY')) {
				return loginMiddle({
					formHeader: 'Email already in use: Reset Available',
					action: '/authorize/forgot',
					submit: evt => 0,
					imgSrc: '/img/Crowdshot.jpg',
					form: forgot

				})(req, res, next)
			} else {
				const unlogged = [
					'required parameter missing',
				]
				if (unlogged.includes(err.message)) {
					return loginMiddle({
						formHeader: 'Missing Required Parameter',
						action: '/authorize/register',
						submit: evt => 0,
						imgSrc: '/img/Crowdshot.jpg',
						form: register
					})(req, res, next)
				}
				console.log('Create JWT Error', err)
				res.status(500)
				next(err)

			}
		} finally {
			con && con.end && con.end()

		}
	})
	app.get(/authorize\/forgot/, loginMiddle({
		formHeader: '0441 Design Password Recovery',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: forgot

	}))
	app.post(/authorize\/forgot/, async function (req, res, next) {
		if (!allowLocalLogins) return res.status(403).render()
		let con
		try {
			con = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false')
			//console.log('forgot', req.body)
			const { email } = await getUser(con, req.body.Email)
			const secret = crypto.randomBytes(32).toString('hex')
			const storedCb = req.cookies && req.cookies.cbd
			const cbUrl = storedCb ?? `${req.get('origin')}/site`
			await storeRecovery(email, secret, cbUrl)
			const link = `${req.get('origin')}/authorize/recovery/${secret}?email=${encodeURIComponent(email)}`
			send(email, link, 'verify')
			res.redirect(`${req.get('origin')}/authorize/recovery/success`)
		} catch (err) {
			if (err.message === 'Invalid Credentials') {
				res.redirect(`${req.get('origin')}/authorize/recovery/failure`)

			} else {
				console.log('Account Recovery Error', err)
				res.status(500)
				next(err)

			}
		} finally {
			con && con.end && con.end()

		}
	})
	app.get(/authorize\/recovery\/success/, loginMiddle({
		formHeader: '0441 Design Password Recovery In Progress',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: recovering

	}))
	app.get(/authorize\/recovery\/failure/, loginMiddle({
		formHeader: '0441 Design Password Recovery Unsuccessful',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: register,
		peerLinks: [{
			route: '/authorize/register',
			text: 'Register'
		}]

	}))
	app.get('/authorize/recovery/:secret', async function (req, res, next) {
		const secret = req.params && req.params.secret
		const email = req.query && req.query.email
		if (!allowLocalLogins || !secret || !email) {
			res.status(403)
			return next(new Error('recovery unavailable'))
		} else {
			let con
			try {
				const recovery = await validRecovery(email, secret)
				if (!recovery) return res.redirect(`${req.get('origin')}/authorize/recovery/failure`)
				const recoveryCookie = {
					email,
					secret
				}
				res.cookie('recov', recoveryCookie, {
					httpOnly: true,
					sameSite: 'None', secure: true,
					maxAge: 24 * 60 * 60 * 1000
				});
				//console.log('valid token')
			} catch (err) {
				if (err === 'unrefreshable') {
					console.log('unrefreshable')
					res.redirect(`${req.get('origin')}/authorize/logout`)

				} else {

					console.log('Create JWT Error', err)
					res.status(500)
					console.log('cretae error')
					return next(err)

				}
			} finally {
				con && con.end && con.end()

			}
			next()
		}
		//console.log('completion')
	}, loginMiddle({
		formHeader: '0441 Design Password Recovery: Set New Password',
		submit: evt => 0,
		action: '/authorize/recovery/complete',
		imgSrc: '/img/Crowdshot.jpg',
		form: change,
		formInputs: [{
			type: "password",
			placeholder: "NewPassword",
			required: true,
			classes: "c44-login-password"

		}, {
			type: "password",
			placeholder: "NewPasswordAgain",
			required: true,
			classes: "c44-login-password"

		}]

	}))
	app.post(/authorize\/recovery\/complete/, async function (req, res, next) {
		if (!allowLocalLogins) return res.status(403).render()
		let con
		try {
			con = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false')
			const { email, secret } = req.cookies && req.cookies.recov
			const { NewPassword, NewPasswordAgain } = req.body
			const password = NewPassword === NewPasswordAgain ? NewPassword : undefined
			if (!password || !email || !secret) res.redirect(`${req.get('origin')}/authorize/recovery/failure`)
			const recovery = await validRecovery(email, secret)
			if (!recovery) res.redirect(`${req.get('origin')}/authorize/recovery/failure`)
			const user = await getUser(con, email)
			if (!user) res.redirect(`${req.get('origin')}/authorize/recovery/failure`)

			await updateUser(con, email, { password })
			res.clearCookie('recov');
			await clearRecovery(email)
			const access = createAccess(req.app.get('jwks'), undefined, user)
			const refresh = createRefresh(user)
			res.cookie('jwt', refresh, {
				httpOnly: true,
				sameSite: 'None', secure: true,
				maxAge: 90 * 24 * 60 * 60 * 1000,
				domain: process.env.COOKIE_DOMAIN
			});
			res.redirect(`${recovery}?token=${access}`)
		} catch (err) {
			if (err.message === 'Invalid Credentials') {
				res.redirect(`${req.get('origin')}/authorize/recovery/failure`)

			} else {
				console.log('Account Recovery Error', err)
				res.status(500)
				next(err)

			}
		} finally {
			con && con.end && con.end()

		}
	})
	app.get(/authorize\/logout/, loginMiddle({
		formHeader: '0441 Design Logout',
		submit: evt => 0,
		imgSrc: '/img/Crowdshot.jpg',
		form: logout
	}))
	app.post(/authorize\/revoke/, function (req, res, next) {
		//extract the email, username and password
		//create uuid
		//add to database
		//return error if addition invalid
		//return jwt if addition valid
		res.send(template.replace('<div id="component"></div>', render.sync(m(options.form, options))))
	})
	app.get(/authorize\/refresh/, async function (req, res, next) {
		if (!allowLocalLogins || !req.cookies || !req.cookies.jwt) {
			return res.status(403).send("refresh unavailable")
		} else {

			const refreshToken = req.cookies.jwt
			let con
			try {
				con = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false')
				const refreshId = await verifyRefresh(con, refreshToken)
				if (!refreshId) throw 'unrefreshable'
				const user = await getUser(con, undefined, undefined, refreshId)
				const token = createAccess(req.app.get('jwks'), undefined, user)
				//console.log('valid token')
				return res.status(200).json({ token })
			} catch (err) {
				if (err === 'unrefreshable') {
					console.log('unrefreshable')
					res.redirect(`${req.get('origin')}/authorize/logout`)

				} else {

					console.log('Create JWT Error', err)

					return res.status(500).send("Create JWT Error")

				}
			} finally {
				con && con.end && con.end()

			}
		}
		//console.log('completion')
	})

}