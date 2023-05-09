// server/views/site/support/post/Request.js

// Make Mithril happy
if (!global.window) {
    global.window = global.document = global.requestAnimationFrame = undefined
}

import nodemailer from 'nodemailer'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const messages = {
    reset: link => `
        <p>
            You have requested a Festigram password reset.
        </p>
        <p>
            <a href="${link}">Click here</a> to reset your password.
        </p>
    `,
    verify: link => `
        <p>
            You have requested a Festigram verification email.
        </p>
        <p>
            <a href="${link}">Click here</a> to verify your email.
        </p>
    `,
    invite: link => `
        <p>
            You have been invited to join Festigram.
        </p>
        <p>
            <a href="${link}">Click here</a> to accept your invitation.
        </p>
    `,
    invite_accepted: link => `
        <p>
            You have accepted an invitation to join Festigram.
        </p>
        <p>
            <a href="${link}">Click here</a> to go to Festigram.
        </p>
    `,
    invite_declined: link => `
        <p>
            You have declined an invitation to join Festigram.
        </p>
        <p>
            <a href="${link}">Click here</a> to go to Festigram.
        </p>
    `,
    invite_cancelled: link => `
        <p>
            You have cancelled an invitation to join Festigram.
        </p>
        <p>
            <a href="${link}">Click here</a> to go to Festigram.
        </p>
    `,
    invite_expired: link => `
        <p>
            Your invitation to join Festigram has expired.
        </p>
        <p>
            <a href="${link}">Click here</a> to go to Festigram.
        </p>
    `
}
const subjects = {
    reset: 'Festigram Password Reset',
    verify: 'Festigram Email Verification',
    invite: 'Festigram Invitation',
    invite_accepted: 'Festigram Invitation Accepted',
    invite_declined: 'Festigram Invitation Declined',
    invite_cancelled: 'Festigram Invitation Cancelled',
    invite_expired: 'Festigram Invitation Expired'
}
let transporter = user && pass && nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: { user, pass }
})

export const send = (email, link, reason) => {
    if (!transporter) throw new Error('No transporter')

    let mailOptions = {
        from: 'support@festigram.app',
        to: email,
        subject: subjects[reason],
        html: messages[reason](link)
    }

    transporter.sendMail(mailOptions)
}


