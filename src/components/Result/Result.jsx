import Card from '../Card/Card';
import Button from '../Button/Button';
import './index.scss';

class Result extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <div className="result-box">
                    <img src={this.props.imgUrl}/>
                    <p className="text">{this.props.text}</p>
                    <p className="resultTxt">{this.props.resultTxt}</p>
                    {
                        this.props.showBtn ? <Button type="primary">
                            <i className="icon icon-fanhui" /> 返回修改
                        </Button> : ''
                    }
                </div>
            </Card>
        )
    }
}

export default Result;