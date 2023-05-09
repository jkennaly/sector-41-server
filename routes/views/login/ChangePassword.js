// ChangePassword.js
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


const ChangePassword = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('ChangePassword update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(FormCore, {
                submit: attrs.submit ? attrs.submit : e => {
                    e.preventDefault()
                    console.log('Login.jsx Form submitted!')
                },
                action: attrs.action,
                method: attrs.method,
                formHeader: attrs.formHeader ? attrs.formHeader : 'Change Password',
                submitName: 'ChangePassword',
                formInputs: attrs.formInputs ? attrs.formInputs : [{
                    type: "password",
                    placeholder: "OldPassword",
                    required: true,
                    classes: "c44-login-password"
                }, {
                    type: "password",
                    placeholder: "NewPassword",
                    required: true,
                    classes: "c44-login-password"
                }, {
                    type: "password",
                    placeholder: "NewPasswordAgain",
                    required: true,
                    classes: "c44-login-password"
                }],
                peerLinks: attrs.peerLinks ? attrs.peerLinks : []

            })
        )
    )


}
export default ChangePassword;
