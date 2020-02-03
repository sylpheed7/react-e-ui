import React, {Fragment} from "react";
import Icon from "../Icon/Icon";
import './index.scss';

/**
 * Avatar 头像
 * props.icon 设置头像的图标类型，参考 Icon 组件
 * props.shape 指定头像的形状，Enum{ 'circle', 'square' }， def：circle
 * props.size 设置头像的大小，number | Enum{ 'large', 'small', 'default' }    ， def：default
 * props.src 图片类头像的资源地址
 */
class Avatar extends React.Component {
    static defaultProps = {
        shape: 'circle',
        size: 'default',
        icon: undefined,
        src: undefined
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * 获取头像的class
     */
    getAvatarClassName() {
        let {shape, size, className} = this.props;
        let classShape = `avatar-${shape}`;
        // let classSize = ['large', 'small', 'default' ].includes(size) ? `avatar-${shape}` : '';

        return classNames('avatar', classShape, className);
    }

    /**
     * 获取头像的style
     */
    getAvatarStyle() {
        let result = {};
        let {size, style} = this.props;

        switch (size) {
            case 'large':
                result = {
                    width: '40px',
                    height: '40px',
                    lineHeight: '40px'
                };
                break;
            case 'small':
                result = {
                    width: '24px',
                    height: '24px',
                    lineHeight: '24px'
                };
                break;
            case 'default':
                result = {
                    width: '32px',
                    height: '32px',
                    lineHeight: '32px'
                };
                break;
            default:
                result = {
                    width: `${size}px`,
                    height: `${size}px`,
                    lineHeight: `${size}px`
                };
                break
        }

        result = Object.assign({}, result, style, undefined);
        return result
    }

    /**
     * 渲染头像内容
     */
    renderAvatarCont() {
        let {size, icon, src, children} = this.props;
        console.log('children: ', children)

        let iconSize = '16px';
        switch (size) {
            case 'large':
                iconSize = '20px';
                break;
            case 'small':
                iconSize = '12px';
                break;
            case 'default':
                iconSize = '16px';
                break;
            default:
                iconSize = `${size / 2}px`;
                break
        }

        if (icon) {
            // icon-geren
            let result = <Icon type={icon} style={{fontSize: iconSize}}/>;
            return result;
        } else if (src) {
            // https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png
            let result = <img src={src}/>
            return result;
        } else {
            return children;
        }
    }

    render() {
        return (
            <Fragment>
                <span className={this.getAvatarClassName()} style={this.getAvatarStyle()}>
                    {/*{children}*/}
                    {this.renderAvatarCont()}
                </span>
            </Fragment>
        );
    }
}

export default Avatar;