import React, {Fragment} from "react";
import './index.scss';

/**
 * Collapse折叠面板
 * props.type 水平还是垂直类型, horizontal、vertical	, def: horizontal
 * props.dashed 是否虚线
 * props.orientation 折叠面板标题的位置, left、right、center, def: center
 */
class Collapse extends React.Component {
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
     * 获取折叠面板的class
     */
    getCollapseClassName() {
        let {dashed, orientation, type, className, children} = this.props;
        let classType = `divider-${type}`;
        let classOrientation = type === 'horizontal' && children ? `divider-width-orientation divider-width-${orientation}` : '';
        let classDashed = type === 'horizontal' && dashed ? `divider-dashed` : '';

        return classNames('divider', classType, classDashed, classOrientation, className);
    }

    /**
     * 获取折叠面板的style
     */
    getCollapseStyle() {
        let result = {};
        let {dashed, orientation, type, style} = this.props;

        result = Object.assign({}, result, style);
        return result
    }

    /**
     * 渲染折叠面板内容
     */
    renderCollapseCont() {
        let {dashed, orientation, type, className, style, children} = this.props;
        let result = <Fragment></Fragment>
        if (children) {
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
                <div className="ant-collapse ant-collapse-icon-position-left">
                    <div className="ant-collapse-item ant-collapse-item-active">
                        <div className="ant-collapse-header" role="button" tabIndex="0" aria-expanded="true"><i
                            aria-label="图标: right" className="anticon anticon-right ant-collapse-arrow">
                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true" style="transform: rotate(90deg);">
                                <path
                                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                            </svg>
                        </i>This is panel header 1
                        </div>
                        <div className="ant-collapse-content ant-collapse-content-active" style="">
                            <div className="ant-collapse-content-box"><p>
                                A dog is a type of domesticated animal.
                                Known for its loyalty and faithfulness,
                                it can be found as a welcome guest in many households across the world.
                            </p></div>
                        </div>
                    </div>
                    <div className="ant-collapse-item ant-collapse-item-active">
                        <div className="ant-collapse-header" role="button" tabIndex="0" aria-expanded="true"><i
                            aria-label="图标: right" className="anticon anticon-right ant-collapse-arrow">
                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true" style="transform: rotate(90deg);">
                                <path
                                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                            </svg>
                        </i>This is panel header 2
                        </div>
                        <div className="ant-collapse-content ant-collapse-content-active" style="">
                            <div className="ant-collapse-content-box"><p>
                                A dog is a type of domesticated animal.
                                Known for its loyalty and faithfulness,
                                it can be found as a welcome guest in many households across the world.
                            </p></div>
                        </div>
                    </div>
                    <div className="ant-collapse-item ant-collapse-item-disabled">
                        <div className="ant-collapse-header" role="button" tabIndex="-1" aria-expanded="false"><i
                            aria-label="图标: right" className="anticon anticon-right ant-collapse-arrow">
                            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em"
                                height="1em" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                            </svg>
                        </i>This is panel header 3
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Collapse;