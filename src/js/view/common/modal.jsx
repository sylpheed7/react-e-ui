import React from "react";
import Button from "../../../components/Button/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import ContentHead from "../../../components/ContentHead/ContentHead.jsx";
import Modal from "../../../components/Modal/Modal";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Tooltip from "../../../components/Tooltip/Tooltip";

const marginRight = {
    marginRight: '20px'
}

let aad;
class ModalPage extends React.Component {
    constructor(props) {
        super(props);        
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.info = this.info.bind(this);
        // this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.warning = this.warning.bind(this);
        this.state = {
            visible: false,
            visible2: false
        };
    }

    showModal = () => {
        this.setState({visible: true})
    }

    showModal2 = () => {
        this.setState({visible2: true})
    }

    handleCancel = () => {
        this.setState({visible: false});
        console.log('我是 cancel 回调')
    }

    handleOk = () => {
        return false;
        this.setState({visible: false});
        console.log('我是 ok 回调')
    }

    handleCancelt = () => {
        this.setState({visible2: false});
        console.log('我是2 cancel 回调')
    }

    handleOkt = () => {
        this.setState({visible2: false});
        console.log('我是2 ok 回调')
    }

    confirm() {
        Modal.confirm({
            title: 'add',
            onCancel: function(e) {
                console.log('顶部')
            },
            onOk: e => {
                console.log('confirm')
            }
        })
    }

    info() {
        Modal.info({
            onOk: e => {
                console.log('info')
            }
        })
    }
    
    success() {
        setTimeout(() => {
            Modal.success({
                title:'111111'
            })
        }, 5000)
    }

    error() {
        Modal.error({
            title: 'This is an error message',
            content: (<Button onClick={this.handleDesterModal} style={{marginLeft: '20px'}}>销毁</Button>)
        });
    }

    warning = () => {
        aad = Modal.warning({
            position: 'center',
            title: 'This is a warning message',
            content: (<Button onClick={this.handleDesterModal} style={{marginLeft: '20px'}}>销毁</Button>)
        });
    }

    handleDesterModal = () => {
        event.stopPropagation();
        Modal.destroyAll()
    }

    render() {
        const {visible, visible2} = this.state;

        return (
            <React.Fragment>
                <ContentHead title="对话框" />
                <Row>
                    <Col span="24">
                        <Card
                            cardHeadTit="基本对话框"
                        >
                            <Button type="primary" onClick={this.showModal} style={marginRight}>Open Modal</Button>
                            <Button type="primary" onClick={this.showModal2}>Open Modal2</Button>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.position String, default:center, center top  @description 弹窗位置<br/>
                                        * props.esc  Boolean, default: true @description 开启esc按钮是否可以关闭<br/>
                                        * props.type String, default: modal, info、success、error、warning @description 弹窗类型<br/>
                                        * props.title String|React Node, default: '' @description 弹窗标题<br/>
                                        * props.content String|React Node default: '' @description 弹窗内容<br/>
                                        * props.okText String|React Node default: 确认 @description 确定按钮自定义文案内容<br/>
                                        * props.onOk Function, default: '' @description 确定按钮自定义回调函数<br/>
                                        * props.cancelText String|React Node  default: 取消  @description 取消按钮自定义文案内容，在type为info,success,error,warning 模式下，取消按钮不显示。<br/>
                                        * props.onCancel Function, default: '' @description 取消按钮自定义回调函数，<br/>
                                        * props.className String, default: ''  @description 自定义classname字段<br/>
                                        * props.onDesterAll Function, default: '' @description 关闭弹窗去掉所有卸载子组件状态回调。<br/>
                                        * props.visible Boolean, default: false  @description 显示隐藏弹窗，默认为 false<br/>
                                    </div>
                                    <pre>{`
showModal = () => {
    this.setState({visible: true})
}
    
<Button type="primary" onClick={this.showModal} style={marginRight}>Open Modal</Button>


<Modal
    visible={visible}
    title="这是自定义title"
    onOk={this.handleOk}
    onCancel={this.handleCancel}
>
    <p>这是自定义content</p>
    <p>这是自定义content</p>
    <p>这是自定义content</p>
    <p>这是自定义content</p>
    <p>这是自定义content</p>
</Modal>
                                        `}</pre>
                                </div>
                            </div>

                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <Card
                            cardHeadTit="信息提示"
                        >
                            <Button onClick={this.confirm} style={marginRight}>Confirm</Button>
                            <Button onClick={this.info} style={marginRight}>Info</Button>
                            <Button onClick={this.success.bind(this)} style={marginRight}>Success</Button>
                            <Button onClick={this.error} style={marginRight}>Error</Button>
                            <Button onClick={this.warning} style={marginRight}>Warning</Button>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        Modal.type(...options)方式调用 <br/>
                                        options参数参考上例
                                    </div>
                                    <pre>{`
<Button onClick={this.confirm} style={marginRight}>Confirm</Button>
<Button onClick={this.info} style={marginRight}>Info</Button>
<Button onClick={this.success} style={marginRight}>Success</Button>
<Button onClick={this.error} style={marginRight}>Error</Button>
<Button onClick={this.warning} style={marginRight}>Warning</Button>

confirm() {
    Modal.confirm({
        title: 'add',
        onCancel: function(e) {
            console.log('顶部')
        },
        onOk: e => {
            console.log('confirm')
        }
    })
}

info() {
    Modal.info({
        onOk: e => {
            console.log('info')
        }
    })
}

success() {
    Modal.success({
        onOk: e => {
            console.log('success', e)
        }
    })
}

error() {
    Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...'
    });
}

warning() {
    Modal.warning({
        position: 'center',
        title: 'This is a warning message',
        content: 'some messages...some messages...'
    });
}
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    visible={visible}
                    title="这是自定义title11111"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                </Modal>
                <Modal
                    visible={visible2}
                    title="这是自定义title2222"
                    onOk={this.handleOkt}
                    onCancel={this.handleCancelt}
                >
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                    <p>这是自定义content</p>
                </Modal>
                {/* <Modal
                    type="success"
                    visible={false}
                    title="这是自定义title"
                    content="测试内容点。"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                /> */}
            </React.Fragment>
        );
    }
}

export default ModalPage;