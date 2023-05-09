// ForgotPassword.js
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



const ForgotPassword = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('ForgotPassword update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(FormCore, {
                submit: attrs.submit ? attrs.submit : e => {
                    e.preventDefault()
                    console.log('Forgot PW Form submitted!')
                },
                action: attrs.action,
                formHeader: attrs.formHeader ? attrs.formHeader : 'Forgot Password',
                submitName: 'Reset',
                formInputs: attrs.formInputs ? attrs.formInputs : [{
                    type: "email",
                    placeholder: "Email",
                    required: true,
                    classes: "c44-login-email"
                }],
                peerLinks: attrs.peerLinks ? attrs.peerLinks : [
                    {
                        route: '/authorize/login',
                        text: 'Log In'
                    }, {
                        route: '/authorize/register',
                        text: 'Register'
                    }
                ]

            })
        )
    )
}
export default ForgotPassword;
