import React from 'react';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import ContentHead from '../../../components/ContentHead/ContentHead';
import '../../../scss/pageLayout/form.scss';

class BasicForm extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // console.log(this.props);
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="表单" text="表单页用于向用户收集或验证信息，基础表单常见于数据较少的表单场景。"></ContentHead>
                <Card>
                    <div className="form-box">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="txr" width="30%">产品：</td>
                                    <td width="70%"><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><input id="" name="" defaultValue="" className="input" placeholder="请输入产品名称" /></td>
                                </tr>
                                <tr>
                                    <td className="txr">产品：</td>
                                    <td><textarea placeholder="请输入衡量标准" rows="4" id="" className="input"></textarea></td>
                                </tr>
                                <tr>
                                    <td className="txr"></td>
                                    <td>
                                        <Button type="primary">提交</Button>
                                        <Button>保存</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}

export default BasicForm;