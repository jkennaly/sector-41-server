// FormCore.js
// components: login/components

/*
submit function(event): called on form submit, receivng event object
formHeader String: displayed at top of form
submitName String: name to display on submit button
attrs.formInputs Array<FormData>: Array of form data objects: {
    placeholder String: input placeholder text,
    required Boolean: required to Submit form,
    classes String: List of classes; valid entry for html class,
    type String: type of input
}
attrs.peerLinks Array<PeerLink>: Array of objects containing links to peer forms, with link text
*/


import m from 'mithril'
import FormInput from './FormInput.js'



const FormCore = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('FormCore update'),
    view: ({ attrs }) => m('form', {
        action: attrs.action,
        method: attrs.method || 'POST',
        onsubmit: attrs.submit ? attrs.submit : e => {
            e.preventDefault()
            console.log('Form submitted!')
        }
    },
        m('h1', attrs.formHeader),
        ...(attrs.formInputs ? attrs.formInputs : [])
            .map(d => m(FormInput, d)),
        m('div.c44-login-formcore-links',
            m(`input[type=submit][value=${attrs.submitName ? attrs.submitName : 'Submit'}]`),
            attrs.cancel ? m(`input[type=button][value='Cancel']`, { onclick: e => m.route.set('/') }) : '',
            ...(attrs.peerLinks ?
                attrs.peerLinks.map(l => m(`a[href=${l.route ? l.route : '#'}]`, {
                    onclick: function (e) {
                        e.preventDefault()
                        m.route.set(l.route ? l.route : '/register')
                    }
                }, l.text))
                : [])

        )
    )
}
export default FormCore;
