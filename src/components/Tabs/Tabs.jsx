import './index.scss';

/**
 * Tabs                   组件所传属性描述
 * tabPosition  string      tab标题位置 top left right bottom
 * defaultActiveKey  number 默认所选下标
 * disabledKey      number  哪个下标不可选择
 * onChangeActiveKey      function  动态获取每个tab对应的内容
 */
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'tabs-box-' + props.tabPosition,
            activeIndex: props.defaultActiveKey ? props.defaultActiveKey : 0
        };
    }

    static defaultProps = {
        tabPosition: 'top'
    }

    changeIndex(key) {
        let props = this.props;
        if (props.disabledKey == key) {
            return false;
        }
        this.setState({
            activeIndex: key
        });
        this.props.onChangeActiveKey && this.props.onChangeActiveKey(key);

        function showCurClass(flag, className) {
            return classNames(className, {'cur': flag});
        }

        [].forEach.call(this.refs.TabContentsPanels.childNodes, (v, i) => {
            if (key == i) {
                v.className = showCurClass(true, v.className);
            } else {
                v.className = showCurClass(false, v.className);
            }
        })
    }
    componentDidMount() {
        this.refs.TabContentsPanels.childNodes[this.state.activeIndex].className = classNames('cur', this.refs.TabContentsPanels.childNodes[this.state.activeIndex].className);
    }
    render() {

        return (
            <div className={classNames('tabs-box ' + this.state.class, this.props.className)} style={this.props.style}>
                <ul className="tabs-tab">
                    {
                        React.Children.map(this.props.children, (item, index) => {
                            return (
                                <li key={item.props.tab} className={'tab-title ' + (this.state.activeIndex == index ? 'active' : '') + (this.props.disabledKey == index ? 'disable' : '')}
                                    onClick={this.changeIndex.bind(this, index)}>
                                    {item.props.tab}
                                </li>
                            )
                        })
                        // this.props.children.map()
                    }
                </ul>
                <div ref="TabContentsPanels" className="tabs-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class TabPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: null
        };
    }
    render() {
        return (
            <div className={classNames('tabs-tabpane', this.props.className)} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

Tabs.TabPane = TabPane;

export default Tabs;