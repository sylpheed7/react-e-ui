/* eslint-disable max-len */
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Avatar from "../../../components/Avatar/Avatar";
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
                <ContentHead title="头像" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="头像">
                            <Avatar size={64} shape={'square'} icon={'personal'}></Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar size={'large'} shape={'square'} icon={'personal'}></Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar size={'default'} shape={'square'} icon={'personal'}></Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar size={'small'} shape={'square'} icon={'personal'}></Avatar>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * props.icon 设置头像的图标类型，参考 Icon 组件<br/>
                                        * props.shape 指定头像的形状， 'circle', 'square' ， def：circle<br/>
                                        * props.size 设置头像的大小，number |  'large', 'small', 'default' ， def：default<br/>
                                        * props.src 图片类头像的资源地址<br/>
                                    </div>
                                    <pre>{`
<Avatar size={64} shape={'square'} icon={'personal'}></Avatar>
<Avatar size={'large'} shape={'square'} icon={'personal'}></Avatar>
<Avatar size={'default'} shape={'square'} icon={'personal'}></Avatar>
<Avatar size={'small'} shape={'square'} icon={'personal'}></Avatar>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="头像">
                            <Avatar>User</Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar icon={'personal'}></Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar src={avatarImg}></Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>U</Avatar>
                            <span style={{marginRight: '10px'}}></span>
                            <Avatar style={{backgroundColor: '#87d068'}} icon="personal" />

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色
                                    </div>
                                    <pre>{`
<Avatar>User</Avatar>
<Avatar icon={'personal></Avatar>
<Avatar src={avatarImg}></Avatar>
<Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>U</Avatar>
<Avatar style={{backgroundColor: '#87d068'}} icon="personal" />
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