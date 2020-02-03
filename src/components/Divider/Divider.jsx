import React, {Fragment} from "react";
import './index.scss';

/**
 * Divider分割线
 * props.type 水平还是垂直类型, horizontal、vertical	, def: horizontal
 * props.dashed 是否虚线
 * props.orientation 分割线标题的位置, left、right、center, def: center
 */
class Divider extends React.Component {
    static defaultProps = {
        dashed: false,
        orientation: 'center',
        type: 'horizontal'
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * 获取分割线的class
     */
    getDividerClassName(){
        let {dashed, orientation, type, className, children} = this.props;
        let classType = `divider-${type}`;
        let classOrientation = type==='horizontal' && children?`divider-width-orientation divider-width-${orientation}`: '';
        let classDashed = type==='horizontal' && dashed?`divider-dashed`:'';

        return classNames('divider', classType, classDashed, classOrientation, className);
    }

    /**
     * 获取分割线的style
     */
    getDividerStyle(){
        let result = {};
        let {dashed, orientation, type, style} = this.props;

        result = Object.assign({}, result, style);
        return result
    }

    /**
     * 渲染分割线内容
     */
    renderDividerCont(){
        let {dashed, orientation, type, className, style, children} = this.props;
        let result = <Fragment></Fragment>
        if(children){
            result = <span className="divider-inner-text">{children}</span>;
        }
        return result
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <Fragment>
                <div className={this.getDividerClassName()} style={this.getDividerStyle()}>
                    {this.renderDividerCont()}
                </div>
            </Fragment>
        );
    }
}

export default Divider;