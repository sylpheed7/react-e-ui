import {createPortal, render, unmountComponentAtNode} from "react-dom";
import Button from "../Button/Button";
import Icon from '../Icon/Icon';
import {CSSTransition} from "react-transition-group";

import "./index.scss";

/**
 * props.position String, default:top, center top  @description 弹窗位置
 * props.esc  Boolean, default: true @description 开启esc按钮是否可以关闭
 * props.type String, default: modal, info、success、error、warning @description 弹窗类型
 * props.title String|React Node, default: '' @description 弹窗标题
 * props.content String|React Node default: '' @description 弹窗内容
 * props.okText String|React Node default: 确认 @description 确定按钮自定义文案内容
 * props.onOk Function, default: '' @description 确定按钮自定义回调函数
 * props.cancelText String|React Node  default: 取消  @description 取消按钮自定义文案内容，在type为info,success,error,warning 模式下，取消按钮不显示。
 * props.onCancel Function, default: '' @description 取消按钮自定义回调函数，
 * props.className String, default: ''  @description 自定义classname字段
 * props.onDesterAll Function, default: '' @description 关闭弹窗去掉所有卸载子组件状态回调。
 * props.visible Boolean, default: false  @description 显示隐藏弹窗，默认为 false
 */

let modalID = 0;

let destroyArrayFn = [];

function destroyFn(ele) {
    unmountComponentAtNode(ele);
}

class Modal extends React.Component {
    constructor(props) {
        super(props);

        modalID += 1;

        const {visible, type, hideCancel} = this.props;

        let defaultObj = {
            type: 'modal',
            iconType: '',
            visible,
            warpClasses: classNames({'isShow': visible}),
            hideCancel: hideCancel || false,
            modalID
        };

        const typeMap = {
            confirm: {
                iconType: 'help'
            },
            info: {
                iconType: 'info',
                hideCancel: true
            },
            success: {
                iconType: 'success',
                hideCancel: true
            },
            error: {
                iconType: 'deleted',
                hideCancel: true
            },
            warning: {
                iconType: 'warn',
                hideCancel: true
            }
        }

        this.Modal = React.createRef();

        Object.assign(defaultObj, type ? typeMap[type] : {})

        this.state = defaultObj;

        if(!destroyArrayFn.includes(this.props.getContainer)) {
            destroyArrayFn.push(this.props.getContainer);
        }
        
        window.addEventListener('keydown', this.escFn);

    }

    static defaultProps = {
        type: 'modal',
        icon: '',
        esc: true,
        visible: false,
        mask: true,
        maskClick: true,
        getContainer: document.querySelector('body'),
        title: '',
        content: '',
        position: 'center',
        okText: '确认',
        cancelText: '取消'
    };

    static confirm(opt = {}) {}

    static info(opt = {}) {}

    static success(opt = {}) {}

    static errro(opt = {}) {}

    static warning(opt = {}) {}

    onDesterAll = () => {
        const {onDesterAll, close} = this.props;

        this.hideWarp();

        onDesterAll && onDesterAll('desterAll');
        close && close();

    }

    hideWarp = () => {
        this.setState({
            warpClasses: ''
        })
    }

    // 点击确认，更新modal中的 visible 状态
    onOk = async e => {
        e.stopPropagation();
        e.preventDefault();
        const {onOk} = this.props;

        let returnOkValue = undefined;
        if (onOk) {
            returnOkValue = await onOk('ok');
        }

        if((onOk && (returnOkValue || returnOkValue === undefined)) || onOk === undefined) {
            this.setState({visible: false});
            destroyFn(this.props.getContainer)
        }
    }

    // 点击取消，更新modal中的 visible 状态
    onCancel = async e => {
        e.stopPropagation();
        e.preventDefault();
        const {onCancel} = this.props;
        const returnCancelValue = await onCancel('cancel');

        if((onCancel && (returnCancelValue || returnCancelValue === undefined)) || onCancel === undefined) {
            this.setState({visible: false});
            destroyFn(this.props.getContainer)
        }
    }

    escFn = e => {
        // e.stopPropagation();
        // e.preventDefault();
        if ((e.keyCode === 27 || e.code === 'Escape') && this.state.visible && this.props.esc) {
            this.onCancel(e);
        }

    }

    // 点击蒙层，更新modal中的 visible 状态
    maskClickHanderl = e => {
        e.stopPropagation();
        e.preventDefault()

        const {maskClick} = this.props;

        if(maskClick) {
            this.onCancel(e);
        }
    }

    renderMask() {
        const mask = this.props.mask;
        const Mask =  mask ? (
            <CSSTransition in={this.state.visible} timeout={300} classNames="mask-fade" unmountOnExit>
                <div key={'mask' + this.state.modalID} className="mask" onClick={this.maskClickHanderl}></div>
            </CSSTransition>
        ) : '';

        return Mask;
    }

    renderCloseBtn() {
        const {type} = this.props;
        const closeBtn = !type ? (
            <div className="modal-close" onClick={this.onCancel}>
                <Icon type="close" />
            </div>
        ) : '';

        return closeBtn;
    }

    renderIcon() {
        const {type, icon} = this.props;
        const IconElement = type === 'modal' ? null : (
            <Icon type={icon ? icon : this.state.iconType} />
        );

        return IconElement;
    }

