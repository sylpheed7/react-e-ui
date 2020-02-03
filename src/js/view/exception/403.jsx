import React from 'react';
import ContentHead from '../../../components/ContentHead/ContentHead';
import Exception from '../../../components/Exception/Exception';

class Exception403 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="403无权访问"></ContentHead>
                <Exception imgUrl="../resouce/403.png" text="抱歉！您无权访问"></Exception>
            </React.Fragment>
        )
    }
}

export default Exception403;