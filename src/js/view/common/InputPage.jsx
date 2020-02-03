import React from "react";
import {Row, Col} from "../../../components/Grid/Grid";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import Textarea from '../../../components/TextArea/TextArea';
import Input from '../../../components/Input/Input';
import Icon from '../../../components/Icon/Icon';

class InputPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputDef: {
                val: 'default'
            }
        };
    }

    inputDefChange(val){
        this.state.inputDef.val = val;
        this.setState(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="输入框" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="标准输入框">
                            <div className="layout-no">
                                <div>当前值：{this.state.inputDef.val}</div>
                                <Input
                                    value={this.state.inputDef.val}
                                    onChange={this.inputDefChange.bind(this)} />
                            </div>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.onChange 舒服时触发回调，接收子组件传递输入的值得，同时父组件被修改<br/>
                                        * props.allowClear 点击清除图标删除输入框的内容<br/>
                                        * 其他和原生input属性值一样
                                    </div>
                                    <pre>{`<Input value={this.state.inputDef.val} onChange={this.inputDefChange.bind(this)} />`}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="Input禁用">
                            <div className="layout-no">
                                <div>当前值：{this.state.inputDef.val}</div>
                                <Input value={this.state.inputDef.val} disabled />
                            </div>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.disabled 设置输入框是否禁用<br/>
                                        * 其他和原生input属性值一样
                                    </div>
                                    <pre>{`<Input value={this.state.inputDef.val} disabled />`}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="Input前缀图标">
                            <div className="layout-no">
                                <Input
                                    value={this.state.inputDef.val}
                                    prefix={<Icon type="search"></Icon>} />

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * props.prefix 设置input前缀图标<br/>
                                            * 其他和原生input属性值一样
                                        </div>
                                        <pre>{`<Input value={this.state.inputDef.val} prefix={<Icon type="search"></Icon>} />`}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="Input后缀图标">
                            <div className="layout-no">
                                <Input
                                    value={this.state.inputDef.val}
                                    suffix={<Icon type="search"></Icon>} />
                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * props.suffix 设置input后缀图标<br/>
                                            * 其他和原生input属性值一样
                                        </div>
                                        <pre>{`<Input value={this.state.inputDef.val} suffix={<Icon type="search"></Icon>} />`}</pre>
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

export default InputPage;