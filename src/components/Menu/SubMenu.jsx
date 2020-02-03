import MenuItemGroup from './MenuItemGroup'
import Item from './Item'
import Icon from '../Icon/Icon'
import {CSSTransition} from "react-transition-group";
import React, {Fragment} from "react";

/**
 * SubMenu: 组件所传属性描述
 * children: 子菜单的菜单项
 * disabled: 是否禁用
 * key: 唯一标志
 * title: 子菜单项值
 * onTitleClick: 点击子菜单标题
 * model            缩起/展开
 */
class SubMenu extends React.Component {

    constructor(props) {
        super(props);

        this.subMenuListWrapper = React.createRef();

        this.state = {
            subMenuSelected: false,
            slideInName: '',
            subMenuListWidth: 'auto',
            propsLeftDef: this.props.paddingLeft || 0,
            propsLeft: this.props.paddingLeft || 0
        };

        this.subMenu = React.createRef();
    }

    renderSubMenuTitle() {
        let result = this.props.title;
        if (this.props.hideTitleTxt) {
            let titleInfo = this.props.title.props.children;
            if (Array.isArray(titleInfo)) {
                if (titleInfo[0].type == Icon) {
                    result = titleInfo[0]
                } else {
                    result = <Fragment></Fragment>
                }
            } else {
                result = <Fragment></Fragment>
            }
        }

        return result
    }

    renderChildren() {
        // console.log(this.state.propsLeft, ' --- ',  this.props.inlineIndent, ' --- ',  this.state.propsLeft + this.props.inlineIndent);
        //遍历所有子组件
        let result = React.Children.map(this.props.children, child => {
            let childrenProps = {
                mode: this.props.mode,
                level: this.props.level + 1,
                objKey: child.key,
                parentSubMenuKey: this.props.objKey,
                inlineCollapsed: this.props.inlineCollapsed,
                inlineIndent: this.props.inlineIndent,
                paddingLeft: this.state.propsLeft + this.props.inlineIndent,
                openKeys: this.props.openKeys,
                selectedParentKeys: [this.props.objKey, ...this.props.selectedParentKeys],
                selectedKeys: this.props.selectedKeys,
                handleSubMenuToggle: this.props.handleSubMenuToggle && this.props.handleSubMenuToggle.bind(this),
                handleSubMenuOpen: this.props.handleSubMenuOpen && this.props.handleSubMenuOpen.bind(this),
                handleSubMenuClose: this.props.handleSubMenuClose && this.props.handleSubMenuClose,
                handleMenuItemClick: this.handleSubMenuItemClick.bind(this)
            };
            // if (this.props.mode == 'horizontal') {
            //     let paddingLeft = (this.props.paddingLeft || 0) + this.props.inlineIndent;
            //     childrenProps.paddingLeft = paddingLeft;
            //     console.log(paddingLeft)
            //     // console.log(this.props)
            //     console.log(childrenProps)
            // }
            if (this.props.mode == 'horizontal') {
                // childrenProps.paddingLeft = 0;
            }

            switch (child.type) {
                case SubMenu:
                case MenuItemGroup:
                case Item:
                    return React.cloneElement(child, childrenProps);
                    break;
                default:
                    return child;
                    break;
            }
        })

        return result;
    }

    handleSubMenuItemClick(keys, e) {
        if (this.props.mode == 'horizontal' || (this.props.mode == 'inline' && this.props.inlineCollapsed)) {
            if (!Array.isArray(keys)) {
                keys = [keys]
            }
            this.props.handleMenuItemClick([this.props.objKey, ...keys])
        } else {
            if (!Array.isArray(keys)) {
                keys = [keys]
            }
            this.props.handleMenuItemClick([this.props.objKey, ...keys])
        }
    }

