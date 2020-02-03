import React from 'react';
import {
    PropTypes
} from 'prop-types';
import "./index.scss";

/**
 * Textarea
 * props.onChange 舒服时触发回调，接收子组件传递输入的值得，同时父组件被修改
 * props.onPressEnter 按下回车触发触发回车事件回调，触发传递父组件接收的值，传递到子组件
 * props.allowClear 点击清除图标删除输入框的内容
 * props.prefix 设置textarea前缀图标
 * props.suffix 设置textarea后缀图标
 * props.disabled 设置输入框是否禁用
 */

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    // 设置组件静态属性校验传入的props类型是否合法
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        maxLength: PropTypes.string,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        onPressEnter: PropTypes.func,
        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        prefix: PropTypes.node
    }

    // 输入框内容的回调
    handleChange(e) {
        let {
            onChange,
            disabled
        } = this.props;
        console.log('输入',e.target.value)
        this.setState({
            value: e.target.value
        });

        if (onChange && !disabled) {
            onChange(e.target.value, e);
        }
    }

    // 输入框内容的回调
    handleInput(e) {
        let {
            onInput,
            disabled
        } = this.props;
        // console.log('输入',e.target.value)
        this.setState({
            value: e.target.value
        });

        if (onInput && !disabled) {
            onInput(e.target.value, e);
        }
    }

    // 获取焦点事件
    handleFocus(e) {
        let {
            onFocus,
            disabled
        } = this.props;
        if (onFocus && !disabled) {
            onFocus(e.target.value, e);
        }
    }

    // 失去焦点事件
    handleBlur(e) {
        let {
            onBlur,
            disabled
        } = this.props;
        if (onBlur && !disabled) {
            onBlur(e.target.value, e);
        }
    }

    // 按下键盘触发事件
    handleKeyDown = (e) => {
        let {
            onPressEnter,
            onKeyDown,
            disabled
        } = this.props;

        // 按下回车且传递了回车事件属性
        if (e.keyCode == 13 && onPressEnter && !disabled) {
            onPressEnter(e.target.value, e);
        } else if(onKeyDown && !disabled){
            onKeyDown(e.target.value, e)
        }
    }


    // 按下键盘触发事件
    handleKeyUp = (e) => {
        let {
            onKeyUp,
            disabled
        } = this.props;

        // 按下回车且传递了回车事件属性
        if (onKeyUp && !disabled) {
            onKeyUp(e.target.value, e);
        }
    }

    // 获取textarea标签类名
    getTextareaClassName() {
        const {
                size,
                disabled
            } = this.props,
            arrClass = [],
            objClass = {
                'textarea': true
            };

        Object.assign(objClass, {
            'textarea-lg': size === 'large',
            'textarea-sm': size === 'small',
            'textarea-disabled': disabled
        });

        for (let key in objClass) {
            objClass[key] ? arrClass.push(key) : '';
        }

        return arrClass.join(' ');
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        // console.log('newProps' , newProps)
        // this.setState({
        //     value: newProps.value
        // })
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate() {

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.value !== prevProps.value){
            this.setState({
                value: this.props.value
            })
        }
    }

    // 点击删除图标删除输入框内容
    clearTextareaContent = () => {
        this.setState({
            value: ''
        })
    }

    // 渲染删除图标
    initClearIcon = () => {
        let {
                allowClear,
                disabled
            } = this.props, {
                value
            } = this.state;

        // 没有输入值时
        if (!allowClear || value == '' || value == undefined || value == null || disabled) {
            return null;
        }
        return (
            <i className="icon icon-guanbishibaixianxing" onClick={this.clearTextareaContent}></i>
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
                <span className="textarea-suffix">
                    {this.initClearIcon()}
                    {suffix}
                </span>
            )
        }
    }

    renderTextareaIcon = (children) => {
        let {
                style,
                rows,
                cols,
                className,
                prefix,
                disabled
            } = this.props,
            prefixs = '',
            suffix = this.renderSuffix();

        // 前置图标
        prefixs = prefix ? <span className="textarea-prefix">{prefix}</span> : ''

        return (
            <span className="textarea-wrapper">
                {prefixs}
                {
                    React.cloneElement(children, {
                        style: style,
                        rows: rows,
                        cols: cols,
                        className: classNames(this.getTextareaClassName(), className),
                        disabled
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
            value
        } = this.state;

        return this.renderTextareaIcon(
            <textarea
                onChange={this.handleChange.bind(this)}
                onInput={this.handleInput.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                className={this.getTextareaClassName()}
                placeholder={this.props.placeholder}
                type={this.props.type}
                maxLength={this.props.maxLength}
                value={this.checkValue(value)} />
        )
    }
}

export default TextArea;