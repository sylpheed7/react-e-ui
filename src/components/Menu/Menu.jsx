import {Fragment} from 'react';
import SubMenu from './SubMenu'
import MenuItemGroup from './MenuItemGroup'
import Item from './Item'
import './index.scss';
import {CSSTransition} from "react-transition-group";

/**
 * Menu 组件所传属性描述
 * mode: 菜单类型，现在支持垂直、水平、和内嵌模式三种 --- string: vertical horizontal inline, def:inline
 * defaultOpenKeys: 初始展开的 SubMenu 菜单项 key 数组
 * defaultSelectedKeys: 初始选中的菜单项 key 数组
 * inlineCollapsed：false 时菜单是否收起状态 默认为false, 设置为true我收起
 * inlineIndent: inline 模式的菜单缩进宽度 def:24
 * collapsedWidth: auto 收起状态时最小宽度 default: auto, 数值为数字，不能出现负数和小数点。
 * onOpenChange: SubMenu 展开/关闭的回调
 * onSelectedChange: 点击 MenuItem 调用此函数
 * style: 根节点样式
 * theme: 主题色,string: light dark, def:light
 */

class Menu extends React.Component {
    static defaultProps = {
        mode: 'inline',
        defaultOpenKeys: [],
        defaultSelectedKey: '',
        inlineCollapsed: false,
        inlineIndent: 24,
        style: {},
        theme: 'light',
        collapsedWidth: 'auto'
    }

    constructor(props) {
        super(props);
        this.state = {
            openKeys: this.props.mode === 'inline' && this.props.inlineCollapsed ? [] : this.props.defaultOpenKeys,
            selectedKeys: [this.props.defaultSelectedKey]
        };
    }

    renderChildren() {
        //遍历所有子组件
        // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", this)
        return React.Children.map(this.props.children, child => {
            // console.log(child, '=====', child.key)
            let childrenProps = {
                mode: this.props.mode,
                level: 1,
                objKey: child.key,
                inlineCollapsed: this.props.inlineCollapsed,
                inlineIndent: this.props.inlineIndent,
                paddingLeft: this.props.inlineIndent,
                openKeys: this.state.openKeys,
                selectedParentKeys: [],
                selectedKeys: this.state.selectedKeys,
                handleSubMenuToggle: this.handleSubMenuToggle.bind(this),
                handleSubMenuOpen: this.handleSubMenuOpen.bind(this),
                handleSubMenuClose: this.handleSubMenuClose.bind(this),
                handleMenuItemClick: this.handleMenuItemClick.bind(this)
            };
            if (this.props.mode == 'horizontal') {
                childrenProps.paddingLeft = 0;
            }

            if (this.props.mode == 'inline' && childrenProps.inlineCollapsed) {
                childrenProps.hideTitleTxt = true;
            }

            switch (child.type) {
                case SubMenu:
                    return React.cloneElement(child, childrenProps);
                    break;
                case MenuItemGroup:
                    return React.cloneElement(child, childrenProps);
                    break;
                case Item:
                    return React.cloneElement(child, childrenProps);
                    break;
                default:
                    return child;
                    break;
            }
        })
    }

    handleSubMenuToggle(key, e) {
        const _this = this;
        let openKeyList = _this.state.openKeys;

        if (this.props.mode == 'horizontal' || (this.props.mode === 'inline' && this.props.inlineCollapsed)) {
            openKeyList = [];
        }
        if (openKeyList.includes(key)) {
            let keyIdx = openKeyList.indexOf(key);
            openKeyList.splice(keyIdx, 1);
        } else {
            openKeyList.push(key);
        }

        this.setState({
            openKeys: openKeyList
        })
        this.props.onOpenChange && this.props.onOpenChange(openKeyList, key)
    }

    handleSubMenuOpen(key, e) {
        const _this = this;
        let openKeyList = _this.state.openKeys;

        if (!openKeyList.includes(key)) {
            openKeyList.push(key);
        }

        this.setState({
            openKeys: openKeyList
        })
        this.props.onOpenChange && this.props.onOpenChange(openKeyList, key)
    }

    handleSubMenuClose(key, e) {
        console.log('Menu handleSubMenuClose =====', key, e)
        const _this = this;
        let openKeyList = _this.state.openKeys;

        if (openKeyList.includes(key)) {
            let keyIdx = openKeyList.indexOf(key);
            openKeyList.splice(keyIdx, 1);
        }

        this.setState({
            openKeys: openKeyList
        })
        this.props.onOpenChange && this.props.onOpenChange(openKeyList, key)
    }

    handleMenuItemClick(keys, e) {
        // console.log("handleMenuItemClick00000000000000000000000000", keys)
        if (!Array.isArray(keys)) {
            keys = [keys]
        }
        const _this = this;
        this.setState({
            selectedKeys: keys
        })
        this.props.onSelectedChange && this.props.onSelectedChange(keys)
    }

    getMenuStyle() {
        // let result = this.props.style || {};

        let result = Object.assign({}, this.props.style);

        if (this.props.mode == 'inline') {
            // result.width = this.props.inlineIndent
        }

        if (this.props.mode == 'inline' && this.props.inlineCollapsed) {
            result.width = this.props.collapsedWidth;
            // result.overflowX = 'hidden';
        }

        // console.log('getMenuStyle =================', result)
        return result;
    }

    getMenuClassName() {
        let result = ['ui-menu'];

        result.push(`ui-menu-${this.props.mode}`);

        if (this.props.mode == 'inline' && this.props.inlineCollapsed) {
            result.push('ui-menu-inline-collapsed');
        }

        switch (this.props.mode) {
            case 'inline':
                break;
            case 'vertical':
                break;
            case 'horizontal':
                result.push('clearfix');
                break;
        }

        return classNames(result.join(' '), this.props.className);
    }

    componentDidUpdate(preProps) {
        // console.log(this.props.inlineCollapsed, preProps.inlineCollapsed)
        if (this.props.inlineCollapsed !== preProps.inlineCollapsed) {
            this.state.openKeys = [];
            this.setState({
                openKeys: this.state.openKeys
            })
        }
    }

    render() {
        return (
            <Fragment>
                {/*{this.state.selectedKeys.push('***')}*/}
                <ul style={this.getMenuStyle()} className={this.getMenuClassName()}>
                    {this.renderChildren()}
                </ul>
            </Fragment>
        )
    }
}

Menu.SubMenu = SubMenu;
Menu.MenuItemGroup = MenuItemGroup;
Menu.Item = Item;

export default Menu;