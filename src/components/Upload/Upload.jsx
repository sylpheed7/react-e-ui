import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import './index.scss';

/**
 * 上传组件
 * text：当前文本（上传图片、上传中....）
 * uploadStatus：上传状态，0：未上传，1：上传中，2：上传完成
 * fileName：上传完成显示的文件名
 * filePath：缩略图与预览图路径
 * 上传事件，两个参数filename, file
 * 预览事件
 * 删除事件
 */
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: this.props.uploadStatus || '0', //状态：0.上传前 1.上传中 2.上传后
            fileName: this.props.fileName || '',
            filePath: this.props.filePath || ''
        };
    }

    // 上传
    uploadFile = (e) => {
        this.props.upload(e.target.files[0].name, e.target.files[0]);
    }
    // 删除
    delFile = () => {
        this.props.delFile();
    }

    componentDidMount() {
        // this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            uploadStatus: nextProps.uploadStatus,
            fileName: nextProps.fileName,
            filePath: nextProps.filePath
        });
    }

    render() {
        return (
            <div
                className={`upload-selected-file-card ${this.state.uploadStatus !== '2' ? 'before_upload' : 'after_upload'}`}>
                <span className="upload">
                    <input
                        type="file"
                        className="inputFile"
                        onChange={this.uploadFile.bind(this)}
                        value=''/>
                    {(() => {
                        switch (this.state.uploadStatus) {
                            case '0':
                                return (<div>
                                    <i className="icon icon-tianjia"></i>
                                    <div className="upload-text">{this.props.text}</div>
                                </div>)
                            case '1':
                                return (<div>
                                    <i className="icon "></i>
                                    <div className="upload-text">上传中...</div>
                                </div>)
                            case '2':
                                return (<div className="upload-list-item-info">
                                    <img src={this.state.filePath} title={this.state.fileName}/>
                                    <div className="upload-list-item-actions">
                                        <i className="icon icon-yanjing" onClick={this.props.viewFile.bind(this, this.state.filePath)}></i>
                                        <i className="icon icon-lajitong" onClick={this.delFile.bind(this)}></i>
                                    </div>
                                </div>)
                            default :
                                return (<div>
                                    <i className="icon icon-tianjia"></i>
                                    <div className="upload-text">{this.props.text}</div>
                                </div>)
                        }
                    })()}
                </span>
            </div>
        );
    }
}


/**
 * 上传组件按钮样式
 */
class UploadBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: this.props.uploadStatus || '0', //状态：0.上传前 1.上传中 2.上传后
            fileName: this.props.fileName || '',
            filePath: this.props.filePath || ''
        };
    }

    // 上传
    uploadFile = (e) => {
        this.props.upload(e.target.files[0].name, e.target.files[0]);
    }
    // 删除
    delFile = () => {
        this.props.delFile();
    }

    componentDidMount() {
        // this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            uploadStatus: nextProps.uploadStatus,
            fileName: nextProps.fileName,
            filePath: nextProps.filePath
        });
    }

    render() {
        return (
            <div
                className={`upload-selected-file-btn`}>
                <span className="upload">
                    <input
                        type="file"
                        className="inputFile"
                        onChange={this.uploadFile.bind(this)}
                        value='' />
                    {(() => {
                        switch (this.state.uploadStatus) {
                            case '0':
                                return (<div>
                                    <div className={'upload-btn'}>{this.props.text}&nbsp;<Icon type='upload'></Icon></div>
                                </div>)
                            case '1':
                                return (<div>
                                    <i className="icon "></i>
                                    <div className="upload-text">上传中...</div>
                                </div>)
                            default:
                                return (<div>
                                    <i className="icon icon-tianjia"></i>
                                    <div className="upload-text">{this.props.text}</div>
                                </div>)
                        }
                    })()}
                </span>
            </div>
        );
    }
}

Upload.UploadBtn = UploadBtn;

export default Upload;