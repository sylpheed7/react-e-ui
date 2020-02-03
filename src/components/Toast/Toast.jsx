import {Component, PureComponent} from 'react'
import {createPortal, render, unmountComponentAtNode} from "react-dom";
import './index.scss'
import Icon from '../Icon/Icon'
import {CSSTransition} from "react-transition-group";

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

let toastID = 0;

let destroyArrayFn = [];

function destroyFn(ele) {
    unmountComponentAtNode(ele);
}

class Toast extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            type: props.type
        }

        this.key = this.getNoticeKey();
        this.Toast = React.createRef();
    }

    getNoticeKey() {
        return `toast-${new Date().getTime()}-${toastID += 1}`
    }

    componentDidMount() {
        const {duration, onClose, type} = this.props;

        if (duration > 0) {
            setTimeout(() => {
                this.setState({
                    visible: false
                }, () => {
                    onClose && onClose(type);
                })
            }, duration)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.visible !== prevProps.visible) {
            this.setState({
                visible: this.props.visible
            })
        }
    }

    render() {
        const {getContainer = document.body, className, visible, content, duration, onClose, type, key = this.key, icon, close, ...other} = this.props;

        let classObj = {
            'toast-loading': type === 'loading',
            'toast-success': type === 'success',
            'toast-error': type === 'error',
            'toast-warn': type === 'waring'
        };

        let iconType;

        switch (type) {
            case 'success':
                iconType = 'success';
                break;
            case 'error':
                iconType = 'deleted';
                break;
            case 'loading':
                iconType = 'loading-2';
                break;
            default:
                iconType = 'infoed';
        }

        console.log(this.Toast)

        // let top = (toastID * 30) + this.Toast.current.offsetHeight;

        return createPortal(

            <CSSTransition
                key={key}
                in={this.state.visible}
                timeout={200}
                appear
                classNames="toast"
                unmountOnExit
                onExited={() => {
                    close && close();
                }}
            >
                <div ref={this.Toast} className={classNames('toast', classObj, className)} style={{top}} {...other}>
                    <div className='toast-body'>
                        {icon ? icon : <Icon type={iconType} spin={type === 'loading'}></Icon>}{content}
                    </div>
                </div>
            </CSSTransition>
            , getContainer);
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
    removeToastComponent = () => {
        destroyFn(this.props.el);
    }
    render() {
        const {el, visible, ...other} = this.props;
        return (
            <Toast visible={this.state.visible} close={this.removeToastComponent} {...other} />
        );
    }
}

function baseComponent(type, contents = '') {

    return function (content = contents, duration = 2000, onClose) {
        const el = document.createElement('div');
        document.querySelector('body').appendChild(el);

        let opt = {
            visible: true,
            type,
            content,
            onClose,
            duration: type === 'loading' ? 0 : duration
        };

        if (Object.prototype.toString.call(contents) === '[object Object]') {
            opt = Object.assign(opt, contents);
        }

        render(<Adapter el={el} {...opt} />, el);

        return {
            destroy: function () {
                destroyFn(el);
            }
        }
    }
}

const info = baseComponent('info');
const success = baseComponent('success', '成功');
const error = baseComponent('error');
const waring = baseComponent('waring', '警告');
const loading = baseComponent('loading', '加载中...');


export default {
    info,
    success,
    error,
    waring,
    loading
}