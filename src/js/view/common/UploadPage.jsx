import React from "react";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Button from "../../../components/Button/Button";
import Upload from '../../../components/Upload/Upload';
import Tooltip from "../../../components/Tooltip/Tooltip";


class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessLicData: { //营业执照正本
                uploadStatus: '0',
                pictureName: '营业执照正本',
                picturePath: ''
            }
        };
    }

    // 图片预览
    viewPicture = (picturePath) => {
        // this.setState({
        //     pictureViewData: {
        //         visible: true,
        //         path: picturePath
        //     }
        // });
    }
    // 上传图片
    upload = (name, fileName, file) => {
        console.log(name, '===', fileName, '=======================', file)
        this.setState({
            [name]: {
                uploadStatus: '1',
                pictureName: fileName
            }
        });
        let formData = new FormData();
        formData.append('accountType', '02');
        formData.append('attrName', fileName.split('.')[0]);
        formData.append('file', file);


        let data = Object.assign(this.state[name], {
            uploadStatus: '2',
            picturePath: '../../../resouce/Secoo-ENG-logo.png'
        });
        console.log(data)
        this.setState({
            [name]: data
        });
        console.log(this.state)
    }
    // 删除图片
    delPicture = (name) => {
        let data = Object.assign(this.state[name], {
            uploadStatus: '0',
            pictureName: '',
            picturePath: ''
        });
        this.setState({
            [name]: data
        });
    }

    render() {
        return (
            <div>
                <ContentHead title="上传文件" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="组件">
                            <Upload
                                text="上传图片"
                                uploadStatus={this.state.businessLicData.uploadStatus}
                                fileName={this.state.businessLicData.pictureName}
                                filePath={this.state.businessLicData.picturePath}
                                upload={this.upload.bind(this,'businessLicData')}
                                viewFile={this.viewPicture.bind(this)}
                                delFile={this.delPicture.bind(this,'businessLicData')} >
                            </Upload>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * text：当前文本（上传图片、上传中....）<br/>
                                        * uploadStatus：上传状态，0：未上传，1：上传中，2：上传完成<br/>
                                        * fileName：上传完成显示的文件名<br/>
                                        * filePath：缩略图与预览图路径<br/>
                                        * upload： 上传事件，两个参数filename, file<br/>
                                        * viewFile： 预览事件<br/>
                                        * delFile： 删除事件<br/>
                                    </div>
                                    <pre>{`

// 图片预览
viewPicture = (picturePath) => {
    // this.setState({
    //     pictureViewData: {
    //         visible: true,
    //         path: picturePath
    //     }
    // });
}

// 上传图片
upload = (name, fileName, file) => {
    console.log(name, '===', fileName, '=======================', file)
    this.setState({
        [name]: {
            uploadStatus: '1',
            pictureName: fileName
        }
    });
    let formData = new FormData();
    formData.append('accountType', '02');
    formData.append('attrName', fileName.split('.')[0]);
    formData.append('file', file);


    let data = Object.assign(this.state[name], {
        uploadStatus: '2',
        picturePath: '../../../resouce/Secoo-ENG-logo.png'
    });
    console.log(data)
    this.setState({
        [name]: data
    });
    console.log(this.state)
}

// 删除图片
delPicture = (name) => {
    let data = Object.assign(this.state[name], {
        uploadStatus: '0',
        pictureName: '',
        picturePath: ''
    });
    this.setState({
        [name]: data
    });
}

<Upload
    text="上传图片"
    uploadStatus={this.state.businessLicData.uploadStatus}
    fileName={this.state.businessLicData.pictureName}
    filePath={this.state.businessLicData.picturePath}
    upload={this.upload.bind(this,'businessLicData')}
    viewFile={this.viewPicture.bind(this)}
    delFile={this.delPicture.bind(this,'businessLicData')} >
</Upload>
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

export default UploadPage;