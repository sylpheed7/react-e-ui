/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";

class FormPage extends React.Component {
    constructor(props) {
        super(props);

        this.formWrapper = React.createRef();

        this.state = {

        };
    }
    render() {
        let avatarImg = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
        return (
            <div>
                <ContentHead title="Breadcrumb 面包屑" />
                <Card cardHeadTit="Card 卡片 标题">
                    Card 内容
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                * props classname, style, cardHeadTit<br />
                                * cardHeadTit: 头部内容，默认 无,<br />
                            </div>
                            <pre>{`
<Card cardHeadTit="Card 卡片 标题">Card 内容</Card>
                            `}</pre>
                        </div>
                    </div>
                </Card>
                <Card>
                Card 卡片 无标题
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <pre>{`
<Card>Card 卡片 无标题</Card>
                            `}</pre>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default FormPage;