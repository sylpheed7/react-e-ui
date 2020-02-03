import SubMenu from './SubMenu'
import Item from './Item'

/**
 * MenuItemGroup: 组件所传属性描述
 * children: 分组的菜单项
 * title: 分组标题
 */
class MenuItemGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupIndent: 10
        };
    }

    renderChildren() {
        //遍历所有子组件
        return React.Children.map(this.props.children, child => {
            let childrenProps = {
                mode: this.props.mode,
                level: this.props.level + 1,
                objKey: child.key,
                parentSubMenuKey: this.props.parentSubMenuKey || null,
                inlineCollapsed: this.props.inlineCollapsed,
                inlineIndent: this.props.inlineIndent,
                paddingLeft: (this.props.paddingLeft || 0) + this.props.inlineIndent,
                openKeys: this.props.openKeys,
                selectedParentKeys: [...this.props.selectedParentKeys],
                selectedKeys: this.props.selectedKeys,
                handleSubMenuToggle: this.props.handleSubMenuToggle && this.props.handleSubMenuToggle.bind(this),
                handleSubMenuOpen: this.props.handleSubMenuOpen && this.props.handleSubMenuOpen.bind(this),
                handleSubMenuClose: this.props.handleSubMenuClose && this.props.handleSubMenuClose,
                handleMenuItemClick: this.props.handleMenuItemClick && this.props.handleMenuItemClick.bind(this)
            };
            if (this.props.mode == 'horizontal') {
                if (this.props.level == 2) {
                    childrenProps.paddingLeft = this.state.groupIndent + this.props.inlineIndent;
                }
            }

            switch (child.type) {
                case SubMenu:
                case MenuItemGroup:
                case Item:
                    if (this.props.mode == 'horizontal') {
                        // childrenProps.paddingLeft = 0;
                    }
                    return React.cloneElement(child, childrenProps);
                    break;
                default:
                    return child;
                    break;
            }
        })
    }

    getMenuItemGroupClassName() {
        let result = ['ui-menu-itemgroup'];

        return result.join(' ');
    }

    getMenuItemGroupStyle() {
        let result = {
            // "paddingLeft": this.props.paddingLeft
        };

        return result;
    }

    getMenuItemGroupContStyle() {
        let result = {
            paddingLeft: (this.props.paddingLeft || 0) + this.state.groupIndent
        };

        if (this.props.mode == 'horizontal' && this.props.level == 2) {
            result = {
                "paddingLeft": this.state.groupIndent
            };
        }

        return result;
    }

    render() {
        return (
            <li style={this.getMenuItemGroupStyle()} className={this.getMenuItemGroupClassName()}>
                <div style={this.getMenuItemGroupContStyle()} className="ui-menu-item-group-title">
                    {this.props.title}
                    <i className="ui-menu-submenu-arrow"></i>
                </div>
                <ul>
                    {this.renderChildren()}
                </ul>
            </li>
        )
    }
}

export default MenuItemGroup