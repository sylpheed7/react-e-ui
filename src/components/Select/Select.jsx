import "./index.scss";
import Icon from '../Icon/Icon'


/**
 * Select
 * props.onChange is function 参数是当前选择的数值, 返回字符串，多个值以‘,’逗号隔开
 * props.defaultValue 填写Option里的文本值。单个直接填写，多个请用数组['测试1', '测试2']
 * props.labelInValue 是否把label文本放进选中值里
 * props.maxLabel 最多显示几个label
 * props.disabled
 * props.loading 开启搜索时默认开启loading状态
 * props.search 是否开启搜索
 * props.allowClear 是否允许显示清空按钮
 * props.filterOption 在搜索模式时filterOption返回搜索过滤的option，返回true or false
 * props.loadData 根据输入值搜索动态显示Option和filterOption不能共存。常用于ajax获取数据。
 */

const removeClass = (className, ...arg) => {
    let classNameArr = className.split(' ');

    arg.map(n => {
        classNameArr.indexOf(n) >= 0 && classNameArr.splice(classNameArr.indexOf(n), 1);
    });
    return classNameArr;
};
class Select extends React.PureComponent {
    constructor(props) {
        super(props);

        const {defaultValue, placeholder, children, mode} = this.props;

        const childrens = Array.isArray(children) ? children : [children];

        if(typeof defaultValue !== 'string' && !mode && defaultValue) {
            throw new Error('defaultValue must be a string')
        }

        let initValue = [];

        if (Array.isArray(defaultValue) || defaultValue) {
            childrens.forEach(item => {
                if((Array.isArray(defaultValue) && defaultValue.includes(item.props.value)) || item.props.value === defaultValue) {
                    initValue.push({
                        txt: item.props.children,
                        class: ["zoom-in"]
                    });
                }
            })
            
        } else {
            initValue.push({
                txt: placeholder,
                class: ["zoom-in"]
            });
        }

        let initSelectClass = [];
        let selectOptionClassName = {};

        initValue.map((v, i) => {
            if (v.txt !== placeholder ){
                selectOptionClassName[v.txt] = 'cur'
            }
        });




        initSelectClass = defaultValue ? ["select", "default"] : ["select"];

        this.selectFocusClass = "focus selectOpen";
        this.selectFocusWarperOptionClass = "select-dropdown-show select-dropdown slide-up-enter";
        this.selectedValue = [];
        this.removeItemNum = [];

        this.time = null;

        this.stopBlurHandlerBoole = false;

        this.state = {
            showClear: this.props.allowClear || false,
            showInput: false,
            inputEmptyFlag: true,
            placeholder: this.props.placeholder,
            selectClass: initSelectClass, // select class
            selectedValue: initValue, //选中的值显示
            selectWarperOptionClass: [
                "selectItemList",
                "select-dropdown-hidden"
            ], // 选项warper class
            selectInputClass: placeholder && !defaultValue ? "placeholder" : "", // 多选时无默认值class控制
            selectOptionClassName: selectOptionClassName,
            optionData: childrens
        };



        childrens.map((v,i) => {
            initValue.map((vi, ii) => {
                if(('children' in this.props) && v.props.children === vi.txt){
                    if (this.props.labelInValue){
                        this.selectedValue.push(v.props.value + '|' + vi.txt);
                    } else {
                        this.selectedValue.push(v.props.value);
                    }
                }
            })
        });

        // this.props.onChange(this.selectedValue.join(','));

        this.props.defaultValue && this.props.onChange(this.selectedValue.join(','))

        this.removeDuplicateClass = arr => { return Array.from(new Set(arr)) };

        this.handelClick = this.handelClick.bind(this);
        this.handelBlur = this.handelBlur.bind(this);
        this.handleSelectInputItemRemove = this.handleSelectInputItemRemove.bind(this);
    }

    handelClick(event) {
        console.log("handelClick");
        event.stopPropagation();
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();

        if(this.props.disabled) {
            return false;
        }

        if (this.state.selectClass.includes('focus selectOpen')) {
            this.handelSelectOptionHidden();
        } else {
            this.handelSelectOptionShow();
        }

    }

    handelSelectOptionShow(event) {

        let selectWarperOptionClass = [...this.state.selectWarperOptionClass];
        let seleceClass = [...this.state.selectClass];

        const {children, search} = this.props;

        const childrens = Array.isArray(children) ? children : [children];

        seleceClass = seleceClass.filter(v => {return v != 'selectClose'});

        selectWarperOptionClass = selectWarperOptionClass.filter(v => { return !(v == 'select-dropdown-hidden' || v == 'select-dropdown-up' || v == 'slide-up-leave');});

        search && this.typeInput.focus();

        this.setState({
            selectClass: this.removeDuplicateClass([
                ...seleceClass,
                this.selectFocusClass
            ]),
            selectWarperOptionClass: this.removeDuplicateClass([
                ...selectWarperOptionClass,
                this.selectFocusWarperOptionClass
            ]),
            optionData: childrens
        });

        this.removeDuplicateClass([
            ...seleceClass,
            this.selectFocusClass
        ])
        // return false;
    }

