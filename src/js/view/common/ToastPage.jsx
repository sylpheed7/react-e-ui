import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Toast from '../../../components/Toast/Toast';
import Button from '../../../components/Button/Button';


class TooltipPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleFn = (e) => {
        const target = e.target;
        const inTxt = target.innerText;

        switch (inTxt) {
            case 'loading':
                Toast.loading();
                break;
            case 'success':
                Toast.success('成功');
                break;
            case 'warn':
                Toast.waring('警告');
                break;
            case 'error':
                Toast.error('错误');
                break;
            default:
                Toast.info('信息');
        }

        console.log(inTxt)
    }

    render() {
        return (
            <div>
                <ContentHead title="Toast 提示" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="Toast">
                            <Button type="primary" onClick={this.handleFn}>info</Button> &nbsp;&nbsp;
                            <Button type="success" onClick={this.handleFn}>success</Button>&nbsp;&nbsp;
                            <Button type="danger" onClick={this.handleFn}>error</Button>&nbsp;&nbsp;
                            <Button type="waring" onClick={this.handleFn}>warn</Button>&nbsp;&nbsp;
                            <Button type="primary" loading={this.state.loading} onClick={this.handleFn}>loading</Button>
                        </Card>
                        <Card cardHeadTit="用法说明">
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <pre className={'code-demo-describe'}>
                                        {`
/**
 * @class
 * @name Toast
 * @description Toast类，涵盖5种方法
 * @property {success, error, waring, info, loading}
 * @param {string|ReactNode} content 显示的内容
 * @param {number} duration 延迟多少秒自动关闭，单位为毫秒，为0则不关闭，默认2000毫秒；
 * @param {function} onClose Toast关闭后出发该函数，(type) => void;
 * @returns {undefined}
 */
                                        `}
                                    </pre>
                                    <pre>{`
Toast.loading();
Toast.success();
Toast.error();
Toast.info('info');
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

export default TooltipPage;