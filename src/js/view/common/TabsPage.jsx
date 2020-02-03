import React from "react";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Tabs from '../../../components/Tabs/Tabs';
import DropDown from "../../../components/DropDown/DropDown";

const TabPane = Tabs.TabPane;
class TabsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="tabs 标签" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="tabs位置（上）">
                            <div className="layout-no">
                                <Tabs tabPosition="top" defaultActiveKey={0}>
                                    {
                                        [{
                                            name:'基本设置',
                                            number:'8',
                                            content:'1111111111111111'
                                        }, {
                                            name:'安全设置',
                                            number:'18',
                                            content:'2222222222'
                                        } ,{
                                            name:'账号绑定',
                                            number:'28',
                                            content:'3333333333333333'
                                        }, {
                                            name:'新消息通知',
                                            number:'28',
                                            content:'444444444444444'
                                        }].map((item,key)=>{
                                            return (
                                                <TabPane tab={item.name} key={item.name}>
                                                    {key}
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * tabPosition  string      tab标题位置 top left right bottom<br/>
                                            * defaultActiveKey  number 默认所选下标<br/>
                                            * disabledKey      number  哪个下标不可选择<br/>
                                            * onChangeActiveKey      function  动态获取每个tab对应的内容<br/>
                                        </div>
                                        <pre>{`
<Tabs tabPosition="top" defaultActiveKey={0}>
    {
        [{
            name:'基本设置',
            number:'8',
            content:'1111111111111111'
        }, {
            name:'安全设置',
            number:'18',
            content:'2222222222'
        } ,{
            name:'账号绑定',
            number:'28',
            content:'3333333333333333'
        }, {
            name:'新消息通知',
            number:'28',
            content:'444444444444444'
        }].map((item,key)=>{
            return (
                <TabPane tab={item.name} key={item.name}>
                    {key}
                </TabPane>
            )
        })
    }
</Tabs>
                                `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="24">
                        <Card cardHeadTit="tabs位置（右）">
                            <div className="layout-no">
                                <Tabs tabPosition="right" defaultActiveKey={0}>
                                    {
                                        [{
                                            name:'基本设置',
                                            number:'8',
                                            content:'1111111111111111'
                                        }, {
                                            name:'安全设置',
                                            number:'18',
                                            content:'2222222222'
                                        } ,{
                                            name:'账号绑定',
                                            number:'28',
                                            content:'3333333333333333'
                                        }, {
                                            name:'新消息通知',
                                            number:'28',
                                            content:'444444444444444'
                                        }].map((item,key)=>{
                                            return (
                                                <TabPane tab={item.name} key={item.name}>
                                                    {
                                                        [1,2,3,4].map((item)=>{
                                                            return (
                                                                <div key={item}>{item}</div>
                                                            )
                                                        })
                                                    }
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="tabs位置（下）">
                            <div className="layout-no">
                                <Tabs tabPosition="bottom" defaultActiveKey={0}>
                                    {
                                        [{
                                            name:'基本设置',
                                            number:'8',
                                            content:'1111111111111111'
                                        }, {
                                            name:'安全设置',
                                            number:'18',
                                            content:'2222222222'
                                        } ,{
                                            name:'账号绑定',
                                            number:'28',
                                            content:'3333333333333333'
                                        }, {
                                            name:'新消息通知',
                                            number:'28',
                                            content:'444444444444444'
                                        }].map((item,key)=>{
                                            return (
                                                <TabPane tab={item.name} key={item.name}>
                                                    {key}
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>
                            </div>
                        </Card>
                    </Col>
                    <Col span="24">
                        <Card cardHeadTit="tabs位置（左）">
                            <div className="layout-no">
                                <Tabs tabPosition="left" defaultActiveKey={0}>
                                    {
                                        [{
                                            name:'基本设置',
                                            number:'8',
                                            content:'1111111111111111'
                                        }, {
                                            name:'安全设置',
                                            number:'18',
                                            content:'2222222222'
                                        } ,{
                                            name:'账号绑定',
                                            number:'28',
                                            content:'3333333333333333'
                                        }, {
                                            name:'新消息通知',
                                            number:'28',
                                            content:'444444444444444'
                                        }].map((item,key)=>{
                                            return (
                                                <TabPane tab={item.name} key={item.name}>
                                                    {
                                                        [1,2,3,4].map((item)=>{
                                                            return (
                                                                <div key={item}>{item}</div>
                                                            )
                                                        })
                                                    }
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="tabs位置（上）--不可用某项">
                            <div className="layout-no">
                                <Tabs tabPosition="top" defaultActiveKey={0} disabledKey={1}>
                                    {
                                        [{
                                            name:'基本设置',
                                            number:'8',
                                            content:'1111111111111111'
                                        }, {
                                            name:'安全设置',
                                            number:'18',
                                            content:'2222222222'
                                        } ,{
                                            name:'账号绑定',
                                            number:'28',
                                            content:'3333333333333333'
                                        }, {
                                            name:'新消息通知',
                                            number:'28',
                                            content:'444444444444444'
                                        }].map((item,index)=>{
                                            return (
                                                <TabPane tab={item.name} key={item.name}>
                                                    <React.Fragment>{[{
                                                        name:'基本设置',
                                                        number:'8',
                                                        content:'1111111111111111'
                                                    }, {
                                                        name:'安全设置',
                                                        number:'18',
                                                        content:'2222222222'
                                                    } ,{
                                                        name:'账号绑定',
                                                        number:'28',
                                                        content:'3333333333333333'
                                                    }, {
                                                        name:'新消息通知',
                                                        number:'28',
                                                        content:'444444444444444'
                                                    }][index].content}</React.Fragment>
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default TabsPage;