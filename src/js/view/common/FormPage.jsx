/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Button from "../../../components/Button/Button";
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import CheckBox from "../../../components/CheckBox/CheckBox";
import Radio from "../../../components/Radio/Radio";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea/TextArea";
import DatePicker from "../../../components/DatePicker/DatePicker";
import moment from "moment";
import Tooltip from "../../../components/Tooltip/Tooltip";

const {FormItem}  = Form;

class FormPage extends React.Component {
    constructor(props) {
        super(props);

        this.formWrapper = React.createRef();

        this.state = {
            formData: {
                name: '12',
                age: '20',
                admin: false,
                sex: 1,
                role: ['1'],
                date: '2010-11-01',
                city: null,
                textarea: '12341234'
            },
            formRules: {
                name: [
                    {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['input', 'blur']},
                    {required: true, message: '请输入姓名', trigger: ['input', 'blur']}
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                age: [
                    {required: true, message: '请输入年龄', trigger: ['input', 'blur']},
                    {validator: this.validateAge, trigger: ['input', 'blur']}
                    // { validator: this.validateAge, trigger: 'blur' }
                ],
                admin: [
                    {required: true, type: 'boolean', message: '请选择是否为管理员'}
                ],
                role: [
                    {required: true, type: 'array', message: '请选择角色', trigger: ['change']}
                ],
                date: [
                    // { required:true, type: 'object', message: '请选择日期' },
                    {validator: this.validateDate, trigger: ['change']}
                ],
                city: [
                    {required:true, type: 'string', message: '请选择城市', trigger: ['change']}
                ]
            },
            sexGroupData: {
                disable: false,
                options: [{label: "男", value: 1}, {label: "女", value: 2}]
            },
            roleGroupData: {
                disable: false,
                options: [{label: "产品", value: '1'}, {label: "开发", value: '2'}, {label: "测试", value: '3'}]
            }
        };
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                formData: {
                    name: '123333',
                    age: '20',
                    admin: false,
                    sex: 2,
                    role: ['1','2'],
                    date: '2019-12-31',
                    city: null,
                    textarea: '786812341234142'
                }
            })
        }, 3000)
    }

    validateAge(rule, value, callback){
        if (value === '') {
            callback(new Error('请输入年龄valdateAge'));
        } else {
            if(value > 100){
                callback(new Error('年龄不能大于100!'));
            } else {
                callback();
            }
        }
    }

    validateDate(rule, value, callback){
        if(value === undefined || value === null){
            callback(new Error('请选择日期'));
        } else {
            let selDate = moment(value).startOf('day'),
                nowDate = moment().startOf('day')
            // console.log('selDate:', selDate)
            // console.log('nowDate:', nowDate)
            // console.log('validateDate', selDate.isBefore(nowDate))
            if (selDate.isBefore(nowDate)) {
                callback(new Error('不能选择今日之前的日期'));
            } else {
                callback();
            }
        }
    }

    /**
     * 表单提交
     */

    handleFormChange(prop, changedValue, allValue){
        // console.log('handleFormChange: ', prop, '===', changedValue, '===', allValue);
        // this.state.formData[prop] = changedValue;
        // this.setState({formData: this.state.formData});
        this.setState({formData: allValue});
    }

    handleFormItemInputInput(val, e){
        // console.log('handleFormItemInputInput ---', val, e)
    }

    handleFormItemInputChange(val, e){
        // console.log('handleFormItemInputChange ---', val, e)
    }

    handleCheckboxClick(val, e){
        this.state.formData.admin = val;
        this.setState({
            formData: this.state.formData
        });
    }

    handleClick(a) {
        console.log(a)
    }

    /**
     * 表单提交
     */
    
    handleSubmit(){
        // console.log('handleSubmit: ', this.formWrapper.current);
        let valid = this.formWrapper.current.validateForm();
        console.log('handleSubmit valid: ', valid);
        if(valid){
            let params = this.formWrapper.current.getFormData();
            console.log("params: ", params)
        }

        return false;
    }

    render() {
        return (
            <div>
                <ContentHead title="表单" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="表单">
                            {/*<div>name: {this.state.formData.name}</div>*/}
                            {/*<div>age: {this.state.formData.age}</div>*/}
                            <Form
                                formData={this.state.formData}
                                rules={this.state.formRules}
                                onFormChange={this.handleFormChange.bind(this)}
                                label-width={'100px'}
                                // inline
                                ref={this.formWrapper}
                            >
                                <FormItem label={'姓名'} prop={'name'}>
                                    <Input onInput={this.handleFormItemInputInput.bind(this)} onChange={this.handleFormItemInputChange.bind(this)}/>
                                </FormItem>
                                <FormItem label="年龄" prop={'age'}>
                                    <Input />
                                </FormItem>
                                <FormItem label={'性别性别性别性别性别性别性别'} prop={'sex'} label-width={'500px'}>
                                    <Radio.RadioGroup
                                        options={this.state.sexGroupData.options}
                                        disabled={this.state.sexGroupData.disable}
                                        onChange={(val, ele)=>{
                                            console.log(this.state.formData.sex)
                                        }}
                                    ></Radio.RadioGroup>
                                </FormItem>
                                <FormItem label={'设为管理员'} prop={'admin'}>
                                    <CheckBox
                                        // checked={this.state.formData.admin}
                                        // onClick={this.handleCheckboxClick.bind(this)}
                                    >设为管理员</CheckBox>
                                </FormItem>
                                <FormItem label={'角色'} prop={'role'}>
                                    <CheckBox.CheckBoxGroup
                                        options={this.state.roleGroupData.options}
                                        disabled={this.state.roleGroupData.disable}
                                    ></CheckBox.CheckBoxGroup>
                                </FormItem>
                                <FormItem label={'选择测试'} prop={'city'}>
                                    <Select
                                        mode="multiple"
                                        // labelInValue
                                        defaultValue={['北京','上海']}
                                        placeholder="请选择"
                                        onChange={this.handleClick}
                                    >
                                        <Select.Option value="beijing">北京</Select.Option>
                                        <Select.Option value="shanghai">上海</Select.Option>
                                        <Select.Option value="guangzhou">广州</Select.Option>
                                        <Select.Option disabled value="shenzhen">深圳</Select.Option>
                                        <Select.Option value="">武汉</Select.Option>
                                    </Select>
                                </FormItem>
                                <FormItem prop={'textarea'}>
                                    <TextArea></TextArea>
                                </FormItem>
                                <FormItem label={'日期'} prop={'date'}>
                                    <DatePicker allowClear defaultValue={this.state.formData.date} onChange={val => console.log(val)} />
                                </FormItem>
                                <FormItem>
                                    <Button onClick={this.handleSubmit.bind(this)} type="primary">提交</Button>
                                </FormItem>
                            </Form>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        Form参数：<br/>
                                        * formData: 表单中各表单项的值<br/>
                                        * rules: 表单验证规则，校验规则参考<a href={'https://github.com/yiminghe/async-validator'}>async-validator</a><br/>
                                        * inline: 行内表单模式，则需要设置label-width<br/>
                                        * label-position：表单域标签内容的位置，right/left/top , 默认文本居右：right, 如果值为 left 或者 right 时，则需要设置label-width<br/>
                                        * label-width：表单域标签的宽度，默认：'80px'。作为 Form 直接子元素的 form-item 会继承该值。支持auto<br/>
                                        * onFormChange：某一个表单项的值发生改动生触发表单改动的事件，(prop, changedValue, allValue)<br/>
                                    </div>

                                    <div className={'code-demo-describe'}>
                                        Form方法：<br/>
                                        * validateForm: 表单校验<br/>
                                        * getFormData: 获取表单的值<br/>
                                        * resetFormData: 重置表单项<br/>
                                        * setPropValidateError: 指定prop的表单项设置为校验失败<br/>
                                        * setPropValidateDef: 指定prop的表单项重置哦尚未校验<br/>
                                        <hr/>
                                        示例：<br/>
                                        let valid = this.formWrapper.current.validateForm();<br/>
                                        let formData = this.formWrapper.current.getFormData();<br/>
                                        this.formWrapper.current.resetFormData();<br/>
                                        this.formWrapper.current.setPropValidateError('branchBankCode', '错误信息');<br/>
                                        this.formWrapper.current.setPropValidateDef('branchBankCode');<br/>
                                    </div>

                                    <div className={'code-demo-describe'}>
                                        FormItem参数：<br/>
                                        * calssName: 默认 无<br/>
                                        * style: 默认 无<br/>
                                        * hideLabe: 默认false， 是否显示Label<br/>
                                    </div>

                                    <div className={'code-demo-describe'}>
                                        FormItem方法：<br/>
                                        * setSuccess: 表单项设置为校验成功<br/>
                                        * setError: 表单项设置为校验失败<br/>
                                        * setErrorMsg: 设置表单校验失败的错误信息<br/>
                                        * setValidateDef:表单项重置哦尚未校验<br/>
                                        <hr/>
                                        示例：<br/>
                                        this.singleCompensationMoneyWrapper.current.setSuccess();<br/>
                                        this.singleCompensationMoneyWrapper.current.setError(errMsg);<br/>
                                        this.bankLocationWrapper.current.setErrorMsg('仅支持输入汉字！');<br/>
                                        this.bankLocationWrapper.current.setValidateDef();<br/>
                                    </div>
                                    <pre>{`
this.state = {
    formData: {
        name: '12',
        age: '20',
        admin: false,
        sex: 1,
        role: ['1'],
        date: null,
        city: null
    },
    formRules: {
        name: [
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['input', 'blur']},
            {required: true, message: '请输入姓名', trigger: ['input', 'blur']}
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        age: [
            {required: true, message: '请输入年龄', trigger: ['input', 'blur']},
            {validator: this.validateAge, trigger: ['input', 'blur']}
            // { validator: this.validateAge, trigger: 'blur' }
        ],
        admin: [
            {required: true, type: 'boolean', message: '请选择是否为管理员'}
        ],
        role: [
            {required: true, type: 'array', message: '请选择角色', trigger: ['change']}
        ],
        date: [
            // { required:true, type: 'object', message: '请选择日期' },
            {validator: this.validateDate, trigger: ['change']}
        ],
        city: [
            {required:true, type: 'string', message: '请选择城市', trigger: ['change']}
        ]
    },
    sexGroupData: {
        disable: false,
        options: [{label: "男", value: 1}, {label: "女", value: 2}]
    },
    roleGroupData: {
        disable: false,
        options: [{label: "产品", value: '1'}, {label: "开发", value: '2'}, {label: "测试", value: '3'}]
    }
};


validateAge(rule, value, callback){
    if (value === '') {
        callback(new Error('请输入年龄valdateAge'));
    } else {
        if(value > 100){
            callback(new Error('年龄不能大于100!'));
        } else {
            callback();
        }
    }
}

validateDate(rule, value, callback){
    if(value === undefined || value === null){
        callback(new Error('请选择日期'));
    } else {
        let selDate = moment(value).startOf('day'),
            nowDate = moment().startOf('day')
        if (selDate.isBefore(nowDate)) {
            callback(new Error('不能选择今日之前的日期'));
        } else {
            callback();
        }
    }
}

handleFormChange(prop, changedValue, allValue){
    console.log('handleFormChange: ', prop, '===', changedValue, '===', allValue);
    this.setState({formData: allValue});
}

/**
 * 表单提交
 */

handleSubmit(){
    // console.log('handleSubmit: ', this.formWrapper.current);
    let valid = this.formWrapper.current.validateForm();
    console.log('handleSubmit valid: ', valid);
    if(valid){
        let params = this.formWrapper.current.getFormData();
        console.log("params: ", params)
    }

    return false;
}

<Form
    formData={this.state.formData}
    rules={this.state.formRules}
    onFormChange={this.handleFormChange.bind(this)}
    label-width={'100px'}
    ref={this.formWrapper}>
    <FormItem label={'姓名'} prop={'name'}>
        <Input />
    </FormItem>
    <FormItem label={'年龄'} prop={'age'}>
        <Input />
    </FormItem>
    <FormItem label={'性别'} prop={'sex'}>
        <Radio.RadioGroup
            options={this.state.sexGroupData.options}
            disabled={this.state.sexGroupData.disable}
        ></Radio.RadioGroup>
    </FormItem>
    <FormItem label={'设为管理员'} prop={'admin'}>
        <CheckBox
            // checked={this.state.formData.admin}
            // onClick={this.handleCheckboxClick.bind(this)}
        >设为管理员</CheckBox>
    </FormItem>
    <FormItem label={'角色'} prop={'role'}>
        <CheckBox.CheckBoxGroup
            options={this.state.roleGroupData.options}
            disabled={this.state.roleGroupData.disable}
        ></CheckBox.CheckBoxGroup>
    </FormItem>
    <FormItem label={'选择测试'} prop={'city'}>
        <Select
            // mode="multiple"
            // labelInValue
            defaultValue="北京"
            placeholder="请选择"
            onChange={this.handleClick}
        >
            <Select.Option value="beijing">北京</Select.Option>
            <Select.Option value="shanghai">上海</Select.Option>
            <Select.Option value="guangzhou">广州</Select.Option>
            <Select.Option disabled value="shenzhen">深圳</Select.Option>
            <Select.Option value="">武汉</Select.Option>
        </Select>
    </FormItem>
    <FormItem label={'日期'} prop={'date'}>
        <DatePicker />
    </FormItem>
    <FormItem>
        <Button onClick={this.handleSubmit.bind(this)} type="primary">提交</Button>
    </FormItem>
</Form>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default FormPage;