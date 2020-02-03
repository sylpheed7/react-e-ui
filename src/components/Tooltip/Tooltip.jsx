import './index.scss';

import {CSSTransition} from "react-transition-group";

/**
 * Tooltip              组件所传属性描述
 * arrowPointAtCenter   {boolean} 是否箭头指向中心
 * placement            {string} Tooltip位置-class名
 * title                {string} Tooltip内容
 * mouseEnterDelay      {number} 鼠标移入后延时多少才显示Tootip，单位秒。默认值0.1秒
 * mouseLeaveDelay      {number} 鼠标移出后延时多少才隐藏Tootip，单位秒。默认值0.1秒
 * trigger              {string} 触发行为，可选hover/focus/click/contentMenu，默认hover
 * visible              {boolean} 是否显示，默认为false
 * onVisibleChange      {function} (visiable) => void
 */

class Tooltip extends React.PureComponent {
    static defaultProps = {
        title: 'Tooltip',
        arrowPointAtCenter: false,
        placement: 'top',
        visible: false,
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1
    }
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible,
            trigger: props.trigger,
            tooltipsStyleLeft: '',
            tooltipsStyleTop: ''
        }
        this.tooltipBox = React.createRef();
        this.tooltip = React.createRef();
    }


    handleShow = (e) => {
        e.stopPropagation();
        this.setState({
            visible: true
        }, () => {
            this.props.onVisibleChange && this.props.onVisibleChange(this.state.visible);
        });
    }

    handleHide = (e) => {
        e.stopPropagation();
        this.setState({
            visible: false
        }, () => {
            this.props.onVisibleChange && this.props.onVisibleChange(this.state.visible);
        });
    }

    transitionCB = () => {
        const {placement, arrowPointAtCenter} = this.props;

        const $tooltipsBox = this.tooltipBox.current;
        const $tooltips = this.tooltip.current;
        const boxWidth = $tooltipsBox.offsetWidth;
        const boxHeight = $tooltipsBox.offsetHeight;
        const width = $tooltips.offsetWidth;
        const height = $tooltips.offsetHeight;

        let t = '', l = '';

        (placement === 'top' || placement === 'bottom') && (l = (boxWidth / 2) - (width / 2));
        (placement === 'left' || placement === 'right') && (t = (boxHeight / 2) - (height / 2));

        arrowPointAtCenter && (l = (boxWidth / 2), l -= 9);

        // console.log(l)

        this.setState({
            tooltipsStyleLeft: l,
            tooltipsStyleTop: t
        })
    }

    render() {
        const {className} = this.props;
        const {trigger, visible, mouseEnterDelay, tooltipsStyleLeft} = this.state;
        return (
            <div
                className={classNames('tooltip-area', className)}
                tabIndex="0"
                ref={this.tooltipBox}
                onMouseEnter={e => {
                    trigger === 'hover' && this.handleShow(e)
                }}
                onMouseLeave={e => {
                    trigger === 'hover' && this.handleHide(e)
                }}
                onClick={e => {
                    trigger === 'click' && this.handleShow(e)
                }}
                onFocus={e => {
                    trigger === 'focus' && this.handleShow(e)
                }}
                onContextMenu={e => {
                    trigger === 'contextmenu' && this.handleShow(e)
                }}
                onBlur={e => {
                    (trigger === 'click' || trigger === 'focus') && this.handleHide(e)
                }}
            >
                <CSSTransition
                    in={this.state.visible}
                    timeout={200}
                    appear
                    classNames="tips-up"
                    unmountOnExit
                    onEnter={this.transitionCB}
                >
                    <div
                        ref={this.tooltip}
                        style={{left: this.state.tooltipsStyleLeft, top: this.state.tooltipsStyleTop}}
                        className={classNames('tooltip-content-box', this.props.placement)}
                    >   
                        <div className="tooltip-body">
                            {this.props.title}
                        </div>
                        <div className="arrow"></div>
                    </div>
                </CSSTransition>
                {this.props.children}
            </div>
        );
    }
}

export default Tooltip;