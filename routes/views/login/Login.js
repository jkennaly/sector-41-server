// Login.js
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



const Login = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('Login update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(FormCore, {
                submit: e => {
                    e.preventDefault()
                    console.log('Login.jsx Form submitted!')
                },
                formHeader: attrs.formHeader ? attrs.formHeader : 'Login Form',
                action: attrs.action,
                submitName: 'Log in',
                formInputs: attrs.formInputs ? attrs.formInputs : [{
                    type: "text",
                    placeholder: "Email Address",
                    required: true,
                    classes: "c44-login-username",
                    name: 'Email'
                }, {
                    type: "password",
                    placeholder: "Password",
                    required: true,
                    classes: "c44-login-password",
                    name: 'Password'

                }],
                peerLinks: attrs.peerLinks ? attrs.peerLinks : [
                    {
                        route: '/authorize/forgot',
                        text: 'Lost Your Password?'
                    }, {
                        route: '/authorize/register',
                        text: 'Register'
                    }
                ]

            })
        )
    )
}
export default Login;