    getSubMenuClassName() {
        let result = ['ui-menu-submenu'];

        if (this.props.mode == 'inline' && this.props.inlineCollapsed) {
            result.push('ui-menu-submenu-inline-collapsed');
        }

        if (this.state.slideInName === 'left') {
            result.push('ui-menu-submenu-left-in')
        }

        if (this.state.slideInName === 'right') {
            result.push('ui-menu-submenu-right-in')
        }

        if (this.props.openKeys && this.props.openKeys.includes(this.props.objKey)) {
            result.push('ui-menu-submenu-open');
        }

        if ((this.props.mode == 'horizontal' || (this.props.mode == 'inline' && this.props.inlineCollapsed)) && this.props.selectedKeys && this.props.selectedKeys.includes(this.props.objKey)) {
            result.push('ui-menu-submenu-selected');
        }

        return result.join(' ');
    }

    setSubmenuSelected() {
    }

    getSubMenuListShow() {
        let result = false;

        if (this.props.openKeys && this.props.openKeys.includes(this.props.objKey)) {
            result = true;
        }

        return result;
    }

    subMenuListEnter(openSubMenu, appearing) {
        console.log('subMenuListEnter===========subMenuListEnter')
        console.log('mode:', this.props.mode, '---inlineCollapsed:', this.props.inlineCollapsed, '---level:', this.props.level);

        let slideInName = '';
        if (this.props.mode === 'horizontal' || (this.props.mode === 'inline' && this.props.inlineCollapsed)) {
            if (this.props.level > 1 || this.props.mode === 'inline') {

                //屏幕可视区域宽高
                let clientWidth = document.body.clientWidth;
                let clientHeight = document.body.clientHeight;

                let ulKey = 'ui-menu-submenu-list-ul-' + this.props.objKey;
                //展开内容宽高
                let openSubMenuClientWidth = openSubMenu.clientWidth;
                let openSubMenuClientHeight = openSubMenu.clientHeight;
                // 展开内容位置
                let openSubMenuOffsetTop = openSubMenu.offsetTop;
                let openSubMenuOffsetLeft = openSubMenu.offsetLeft;
                // console.log('ulKey: ', ulKey);
                // console.log('clientWidth: ', clientWidth, ' --- clientHeight: ', clientHeight);
                // console.log('openSubMenuOffsetTop: ', openSubMenuOffsetTop, ' --- openSubMenuOffsetLeft: ', openSubMenuOffsetLeft);
                console.log('openSubMenuClientWidth: ', openSubMenuClientWidth, ' --- openSubMenuClientHeight: ', openSubMenuClientHeight);

                // rectObject.top：元素上边到视窗上边的距离;
                // rectObject.right：元素右边到视窗左边的距离;
                // rectObject.bottom：元素下边到视窗上边的距离;
                // rectObject.left：元素左边到视窗左边的距离;
                let rectObject = openSubMenu.getBoundingClientRect();
                console.log('rectObject: ', rectObject);

                openSubMenu.width = openSubMenuClientWidth;

                if (clientWidth - (rectObject.left + openSubMenuClientWidth) > openSubMenuClientWidth) {
                    slideInName = 'left'
                } else {
                    slideInName = 'right'
                }


                // console.log('====================', slideInName)
                this.state.propsLeft = 0;
                this.setState({
                    subMenuListWidth: `${openSubMenuClientWidth}px`,
                    propsLeft: this.state.propsLeft
                })
            }
        }
        this.setState({
            slideInName: slideInName
        })

    }

    subMenuListLeave(openSubMenu, appearing) {
        console.log('subMenuListLeave===========subMenuListLeave')

        this.state.propsLeft = this.state.propsLeftDef;
        this.setState({
            propsLeft: this.state.propsLeft
        })
    }

    subMenuListonEntered(openSubMenu, appearing) {
        if (this.props.mode === 'horizontal' || (this.props.mode === 'inline' && this.props.inlineCollapsed)) {
            if (this.props.level > 1 || this.props.mode === 'inline') {
                let ulKey = 'ui-menu-submenu-list-ul-' + this.props.objKey;

                //展开内容宽高
                let openSubMenuClientWidth = openSubMenu.clientWidth;
                let openSubMenuClientHeight = openSubMenu.clientHeight;
                console.log('clientWidth: ', openSubMenuClientWidth, ' --- clientHeight: ', openSubMenuClientHeight);
                console.log(ulKey, openSubMenuClientWidth);
                openSubMenu.width = openSubMenuClientWidth;
            }
        }

    }

