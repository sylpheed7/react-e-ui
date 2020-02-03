import React from 'react';
import Card from '../Card/Card';
import './index.scss';

class Exception extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <div className="exception-box">
                    <img src={this.props.imgUrl}/>
                    <p>{this.props.text}</p>
                </div>
            </Card>
        )
    }
}

export default Exception;