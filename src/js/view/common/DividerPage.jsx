/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Divider from "../../../components/Divider/Divider";
import Tooltip from "../../../components/Tooltip/Tooltip";

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
                <ContentHead title="分割线" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="分割线 - 基础">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>
                            <Divider></Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>
                            <Divider dashed></Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * Divider分割线<br/>
                                        * props.type 水平还是垂直类型, horizontal、vertical	, def: horizontal<br/>
                                        * props.dashed 是否虚线<br/>
                                        * props.orientation 分割线标题的位置, left、right、center, def: center<br/>
                                    </div>
                                    <pre>{`
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
<Divider></Divider>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
<Divider dashed></Divider>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="分割线 - 带文字">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>
                            <Divider>Center Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>
                            <Divider orientation={'left'}>Left Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>
                            <Divider orientation={'right'} dashed>Right Text</Divider>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            </p>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        分割线中带有文字，可以用 orientation 指定文字位置<br/>
                                    </div>
                                    <pre>{`
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
<Divider>Center Text</Divider>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
<Divider orientation={'left'}>Left Text</Divider>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
<Divider orientation={'right'} dashed>Right Text</Divider>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
</p>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <Card cardHeadTit="分割线 - 垂直">
                            <div>
                                Text
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        使用 type="vertical" 设置为行内的垂直分割线。<br/>
                                    </div>
                                    <pre>{`
<div>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
</div>
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