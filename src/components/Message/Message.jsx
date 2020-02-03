import React from 'react';
import './index.scss';
class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={classNames(`message-box ${this.props.type}`, this.props.className)} style={this.props.style}>
                {
                    this.props.state ==='show' &&
                    <p>
                        {
                            this.props.type==='error'?<i className="icon icon-guanbishibaimianxing"></i>:<i className="icon icon-chenggongmianxing"></i>
                        }
                        {this.props.content}
                    </p>
                }
            </div>
        )
    }
}
export default Message;