    handelSelectOptionHidden() {
        let selectClassName = [...this.state.selectClass];
        let selectWarperOptionClassName = [...this.state.selectWarperOptionClass];
        if (selectClassName.includes('selectClose')) { return false; }

        this.setState({
            selectClass: this.removeDuplicateClass([
                ...removeClass(
                    selectClassName.join(" "),
                    "focus",
                    "selectOpen"
                ),
                "selectClose"
            ]),
            selectWarperOptionClass: this.removeDuplicateClass([
                ...removeClass(
                    selectWarperOptionClassName.join(" "),
                    "select-dropdown-show",
                    "select-dropdown",
                    "slide-up-enter"
                ),
                "select-dropdown-up",
                "slide-up-leave"
            ])
        });
    }

    handelFocus = e => {
        let oldSelectedValue =  this.state.selectedValue;

        if(this.props.mode !== 'multiple') {
            this.setState({
                selectedValue: [{
                    class: [],
                    txt: ''
                }],
                placeholder: oldSelectedValue[0].txt
            })
        }
    }

    handelBlur = (event) => {
        console.log("handelBlur");
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if(this.stopBlurHandlerBoole) {
            return false;
        }

        if(this.props.mode !== 'multiple' && this.props.search) {
            this.state.optionData.map(v => {
                if(v.props.children == this.state.placeholder && event.target.nodeName == 'INPUT' && event.target.value.length === 0) {
                    this.setState({
                        selectedValue: [{
                            class: ['select', 'default', 'selectClose'],
                            txt: this.state.placeholder
                        }],
                        placeholder: this.props.placeholder
                    })
                }
            })
        }

        this.handelSelectOptionHidden();
    }

    firstBlur = e => {

        if(!this.props.input) {
            this.handelBlur(e)
        }
    }

    handelKeyUp = e => {
        const val = e.target.value;
        let {selectedValue, selectOptionClassName, inputEmptyFlag} = this.state;

        if(val.length === 0 && e.keyCode === 8 && inputEmptyFlag) {
            let ads = selectedValue.pop();

            if(ads && selectOptionClassName[ads.txt] === 'cur') {
                delete selectOptionClassName[ads.txt]
            }

            this.setState({
                selectedValue: selectedValue || [],
                selectOptionClassName
            })

            this.forceUpdate();
        }

        if (val.length <= 0) {
            this.setState({
                inputEmptyFlag: true
            })
        } else {
            this.setState({
                inputEmptyFlag: false
            })
        }
    }

    handelClear = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.setState({
            selectedValue: [{
                txt: this.props.placeholder || '',
                class: ["zoom-in"]
            }],
            showClear: false,
            selectOptionClassName: {},
            selectInputClass: 'placeholder',
            selectClass: ['selectClose', 'select'],
            selectWarperOptionClass: ['selectItemList', "select-dropdown-up", "slide-up-leave"]
        });

        // this.handelSelectOptionHidden();

