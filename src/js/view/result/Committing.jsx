import ContentHead from '../../../components/ContentHead/ContentHead';
import Result from "../../../components/Result/Result";

class Committing extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="提交中"></ContentHead>
                <Result imgUrl="../resouce/success.png" text="提交中" resultTxt="页面提交中，请耐心等待"></Result>
            </React.Fragment>
        )
    }
}

export default Committing;