    getSubMenuStyle() {
        let result = {
            // "paddingLeft": this.props.paddingLeft
        };

        if (this.props.mode == 'horizontal') {
            if (this.props.level !== 1) {
                result = {
                    // "paddingLeft": this.props.inlineIndent,
                    // "paddingRight": this.props.inlineIndent
                };
            } else {
                result = {
                    "paddingLeft": this.props.inlineIndent / 2,
                    "paddingRight": this.props.inlineIndent / 2,
                    "marginLeft": this.props.inlineIndent / 2,
                    "marginRight": this.props.inlineIndent / 2
                };
            }
        }

        return result;
    }

    getSubMenuContStyle() {
        let result = {
            paddingLeft: this.props.paddingLeft || 0,
            paddingRight: (this.props.paddingLeft || 0) + 10
        };

        if (this.props.mode == 'inline' && this.props.inlineCollapsed) {
            result = {
                paddingLeft: this.props.paddingLeft || 0,
                paddingRight: this.props.paddingLeft || 0
            };
        }

        if (this.props.mode == 'horizontal') {
            if (this.props.level !== 1) {
                result = {
                    // "paddingLeft": this.props.inlineIndent,
                    // "paddingRight": this.props.inlineIndent
                };
            } else {
                result = {
                    // "paddingLeft": this.props.inlineIndent/2,
                    // "paddingRight": this.props.inlineIndent/2,
                    // "marginLeft": this.props.inlineIndent/2,
                    // "marginRight": this.props.inlineIndent/2
                };
            }
        }

        return result;
    }

    handleSubMenuToggle = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.mode == 'horizontal' || (this.props.mode == 'inline' && this.props.inlineCollapsed)) {
            return;
        }
        this.props.handleSubMenuToggle && this.props.handleSubMenuToggle(this.props.objKey)
    }

    handleSubMenuEnter = (e) => {
        // console.log('handleSubMenuEnter ============', this.props.mode, !this.props.inlineCollapsed)
        e.stopPropagation();
        e.preventDefault();
        if (this.props.mode == 'vertical' || (this.props.mode === 'inline' && !this.props.inlineCollapsed)) {
            return;
        }
        this.props.handleSubMenuOpen && this.props.handleSubMenuOpen(this.props.objKey)
    }

    handleSubMenuLeave = (e) => {
        // console.log('handleSubMenuLeave ============', this.props.objKey, e)
        // e.stopPropagation();
        // e.preventDefault();
        if (this.props.mode == 'vertical' || (this.props.mode === 'inline' && !this.props.inlineCollapsed)) {
            return;
        }
        this.props.handleSubMenuClose && this.props.handleSubMenuClose(this.props.objKey, e)
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        // });
    }

    render() {
        const thisSubMenu = this.subMenu.current;
        return (
            <li
                style={this.getSubMenuStyle()}
                className={this.getSubMenuClassName()}
                onMouseEnter={this.handleSubMenuEnter}
                onMouseLeave={this.handleSubMenuLeave}
            >
                <div
                    style={this.getSubMenuContStyle()} className="ui-menu-submenu-title"
                    onClick={this.handleSubMenuToggle}
                >
                    {this.renderSubMenuTitle()}
                    <i className="ui-menu-submenu-arrow"></i>
                </div>
                <CSSTransition
                    ref={this.subMenuListWrapper}
                    in={this.getSubMenuListShow()}
                    onEnter={(node, appearing) => {
                        this.subMenuListEnter(node, appearing);
                    }}
                    onExit={(node, appearing) => {
                        this.subMenuListLeave(node, appearing);
                    }}
                    // appear
                    timeout={300}
                    classNames={'ui-menu-submenu-list'}
                    unmountOnExit
                >
                    <ul
                        id={'ui-menu-submenu-list-ul-' + this.props.objKey}
                        className={'ui-menu-submenu-list'}
                        ref={this.subMenu}
                    >
                        {this.renderChildren()}
                    </ul>
                    {/*<Fragment>{this.renderChildren(this.props)}</Fragment>*/}
                </CSSTransition>

            </li>
        )
    }
}


export default SubMenu;