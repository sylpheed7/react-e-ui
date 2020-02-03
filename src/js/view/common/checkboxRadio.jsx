import React from "react";
import {Row, Col} from "../../../components/Grid/Grid";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import Button from "../../../components/Button/Button";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Radio from "../../../components/Radio/Radio";

const CheckBoxGroup = CheckBox.CheckBoxGroup;
const RadioGroup = Radio.RadioGroup;


class CheckboxRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxData: {
                disable: false,
                checked: true
            },
            checkboxGroupData: {
                disable: false,
                options: [{label: "选项一", value: 1}, {label: "选项二", value: 2}],
                value: [1]
            },
            radioData: {
                disable: false,
                checked: false
            },
            radioGroupData: {
                disable: false,
                options: [{label: "选项一", value: 1}, {label: "选项二", value: 2}],
                value: 1
            },
            radioGroupBtnData: {
                disable: false,
                options: [
                    {label: "选项一", value: 1},
                    {label: "选项二", value: 2},
                    {label: "选项三", value: 3}
                ],
                value: 1
            },
            showCode: {
                checkboxData: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                checkboxGroupData: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                radioData: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                radioGroupData: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                radioGroupBtnData: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                }
            }
        };
    }

    checkboxChange(val, ele){
        this.state.checkboxData.checked = val;
        console.log(val)
        this.setState({
            checkboxData: this.state.checkboxData
        });
    }

    checkboxDisableToggle(){
        this.state.checkboxData.disable = !this.state.checkboxData.disable;

        this.setState({
            checkboxData: this.state.checkboxData
        })
    }

    checkboxGroupChange(val){
        this.state.checkboxGroupData.value = val;
        console.log(val)
        this.setState({
            checkboxGroupData: this.state.checkboxGroupData
        });
    }

    checkboxGroupDisableToggle(){
        this.state.checkboxGroupData.disable = !this.state.checkboxGroupData.disable;

        this.setState({
            checkboxGroupData: this.state.checkboxGroupData
        })
    }




    radioChange(val, ele){
        this.state.radioData.checked = val;
        this.setState({
            radioData: this.state.radioData
        });
    }

    radioDisableToggle(){
        this.state.radioData.disable = !this.state.radioData.disable;

        this.setState({
            radioData: this.state.radioData
        })
    }

    radioGroupChange(val, ele){
        this.state.radioGroupData.value = val;
        this.setState({
            radioGroupData: this.state.radioGroupData
        });
    }

    radioGroupDisableToggle(){
        this.state.radioGroupData.disable = !this.state.radioGroupData.disable;

        this.setState({
            radioGroupData: this.state.radioGroupData
        })
    }

    radioGroupBtnChange(val, ele){
        this.state.radioGroupBtnData.value = val;
        this.setState({
            radioGroupBtnData: this.state.radioGroupBtnData
        });
    }

    radioGroupBtnDisableToggle(){
        this.state.radioGroupBtnData.disable = !this.state.radioGroupBtnData.disable;

        this.setState({
            radioGroupBtnData: this.state.radioGroupBtnData
        })
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="单选 多选" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="CheckBox 选择框">
                            <div className="layout-no">
                                <Button
                                    onClick={(e) => this.checkboxDisableToggle(e)}
                                    // onClick={this.checkboxDisableToggle.bind(this)}
                                    type={'primary'}
                                >启用、禁用</Button>

                                <br/>

                                <CheckBox
                                    checked={this.state.checkboxData.checked}
                                    disabled={this.state.checkboxData.disable}
                                    onChange={this.checkboxChange.bind(this)}
                                >选择</CheckBox>

                            </div>

                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={this.state.showCode.checkboxData.options}
                                    value={this.state.showCode.checkboxData.value}
                                    onChange={(val, ele)=>{
                                        this.state.showCode.checkboxData.value = val;
                                        this.setState({
                                            showCode: this.state.showCode
                                        });
                                    }}
                                    button
                                ></RadioGroup>
                                <div className={'code-demo-content'} style={{display: this.state.showCode.checkboxData.value?'block':'none'}}>
                                    <div className={'code-demo-describe'}>
                                        * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false<br/>
                                        * props.checked 指定当前是否选中<br/>
                                        * props.disabled 失效状态<br/>
                                    </div>
                                    <pre>{`
this.state = {
    checkboxData: {
        disable: false,
        checked: true
    }
};

checkboxChange(val, ele){
    this.state.checkboxData.checked = val;
    console.log(val)
    this.setState({
        checkboxData: this.state.checkboxData
    });
}

<CheckBox
    checked={this.state.checkboxData.checked}
    disabled={this.state.checkboxData.disable}
    onChange={this.checkboxChange.bind(this)}
>选择</CheckBox>
                                    `}
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="CheckBoxGroup 选择框">
                            <div className="layout-no">
                                <div>value: {this.state.checkboxGroupData.value}</div>

                                <Button
                                    onClick={this.checkboxGroupDisableToggle.bind(this)}
                                    type={'primary'}
                                >启用、禁用</Button>

                                <CheckBoxGroup
                                    options={this.state.checkboxGroupData.options}
                                    value={this.state.checkboxGroupData.value}
                                    disabled={this.state.checkboxGroupData.disable}
                                    onChange={this.checkboxGroupChange.bind(this)}
                                ></CheckBoxGroup>
                            </div>

                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={this.state.showCode.checkboxGroupData.options}
                                    value={this.state.showCode.checkboxGroupData.value}
                                    onChange={(val, ele)=>{
                                        this.state.showCode.checkboxGroupData.value = val;
                                        this.setState({
                                            showCode: this.state.showCode
                                        });
                                    }}
                                    button
                                ></RadioGroup>
                                <div className={'code-demo-content'} style={{display: this.state.showCode.checkboxGroupData.value?'block':'none'}}>
                                    <div className={'code-demo-describe'}>
                                        * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false<br/>
                                        * props.options 指定可选项, 返回list. ex: [${"{label: \"选项一\", value: 1}, {label: \"选项2\", value: 2}"}]<br/>
                                        * props.value 选中的选项, 返回list. ex: [1, 2]<br/>
                                        * props.disabled 整组失效状态, 返回布尔。ex:true/false
                                    </div>
                                    <pre>{`
this.state = {
    checkboxGroupData: {
        disable: false,
        options: [{label: "选项一", value: 1}, {label: "选项二", value: 2}],
        value: [1]
    }
};

checkboxGroupChange(val){
    this.state.checkboxGroupData.value = val;
    console.log(val)
    this.setState({
        checkboxGroupData: this.state.checkboxGroupData
    });
}


const CheckBoxGroup = CheckBox.CheckBoxGroup;

<CheckBoxGroup
    options={this.state.checkboxGroupData.options}
    value={this.state.checkboxGroupData.value}
    disabled={this.state.checkboxGroupData.disable}
    onChange={this.checkboxGroupChange.bind(this)}
></CheckBoxGroup>
                                    `}
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <Card cardHeadTit="Radio 选择框">
                            <div className="layout-no">
                                <Button
                                    onClick={this.radioDisableToggle.bind(this)}
                                    type={'primary'}
                                >启用、禁用</Button>

                                <br/>

                                <Radio
                                    checked={this.state.radioData.checked}
                                    disabled={this.state.radioData.disable}
                                    onChange={this.radioChange.bind(this)}
                                >选择</Radio>

                                <div className={'code-demo'}>
                                    <RadioGroup
                                        options={this.state.showCode.radioData.options}
                                        value={this.state.showCode.radioData.value}
                                        onChange={(val, ele)=>{
                                            this.state.showCode.radioData.value = val;
                                            this.setState({
                                                showCode: this.state.showCode
                                            });
                                        }}
                                        button
                                    ></RadioGroup>
                                    <div className={'code-demo-content'} style={{display: this.state.showCode.radioData.value?'block':'none'}}>
                                        <div className={'code-demo-describe'}>
                                            * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false<br/>
                                            * props.checked 指定当前是否选中<br/>
                                            * props.disabled 失效状态<br/>
                                        </div>
                                        <pre>{`
this.state = {
    radioData: {
        disable: false,
        options: [
            {label: "显示代码", value: true},
            {label: "隐藏代码", value: false}
        ],
        value: false
    }
};

radioChange(val, ele){
    this.state.radioData.checked = val;
    this.setState({
        radioData: this.state.radioData
    });
}

<Radio
    checked={this.state.radioData.checked}
    disabled={this.state.radioData.disable}
    onChange={this.radioChange.bind(this)}
>选择</Radio>
                                        `}
                                        </pre>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit='Radio 组 单选项'>
                            <div className="layout-no">

                                <div>value: {this.state.radioGroupData.value}</div>

                                <Button
                                    onClick={this.radioGroupDisableToggle.bind(this)}
                                    type={'primary'}
                                >启用、禁用</Button>

                                <RadioGroup
                                    options={this.state.radioGroupData.options}
                                    value={this.state.radioGroupData.value}
                                    disabled={this.state.radioGroupData.disable}
                                    onChange={this.radioGroupChange.bind(this)}
                                ></RadioGroup>

                                <div className={'code-demo'}>
                                    <RadioGroup
                                        options={this.state.showCode.radioGroupData.options}
                                        value={this.state.showCode.radioGroupData.value}
                                        onChange={(val, ele)=>{
                                            this.state.showCode.radioGroupData.value = val;
                                            this.setState({
                                                showCode: this.state.showCode
                                            });
                                        }}
                                        button
                                    ></RadioGroup>
                                    <div className={'code-demo-content'} style={{display: this.state.showCode.radioGroupData.value?'block':'none'}}>
                                        <div className={'code-demo-describe'}>
                                            * props.onChange 选择时触发回调 is function 参数是当前选择的值, 返回布尔。ex:true/false<br/>
                                            * props.options 指定可选项, 返回list. ex: [${"{label: \"选项一\", value: 1}, {label: \"选项2\", value: 2}"}]<br/>
                                            * props.value 选中的选项, 返回当前值. ex: 1<br/>
                                            * props.disabled 整组失效状态, 返回布尔。ex:true/false
                                        </div>
                                        <pre>{`
this.state = {
    radioGroupData: {
        disable: false,
        options: [{label: "选项一", value: 1}, {label: "选项二", value: 2}],
        value: 1
    }
};

radioGroupChange(val, ele){
    this.state.radioGroupData.value = val;
    this.setState({
        radioGroupData: this.state.radioGroupData
    });
}

<RadioGroup
    options={this.state.radioGroupData.options}
    value={this.state.radioGroupData.value}
    disabled={this.state.radioGroupData.disable}
    onChange={this.radioGroupChange.bind(this)}
></RadioGroup>
                                        `}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col span="12">
                        <Card cardHeadTit='Radio 组 单选项'>
                            <div className="layout-no">

                                <div>value: {this.state.radioGroupBtnData.value}</div>

                                <Button
                                    onClick={this.radioGroupBtnDisableToggle.bind(this)}
                                    type={'primary'}
                                >启用、禁用</Button>

                                <RadioGroup
                                    options={this.state.radioGroupBtnData.options}
                                    value={this.state.radioGroupBtnData.value}
                                    disabled={this.state.radioGroupBtnData.disable}
                                    onChange={this.radioGroupBtnChange.bind(this)}
                                    button
                                ></RadioGroup>

                                <div className={'code-demo'}>
                                    <RadioGroup
                                        options={this.state.showCode.radioGroupBtnData.options}
                                        value={this.state.showCode.radioGroupBtnData.value}
                                        onChange={(val, ele)=>{
                                            this.state.showCode.radioGroupBtnData.value = val;
                                            this.setState({
                                                showCode: this.state.showCode
                                            });
                                        }}
                                        button
                                    ></RadioGroup>
                                    <div className={'code-demo-content'} style={{display: this.state.showCode.radioGroupBtnData.value?'block':'none'}}>
                                        <div className={'code-demo-describe'}>
                                            RadioGroup组件<br/>
                                            其他参数照常使用<br/>
                                            <br/>
                                            * props.button 组件样式转化为button形式, 返回布尔。ex:true/false
                                        </div>
                                        <pre>{`
<RadioGroup
    options={this.state.showCode.radioGroupData.options}
    value={this.state.showCode.radioGroupData.value}
    onChange={(val, ele)=>{
        this.state.showCode.radioGroupData.value = val;
        this.setState({
            showCode: this.state.showCode
        });
    }}
    button
></RadioGroup>
                                        `}
                                        </pre>
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