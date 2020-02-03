import ContentHead from '../../../components/ContentHead/ContentHead';
import Result from "../../../components/Result/Result";

class Fail extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="提交失败"></ContentHead>
                <Result imgUrl="../resouce/fail.png" text="提交失败" resultTxt="请核对并修改以下信息后，再重新提交。"></Result>
            </React.Fragment>
        )
    }
}

export default Fail;