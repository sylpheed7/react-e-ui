import AsyncValidator from 'async-validator'

const ruleTrigger = {
    change: 'change',
    input: 'input',
    keyDown: 'keyDown',
    keyUp: 'keyUp',
    pressEnter: 'pressEnter',
    blur: 'blur',
    focus: 'focus',
    upload: 'upload',
    delFile: 'delFile'
};

const fieldValidate = function (rules = {}, value, field, trigger, callback) {
    let fieldRulesList = [];
    // console.log('fieldValidate : =====',rules);
    for (let i = 0; i < rules.length; i+=1) {
        const rule = rules[i];
        if(rule.trigger === trigger || (Array.isArray(rule.trigger) && rule.trigger.includes(trigger))){
            fieldRulesList.push(rule);
        }
    }

    // console.log('fieldValidate fmt: =====',fieldRulesList, '---', value, '---', trigger);
    if (fieldRulesList.length>0 && field) {
        let fieldRules = {[field]: fieldRulesList};
        let fieldValue = {[field]: value};
        // console.log('fieldValidate start: =====',fieldRules, '---', fieldValue, '---', value);
        formValidate(fieldRules, fieldValue, function (err) {
            // console.log('validate callback: =====', err);
            callback(err)
        });
    }
};

const formValidate = function(formRules, formValues, callback) {
    let result = true;
    // console.log('formValidate---rules: ', formRules, '---values: ', formValues);
    const validator = new AsyncValidator(formRules);
    validator.validate(formValues, (errors) => {
        let formError = {};

        if (errors && errors.length) {
            errors.forEach(({message, field}) => {
                formError[field] = message
            })
        } else {
            formError = {}
        }
        const  callbackRes = callback(formError)
        // console.log('callbackRes==============', callbackRes)
        result = callbackRes;
    })
    // .then(() => {
    //     console.log('formValidate then===++++++++++++++++0000000', true);
    //     result = true;
    // })
    // .catch(({ errors, fields }) => {
    //     console.log('formValidate catch===++++++++++++++++0000000', false);
    //     result = false
    // })

    return result
};

// const formValidate = function(formRules, formValues, fields, callback) {
//     const validator = new AsyncValidator(formRules);
//     validator.validate(formValues, (errors) => {
//         let formError = {};
//
//         if (errors && errors.length) {
//             errors.forEach(({message, field}) => {
//                 formError[field] = message
//             })
//         } else {
//             formError = {}
//         }
//
//         // 让错误信息的顺序与表单组件的顺序相同        
//         const errInfo = [];
//         fields.forEach(({prop, el}, index) => {
//             if (formError[prop]) {
//                 errInfo.push(formError[prop])
//             }
//         });
//         callback(errInfo)
//     })
// };


export {
    fieldValidate,
    formValidate,
    ruleTrigger
}