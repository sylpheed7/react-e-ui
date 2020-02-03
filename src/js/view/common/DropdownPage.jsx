/* eslint-disable max-len */
import React from "react";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import DropDown from '../../../components/DropDown/DropDown';
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Menu from '../../../components/Menu/Menu';
import {
    Link
} from 'react-router-dom';

const usrMenu = (
    <Menu>
        <Menu.Item key="0"><a href="http://www.secoo.com">个人中心</a></Menu.Item>
        <Menu.Item key="1"><Link to="/common/button">个人设置</Link> </Menu.Item>
        <Menu.Item key="2">触发报错</Menu.Item>
        <Menu.Item key="3">退出登录</Menu.Item>
    </Menu>
);

class CheckboxRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: {
                col1:'hover',
                col2:'click',
                col3:'hover',
                col4:'hover',
                col5:'click',
                col6:'click'
            },
            contextMenu:{
                col2:'',
                col5:'contextMenu',
                col6:''
            },
            submenuIitle:'多级标题',
            className: ''
        };
    }
    onClick(className){
        this.setState({
            className:className
        })
    }
    onClickMenuItem(item){
        alert(item);
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="下拉菜单" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="触发类型 click">
                            <div className="layout-no">
                                <DropDown trigger="click" overlay={usrMenu}>dropdown</DropDown>
                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * overlay 弹出内容 使用Menu组件<br/>
                                            * disabled 禁用<br/>
                                            * className 样式<br/>
                                            * style 行内样式<br/>
                                            * trigger 触发的事件，默认为hover，可选click<br/>
                                        </div>
                                        <pre>{`
const usrMenu = (
    <Menu>
        <Menu.Item key="0"><i className="icon personal" /><a href="http://www.secoo.com">个人中心</a></Menu.Item>
        <Menu.Item key="1"><i className="icon personalshezhi" />个人设置</Menu.Item>
        <Menu.Item key="2"><i className="icon icon-guanbishibaixianxing" />触发报错</Menu.Item>
        <Menu.Item key="3"><i className="icon icon-tuichudenglu" />退出登录</Menu.Item>
    </Menu>
);

<DropDown overlay={usrMenu}>adadad</DropDown>
                                `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="触发类型 hover">
                            <div className="layout-no">
                                <DropDown trigger="hover" overlay={usrMenu}>dropdown</DropDown>
                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * overlay 弹出内容 使用Menu组件<br/>
                                            * disabled 禁用<br/>
                                            * className 样式<br/>
                                            * style 行内样式<br/>
                                            * trigger 触发的事件，默认为hover，可选click<br/>
                                        </div>
                                        <pre>{`
const usrMenu = (
    <Menu>
        <Menu.Item key="0"><i className="icon personal" /><a href="http://www.secoo.com">个人中心</a></Menu.Item>
        <Menu.Item key="1"><i className="icon personalshezhi" />个人设置</Menu.Item>
        <Menu.Item key="2"><i className="icon icon-guanbishibaixianxing" />触发报错</Menu.Item>
        <Menu.Item key="3"><i className="icon icon-tuichudenglu" />退出登录</Menu.Item>
    </Menu>
);

<DropDown overlay={usrMenu}>adadad</DropDown>
                                `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default CheckboxRadio;