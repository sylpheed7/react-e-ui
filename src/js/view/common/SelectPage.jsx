import {Select, Button, Card, ContentHead, Row, Col}  from '../../../components/index';
import Tooltip from "../../../components/Tooltip/Tooltip";

const Option = Select.Option;

const testArr = [
    {
        label: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1',
        value: 'cs1'
    },
    {
        label: '测试2',
        value: 'cs2'
    },
    {
        label: '测试3',
        value: 'cs3'
    },
    {
        label: '测试4',
        value: 'cs4'
    },
    {
        label: '测试4',
        value: 'cs4'
    },
    {
        label: '测试5',
        value: 'cs56'
    },
    {
        label: '测试7',
        value: 'cs78'
    },
    {
        label: '测试8',
        value: 'cs89'
    }

];

class SelectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            deft: '',
            reset: false,
            defaultValue: ["ds1", "ds2"],
            optionsData: []
        };
        this.getAjax();
    }

    handleClick = data => {
        this.setState({
            value: data
        });
        console.log('selected value: ', data);
    };

    filterOption(input, otpions) {
        let inputs = input || '';
        return otpions.props.children.toLowerCase().indexOf(inputs.toLowerCase()) >= 0
    }

    loadData = (value) => {
        console.log(value)
        this.setState({
            optionsData: testArr.filter(item => {
                return item.value.indexOf(value) >= 0 || item.label.indexOf(value) >= 0
            })
        });
    }

    getAjax = () => {
        setTimeout(() => {
            this.setState({
                deft: 'ds5'
            });
            console.log('aaa')
        },3000)
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="Select 组件" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="Select 单选-有默认值">
                            <div className="layout-no">
                                <Select
                                    // mode="multiple"
                                    // labelInValue
                                    // disabled
                                    allowClear
                                    key={this.state.deft}
                                    defaultValue={this.state.deft}
                                    placeholder="请选择"
                                    onChange={this.handleClick}
                                >
                                    <Option disabled value="ds1">
                                        测试1
                                    </Option>
                                    <Option value="ds2"><span title="测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2">测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2</span></Option>
                                    <Option value="ds3">测试3</Option>
                                    <Option value="ds4">测试4</Option>
                                    <Option value="ds5">测试5</Option>
                                </Select>
                                <pre>
                                    增加清空按钮
                                </pre>

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <pre className={'code-demo-describe'}>
                                            props.onChange is function 参数是当前选择的数值, 返回字符串，多个值以‘,’逗号隔开<br/>
                                            props.defaultValue 填写Option里的文本值。单个直接填写，多个请用数组['ds1', 'ds2']<br/>
                                            props.maxLabel 最大显示多少个label<br/>
                                            props.labelInValue 是否把label文本放进选中值里<br/>
                                            props.disabled<br/>
                                            props.loading 开启搜索时默认开启loading状态<br/>
                                            props.search 是否开启搜索<br/>
                                            props.allowClear 是否允许显示清空按钮<br/>
                                            props.filterOption 在搜索模式时filterOption返回搜索过滤的option，返回true or false<br/>
                                            props.loadData 根据输入值搜索动态显示Option和filterOption不能共存。常用于ajax获取数据。<br/>
                                        </pre>
                                        <pre>{`
<Select
    disabled
    allowClear
    key={this.state.deft}
    defaultValue={this.state.deft}
    placeholder="请选择"
    onChange={this.handleClick}
>
    <Option disabled value="ds1">
        测试1
    </Option>
    <Option value="ds2">测试2</Option>
    <Option value="ds3">测试3</Option>
    <Option value="ds4">测试4</Option>
    <Option value="ds5">测试5</Option>
</Select>
                                        `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="Select 多选- 有默认值">
                            <div className="layout-no">
                                <Select
                                    mode="multiple"
                                    maxLabel="3"
                                    labelInValue
                                    allowClear
                                    defaultValue={this.state.defaultValue}
                                    placeholder="测试"
                                    onChange={this.handleClick}
                                >
                                    <Option value="ds1">
                                        测试1
                                    </Option>
                                    <Option value="ds2">测试2</Option>
                                    <Option value="ds3">测试3</Option>
                                    <Option value="ds4">测试4</Option>
                                    <Option value="ds5">测试5</Option>
                                </Select>
                                {/*<Button onClick={this.reset}>重置</Button>*/}

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            mode="multiple"
                                        </div>
                                        <pre>{`
defaultValue: ["ds1", "ds2"],
            
<Select
    mode="multiple"
    labelInValue
    defaultValue={this.state.defaultValue}
    placeholder="测试"
    onChange={this.handleClick}
>
    <Option value="ds1">
        测试1
    </Option>
    <Option value="ds2">测试2</Option>
    <Option value="ds3">测试3</Option>
    <Option value="ds4">测试4</Option>
    <Option value="ds5">测试5</Option>
</Select>
                                        `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="Select 单选-无默认值">
                            <div className="layout-no">
                                <Select
                                    // labelInValue
                                    placeholder="请选择"
                                    onChange={this.handleClick}
                                >
                                    <Option disabled value="ds1">
                                        测试1
                                    </Option>
                                    <Option value="ds2">测试2</Option>
                                    <Option value="ds3">测试3</Option>
                                    <Option value="ds4">测试4</Option>
                                    <Option value="ds5">测试5</Option>
                                </Select>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="Select 多选-无默认值">
                            <div className="layout-no">
                                <Select
                                    mode="multiple"
                                    placeholder="请选择"
                                    onChange={this.handleClick}
                                >
                                    <Option disabled value="ds1">
                                        测试1
                                    </Option>
                                    <Option value="ds2">测试2</Option>
                                    <Option value="ds3">测试3</Option>
                                    <Option value="ds4">测试4</Option>
                                    <Option value="ds5">测试5</Option>
                                </Select>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="Select 单选-可输入">
                            <Select
                                search
                                // labelInValue
                                filterOption={this.filterOption}
                                placeholder="请选择"
                                onChange={this.handleClick}
                            >
                                <Option disabled value="ds1">
                                        测试1
                                </Option>
                                <Option value="ds2">测试2</Option>
                                <Option value="ds3">测试3</Option>
                                <Option value="ds4">测试4</Option>
                                <Option value="ds5">测试5</Option>
                            </Select>


                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.filterOption 在搜索模式时filterOption返回搜索过滤的option，返回true or false<br/>
                                    </div>
                                    <pre>{`
filterOption(input, otpions) {
    let inputs = input || '';
    return otpions.props.children.toLowerCase().indexOf(inputs.toLowerCase()) >= 0
}

<Select
    search
    // labelInValue
    filterOption={this.filterOption}
    placeholder="请选择"
    onChange={this.handleClick}
>
    <Option disabled value="ds1">
            测试1
    </Option>
    <Option value="ds2">测试2</Option>
    <Option value="ds3">测试3</Option>
    <Option value="ds4">测试4</Option>
    <Option value="ds5">测试5</Option>
</Select>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="Select 多选-根据ajax获取数据可输入">
                            <Select
                                search
                                mode="multiple"
                                // disabled
                                loadData={this.loadData}
                                placeholder="请选择"
                                onChange={this.handleClick}
                            >
                                {this.state.optionsData.map(v => {return (
                                    <Option key={v.value} value={v.value}>{v.label}</Option>
                                )})}
                            </Select>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.loadData 根据输入值搜索动态显示Option和filterOption不能共存。常用于ajax获取数据。<br/>
                                    </div>
                                    <pre>{`
loadData(value) {
    console.log(value)
    this.setState({
        optionsData: testArr.filter(item => {
            return item.value.indexOf(value) >= 0 || item.label.indexOf(value) >= 0
        })
    });
}

<Select
    search
    mode="multiple"
    // disabled
    loadData={this.loadData}
    placeholder="请选择"
    onChange={this.handleClick}
>
    {this.state.optionsData.map(v => {return (
        <Option key={v.value} value={v.value}>{v.label}</Option>
    )})}
</Select>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SelectPage;
