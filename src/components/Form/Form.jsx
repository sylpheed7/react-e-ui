import './index.scss';
import {fieldValidate, formValidate, ruleTrigger} from './formValidator';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import CheckBox from '../CheckBox/CheckBox';
import Radio from '../Radio/Radio';
import Select from '../Select/Select';
import DatePicker from '../DatePicker/DatePicker';
import Upload from '../Upload/Upload';
import TreeSelect from '../TreeSelect/TreeSelect';
import Cascader from '../Cascader/Cascader';
import moment from 'moment';
import isEqual from 'lodash/isEqual';

/**
 * 表单组件
 * formData: 表单中各表单项的值
 * rules: 表单验证规则
 * inline: 行内表单模式，则需要设置label-width
 * label-position：表单域标签内容的位置，right/left/top , 默认文本居右：right, 如果值为 left 或者 right 时，则需要设置label-width
 * label-width：表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持auto
 * onFormChange：某一个表单项的值发生改动生触发表单改动的事件，(prop, changedValue, allValue)
 */

function mixin(target = {}, source = {}) {
    Object.getOwnPropertyNames(source).forEach(key => {
        const desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc)
    });
    return target;
}

class Form extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defFormDataObj: this.props.formData || {},
            formDataObj: this.props.formData || {},
            errorObj: {},
            successObj: {}
        };

        this.resetFormData = this.resetFormData.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.formValidateErrCb = this.formValidateErrCb.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setPropValidateDef = this.setPropValidateDef;
        this.setPropValidateSuccess = this.setPropValidateSuccess;
        this.setPropValidateError = this.setPropValidateError;
    }

    componentDidUpdate(preProps, state) {
        const {formData, errorFlag, errorMsg} = this.props;

        if (!isEqual(formData, preProps.formData)) {
            this.setState({formDataObj: formData});
            this.setState({errorFlag});
            this.setState({errorMsg});
        }
    }

    renderChildren(props) {
        let _this = this;
        let {onFormChange} = this.props;

        //遍历所有子组件
        return React.Children.map(this.props.children, (child, index) => {

            let childrenProps = {
                'noUpdateFlag': this.props['noUpdateFlag'] || false,
                'rules': this.props.rules,
                'inline': this.props.inline,
                'label-width': child.props['label-width'] ? child.props['label-width'] : this.props['label-width'],
                'label-position': this.props['label-position'] || 'right'
            };

            if (child.type === FormItem) {
                let itemProp = child.props.prop;

                if (itemProp && _this.state.formDataObj[itemProp] !== undefined) {

                    const hasItemError = Reflect.has(_this.state.errorObj, itemProp);
                    const hasItemSuccess = Reflect.has(_this.state.successObj, itemProp);

                    childrenProps.formItemData = _this.state.formDataObj[itemProp];
                    childrenProps.errorFlag = hasItemError;
                    childrenProps.errorMsg = hasItemError ? _this.state.errorObj[itemProp] : '';
                    childrenProps.successFlag = hasItemSuccess;

                    //errorMsg
                    if (childrenProps.rules && childrenProps.rules[itemProp]) {
                        childrenProps.formItemRule = childrenProps.rules[itemProp];
                    } else {
                        childrenProps.formItemRule = [];
                    }

                    childrenProps.setFormItemValidateInfo = (successFlag, errorFlag, errorMsg) => {

                        _this.state.successObj[itemProp] = successFlag;

                        if (errorFlag) {
                            _this.state.errorObj[itemProp] = errorMsg;
                        } else {
                            Reflect.deleteProperty(_this.state.errorObj, itemProp)
                        }
                        this.setState({errorObj: _this.state.errorObj});
                        this.setState({successObj: _this.state.successObj});
                    };

                    childrenProps.formItemValueChange = (value) => {

                        console.log("formItemValueChange: ", itemProp, '---', value)
                        console.log("formItemValueChange: ", itemProp, '---', value, ' --- oldValue ', _this.state.formDataObj[itemProp], '====isSame', _this.state.formDataObj[itemProp] === value)

                        if (_this.state.formDataObj[itemProp] === value) {
                            return;
                        }
                        _this.state.formDataObj[itemProp] = value;

                        this.setState({formDataObj: _this.state.formDataObj});

                        onFormChange && onFormChange(itemProp, value, _this.state.formDataObj);
                    };
                }
                console.log(child.props)
                return React.cloneElement(child, mixin(childrenProps , child.props));
            } else {
                return child;
            }

        })
    }

    setPropValidateDef = (prop) => {
        console.log('prop', prop)
        if (prop) {
            Reflect.deleteProperty(this.state.successObj, prop)
            Reflect.deleteProperty(this.state.errorObj, prop)
            this.setState({
                errorObj: this.state.errorObj,
                successObj: this.state.successObj
            })
        }
    }

    setPropValidateSuccess = (prop) => {
        console.log('prop', prop)
        if (prop !== undefined && prop !== null && prop !== '') {
            this.state.successObj[prop] = true;
            Reflect.deleteProperty(this.state.errorObj, prop);
            // delete this.state.errorObj[prop];
            this.setState({
                errorObj: this.state.errorObj,
                successObj: this.state.successObj
            })
        }
    }

    setPropValidateError = (prop, errMsg) => {
        console.log('prop', prop)
        if (prop !== undefined && prop !== null && prop !== '') {
            // delete this.state.successObj[prop];
            Reflect.deleteProperty(this.state.successObj, prop);
            this.state.errorObj[prop] = errMsg;
            this.setState({
                errorObj: this.state.errorObj,
                successObj: this.state.successObj
            })
        }
    }

    resetFormData() {
        this.setState({
            formDataObj: this.state.defFormDataObj,
            errorObj: {},
            successObj: {}
        })
    }

    getFormData() {
        let {formDataObj} = this.state;
        return formDataObj;
    }

    formValidateErrCb(err) {
        let {formData} = this.props;

        let hasError = false,
            errorObj = {},
            successObj = {};

        for (const formDataKey in formData) {
            if (Object.keys(err).includes(formDataKey)) {
                hasError = true;
                errorObj[formDataKey] = err[formDataKey];
            } else {
                successObj[formDataKey] = true;
            }
        }

        this.setState({errorObj});
        this.setState({successObj});

        return !hasError;
    }

    validateForm() {
        let {formData} = this.props;

        return formValidate(this.props.rules, formData, this.formValidateErrCb);
    }

    getFormStyle() {
        // let result = this.props.style || {};
        let result = Object.assign({}, this.props.style);
        return result;
    }

    getFromClassName() {
        let result = ['ui-form'];
        // result.push(`ui-menu-${this.props.mode}`);
        if (this.props.inline) {
            result.push(`clearfix`);
        }
        return result.join(' ');
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const {onSubmit} = this.props;

        onSubmit && onSubmit();
    }

    render() {
        return (
            <form style={this.getFormStyle()} className={classNames(this.getFromClassName(), this.props.className)} onSubmit={this.onSubmitHandler}>
                {/*{JSON.stringify(this.state.errorObj)}*/}
                {this.renderChildren(this.props)}
            </form>
        );
    }
}

