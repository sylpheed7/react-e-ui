import React from 'react';
import ContentHead from '../../../components/ContentHead/ContentHead';
import Exception from '../../../components/Exception/Exception';

class Exception404 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="404访问的页面不存在"></ContentHead>
                <Exception imgUrl="../resouce/404.png" text="服务器故障，请稍后再试"></Exception>
            </React.Fragment>
        )
    }
}

export default Exception404;