        this.props.onChange(this.props.mode === 'multiple' ? [] : '');
    }

    optionClicked = (event) => {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        event.stopPropagation();

        if (event.target.nodeName == 'LI' || event.target.nodeName == 'SPAN') {
            let target = event.target.nodeName == 'LI' ? event.target : event.target.parentNode;
            let selectOptionClassNameObj = {};
            let selectedValueTmp = [];
            let text = target.innerText;
            let value = target.getAttribute('value');
            let selectClass = [...this.state.selectClass];
            let timer = null;

            if (target.className === 'disabled'){
                return false;
            }

            if (this.props.mode === 'multiple') {
                Object.assign(selectOptionClassNameObj, this.state.selectOptionClassName);
                selectedValueTmp = [...this.state.selectedValue];
            }else{
                this.selectedValue = [];
            }

            if (this.state.selectOptionClassName[text] === 'cur' && this.props.mode === 'multiple') {
                delete selectOptionClassNameObj[text];
                selectedValueTmp.map((v, i) => {
                    if (v.txt === text){
                        selectedValueTmp[i].class = ['zoom-in-leave', 'zoom-out'];
                        this.removeItemNum.push(i);
                        this.selectedValue.splice(i, 1);
                    }
                });
            } else {

                selectOptionClassNameObj[text] = 'cur';

                selectedValueTmp.push({
                    txt: text,
                    class: ['zoom-in', 'zoom-in-enter']
                });
                selectClass.push('default');

                if (this.props.labelInValue) {
                    this.selectedValue.push((value + '|' + text));
                } else {
                    this.selectedValue.push(value);
                }

                if (selectedValueTmp[0].txt === this.props.placeholder) {
                    selectedValueTmp.splice(0, 1);
                }
            }

            selectClass = this.removeDuplicateClass(selectClass);

            this.setState({
                showClear: true,
                selectOptionClassName: selectOptionClassNameObj,
                selectedValue: selectedValueTmp,
                selectInputClass: selectedValueTmp.length > 0 ? '' : (this.props.placeholder && !this.props.defaultValue ? "placeholder" : ""),
                selectClass: selectClass
            }, () => {
                if(!this.props.mode){
                    this.handelSelectOptionHidden();
                }
            });


            if (this.props.mode === 'multiple'){

                if(this.props.search) {
                    this.typeInput.focus();
                    this.typeInput.value = '';
                }

                timer = setTimeout(() => {
                    let arr = [...selectedValueTmp];
                    let selectInputClass = '';


                    this.removeItemNum.map((v, i) => {
                        arr.splice(v, 1);
                        this.removeItemNum.splice(this.removeItemNum.indexOf(v), 1);
                    });

                    if (arr.length === 0) {
                        arr.push({
                            txt: this.props.placeholder,
                            class: ['zoom-in', 'zoom-in-enter']
                        });

                        selectInputClass = 'placeholder';

                        selectClass.splice(selectClass.indexOf('default'), 1);
                    }

                    this.setState({
                        selectedValue: arr,
                        showClear: true,
                        selectInputClass: selectInputClass,
                        selectClass: selectClass,
                        optionData: Array.isArray(this.props.children) ? this.props.children : [this.props.children]
                    });

                }, 195);
            }

            this.props.onChange(this.selectedValue.toString());
        }
    }

    stopBlurHandler = e => {
        console.log('enter')
        this.stopBlurHandlerBoole = true;
    }

    allowBlurHandler = e => {
        console.log('leave')
        this.stopBlurHandlerBoole = false;
    }

    handleSelectInputItemRemove(event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        let selectOptionClassName = this.state.selectOptionClassName;
        let selectedValue = [...this.state.selectedValue];
        let selectInputClass = this.state.selectInputClass;
        let selectClass = [...this.state.selectClass];
        let target = event.target;
        let txt = target.previousSibling.innerText;
        let timer = null;

        delete selectOptionClassName[txt];

        selectedValue.map((v, i) => {
            if(v.txt === txt){
                selectedValue[i].class = ['zoom-in-leave', 'zoom-out'];
                this.selectedValue.splice(i, 1);
            }
        });

        this.setState({
            selectedValue: selectedValue
        });

        timer = setTimeout(() => {
            let arr = [...selectedValue];


            arr.map((v, i) => {
                if (v.txt === txt) {
                    arr.splice(i, 1);
                }
            });

            if (arr.length === 0) {
                selectInputClass = 'placeholder';
                arr.push({
                    txt: this.props.placeholder,
                    class: ['zoom-in']
                });
                selectClass.splice(selectClass.indexOf('default'), 1)
            }

            this.setState({
                selectedValue: arr,
                selectOptionClassName: selectOptionClassName,
                selectInputClass: selectInputClass,
                selectClass: selectClass
            });
        }, 195);

        this.props.onChange(this.selectedValue.join(','));
    }

    filterOption = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        console.log(this.typeInput.style.width)

        const {search, filterOption, children, mode} = this.props;
        const childrens = Array.isArray(children) ? children : [children];

        // let value = e.target.value.replace(/^\s+|\s+$/g,'');
        let value = e.target.value;
        let changeValue = []

        if(mode !== 'multiple') {
            changeValue = [{
                txt: value,
                class: ['zoom-in']
            }];
        }

        if(search && filterOption && value.length >= 0) {
            if(mode) {
                this.setState({
                    optionData: childrens.filter(v => {return filterOption(value, v);})
                })
            } else {
                this.setState({
                    selectedValue: changeValue,
                    optionData: childrens.filter(v => {return filterOption(value, v);})
                })
            }
        } else {
            this.setState({
                optionData: childrens
            })
        }
    }

    loadData = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();


        const {search, loadData, children, mode} = this.props;
        const childrens = Array.isArray(children) ? children : [children];

        let value = e.target.value;
        let changeValue = []

        clearTimeout(this.time);
        if(mode !== 'multiple') {
            changeValue = [{
                txt: value,
                class: ['zoom-in']
            }];
            this.setState({
                selectedValue: changeValue
            })
        }

        this.time = setTimeout(function(){
            loadData && loadData(value);
        }, 200);

    }

    renderInput() {

        const {
            onClick, onBlur, className,
            filterOption,  search, children,
            mode, labelInValue, placeholder,
            defaultValue, style, disabled,
            reset, loadData, maxLabel, ...other
        } = this.props;
        const placeholders = this.state.placeholder || "请选择";

        let selectedValue = (maxLabel && maxLabel < this.state.selectedValue) ? [...this.state.selectedValue].splice(0, Number(maxLabel)) : this.state.selectedValue;

        const defaultElement = (selectedValue.map((v, index) => { if(v) { return <span key={index} className="input-values" title={v.txt}>{v.txt}</span>} }));

        const inputChangeHandler = e => {
            if(search) {
                if (filterOption) {
                    this.filterOption(e);
                } else if (loadData) {
                    this.loadData(e);
                } else {
                    this.filterOption(e);
                }
            }
        }

        const inputElementA = (<input
            ref={typeInput => {return this.typeInput = typeInput}}
            className="typeInput"
            placeholder={placeholders}
            onFocus={this.handelFocus}
            onBlur={this.handelBlur}
            disabled={disabled}
            onKeyUp={this.handelKeyUp}
            onChange={inputChangeHandler}
            value={selectedValue.map(v => {return v.txt }) == placeholder ? '' : selectedValue.map(v => {return v.txt})} type="text" />);

        const inputElementB = (<input
            ref={typeInput => {return this.typeInput = typeInput;}}
            className="typeInput"
            disabled={disabled}
            placeholder={placeholders}
            onFocus={this.handelFocus}
            onBlur={this.handelBlur}
            onKeyUp={this.handelKeyUp}
            onChange={inputChangeHandler} type="text" />);

        const multipleElementA = (<ul className={this.state.selectInputClass}>
            {selectedValue.map((v, index) => {
                if(v.txt !== placeholders) {
                    return (<li className={classNames(v.class.join(" "))} key={v.txt} title={v.txt}>
                        <span>{v.txt}</span>
                        <Icon onClick={this.handleSelectInputItemRemove} type="close-2" />
                    </li>);
                } else {
                    return (<li key={v.txt}><span>{v.txt}</span></li>);
                }
            })}
        </ul>);

        const multipleElementB = (<ul className={this.state.selectInputClass}>
            {selectedValue.map((v, index) => {
                if(v.txt !== placeholders && v.txt.length > 0) {
                    return (<li className={classNames(v.class.join(" "))} key={v.txt} title={v.txt}>
                        <span>{v.txt}</span>
                        <Icon onClick={this.handleSelectInputItemRemove} type="close-2" />
                    </li>);
                }
            })}
            <li className="typeInputBox">{inputElementB}</li>
        </ul>);

        if(mode) {
            if(search) {
                return multipleElementB;
            } else {
                return multipleElementA;
            }
        } else {
            if(search) {
                return inputElementA;
            } else {
                return defaultElement;
            }
        }
    }

    renderClearBtn() {
        const clearElement = (<Icon onClick={this.handelClear} className="clear" type="deleted" />);
        const {allowClear} = this.props;

        if(allowClear && this.state.showClear) {
            return clearElement;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.children !== prevProps.children) {
            this.setState({
                optionData: this.props.children
            })
        }
    }

    render() {
        const {
            onClick, onBlur, className,
            filterOption,  search, children,
            mode, labelInValue, placeholder,
            defaultValue, style, disabled,
            allowClear, loadData, maxLabel, ...other
        } = this.props;
        const tabIndex = disabled ? '-1' : '0';

        const LOADING = (<Option>Loading...</Option>);

        return (
            <div
                onClick={this.handelClick}
                onBlur={this.firstBlur}
                tabIndex={tabIndex}
                className={classNames(this.state.selectClass.join(" "), className, {'disabled': disabled})}
                {...other}
            >
                <div className="input">{this.renderInput()}</div>
                <Icon type="down-arrow" className="arrow" />
                <ul
                    onClick={e => {return this.optionClicked(e)}}
                    onMouseEnter={this.stopBlurHandler}
                    onMouseLeave={this.allowBlurHandler}
                    className={classNames(this.state.selectWarperOptionClass)}
                >
                    {
                        this.state.optionData.map((child, index) => {
                            const classes = child ? child.props.children : '';
                            return React.cloneElement(child, {
                                key: index,
                                className: this.state.selectOptionClassName[classes]
                            });
                        })
                    }
                </ul>
                {this.renderClearBtn()}
            </div>
        );
    }
};

/**
 * Option
 */

function Option(props) {

    const {disabled, value, children, style, className} = props;

    let classNamesa = disabled ? 'disabled' : className;

    return (
        <li style={style} className={classNames(classNamesa)} value={value}>
            {children}<Icon type="check" />
        </li>
    )
};

Select.Option = Option;

export default Select;
