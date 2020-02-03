import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Menu from '../Menu/Menu';
import {CSSTransition} from "react-transition-group";
import './index.scss';

/**
 * 下拉框
 * @param {Dropdown} 组件所传属性描述.
 * @param {trigger} 下拉触发方式 (string) click  hover
 * @param {onClickMenu} 点击更换classname (funtion)
 * @param {contextMenu} 下拉方式为鼠标右击 (string) contextMenu
 * @param {title} 下拉菜单的名称 (string) 文本内容
 * @returns {undefined} undefined
 */

let DropDownID = 0;

class DropDown extends React.PureComponent {
    constructor(props) {
        super(props);

        DropDownID += 1;

        this.DropDown = React.createRef();

        this.state = {
            trigger : props.trigger || 'hover',
            visible: props.visible || false,
            DropDownID
        }

        if(props.overlay.type !== Menu) {
            throw(new Error('DropDown children must be type of Menu components!'))
        }
    }

    showMenu = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const {disabled} = this.props;

        if(disabled) { return false; }


        this.setState({
            visible: !this.state.visible
        })

        // this.props.onClickMenu(this.state.trigger);
    }

    hideMenu = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.setState({
            visible: false
        })
    }

    onChange(key) {
        const {onClickMenu, overlay} = this.props;

        const value = overlay.props.children[key].props.children;

        this.setState({
            visible: false
        })

        if(onClickMenu){
            onClickMenu(value);
        }
    }

    render(){
        const {
            type,
            disabled,
            className,
            children,
            icon,
            trigger,
            overlay,
            visible,
            ...other} = this.props;

        return (
            <div
                className={classNames('DropDown', className)}
                onMouseEnter={e => {this.state.trigger === 'hover' && this.showMenu(e)}}
                onMouseLeave={e => {this.state.trigger === 'hover' && this.hideMenu(e)}}
                {...other}
            >
                <Button 
                    type={type || 'txt'}
                    tabIndex={disabled ? '-1' : '0'}
                    disabled={disabled}
                    onClick={e => {this.state.trigger !== 'hover' && this.showMenu(e)}}
                    onBlur={e => {this.state.trigger !== 'hover' && this.hideMenu(e)}}
                >
                    {children}<Icon type={icon ? icon : 'down-arrow'} />
                </Button>
                <CSSTransition
                    in={this.state.visible}
                    timeout={300}
                    appear
                    key={'DropDown-' + this.state.DropDownID}
                    classNames="DropDown-side"
                    unmountOnExit
                >
                    <div className="DropDown-Menu-box">
                        {
                            React.cloneElement(overlay, {
                                className: classNames(overlay.props.className, {'DropDown-Menu': overlay.type.name === 'Menu'}),
                                onSelectedChange: (keys) => {
                                    this.onChange(keys)
                                }
                            })
                        }
                    </div>
                </CSSTransition>
            </div>
        )
    }
};


export default DropDown;