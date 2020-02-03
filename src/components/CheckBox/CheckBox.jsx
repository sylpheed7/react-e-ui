import React from 'react';
// import checkboxStyle from './CheckBox.scss';
import './index.scss';
/**
 * CheckBox
 * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false
 * props.checked 指定当前是否选中
 * props.indeterminate 混合状态(半选)
 * props.disabled 失效状态
 */
class CheckBox extends React.Component {
    constructor(props) {
        super(props);

        this.checkboxWrapper = React.createRef();

        this.state = {
            hover: false,
            checked: props.checked || false
        };
        // this.checkedToggle = this.checkedToggle.bind(this);

    }

    /**
     * 选择框最外层需要的class
     * @returns {string}  返回字符串
     */
    getCheckboxWrapperClassName(){
        let result = ['checkbox-wrapper'];
        // let result = [checkboxStyle.checkbox-wrapper];

        if(this.props.disabled){
            result.push('checkbox-disabled');
            // result.push(checkboxStyle.checkbox-disabled);
        }

        if(this.state.hover){
            result.push('checkbox-hover');
        }

        if(this.state.checked){
            result.push('checkbox-checked');
        }

        if( 
            this.props.indeterminate && !this.state.checked
        ){
            result.push('checkbox-indeterminate');
        }

        return result.join(' ');
    }

    /**
     * 点击事件
     * @param e 事件
     * @returns {boolean} 返回布尔值
     */

    checkedToggle(e) {
        let {
            onChange
        } = this.props;
        if (this.props.disabled) {
            return false;
        }
        this.setState({
            checked: !this.state.checked
        }, () => {
            onChange && this.props.onChange(this.state.checked, this.checkboxWrapper.current)
        })
    }

    /**
     * 鼠标悬停-进入
     * @param e 传入事件
     * @return {false} false
     */

    checkedMouseOver(e) {
        if (this.props.disabled) {
            return false;
        }

        this.setState({hover: true});
    }

    /**
     * 鼠标悬停-离开
     * @param e
     * @return {false} false
     */

    checkedMouseLeave(e) {
        if (this.props.disabled) {
            return;
        }

        this.setState({hover: false});
    }

    componentDidUpdate(prevProps) {
        if(prevProps.checked !== this.props.checked) {
            this.setState({
                checked: this.props.checked
            })
        }
    }

    render() {
        const {
            className,
            style,
            onClick, 
            disabled, 
            onMouseOver, 
            indeterminate, 
            checked, 
            onMouseLeave,
            children, 
            ...other} = this.props;
        return (
            <div 
                className={classNames(this.getCheckboxWrapperClassName(), className)} 
                style={style} ref={this.checkboxWrapper}
                onClick={(e) => this.checkedToggle(e)}
                onMouseOver={(e) => this.checkedMouseOver(e)}
                onMouseLeave={(e) => this.checkedMouseLeave(e)}
                {...other}
            >
                <span className="checkbox"></span>
                <span className="checkbox-text">{children}</span>
            </div>

        );
    }
}


/**
 * CheckBoxGroup
 * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false
 * props.options 指定可选项, 返回list. ex: [{label: "选项一", value: 1}, {label: "选项2", value: 2}]
 * props.value 选中的选项, 返回list. ex: [1, 2]
 * props.disabled 整组失效状态, 返回布尔。ex:true/false
 */
class CheckBoxGroup extends React.Component {
    constructor(props) {
        super(props);

        this.checkboxWrapper = React.createRef();

        this.state = {
            options: this.getCheckboxGroupOptionList()
        };
        // this.checkedToggle = this.checkedToggle.bind(this);

    }

    /**
     * 获取options解析后的本组件要使用的数据
     * 在要props的基础上添加一些属性
     * @param props
     * @returns {itemOptions} 组件
     */
    getCheckboxGroupOptionList(props){
        let itemOptions = [];
        props = props || this.props || {};
        for (var i = 0; i < props.options.length; i++) {
            var optionItem = props.options[i];
            if((props.value || []).includes(optionItem.value)){
                optionItem.checked = true;
            } else {
                optionItem.checked = false;
            }
            itemOptions.push(optionItem);
        }
        return itemOptions;
    }

    /**
     * 选择框组最外层需要的class
     * @returns {string} 字符串
     */
    getCheckboxGroupClassName(){
        let result = ['checkbox-group'];

        if(this.props.disabled){
            result.push('checkbox-group-disabled');
        }

        return result.join(' ');
    }

    getCheckboxItemClassName(idx){
        let classNameArr = ['checkbox-item-wrapper'];

        if(this.state.options[idx].checked){
            classNameArr.push('checkbox-item-checked');
        }

        return classNameArr.join(' ');
    }

    /**
     * 点击事件
     * @param e
     * @returns {boolean} false
     */
    itemToggle(idx, e) {
        let {
            onChange
        } = this.props;
        if (this.props.disabled) {
            return false;
        }
        // console.log(idx,'---',this.state.options[idx]);
        this.state.options[idx].checked = !this.state.options[idx].checked;
        let checkboxGroupValue = [];
        // this.setState({options: this.state.options});
        for (let i = 0; i < this.state.options.length; i++) {
            let optionItem = this.state.options[i];
            if(optionItem.checked){
                checkboxGroupValue.push(optionItem.value);
            }
        }

        // console.log('value:', checkboxGroupValue);
        if (onChange) {
            this.props.onChange(checkboxGroupValue)
        }
    }

    /**
     *
     * @returns {string} undefind
     */
    getCheckboxItemList(){
        const checkboxItemList = this.state.options.map((item, index) =>
            <div className={this.getCheckboxItemClassName(index)}
                key={new Date().getTime() + "_" + index}
                value={item.value}
                onClick={(e) => this.itemToggle(index, e)}
            >
                <span className="checkbox-item"></span>
                <span className="checkbox-item-text">{item.label}</span>
            </div>
        );

        return (checkboxItemList);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillReceiveProps(nextProps) {
        // console.log("nextProps", nextProps)
        this.setState({options: this.getCheckboxGroupOptionList(nextProps)});
    }

    render() {
        return (
            <div className={this.getCheckboxGroupClassName()}>
                {this.getCheckboxItemList()}
            </div>

        );
    }
}

CheckBox.CheckBoxGroup = CheckBoxGroup;

export default CheckBox;