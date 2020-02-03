import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Button from "../../../components/Button/Button";
import Tooltip from '../../../components/Tooltip/Tooltip';
import Tree from "../../../components/Tree/Tree";


class TooltipPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <ContentHead title="Tooltip 文字提示" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="1 - click - 默认位置">
                            <div className="layout-no">
                                <Tooltip title="prompt text" trigger="click">
                                    <span>Tooltip will show when mouse click.</span>
                                </Tooltip>

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * title string tip内容
                                        </div>
                                        <pre>{`
<Tooltip title="prompt text">
    <span>Tooltip will show when mouse click.</span>
</Tooltip>
                                        `}</pre>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="2 - 箭头指向中心">
                            <div className="layout-no">
                                <Tooltip title="prompt text" placement="topLeft" arrowPointAtCenter>
                                    <span>Tooltip will show when mouse enter.</span>
                                </Tooltip>

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * arrowPointAtCenter       是否箭头指向中心  （考虑到情况少，所有只适用class为top的）
                                        </div>
                                        <pre>{`
<Tooltip title="prompt text" arrowPointAtCenter>
    <span>Tooltip will show when mouse enter.</span>
</Tooltip>
                                        `}</pre>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="3 - 12个方向">
                            <div className="layout-no">
                                {/*top 左中右*/}
                                <Tooltip placement="topLeft" title="Prompt Text">
                                    <Button plain>topLeft</Button>
                                </Tooltip><br/>
                                <Tooltip placement="top" title="Prompt Text">
                                    <Button plain>top</Button>
                                </Tooltip><br/>
                                <Tooltip placement="topRight" title="Prompt Text">
                                    <Button plain>topRight</Button>
                                </Tooltip><br/>
                                {/*left 上中下*/}
                                <Tooltip placement="leftTop" title="Prompt Text">
                                    <Button plain>leftTop</Button>
                                </Tooltip><br/>
                                <Tooltip placement="left" title="Prompt Text">
                                    <Button plain>left</Button>
                                </Tooltip><br/>
                                <Tooltip placement="leftBottom" title="Prompt Text">
                                    <Button plain>leftBottom</Button>
                                </Tooltip><br/>
                                {/*right 上中下*/}
                                <Tooltip placement="rightTop" title="Prompt Text">
                                    <Button plain>rightTop</Button>
                                </Tooltip><br/>
                                <Tooltip placement="right" title="Prompt Text">
                                    <Button plain>right</Button>
                                </Tooltip><br/>
                                <Tooltip placement="rightBottom" title="Prompt Text">
                                    <Button plain>rightBottom</Button>
                                </Tooltip><br/>
                                {/*bottom 左中右*/}
                                <Tooltip placement="bottomLeft" title="Prompt Text">
                                    <Button plain>bottomLeft</Button>
                                </Tooltip><br/>
                                <Tooltip placement="bottom" title="Prompt Text">
                                    <Button plain>bottom</Button>
                                </Tooltip><br/>
                                <Tooltip placement="bottomRight" title="Prompt Text">
                                    <Button plain>bottomRight</Button>
                                </Tooltip><br/>



                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * placement         string tip位置-class名
                                        </div>
                                        <pre>{`
<Tooltip placement="topLeft" title="Prompt Text">
    <Button plain>topLeft</Button>
</Tooltip><br/>
<Tooltip placement="top" title="Prompt Text">
    <Button plain>top</Button>
</Tooltip><br/>
<Tooltip placement="topRight" title="Prompt Text">
    <Button plain>topRight</Button>
</Tooltip><br/>
{/*left 上中下*/}
<Tooltip placement="leftTop" title="Prompt Text">
    <Button plain>leftTop</Button>
</Tooltip><br/>
<Tooltip placement="left" title="Prompt Text">
    <Button plain>left</Button>
</Tooltip><br/>
<Tooltip placement="leftBottom" title="Prompt Text">
    <Button plain>leftBottom</Button>
</Tooltip><br/>
{/*right 上中下*/}
<Tooltip placement="rightTop" title="Prompt Text">
    <Button plain>rightTop</Button>
</Tooltip><br/>
<Tooltip placement="right" title="Prompt Text">
    <Button plain>right</Button>
</Tooltip><br/>
<Tooltip placement="rightBottom" title="Prompt Text">
    <Button plain>rightBottom</Button>
</Tooltip><br/>
{/*bottom 左中右*/}
<Tooltip placement="bottomLeft" title="Prompt Text">
    <Button plain>bottomLeft</Button>
</Tooltip><br/>
<Tooltip placement="bottom" title="Prompt Text">
    <Button plain>bottom</Button>
</Tooltip><br/>
<Tooltip placement="bottomRight" title="Prompt Text">
    <Button plain>bottomRight</Button>
</Tooltip><br/>
                                        `}</pre>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TooltipPage;