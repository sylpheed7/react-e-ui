import Button from "../../../components/Button/Button.jsx";
import Card from "../../../components/Card/Card.jsx";
import Switch from "../../../components/Switch/Switch";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
class SwitchPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            disabled: false
        }
    }
    onChange(val){
        console.log('-----------------子组件------start---------------------')
        console.log(val)
        // console.log(e)
        console.log('-----------------子组件-------end---------------------')
    }
    disabledFn(){
        let disabled = !this.state.disabled
        this.setState({
            disabled: disabled
        })
    }
    render(){
        return (
            <div>
                
                <ContentHead title="Switch 开关组件" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="默认">
                            <Switch 
                                defaultChecked 
                                checked={true} 
                                onChange={this.onChange.bind(this)}
                            ></Switch>
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.defaultChecked 设置默认值<br/>
                                        * props.checked 组件开关状态 true: 开， false: 关<br/>
                                       
                                    </div>
                                    <pre>{`
<Switch 
defaultChecked 
checked={true} 
onChange={this.onChange.bind(this)}
></Switch>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="禁用">
                            <p style={{margin: '10px 0'}}>
                                <Button onClick={this.disabledFn.bind(this)}>{this.state.disabled ? '启用' : '禁用'}</Button>
                            </p>
                            <Switch 
                                defaultChecked 
                                checked={true} 
                                disabled={this.state.disabled}
                                onChange={this.onChange.bind(this)}
                            ></Switch>
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                    * props.disabled 设置禁用<br/>
                                    </div>
                                    <pre>{`
 <Switch 
 defaultChecked 
 checked={true} 
 disabled={this.state.disabled}
 onChange={this.onChange.bind(this)}
></Switch>
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