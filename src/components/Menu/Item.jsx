import SubMenu from './SubMenu'
import MenuItemGroup from './MenuItemGroup'
import Icon from "../Icon/Icon";
import React, {Fragment} from "react";

/**
 * Item: 组件所传属性描述
 * key: item 的唯一标志
 * disabled: 是否禁用
 * title: 设置收缩时展示的悬浮标题
 */
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderMenuItemTitle(child) {
        let result = child;
        if (this.props.hideTitleTxt) {
            if (child.type !== Icon) {
                result = <Fragment></Fragment>
            }
        }

        // console.log(result)
        return result
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(this.props.children, child => {
            let childrenProps = {
                mode: this.props.mode,
                objKey: child.key,
                parentSubMenuKey: this.props.parentSubMenuKey || null,
                level: this.props.level + 1,
                inlineCollapsed: this.props.inlineCollapsed,
                inlineIndent: this.props.inlineIndent,
                paddingLeft: (props.paddingLeft || 0) + this.props.inlineIndent,
                openKeys: this.props.openKeys,
                selectedParentKeys: [...this.props.selectedParentKeys],
                selectedKeys: this.props.selectedKeys,
                handleSubMenuToggle: this.props.handleSubMenuToggle && this.props.handleSubMenuToggle.bind(this),
                handleSubMenuOpen: this.props.handleSubMenuOpen && this.props.handleSubMenuOpen.bind(this),
                handleSubMenuClose: this.props.handleSubMenuClose && this.props.handleSubMenuClose,
                handleMenuItemClick: this.props.handleMenuItemClick && this.props.handleMenuItemClick.bind(this)
            };
            if (this.props.mode == 'horizontal') {
                childrenProps.paddingLeft = 0;
            }

            switch (child.type) {
                case SubMenu:
                case MenuItemGroup:
                case Item:
                    return React.cloneElement(child, childrenProps);
                    break;
                default:
                    return this.renderMenuItemTitle(child);
                    break;
            }
        })
    }

    getMenuItemClassName() {
        let result = ['ui-menu-item'];
        // console.log('selectedKeys --- ', this.props.selectedKeys, ' --- ', this.props)
        if (this.props.selectedKeys && this.props.selectedKeys.includes(this.props.objKey)) {
            result.push('ui-menu-item-selected');
        }

        return result.join(' ');
    }

    getMenuItemStyle() {
        // console.log(this.props.paddingLeft)
        let result = {
            "paddingLeft": this.props.paddingLeft || 0,
            "paddingRight": this.props.paddingLeft
        };

        if (this.props.mode == 'horizontal') {
            if (this.props.level == 1) {
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

    handleMenuItemClick = (e) => {
        // console.log('handleMenuItemClick=======', e)
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.props.handleMenuItemClick(this.props.objKey)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedKeys && this.props.selectedKeys.includes(this.props.objKey)) {
            // this.props.handleMenuItemClick(new Set([...this.props.selectedKeys, ...this.props.selectedParentKeys]))
            // this.handleMenuItemClick();
        }
    }

    render() {
        return (
            <li style={this.getMenuItemStyle()} className={this.getMenuItemClassName()}
                onClick={this.handleMenuItemClick}
            >
                {this.renderChildren(this.props)}
            </li>
        )
    }
}

export default Item;