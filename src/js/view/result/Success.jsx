import ContentHead from '../../../components/ContentHead/ContentHead';
import Result from "../../../components/Result/Result";

class Success extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="提交成功"></ContentHead>
                <Result imgUrl="../resouce/success.png" text="提交成功" resultTxt="提交
        结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。
        本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"></Result>
            </React.Fragment>
        )
    }
}

export default Success;