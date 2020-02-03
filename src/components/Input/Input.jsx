import React from 'react';
import './index.scss';
import Icon from '../Icon/Icon';

/**
 * Input
 * props.onChange 舒服时触发回调，接收子组件传递输入的值得，同时父组件被修改
 * props.onPressEnter 按下回车触发触发回车事件回调，触发传递父组件接收的值，传递到子组件
 * props.allowClear 点击清除图标删除输入框的内容
 * props.prefix 设置input前缀图标
 * props.suffix 设置input后缀图标
 * props.disabled 设置输入框是否禁用
 */

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.value
        }
    }

    // 设置组件静态属性校验传入的props类型是否合法
    // static propTypes = {
    //     type: PropTypes.string,
    //     size: PropTypes.string,
    //     maxLength: PropTypes.string,
    //     disabled: PropTypes.bool,
    //     className: PropTypes.string,
    //     onPressEnter: PropTypes.func,
    //     onChange: PropTypes.func,
    //     onInput: PropTypes.func,
    //     onKeyDown: PropTypes.func,
    //     onKeyUp: PropTypes.func,
    //     onFocus: PropTypes.func,
    //     onBlur: PropTypes.func,
    //     prefix: PropTypes.node
    // }

    // 输入框内容的回调
    handleChange(e) {
        let {
            onChange
        } = this.props;
        // console.log('输入',e.target.value)
        this.setState({
            values: e.target.value
        });

        if (onChange) {
            onChange(e.target.value, e);
        }
    }

    // 输入框内容的回调
    handleInput(e) {
        let {
            onInput
        } = this.props;
        // console.log('输入',e.target.value)
        this.setState({
            values: e.target.value
        });

        if (onInput) {
            onInput(e.target.value, e);
        }
    }

    // 获取焦点事件
    handleFocus(e) {
        let {
            onFocus
        } = this.props;
        if (onFocus) {
            onFocus(e.target.value, e);
        }
    }

    // 失去焦点事件
    handleBlur(e) {
        let {
            onBlur
        } = this.props;
        if (onBlur) {
            onBlur(e.target.value, e);
        }
    }

    // 按下键盘触发事件
    handleKeyDown = (e) => {
        let {
            onPressEnter,
            onKeyDown
        } = this.props;

        // 按下回车且传递了回车事件属性
        if (e.keyCode == 13 && onPressEnter) {
            onPressEnter(e.target.value, e);
        } else if(onKeyDown){
            onKeyDown(e.target.value, e)
        }
    }


    // 按下键盘触发事件
    handleKeyUp = (e) => {
        let {
            onKeyUp
        } = this.props;

        // 按下回车且传递了回车事件属性
        if (onKeyUp) {
            onKeyUp(e.target.value, e);
        }
    }

    // 获取input标签类名
    getInputClassName() {
        const {
                size,
                disabled
            } = this.props,
            arrClass = [],
            objClass = {
                'input': true
            };

        Object.assign(objClass, {
            'input-lg': size === 'large',
            'input-sm': size === 'small',
            'input-disabled': disabled
        });

        for (let key in objClass) {
            objClass[key] ? arrClass.push(key) : '';
        }

        return arrClass.join(' ');
    }

    componentDidUpdate(preProps) {
        if(this.props.value !== preProps.value) {
            this.setState({
                values: this.props.value
            })
        }
    }

    componentWillReceiveProps(newProps) {
        // console.log('newProps' , newProps)
        // this.setState({
        //     value: newProps.value
        // })
    }


    // 点击删除图标删除输入框内容
    clearInputContent = () => {
        this.setState({
            values: ''
        })
    }

    // 渲染删除图标
    initClearIcon = () => {
        let {
                allowClear
            } = this.props, {
                values
            } = this.state;

        // 没有输入值时
        if (!allowClear || values == '' || values == undefined || values == null) {
            return null;
        }
        return (
            <Icon type="deleted" className="clear" onClick={this.clearInputContent}/>
        )
    }

    // 渲染后缀图标
    renderSuffix = () => {
        let {
            suffix,
            allowClear
        } = this.props;

        if (suffix || allowClear) {
            return (
                <span className="input-suffix">
                    {this.initClearIcon()}
                    {suffix}
                </span>
            )
        }
    }

    renderInputIcon = (children) => {
        let {
                props
            } = this,
            prefix = '',
            suffix = this.renderSuffix();

        // 前置图标
        prefix = props.prefix ? <span className="input-prefix">{props.prefix}</span> : ''

        return (
            <span className={"input-wrapper" + (this.props.className?` ${this.props.className}`:'')}>
                {prefix}
                {
                    React.cloneElement(children, {
                        style: props.style,
                        className: classNames(this.getInputClassName(), props.className)
                    })
                }
                {suffix}
            </span>
        );
    }

    // 检查输入的值
    checkValue = (value) => {
        // console.log('child-----', value)
        if (typeof value === 'undefined' || value === null) {
            return '';
        }

        return value;
    }

    render() {
        let {
            values
        } = this.state;

        const {placeholder, type, maxLength, className, style, onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp, value, ...other} = this.props;

        return this.renderInputIcon(
            <input 
                onChange={this.handleChange.bind(this)}
                onInput={this.handleInput.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                className={this.getInputClassName()}
                placeholder={placeholder}
                type={type}
                maxLength={maxLength}
                value={this.checkValue(values)}
                {...other}
            />
        )
    }
}

export default Input;