import './index.scss';
import Icon from '../Icon/Icon';
import React from 'react'

const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    };
})();

const LayoutContext = React.createContext({
    siderHook: {
        addSider: () => {return null},
        removeSider: () => {return null}
    }
});
const SiderContext = React.createContext({});

function Basic(props) {
    const {prefixCls, className, children, tagName, ...others} = props;

    const classString = classNames(className, prefixCls);

    return React.createElement(tagName, {className: classString, ...others}, children)
}

class BasicLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            siders: []
        }
    }
    siderHook() {
        return {
            addSider: (id) => {
                this.setState(state => {return ({
                    siders: [...state.siders, id]
                })});
            },
            removeSider: (id) => {
                this.setState(state => {return ({
                    siders: state.siders.filter(currentId => currentId !== id)
                })});
            }
        }
    }

    render() {

        const {prefixCls, className, children, tagName, ...others} = this.props;
        const classString = classNames(className, prefixCls, {
            [`has-sider`]: typeof hasSider === 'boolean' ? hasSider : this.state.siders.length > 0
        });

        return (
            <LayoutContext.Provider value={{siderHook: this.siderHook()}}>
                {React.createElement(tagName, {className: classString, ...others}, children)}
            </LayoutContext.Provider>
        )
    }
}

function generator({prefixCls, tagName}) {
    return (BasicComponent) => {
        const Adapter = props => {return (<BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />)};
        return Adapter;
    }
}

class InternalSider extends React.Component {
    static defaultProps = {
        style: {},
        collapsedWidth: '80',
        collapsible: false,
        defaultCollapsed: false,
        showTrigger: true,
        triggerElement: null
        // onCollapse: (collapsed, type) => void
    }

    constructor(props, defaultProps) {
        super(props, defaultProps);

        let collapsed;

        if ('collapsed' in props) {
            collapsed = props.collapsed;
        } else {
            collapsed = props.defaultCollapsed;
        }

        this.state = {
            collapsed: collapsed
        }

        this.uniqueId = generateId('sider-');
    }
    setCollapsed = (collapsed, type) => {
        if (!('collapsed' in this.props)) {
            this.setState({
                collapsed
            });
        }
        const {onCollapse} = this.props;
        if (onCollapse) {
            onCollapse(collapsed, type);
        }
    }
    toggle = (eventType) => {
        this.setCollapsed(!this.state.collapsed, 'clickTrigger');
        this.props.siderChange && this.props.siderChange();
    }
    renderTrggerElement() {
        const {triggerElement} = this.props;

        return triggerElement || <Icon type={!this.state.collapsed ? 'left-arrow' : 'right-arrow'}></Icon>;
    }
    renderSider = () => {
        const {children, className, width, style, collapsedWidth, showTrigger, collapsible, siderChange} = this.props;
        const classString = classNames(className, 'layout-sider');

        let siderWidth;

        if (this.state.collapsed) {
            siderWidth = collapsedWidth
        } else {
            siderWidth = width
        }

        const divStyle = {
            ...style,
            flex: `0 0 ${siderWidth}px`,
            maxWidth: `${siderWidth}px`, // Fix width transition bug in IE11
            minWidth: `${siderWidth}px`, // https://github.com/ant-design/ant-design/issues/6349
            width: `${siderWidth}px`
        };

        return (
            <aside className={classString} style={divStyle}>
                <div className='layout-sider-children'>{children}</div>
                {(collapsible || showTrigger) ? (<div className='layout-sider-trigger' onClick={this.toggle} style={{width: `${siderWidth - 1}px`}}>
                    {this.renderTrggerElement()}
                </div>): ''}
            </aside>
        )
    }

    componentDidMount() {

        if (this.props.siderHook) {
            this.props.siderHook.addSider(this.uniqueId);
        }
    }

    componentWillUnmount() {
        if (this.props.siderHook) {
            this.props.siderHook.removeSider(this.uniqueId);
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.collapsed !== this.props.collapsed) {
            this.setState({
                collapsed: this.props.collapsed
            }, this.toggle);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {collapsedWidth} = this.props;

        return (
            <SiderContext.Provider
                value={{
                    siderCollapsed: collapsed,
                    collapsedWidth
                }}
            >
                {this.renderSider()}

            </SiderContext.Provider>
        )
    }
}

class Sider extends React.Component {
    render() {
        return (
            <LayoutContext.Consumer>
                {context => {return (<InternalSider {...context} {...this.props} />)}}
            </LayoutContext.Consumer>
        )
    }
}

const Layout = generator({
    prefixCls: 'layout',
    tagName: 'section'
})(BasicLayout);

const Header = generator({
    prefixCls: 'layout-header',
    tagName: 'header'
})(Basic);

const Content = generator({
    prefixCls: 'layout-content',
    tagName: 'main'
})(Basic);

const Footer = generator({
    prefixCls: 'layout-footer',
    tagName: 'footer'
})(Basic);

/**
 * Layout, Header, Content, Footer 组件props有两个属性： className, style, 其中Layout还多一个hasSider属性，一般不用写
 * Sider props -> {className, style, width(sider宽度，Number|String), collapsedWidth(收起宽度 Number|String), collapsible(是否可收起, default: false), defaultCollapsed（默认是否收起，default: false）,  showTrigger(是否有出发收起按钮，default:true。自定义触发收起按钮时，请把改值设置为false), onCollapse(function， 参数为collapsed, type，collapsed为boole， type为事件名字)}
 */

export {
    Layout,
    Header,
    Sider,
    Content,
    Footer
};

