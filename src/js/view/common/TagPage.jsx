import Button from "../../../components/Button/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import Progress from "../../../components/Progress/Progress";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Tag from '../../../components/Tag/Tag'
class TagPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: true,
            visible1: true
        }
    }
    onCloseVisible(e) {
        // e.preventDefault();
        this.setState({
            visible1: false
        })
        console.log('Clicked! But prevent default.');
    }
    onClose(e) {
        e.preventDefault();
        // this.setState({
        //     visible: false
        // })
        console.log('Clicked! But prevent default.');
    }
    render(){
        return (
            <div>
                <ContentHead title="Tag 标签组件" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="默认">
                            <Tag >
                            baseTag
                            </Tag>
                            <Tag
                                type="success"
                            >
                                successTag
                            </Tag>
                            <Tag
                                type="info"
                            >
                                infoTag
                            </Tag>
                            <Tag
                                type="warning"
                            >
                                warningTag
                            </Tag>

                            <Tag
                                type="danger"
                            >
                                dangerTag
                            </Tag>
                           
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                    type  tag类型，可选值： success/info/warning/danger，无默认值<br/>
                                    </div>
                                    <pre>{`
import Tag from 'sgexp'
<Tag>baseTag</Tag>
<Tag type="success">successTag</Tag>
<Tag type="info">infoTag</Tag>
<Tag type="warning">warningTag</Tag>
<Tag type="danger">dangerTag</Tag>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="可关闭">
                            
                            <Tag
                                closeable
                                // visible={this.state.visible}
                                onClose={this.onClose.bind(this)}
                            >
                                baseTag
                            </Tag>
                            <Tag
                                closeable
                                type="success"
                                // visible={this.state.visible}
                                onClose={this.onClose.bind(this)}
                            >
                                successTag
                            </Tag>
                            <Tag
                                closeable
                                type="info"
                                // visible={this.state.visible}
                                onClose={this.onClose.bind(this)}
                            >
                                infoTag
                            </Tag>
                            <Tag
                                closeable
                                type="warning"
                                // visible={this.state.visible}
                                onClose={this.onClose.bind(this)}
                            >
                                warningTag
                            </Tag>

                            <Tag
                                closeable
                                type="danger"
                                // visible={this.state.visible}
                                onClose={this.onClose.bind(this)}
                            >
                                dangerTag
                            </Tag>
                        
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * type  tag类型，可选值： success/info/warning/danger，无默认值<br/>
                                        * visible 控制tag显示，可选值： true/false，默认值：true<br/>
                                        * closeable 是否显示关闭按钮 true/false，默认值：true<br/>
                                        * onClose tag关闭事件，可选值：<br/>
                                    </div>
                                    <pre>{`
import Tag from 'sgexp'
this.state = { visible: true}
onClose(e) {
     e.preventDefault();
     console.log('closed')
}
<Tag closeable onClose={this.onClose.bind(this)}> baseTag </Tag>
<Tag closeable  type="success" onClose={this.onClose.bind(this)}> successTag </Tag>
<Tag closeable  type="info" onClose={this.onClose.bind(this)}> infoTag </Tag>
<Tag closeable  type="warning" onClose={this.onClose.bind(this)}> warningTag </Tag>
<Tag closeable  type="danger" onClose={this.onClose.bind(this)}> dangerTag </Tag>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                  
                </Row>
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="通过父组件属性visible关闭tag">
                            <Button onClick={()=>this.setState({visible1: !this.state.visible1})}>{!this.state.visible1? "显示":'隐藏'}</Button>
                            <Tag
                                closeable
                                visible={this.state.visible1}
                                onClose={this.onCloseVisible.bind(this)}
                            >
                                baseTag
                            </Tag>
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * type  tag类型，可选值： success/info/warning/danger，无默认值<br/>
                                        * visible 控制tag显示，可选值： true/false，默认值：true<br/>
                                        * closeable 是否显示关闭按钮 true/false，默认值：true<br/>
                                        * onClose tag关闭事件，可选值：<br/>
                                    </div>
                                    <pre>{`
import Tag from 'sgexp'
this.state = { visible: true}
onCloseVisible(e) {
     e.preventDefault();
     this.setState({
         visible: false
     })
}
<Tag closeable visible={this.state.visible} onClose={this.onCloseVisible.bind(this)}> baseTag </Tag>

                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                  
                </Row>
            </div>

            
        )
    }
}
export default TagPage;