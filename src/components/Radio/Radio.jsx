import React from 'react';
import './index.scss';
import CheckBox from "../CheckBox/CheckBox";
import isEqual from 'lodash/isEqual';

/**
 * Radio
 * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false
 * props.checked 指定当前是否选中
 * props.disabled 失效状态
 */

class Radio extends React.Component {
    constructor(props) {
        super(props);

        this.radioWrapper = React.createRef();

        this.state = {
        };

    }

    /**
     * 选择框最外层需要的class
     * @returns {string}
     */

    getRadioWrapperClassName(){
        let result = ['radio-wrapper'];

        if(this.props.disabled){
            result.push('radio-disabled');
            // result.push(radioStyle.radio-disabled);
        }

        if(this.props.checked){
            result.push('radio-checked');
        }

        return result.join(' ');
    }

    /**
     * 点击事件
     * @param e
     * @returns {boolean}
     */
    
    checkedToggle(e) {
        let {
            onChange
        } = this.props;

        if (this.props.disabled) {
            return false;
        }

        if (!this.props.checked) {
            if (onChange) {
                this.props.onChange(true, this.radioWrapper.current)
            }
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({disabled: nextProps.disabled || false});
    }

    render() {
        return (
            <div className={this.getRadioWrapperClassName()} ref={this.radioWrapper}
                onClick={(e) => this.checkedToggle(e)}
            >
                <span className="radio"></span>
                <span className="radio-text">{this.props.children}</span>
            </div>

        );
    }
}


/**
 * RadioGroup
 * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false
 * props.options 指定可选项, 返回list. ex: [{label: "选项一", value: 1}, {label: "选项2", value: 2}]
 * props.value 选中的选项, 返回当前值. ex: 1
 * props.disabled 整组失效状态, 返回布尔。ex:true/false
 */
class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.radioWrapper = React.createRef();

        this.state = {
            options: this.getRadioGroupOptionList()
        };
        // this.checkedToggle = this.checkedToggle.bind(this);

    }

    /**
     * 获取options解析后的本组件要使用的数据
     * 在要props的基础上添加一些属性
     */
    getRadioGroupOptionList(){
        let itemOptions = [];
        for (var i = 0; i < this.props.options.length; i+=1) {
            var optionItem = this.props.options[i];
            let stateOptionItem = {
                label: optionItem.label,
                value: optionItem.value
            };

            if(this.props.value === stateOptionItem.value) {
                stateOptionItem.checked = true;
            } else {
                stateOptionItem.checked = false;
            }
            itemOptions.push(stateOptionItem);
        }
        return itemOptions;
    }

    /**
     * 选择框组最外层需要的class
     * @returns {string}
     */
    getRadioGroupClassName(){
        let result = ['radio-group'];

        if(this.props.disabled){
            result.push('radio-group-disabled');
        }

        return result.join(' ');
    }

    getRadioItemClassName(idx){
        let classNameArr = ['radio-item-wrapper'];
        if(this.props.button){
            classNameArr.push('radio-button-item-wrapper');
        }

        if(this.state.options[idx].checked){
            classNameArr.push('radio-item-checked');
        }

        return classNameArr.join(' ');
    }

    /**
     * 点击事件
     * @param e
     * @returns {boolean}
     */
    radioItemChange(idx, e) {
        if (this.props.disabled) {
            return false;
        }

        let {
            onChange
        } = this.props;

        let radioGroupValue = null;

        for (let i = 0; i < this.state.options.length; i+=1) {
            let optionItem = this.state.options[i];
            if(i === idx){
                optionItem.checked = true;
                radioGroupValue = optionItem.value;
            }else {
                optionItem.checked = false;
            }
        }

        // this.setState({options: this.state.options});
        if (onChange) {
            this.props.onChange(radioGroupValue)
        }
    }

    /**
     *
     * @returns {string}
     */
    getRadioItemList(){
        // console.log(this.props)
        // console.log(this.state.options)
        const radioItemList = this.state.options.map((item, index) =>
            <div className={this.getRadioItemClassName(index)}
                key={new Date().getTime() + "_" + index}
                value={item.value}
                onClick={(e) => this.radioItemChange(index, e)}
            >
                <span className="radio-item"></span>
                <span className="radio-item-text">{item.label}</span>
            </div>
        );

        return (radioItemList);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if(!isEqual(this.props.options, prevProps.options) || !isEqual(this.props.value, prevProps.value)) {
            this.setState({options: this.getRadioGroupOptionList()});
        }
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({options: this.getRadioGroupOptionList()});
    }

    render() {
        return (
            <div className={this.getRadioGroupClassName()}>
                {this.getRadioItemList()}
            </div>

        );
    }
}

Radio.RadioGroup = RadioGroup;

export default Radio;