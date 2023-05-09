// ConfirmLogout.js
// components: login/components

/*
submit function(event) => called on form submit, receivng event object
imgSrc String => supplied as src for logo
*/



import m from 'mithril'
import FormCore from './FormCore.js'


const ConfirmLogout = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('ConfirmLogout update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(FormCore, {
                submit: attrs.submit ? attrs.submit : e => {
                    e.preventDefault()
                    console.log('ConfirmLogout.jsx Form submitted!')
                },
                action: attrs.action,
                formHeader: attrs.formHeader ? attrs.formHeader : 'Confirm Logout',
                submitName: 'Log Out',
                formInputs: attrs.formInputs ? attrs.formInputs : [],
                cancel: true,
                peerLinks: attrs.peerLinks ? attrs.peerLinks : []

            })
        )
    )
}
export default ConfirmLogout;
