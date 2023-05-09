// RecoveringPassword.js
// components: login/components

/*
submit function(event) => called on form submit, receivng event object
imgSrc String => supplied as src for logo
attrs.formInputs Array<FormData>: Array of form data objects: {
    placeholder String: input placeholder text,
    required Boolean: required to Submit form,
    classes String: List of classes; valid entry for html class,
    type String: type of input
}
attrs.peerLinks Array<PeerLink>: Array of objects containing links to peer forms, with link text
*/



import m from 'mithril'
import FormCore from './FormCore.js'



const RecoveringPassword = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('RecoveringPassword update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(`p.c44-login-text`, 'An email has been sent. Click the link in the email to complete the recovery.')
        )
    )
}
export default RecoveringPassword;
