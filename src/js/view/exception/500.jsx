import React from 'react';
import ContentHead from '../../../components/ContentHead/ContentHead';
import Exception from '../../../components/Exception/Exception';

class Exception500 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="500服务器出错了"></ContentHead>
                <Exception imgUrl="../resouce/500.png" text="服务器故障，请稍后再试"></Exception>
            </React.Fragment>
        )
    }
}

export default Exception500;