// FormInput.js
// components: login/components

/*
attrs.placeholder String: Placeholder text in text input
attrs.required Boolean: Whther to mark the element required for submission
attrs.classes String: CSS classes to add to the item
attrs.type String: Input type
*/


import m from 'mithril'




const FormInput = {
		//oncreate: console.log('Launched'),
		//onupdate: () => console.log('FormInput update'),
		view: ({attrs}) => m('div', {}, m(
            `input[type=${attrs.type ? attrs.type : "text"
            }][placeholder=${attrs.placeholder ? attrs.placeholder : ''
            }][name=${attrs.name ? attrs.name : attrs.placeholder ? attrs.placeholder : ''
            }][required=${attrs.required
            }][class=c44-login-form-text${attrs.classes ? ' ' + attrs.classes : ''}`
        ))
}
export default FormInput;