    renderFooter() {
        const {cancelText, okText, disableOk} = this.props;
        // console.log('renderFooter: ', disableOk)
        const CancelBtn = this.state.hideCancel ? '' : (<Button effect={false} onClick={this.onCancel}>{cancelText}</Button>);
        const OkBtn = <Button effect={false} type="primary" disabled={disableOk} onClick={this.onOk}>{okText}</Button>;

        return (<div className="modal-footer">{CancelBtn}{OkBtn}</div>);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.visible !== prevProps.visible) {
            this.setState({
                visible: this.props.visible,
                warpClasses: 'isShow'
            })
        }
    }

    render() {
        const {
            type, esc, title, content,
            onDesterAll, children,
            icon, getContainer,
            mask, okText, onOk,
            onCancel, cancelText,
            bodyStyle, className,
            visible, confirmLoading,
            close, maskClick, position, ...other} = this.props;

        const classNameString = classNames('modal', {
            'modal-confirm': type === 'confirm',
            'modal-info': type === 'info',
            'modal-success': type === 'success',
            'modal-error': type === 'error',
            'modal-warning': type === 'warning'
        }, className);

        const positionMap = {
            center: 'modal-center',
            top: 'modal-center-top'
        }

        const warpPosition = classNames('modal-warp', positionMap[position], this.state.warpClasses);

        return (
            createPortal(
                <div ref={'warpModal' + this.state.modalID}>
                    <div className={warpPosition}>
                        <CSSTransition
                            in={this.state.visible}
                            timeout={300}
                            appear
                            key={'modal' + this.state.modalID}
                            classNames="modal-zoom"
                            unmountOnExit
                            onExited={() => {
                                this.onDesterAll();
                            }}
                        >
                            <div className={classNameString} {...other}>
                                {this.renderCloseBtn()}
                                <div className="modal-header">
                                    {this.renderIcon()}
                                    <div className="modal-title">
                                        {title}
                                    </div>
                                </div>
                                <div className="modal-content" style={bodyStyle}>
                                    {content}
                                    {children}
                                </div>
                                {this.renderFooter()}

                            </div>
                        </CSSTransition>
                    </div>
                    {this.renderMask()}
                </div>, //塞进传送门的JSX
                getContainer//传送门的另一端DOM node
            )
        );
    }
}

class Adapter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        this.props.el.remove();
        this.setState({
            visible: this.props.visible
        });

    }
    removeConFirmComponent = () => {
        destroyFn(this.props.el);
    }
    render() {
        const {el, visible, close,  ...other} = this.props;
        return (
            <Modal visible={this.state.visible} close={this.removeConFirmComponent} {...other} />
        );
    }
}

Modal.confirm = (opt = {}) => {
    const el = document.createElement('div');
    document.querySelector('body').appendChild(el);

    Object.assign(opt, {
        type: 'confirm',
        maskClick: false,
        visible: true
    })

    render(<Adapter el={el} {...opt} />, el);

    if(!destroyArrayFn.includes(el)) {
        destroyArrayFn.push(el);
    }

    return {
        destroy: function() {
            destroyFn(el);
        }
    }
}

Modal.info = (opt = {}) => {
    const el = document.createElement('div');
    document.querySelector('body').appendChild(el);

    Object.assign(opt, {
        type: 'info',
        maskClick: false,
        visible: true
    });

    if(!destroyArrayFn.includes(el)) {
        destroyArrayFn.push(el);
    }

    render(<Adapter el={el} {...opt} />, el);
    return {
        destroy: function() {
            destroyFn(el);
        }
    }
}

Modal.success = (opt = {}) => {
    const el = document.createElement('div');
    document.querySelector('body').appendChild(el);

    Object.assign(opt, {
        type: 'success',
        maskClick: false,
        visible: true
    })
    if(!destroyArrayFn.includes(el)) {
        destroyArrayFn.push(el);
    }

    render(<Adapter el={el} {...opt} />, el);
    return {
        destroy: function() {
            destroyFn(el);
        }
    }
}

Modal.error = (opt = {}) => {
    const el = document.createElement('div');
    document.querySelector('body').appendChild(el);

    Object.assign(opt, {
        type: 'error',
        maskClick: false,
        visible: true
    })
    if(!destroyArrayFn.includes(el)) {
        destroyArrayFn.push(el);
    }
    render(<Adapter el={el} {...opt} />, el);
    return {
        destroy: function() {
            destroyFn(el);
        }
    }
}

Modal.warning = (opt = {}) => {
    const el = document.createElement('div');
    document.querySelector('body').appendChild(el);

    Object.assign(opt, {
        type: 'warning',
        maskClick: false,
        visible: true
    })
    if(!destroyArrayFn.includes(el)) {
        destroyArrayFn.push(el);
    }
    render(<Adapter el={el} {...opt} />, el);

    return {
        destroy: function() {
            destroyFn(el);
        }
    }
}

Modal.destroyAll = function() {
    if(destroyArrayFn.length > 0) {
        destroyArrayFn.forEach(v => {
            destroyFn(v);
        });

        destroyArrayFn = [];
    }
}

export default Modal;