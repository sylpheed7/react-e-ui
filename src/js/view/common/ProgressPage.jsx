import Button from "../../../components/Button/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import Progress from "../../../components/Progress/Progress";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
class SwitchPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            percent: 0
        }
    }
    addFn(){
        if(this.state.percent >= 100) return
        let percent = this.state.percent + 10
        this.setState({
            percent: percent
        })
    }
    delFn(){
        if(this.state.percent <= 0) return
        let percent = this.state.percent - 10
        this.setState({
            percent: percent
        })
    }
    render(){
        return (
            <div>
                {/* <Button onClick={this.addFn.bind(this)}>增加{this.state.percent.toString()}</Button>
                <Button onClick={this.delFn.bind(this)}>减少{this.state.percent.toString()}</Button>
                <Card>
                    <div style={{width: '400px'}}>
                        <Progress percent={this.state.percent}></Progress>
                    </div>
                </Card> */}
                <ContentHead title="Process 进度条组件" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="默认">
                            <p style={{margin: '10px 0'}}>
                                <Button onClick={this.addFn.bind(this)}>增加</Button>
                                <Button onClick={this.delFn.bind(this)}>减少</Button>
                                
                            </p>
                            <p style={{margin: '10px 0'}}>
                                {"percent: " + this.state.percent.toString()}
                            </p>
                            <Progress percent={this.state.percent}></Progress>
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * percent 进度百分比 传入 number , 大于 100 ，按 100 计算， 小于 0 ，按 0 计算<br/>
                                    </div>
                                    <pre>{`
<Progress percent={this.state.percent}></Progress>
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
export default SwitchPage;