/**
 * 表单项
 * label: 标签文本
 * prop：表单校验,获取表单数据时对应rule规则的关键字
 * rules: 本表单项验证规则
 */
class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successFlag: this.props.successFlag || false,
            errorFlag: this.props.errorFlag || false,
            errorMsg: this.props.errorMsg || ''
        };

        // console.log(FormItem)
        // console.log(this.state)
        this.fieldValidateErrCb = this.fieldValidateErrCb.bind(this);
        this.setSuccess = this.setSuccess.bind(this);
        this.setError = this.setError.bind(this);
        this.setErrorMsg = this.setErrorMsg.bind(this);
        this.setValidateDef = this.setValidateDef.bind(this);
    }

    setValidateDef() {
        console.log('setValidateDef=====')
        this.state.successFlag = false;
        this.state.errorFlag = false;
        this.state.errorMsg = '';

        this.setState({
            successFlag: this.state.successFlag,
            errorFlag: this.state.errorFlag,
            errorMsg: this.state.errorMsg || ''
        })

        console.log(this.state, this.props)
    }

    setSuccess() {
        this.state.successFlag = true;
        this.state.errorFlag = false;
        this.state.errorMsg = '';

        this.setState({
            successFlag: this.state.successFlag,
            errorFlag: this.state.errorFlag,
            errorMsg: this.state.errorMsg || ''
        })
    }

    setError(errMsg) {
        // console.log('set error 888888888888', errMsg)
        this.state.successFlag = false;
        this.state.errorFlag = true;
        this.state.errorMsg = errMsg;

        this.setState({
            successFlag: this.state.successFlag,
            errorFlag: this.state.errorFlag,
            errorMsg: this.state.errorMsg || ''
        })
        // console.log(this.state)
    }

    setErrorMsg(errMsg) {
        this.state.errorMsg = errMsg;

        this.setState({
            errorMsg: this.state.errorMsg || ''
        })
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(this.props.children, child => {
            switch (child.type) {
                case Input:
                    return this.renderFormItemChildren(child,
                        [
                            ruleTrigger.input,
                            ruleTrigger.change,
                            ruleTrigger.keyUp,
                            ruleTrigger.keyDown,
                            // ruleTrigger.pressEnter,
                            ruleTrigger.blur,
                            ruleTrigger.focus
                        ]);
                case CheckBox:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case CheckBox.CheckBoxGroup:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case Radio:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case Radio.RadioGroup:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case Select:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case Upload:
                    return this.renderFormItemChildren(child, [ruleTrigger.delFile]);
                case DatePicker:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case TreeSelect:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case Cascader:
                    return this.renderFormItemChildren(child, [ruleTrigger.change]);
                case TextArea:
                    return this.renderFormItemChildren(child,
                        [
                            ruleTrigger.input,
                            ruleTrigger.change,
                            ruleTrigger.keyUp,
                            ruleTrigger.keyDown,
                            // ruleTrigger.pressEnter,
                            ruleTrigger.blur,
                            ruleTrigger.focus
                        ]);
                default:
                    return child;
            }
        })
    }

    fieldValidateErrCb(err) {
        let {prop} = this.props;

        if (Reflect.has(err, prop)) {
            this.props.setFormItemValidateInfo(false, true, err[prop]);

        } else {
            this.props.setFormItemValidateInfo(true, false, '');

        }
    }


    renderFormItemChildren(child, triggerList = []) {
        let _this = this,
            childrenProps = {},
            {formItemData, prop} = this.props;

        // debugger

        if (formItemData !== undefined && formItemData !== null) {
            childrenProps.value = formItemData;
        } else if (child.props.value !== undefined) {
            childrenProps.value = child.props.value;
        } else {
            childrenProps.value = '';
        }

        if (child.type == Radio) {
            childrenProps.checked = childrenProps.value;
        }

        if (child.type == CheckBox) {
            childrenProps.checked = childrenProps.value;
        }

        if (child.type == DatePicker && childrenProps.value == '') {
            Reflect.deleteProperty(childrenProps, 'value')
        }

        const triggerEventFn = (event) => {

            const EVENTS = (event === 'upload' || event === 'delFile') ?
                event :
                `on${event.substring(0, 1).toUpperCase()}${event.substring(1)}`;

            childrenProps[EVENTS] = (val, e) => {
                
                let vals = val;

                if (child.type === DatePicker || child.type === DatePicker.RangePicker) {
                    vals = vals.length > 0 ? moment(vals).format(child.props.formatStr) : '';
                }

                if (child.type === Select) {
                    vals = val.toString();
                }

                if (event === 'upload') {
                    vals = e;
                }

                if (event === 'delFile') {
                    vals = '';
                }

                fieldValidate(
                    this.props.formItemRule,
                    vals,
                    this.props.prop,
                    ruleTrigger[event],
                    this.fieldValidateErrCb
                );

                if (formItemData !== vals) {
                    if (this.props.formItemValueChange) {
                        this.props.formItemValueChange(vals, e);
                    }

                    if (child.props[EVENTS]) {
                        event !== 'delFile' ? child.props[EVENTS](vals, e) : child.props[EVENTS]();
                    }
                }
            };
        }

        if (triggerList.includes(ruleTrigger.input)) {
            triggerEventFn('input')
        }

        if (triggerList.includes(ruleTrigger.change)) {
            triggerEventFn('change')
        }

        if (triggerList.includes(ruleTrigger.keyDown)) {
            triggerEventFn('keyDown')
        }

        if (triggerList.includes(ruleTrigger.pressEnter)) {
            triggerEventFn('pressEnter')
        }

        if (triggerList.includes(ruleTrigger.keyUp)) {
            triggerEventFn('keyUp')
        }

        if (triggerList.includes(ruleTrigger.focus)) {
            triggerEventFn('focus')
        }

        if (triggerList.includes(ruleTrigger.blur)) {
            triggerEventFn('blur')
        }

        if (triggerList.includes(ruleTrigger.upload)) {
            triggerEventFn('upload')
        }

        if (triggerList.includes(ruleTrigger.delFile)) {
            triggerEventFn('delFile');
        }

        let childClone = React.cloneElement(child, childrenProps);
        // console.log(childClone);
        return childClone;
    }


    getFormItemStyle() {
        let result = {};

        if (this.props.inline) {
            result.float = 'left';
            result.marginRight = '20px';
        }

        result = Object.assign(result, this.props.style);

        return result;
    }

    getFromItemClassName() {
        let result = ['ui-form-item'];
        let otherClassName = this.props.className || null;
        // result.push(`ui-menu-${this.props.mode}`);
        // label-position

        if (!(this.props['label-position'] && this.props['label-position'] == 'top')) {
            result.push('clearfix')
        }

        if (this.state.successFlag) {
            result.push('ui-form-item-success')
        }

        if (this.state.errorFlag) {
            result.push('ui-form-item-error')
        }

        if (otherClassName) {
            // console.log(otherClassName, "9999999999")
            result.push(otherClassName);
        }

        return result.join(' ');
    }

    getFormItemLabelStyle() {
        let result = {};

        if (this.props['label-width'] != undefined && this.props['label-width'] != null && this.props['label-width'] !== '') {
            result.width = this.props['label-width']
        }

        if (!(this.props['label-position'] && this.props['label-position'] == 'top')) {
            // result['float'] = 'left';
            result.textAlign = this.props['label-position'];
        }

        // console.log(result)
        return result;
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props, prevProps) && !this.props.noUpdateFlag) {
            this.setState({successFlag: this.props.successFlag});
            this.setState({errorFlag: this.props.errorFlag});
            this.setState({errorMsg: this.props.errorMsg});
        }
    }

    render() {
        return (
            <div style={this.getFormItemStyle()} className={classNames(this.getFromItemClassName(), this.props.className)}>
                {this.props.hideLabel ? null : (<label style={this.getFormItemLabelStyle()} className='ui-form-item-label'>{this.props.label}</label>)}
                <div className='ui-form-item-content'>
                    {this.renderChildren(this.props)}
                    <div className={'ui-form-item-error-msg'}>{this.state.errorMsg}</div>
                </div>
            </div>
        );
    }
}

Form.FormItem = FormItem;

export default Form;