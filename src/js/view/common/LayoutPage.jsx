/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";


import {Layout, Header, Content, Footer, Sider, Menu} from '../../../components/index';

class LayoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.formWrapper = React.createRef();

        this.state = {

        };
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="Layout 布局" />
                <Card cardHeadTit="参数说明">
                    <div className={'code-demo'} style={{padding: 10}}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                /**  <br/>
                                * Layout, Header, Content, Footer 组件props有两个属性： className, style, 其中Layout还多一个hasSider属性，一般不用写<br/>
                                * Sider组件 props -> 
                                * className, style, width(sider宽度，Number|String), <br/>
                                * collapsedWidth(收起宽度 Number|String), collapsible(是否可收起, default: false), <br/>
                                * defaultCollapsed（默认是否收起，default: false）,  <br/>
                                * showTrigger(是否有触发收起按钮，default:true。自定义触发收起按钮时，请把改值设置为false), <br/>
                                * triggerElement (自定义触发按钮，default: null, ReactNode) <br/>
                                */
                            </div>
                        </div>
                    </div>
                </Card>
                <Card cardHeadTit="水平布局">
                    <Layout className="layout-1">
                        <Header>
                            <p>Header</p>
                        </Header>
                        <Content>
                            <p>内容</p>
                        </Content>
                        <Footer>
                            <p>底部</p>
                        </Footer>
                    </Layout>
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <pre>{`
    <Layout>
        <Header>
            <p>Header</p>
        </Header>
        <Content>
            <p>内容</p>
        </Content>
        <Footer>
            <p>底部</p>
        </Footer>
    </Layout>
                            `}</pre>
                        </div>
                    </div>
                </Card>
                <Card cardHeadTit="水平布局涵盖Sider">
                    <Layout className="layout-1 layout-2">
                        <Header>
                            <p>Header</p>
                        </Header>
                        <Layout className="has-sider-1">
                            <Sider showTrigger={false}>Sider</Sider>
                            <Content>
                                <p>内容</p>
                            </Content>
                        </Layout>
                        <Footer>
                            <p>底部</p>
                        </Footer>
                    </Layout>
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <pre>{`
    <Layout>
        <Header>
            <p>Header</p>
        </Header>
        <Layout>
            <Sider showTrigger={false}>Sider</Sider>
            <Content>
                <p>内容</p>
            </Content>
        </Layout>
        <Footer>
            <p>底部</p>
        </Footer>
    </Layout>
                            `}</pre>
                        </div>
                    </div>
                </Card>
                <Card cardHeadTit="水平布局涵盖Sider -2">
                    <Layout className="layout-1 layout-2">
                        <Sider showTrigger={false}>Sider</Sider>
                        <Layout className="layout-1">
                            <Header>
                                <p>Header</p>
                            </Header>
                            <Content>
                                <p>内容</p>
                            </Content>
                            <Footer>
                                <p>底部</p>
                            </Footer>
                        </Layout>
                    </Layout>
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <pre>{`
    <Layout>
        <Sider showTrigger={false}>Sider</Sider>
        <Layout>
            <Header>
                <p>Header</p>
            </Header>
            <Content>
                <p>内容</p>
            </Content>
            <Footer>
                <p>底部</p>
            </Footer>
        </Layout>
    </Layout>
                            `}</pre>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

export default LayoutPage;