/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import {Icon} from "../../../components";

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
                <Card cardHeadTit="无Icon">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">公共模块</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Button 按钮</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                * props classname, style separator<br />
                                * separator: 分隔符，默认 无,<br />
                            </div>
                            <pre>{`
<Breadcrumb separator="/">
    <Breadcrumb.Item>
        首页
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        <a href="">公共模块</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Button 按钮</Breadcrumb.Item>
</Breadcrumb>
                                        `}</pre>
                        </div>
                    </div>
                </Card>
                <Card cardHeadTit="有Icon">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <Icon type="app" /> 首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="all-app" /> <a href="">公共模块</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item><Icon type="personal" /> Button 按钮</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                * props classname, style separator<br />
                                * separator: 分隔符，默认 无,<br />
                            </div>
                            <pre>{`
<Breadcrumb separator="/">
    <Breadcrumb.Item>
        <Icon type="app" /> 首页
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        <Icon type="all-app" /> <a href="">公共模块</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item><Icon type="personal" /> Button 按钮</Breadcrumb.Item>
</Breadcrumb>
                                        `}</pre>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default FormPage;