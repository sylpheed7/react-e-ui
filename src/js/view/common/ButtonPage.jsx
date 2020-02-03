import Button from "../../../components/Button/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import ContentHead from "../../../components/ContentHead/ContentHead.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import {Row, Col} from '../../../components/Grid/Grid';
// import Divider from '../../../components/Divider/Divider'
import Icon from "../../../components/Icon/Icon";

import "../../../scss/pageLayout/module.scss";
import React from "react";


const ButtonGroup = Button.Group;

class ButtonPage extends React.Component {
    constructor(props) {
        super(props);
        /*设置当前状态*/
        this.state = {
            selectval: "",
            checkboxData: {
                disable: false,
                checked: true
            }
        };
        /*？？？？？*/
        this.handleClick = this.handleClick.bind(this);
    }
    /*复选框状态切换方法*/
    checkboxChange(val, ele) {
        this.state.checkboxData.checked = val;
        this.setState({
            checkboxData: this.state.checkboxData
        });
    }
    /*复选框禁用切换*/
    checkboxDisableToggle() {
        this.state.checkboxData.disable = !this.state.checkboxData.disable;
        this.state.checkboxData.disable = !this.state.checkboxData.disable

        this.setState({
            checkboxData: this.state.checkboxData
        });
    }

    // demo事件可参考
    handleClick(a) {
        //在控制台输出内容
        console.log("在组件上绑定event属性完成事件传递到自组件");
        // this.state.selectval = a;
        console.log(a)
        //检查指定的事件上是否调用了该方法。阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。
        event.stopPropagation();
    }
    //组装生成组件的HTML结构
    render() {
        //设置按钮属性、颜色属性
        let buttonBody = null,
            colorsBody = null;
        //设置颜色块
        colorsBody = (
            <ul className="layout-colors">
                <li>
                    <i className="color-example color-example1" />
                    <span className="color-name">#0099FF</span>
                </li>
                <li>
                    <i className="color-example color-example2" />
                    <span className="color-name">#3FA9FF</span>
                </li>
                <li>
                    <i className="color-example color-example3" />
                    <span className="color-name">#0A6DD9</span>
                </li>
                <li>
                    <i className="color-example color-example4" />
                    <span className="color-name">#E5F7FF</span>
                </li>
                <li>
                    <i className="color-example color-example5" />
                    <span className="color-name">#FF4951</span>
                </li>
                <li>
                    <i className="color-example color-example6" />
                    <span className="color-name">#2CD7AA</span>
                </li>
                <li>
                    <i className="color-example color-example7" />
                    <span className="color-name">#FFC602</span>
                </li>
                <li>
                    <i className="color-example color-example8" />
                    <span className="color-name">#262626</span>
                </li>
                <li>
                    <i className="color-example color-example9" />
                    <span className="color-name">#595959</span>
                </li>
                <li>
                    <i className="color-example color-example10" />
                    <span className="color-name">#8C8C8C</span>
                </li>
                <li>
                    <i className="color-example color-example11" />
                    <span className="color-name">#BFBFBF</span>
                </li>
                <li>
                    <i className="color-example color-example12" />
                    <span className="color-name">#E8E8E8</span>
                </li>
                <li>
                    <i className="color-example color-example13" />
                    <span className="color-name">#D9D9D9</span>
                </li>
            </ul>
        );
        //设置按钮块
        buttonBody = (
            <ul className="layout-button">
                <li>
                    {/*点击事件跳转到handleClick方法*/}
                    <span>
                        <Button onClick={this.handleClick} type="primary" className='add' icon='icon-xiangqingye'>主要按钮</Button>
                    </span>
                    <span>
                        <Button type="success">成功按钮</Button>
                    </span>
                    <span>
                        <Button type="waring">警告按钮</Button>
                    </span>
                    <span>
                        <Button type="danger">警告按钮</Button>
                    </span>
                    <span>
                        <Button disabled>禁用按钮</Button>
                    </span>
                </li>
                <li>
                    {/*设置圆角按钮*/}
                    <span>
                        <Button type="primary" shape="round">
                            圆角按钮
                        </Button>
                    </span>
                    <span>
                        <Button type="success" shape="round">
                            圆角按钮
                        </Button>
                    </span>
                    <span>
                        <Button type="waring" shape="round">
                            圆角按钮
                        </Button>
                    </span>
                    <span>
                        <Button type="danger" shape="round">
                            圆角按钮
                        </Button>
                    </span>
                    <span>
                        <Button round disabled>
                            圆角按钮
                        </Button>
                    </span>
                </li>
                <li>
                    {/*设置字长按钮*/}
                    <span>
                        <Button type="primary">两 字</Button>
                    </span>
                    <span>
                        <Button type="primary">三个字</Button>
                    </span>
                    <span>
                        <Button type="primary">主要按钮</Button>
                    </span>
                    <span>
                        <Button type="primary" icon="add">
                            图标
                        </Button>
                    </span>
                </li>
                <li>
                    <span>
                        <Button onClick={this.handleClick}>默认按钮</Button>
                    </span>
                    <span>
                        {/*plain：是否镂空按钮*/}
                        <Button plain>主要按钮</Button>
                    </span>
                    <span>
                        <Button plain disabled>
                            禁用按钮
                        </Button>
                    </span>
                </li>
                <li>
                    <span>
                        <Button onClick={this.handleClick} shape="circle"  icon="add"></Button>
                    </span>
                    <span>
                        <Button plain  icon="add" shape="circle"></Button>
                    </span>
                    <span>
                        <Button plain disabled shape="circle" icon="add"></Button>
                    </span>
                </li>
                <li>
                    <span>
                        <Button shape="round">圆角按钮</Button>
                    </span>
                    <span>
                        <Button plain>
                            主要按钮
                        </Button>
                    </span>
                    <span>
                        <Button plain disabled>
                            禁用按钮
                        </Button>
                    </span>
                </li>

                <li>
                    <span>
                        <Button type="txt">按钮</Button>
                    </span>
                    <span>
                        <Button type="txt" disabled>
                            按钮
                        </Button>
                    </span>
                </li>
                <li>
                    <span>
                        <Button type="txt" icon="down">
                            展开
                        </Button>
                    </span>
                    <span>
                        <Button type="txt" disabled icon="down">
                            展开
                        </Button>
                    </span>
                    <span>
                        <Button type="txt" icon="left" loading={true}>
                            loading
                        </Button>
                    </span>
                </li>
            </ul>
        );

        return (
            //作为顶级标签包裹子标签，编译后消失
            <React.Fragment>
                {/*设置标题*/}
                <ContentHead title="Button 按钮">
                    {/*面包屑，设置他的分隔符*/}
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <i className="icon icon-zhiye" />
                            首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">公共模块</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Button 按钮</Breadcrumb.Item>
                    </Breadcrumb>
                </ContentHead>
                {/*设置颜色块标题*/}
                <Card cardHeadTit="系统常用色">{colorsBody}</Card>
                <Row>
                    {/*跨12列*/}
                    <Col span="12">
                        {/*设置组件按钮*/}
                        <Card
                            cardHeadTit="系统按钮组件"
                            cardBody={buttonBody}
                        >
                            {/*添加按钮注释*/}
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                    * props type, icon, plain, round, disabled, 各种事件 <br />
                                    * type: primarg, success, waring, danger, txt 五种按钮类型 <br />
                                    * icon 按钮是否要增加icon <br />
                                    * plain 是否镂空按钮 <br />
                                    * round 是否圆形按钮 <br />
                                    * disabled 是否禁用 <br />
                                    * loading 是否开启loading状态 <br />
                                    * shape 按钮形状，默认无, 可选circle, round <br />
                                    * href 和a标签一致，默认无 <br />
                                    * target 和a标签一致，默认_self<br />
                                    * effect 是否开启点击东西，default: true
                                    </div>
                                    <pre>{`
<Button type="primary">按钮</Button>
<Button type="success">按钮</Button>
<Button type="waring">按钮</Button>
<Button type="danger">按钮</Button>
<Button type="txt">按钮</Button>
<Button plain>按钮</Button>
<Button plain round>按钮</Button>
<Button plain disabled>按钮</Button>
<Button plain icon="add">按钮</Button>
<Button type="txt" icon="left" loading={true}>loading</Button>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>

                    </Col>
                    {/*跨12列*/}
                    <Col span="12">
                        <Card
                            cardHeadTit="系统按钮组件"
                        >
                            {/*？？？？是自定义的么*/}
                            <ButtonGroup>
                                <Button type="primary">上一页</Button>
                                <Button type="primary">下一页</Button>
                            </ButtonGroup>
                            &nbsp;
                            <ButtonGroup>
                                <Button plain>上一页</Button>
                                <Button plain>下一页</Button>
                            </ButtonGroup>
                            <br/>
                            <ButtonGroup style={{marginTop: '15px'}}>
                                <Button plain shape="round">上一页</Button>
                                <Button plain shape="round">下一页</Button>
                            </ButtonGroup>
                            &nbsp;
                            <ButtonGroup style={{marginTop: '15px'}}>
                                <Button type="primary" icon="left-arrow"></Button>
                                <Button type="primary" icon="right-arrow"></Button>
                            </ButtonGroup>
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        Group模式
                                    </div>
                                    <pre>{`
ButtonGroup>
    <Button type="primary">上一页</Button>
    <Button type="primary">下一页</Button>
</ButtonGroup> 
&nbsp;
<ButtonGroup>
    <Button plain>上一页</Button>
    <Button plain>下一页</Button>
</ButtonGroup>
<ButtonGroup>
    <Button plain shape="round">上一页</Button>
    <Button plain shape="round">下一页</Button>
</ButtonGroup>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
/*定义模块的对外接口，输出默认函数*/
export default ButtonPage;