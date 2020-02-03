import Card from '../../../components/Card/Card';
import ContentHead from '../../../components/ContentHead/ContentHead';
import DatePicker from '../../../components/DatePicker/DatePicker';
import {
    Row,
    Col
} from "../../../components/Grid/Grid.jsx";
import '../../../scss/pageLayout/icon.scss';
import moment from "moment";
import Radio from "../../../components/Radio/Radio";
const RadioGroup = Radio.RadioGroup;
import React from "react";

const {RangePicker} = DatePicker;

class DatePickerPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DatePickerValue: false,
            DatePickers: {
                // disable: false,
                options: [
                    {label: "显示代码", value: true},
                    {label: "隐藏代码", value: false}
                ]
            },
            RangePickersValue: false,
            RangePickers: {
                // disable: false,
                options: [
                    {label: "显示代码", value: true},
                    {label: "隐藏代码", value: false}
                ]
            }
        };
    }
    onChangeaaa(value) {
        console.log(value)
    }
    changePicker = (val, ele) => {

        this.setState({
            DatePickerValue: val
        });
    } 
    changeRangePicker = (val, ele) => {

        this.setState({
            RangePickersValue: val
        });
    } 
    render() {
        let {DatePickers, DatePickerValue, RangePickersValue, RangePickers} = this.state;
        return (
            <React.Fragment>
                <ContentHead title="DatePicker 日期选择器"></ContentHead>
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="日期选择">
                            <DatePicker style={{fontSize: 16}} locale="zh_CN" allowClear showOk onChange={this.onChangeaaa}/>
                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={DatePickers.options}
                                    value={DatePickerValue}
                                    onChange={this.changePicker}
                                    button
                                ></RadioGroup>
                                <div 
                                    className="code-demo-content" 
                                    style={{display: DatePickerValue ? 'block' : 'none'}}
                                >
                                    <div className={'code-demo-describe'}>
                                        * allowClear: 是否允许清空, 默认false<br/>
                                        * value: 选中日期<br/>
                                        * showTime: 显示时间选择，默认false<br/>
                                        * disabled: 是否禁用，默认false<br/>
                                        * afterToday: 是否只能选择当前时间之后的时间，默认false<br/>
                                        * showDateInput: 是否显示日期输入框，默认false<br/>
                                        * defaultValue： 默认显示值<br/>
                                        * formatStr： 格式化日期，默认YYYY-MM-DD<br/>
                                        * onChange: function 参数value，选择的日期值
                                    </div>
                                    <pre>{`                                
<DatePicker locale="zh_CN" allowClear afterToday onChange={this.onChangeaaa}/>
                                    `}
                                    </pre>
                                </div>
                            </div>
                        </Card>


                    </Col>

                    <Col span="12">
                        <Card cardHeadTit="开始日期~结束日期">
                            <RangePicker showTime allowClear showOk formatStr={'YYYY-MM-DD HH:mm:ss'} afterToday  onChange={this.onChangeaaa} />

                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={RangePickers.options}
                                    value={RangePickersValue}
                                    onChange={this.changeRangePicker}
                                    button
                                ></RadioGroup>
                                <div className={'code-demo-content'} style={{display: RangePickersValue?'block':'none'}}>
                                    <div className={'code-demo-describe'}>
                                        * allowClear: 是否允许清空<br/>
                                        * value: 选中日期 Array<br/>
                                        * maxValue: 最大选中日期<br/>
                                        * minValue: 最小选中日期<br/>
                                        * onChange: 选中日期事件<br/>
                                        * formatStr: 格式化时间：默认YYYY-MM-DD<br/>
                                        * defaultValue: 默认时间：moment[]<br/>
                                    </div>
                                    <pre>{`
const {RangePicker} = DatePicker;                          
<RangePicker />
                                    `}
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </React.Fragment>
        )
    }
}

export default DatePickerPage;