import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import AppRouter from './AppRouter/AppRouter';
import AppSidebar from './AppSidebar/AppSidebar';

import {
    Layout, Header, Content, Footer, Sider
} from '../../components/Layout/Layout';
import Message from '../../components/Message/Message';
import Tabs from '../../components/Tabs/Tabs';

import '../../scss/index';
import {Icon} from '../../components';
import usr from '../../resouce/user.png';

import {TransitionGroup, CSSTransition} from 'react-transition-group';





const TabPane = Tabs.TabPane;
const tongzhiObj = [{
    title: '通知',
    number: 10,
    tongzhiArr: [{
        iconType: 'tongzhi-mianxing',
        text: '你收到了 10 份新周报'
    }, {
        iconType: 'tuding-mianxing',
        text: '你收到了 10 份新周报'
    }]
}, {
    title: '消息',
    number: 20,
    tongzhiArr: [{
        iconType: 'tianjia',
        text: '你收到了 20 份新周报'
    }, {
        iconType: 'shoucang-mianxing',
        text: '你收到了 20 份新周报'
    }]
}, {
    title: '代办',
    number: 30,
    tongzhiArr: [{
        iconType: 'tongzhi-mianxing',
        text: '你收到了 30 份新周报'
    }]
}];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            message: {
                type: 'success',
                state: 'hide',
                content: '这里是App的消息'
            },
            activeKey: 1
            // message: {
            //     type: 'error',
            //     state: 'hide',
            //     content: '这里是App的消息'
            // }
        };

    }

    onChangeActiveKey(activeIndex) {
        this.setState({
            activeKey: activeIndex
        });
    }

    onChange = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount(){
        
        // console.log(this.props)
    }

    render() {
        return (
            <Router>
                <Route
                    render={({location}) => (
                        <Layout className="layout">
                            <Sider width="256" collapsedWidth="58" siderChange={this.onChange} >
                                <AppSidebar location={location} collapsed={this.state.collapsed} style="height: 100%" />
                            </Sider>
                            <Layout>
                                <Header>
                                    <div className="headerMenu">
                                        <ul className="user-box">
                                            <li className="internationalization">
                                                <Icon type="global"></Icon>
                                                <ul>
                                                    <li>
                                                        <Icon type="global"></Icon>
                                                        简体中文
                                                    </li>
                                                    <li>
                                                        <Icon type="global"></Icon>
                                                        繁体中文
                                                    </li>
                                                    <li>
                                                        <Icon type="global"></Icon>
                                                        English
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Icon type="color"></Icon>
                                            </li>
                                            <li>
                                                <Icon type="zoom"></Icon>
                                            </li>
                                            <li>
                                                <Icon type="help"></Icon>
                                            </li>
                                            <li className="user-tongzhi">
                                                <Icon type="notice"></Icon>
                                                <Tabs tabPosition="top" defaultActiveKey={this.state.activeKey} onChangeActiveKey={this.onChangeActiveKey.bind(this)}>
                                                    {
                                                        tongzhiObj.map((item, index) => (

                                                            <TabPane tab={`${item.title}(${item.number})`} key={item.title}>
                                                                <ul>
                                                                    {this.state.activeKey == index &&
                                                                        tongzhiObj[index].tongzhiArr.map((item, key) => (
                                                                            <li key={item.iconType}>
                                                                                <Icon type={`${item.iconType}`} />
                                                                                {item.text}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                <div className="clear-btn">清空通知</div>
                                                            </TabPane>
                                                        ))
                                                    }
                                                </Tabs>
                                            </li>
                                            <li className="user-name">
                                                <img src={usr} alt="user" />
                                                <span>Edward</span>
                                                <ul>
                                                    <li>
                                                        <Icon type="personal"></Icon>
                                                        个人中心
                                                    </li>
                                                    <li>
                                                        <Icon type="personal-setting"></Icon>
                                                        个人设置
                                                    </li>
                                                    <li>
                                                        <Icon type="warn"></Icon>
                                                        触发报错
                                                    </li>
                                                    <li>
                                                        <Icon type="shutdown"></Icon>
                                                        退出登录
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Icon type="setting"></Icon>
                                            </li>
                                        </ul>
                                    </div>
                                </Header>
                                <Content>
                                    <React.Suspense fallback={<div>loading...</div>}>
                                        <TransitionGroup
                                            component={null}
                                        >
                                            <CSSTransition
                                                key={location.key}
                                                classNames="router-fade"
                                                unmountOnExit
                                                in={true}
                                                timeout={300}
                                            >
                                                <Switch location={location}>
                                                    {AppRouter}
                                                    {/* <Route exact path="/hsl/:h/:s/:l" component={HSL} />
                                                    <Route exact path="/rgb/:r/:g/:b" component={RGB} /> */}
                                                    {/* <Route render={() => <div>Not Found</div>} /> */}
                                                </Switch>
                                            </CSSTransition>
                                        </TransitionGroup>
                                    </React.Suspense>
                                </Content>
                                <Footer className="footer">
                                    <div>©2019 寺库 FIXD</div>
                                </Footer>
                            </Layout>
                            <Message
                                type={this.state.message.type}
                                state={this.state.message.state}
                                content={this.state.message.content}
                            />
                        </Layout>
                    )}
                >
                </Route>
            </Router>
        );
    }
}
export default App;
