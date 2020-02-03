import Icon from '../Icon/Icon';
import {CSSTransition} from "react-transition-group";
import arrayTreeFilter from 'array-tree-filter';
import "./index.scss";

class Cascader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            activeValue: [],
            activeLabel: [],
            toggleOptIcon: false,
            showClear: props.allowClear || true
        };

        this.cascader = null;
    }

    static defaultProps = {
        onChange: undefined,
        value: [],
        icon: undefined,
        style: undefined,
        showSearch: false,
        placehoder: '请选择',
        defaultValue: [],
        disabled: false,
        className: undefined,
        changeOnSelect: false,
        autoFocus: false,
        allowClear: true,
        loadData: undefined,
        options: undefined,
        separator: '/'
    };

    setLabelAndValueByDef = () => {
        let {defaultValue, options} = this.props;
        let activeLabel = [],
            activeValue = [];

        const getLabelAndValue = (defValList, optionList) => {
            for (let i = 0; i < optionList.length; i++) {
                const optionItem = optionList[i];
                console.log(defValList, '---', optionItem.value, '---', defValList.includes(optionItem.value))
                if (defaultValue.includes(optionItem.value)) {
                    activeValue.push(optionItem.value);
                    activeLabel.push(optionItem.label);
                    if (optionItem.children && optionItem.children.length > 0) {
                        getLabelAndValue(defValList, optionItem.children)
                    }
                }
            }
        }

        getLabelAndValue(defaultValue, options);

        this.setState({
            activeLabel,
            activeValue
        });
    }

    clickHandler = e => {
        e.stopPropagation();

        const {visible} = this.state;

        visible ? this.setState({
            visible: false
        }) : this.setState({
            visible: true
        })
    }

    hideHandler = e => {
        e.stopPropagation();

        this.setState({
            visible: false
        })
    }

    getActiveOptions(values) {
        const activeValue = values || this.state.activeValue;
        const options = this.props.options;

        return arrayTreeFilter(options, (o, level) => o.value === activeValue[level]);
    }

    getShowOptions() {
        const {options} = this.props;
        const result = this.getActiveOptions()
            .map(activeOption => activeOption.children)
            .filter(activeOption => !!activeOption);

        result.unshift(options);
        return result;
    }

    isActiveOption(option, menuIndex) {
        const {activeValue = []} = this.state;
        return activeValue[menuIndex] === option.value;
    }

    getOption = (option, index) => {
        let icon = '';
        if(option.children || ('isLeaf' in option)) {
            icon = (<Icon type="right-arrow"></Icon>);
            if(option.loading) {
                icon = (<Icon type="loading-2" spin></Icon>);
            }
        }

        return (
            <li
                key={option.value}
                label={option.label}
                className={classNames({'disabled': option.disabled, 'cur': this.isActiveOption(option, index)})}
                role="menuitem"
                onClick={(e) => {this.optionsClick(option, index, e)}}
                onMouseDown={e => e.preventDefault()}
            >
                {option.label}
                {icon}
            </li>
        );
    };

    renderOptionIcon() {
        const {loadData} = this.props;

        if(loadData) {

        }
    }

    optionsClick = (targetOption, index, e) => {
        e.stopPropagation();

        if (targetOption.disabled) {
            return false;
        }

        const {changeOnSelect, onChange, loadData} = this.props;
        let {activeLabel, activeValue} = this.state;

        activeValue = activeValue.slice(0, index + 1);
        activeLabel = activeLabel.slice(0, index + 1);
        activeValue[index] = targetOption['value'];
        activeLabel[index] = targetOption['label'];

        const activeOptions = this.getActiveOptions(activeValue);


        if (targetOption.isLeaf === false && !targetOption.children && loadData) {
            if (changeOnSelect) {
                onChange(activeValue, e);
            }
            this.setState({
                activeLabel,
                activeValue,
                toggleOptIcon: true
            });
            loadData(activeOptions[activeOptions.length - 1]);
            return;
        }

        if (
            !targetOption['children'] ||
            !targetOption['children'].length
        ) {
            onChange(activeValue, e);
            this.setState({
                visible: false
            })
        }

        this.setState({activeValue, activeLabel});

    }

    handelClear = (e) => {
        e.stopPropagation();
        const {onChange, value} = this.props;

        this.setState({
            activeLabel: [],
            activeValue: value || [],
            visible: false
        });
        onChange && onChange(value);

    }

    renderClearBtn() {
        const clearElement = (<Icon onClick={this.handelClear} className="clear" type="deleted" />);
        const {showClear, activeLabel} = this.state;

        if (showClear && activeLabel.length > 0) {
            return clearElement;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate ====================');
        let {defaultValue, options} = this.props;
        if (defaultValue !== prevProps.defaultValue){
            this.setLabelAndValueByDef();
        }
    }

    componentDidMount() {
        this.setLabelAndValueByDef();
    }
    
    

    render() {
        const {visible, activeLabel} = this.state;
        const {placehoder, disabled, className, separator} = this.props;

        return (
            <div
                className={classNames('cascader', className, {'disabled': disabled})}
                tabIndex={disabled ? '-1' : '0'}
                ref={cascader => this.cascader = cascader}
                onClick={this.clickHandler}
                onBlur={this.hideHandler}
            >
                <div className="cascader-value">{activeLabel.join(separator)}</div>
                <input type="text" tabIndex="-1" placeholder={activeLabel.length > 0 ? '' : placehoder} autoComplete="off" readOnly />
                <Icon className="arrow" type="down-arrow" />
                {this.renderClearBtn()}
                <CSSTransition
                    in={visible}
                    timeout={400}
                    classNames="options-warper-side"
                    unmountOnExit
                >
                    <div className="options-warper">
                        {this.getShowOptions().map((options, index) => (
                            <ul key={index}>
                                {options.map(option => this.getOption(option, index))}
                            </ul>
                        ))}
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default Cascader;
