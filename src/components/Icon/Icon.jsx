import './index.scss';
/*设置属性值，输出默认函数*/
export default function (props) {
    const {type, className, spin, component, rotate, style = {}, children, ...other} = props;
    /*设置样式：旋转度数*/
    const styles = Object.assign(style, {transform: 'rotate(' + rotate + 'deg)'});
    /*判断是否为自定义图标*/
    const classType = component ? '' : 'icon-' + type;
    /*输出定义样式*/
    return (
        <i style={styles} className={classNames('icon', classType, className, {'icon-rotate': spin})} {...other}>
            {
                component ? component : props.children
            }
        </i>
    );
}