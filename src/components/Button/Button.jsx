import './index.scss';
import Icon from '../Icon/Icon'

// import '../../scss/pageLayout/module.scss';
/**
 * props { type, icon, plain, round, disabled, 各种事件}
 * type: primarg, success, waring, danger, txt 五种按钮类型
 * icon 按钮是否要增加icon
 * plain 是否镂空按钮
 * round 是否圆形按钮
 * disabled 是否禁用
 * loading 是否开启loading状态
 * shape 按钮形状，默认无, 可选circle, round
 * effect 是否开启点击东西，default: true
 */

class Button extends React.PureComponent {
    constructor(props) {
        super(props);
        //设置当前状态
        this.state = {
            btnArr: ['btn']
        }
        //触发按钮必要动画
        this.botton = React.createRef();
        //创建事件：标签名为style
        this.style = document.createElement('style');
    }
    //设置静态块默认属性
    static defaultProps = {
        effect: true
    }

    // 根据组件传递的参数设置组件显示的样式
    setClass(nextProps) {
        //将源对象的值返回到前面目标对象，复制
        let props = Object.assign({}, this.props, nextProps);
        const {type, round, plain, disabled} = props;
        // console.log('setClass: === ', {type, round, plain, disabled})

        this.state.btnArr = ['btn'];
        // 根据按钮type属性，设置按钮显示类别
        if (type == 'primary') {
            this.state.btnArr.push('btn-primary');
        }

        if (type == 'success') {
            this.state.btnArr.push('btn-success');
        }

        if (type == 'waring') {
            this.state.btnArr.push('btn-waring');
        }

        if (type == 'danger') {
            this.state.btnArr.push('btn-danger');
        }

        // 设置按钮的显示是否镂空
        if (plain) {
            this.state.btnArr.push('btn-plain');
        }

        // 设置按钮的显示是否可用
        if (disabled) {
            this.state.btnArr.push('btn-disabled');
        }

        if (type == 'txt') {
            this.state.btnArr.push('btn-txt');
        }
        this.setState({
            btnArr: this.state.btnArr
        })
    }

    renderIcon() {
        const {icon, loading} = this.props;
        let IconNode = '';

        if ('icon' in this.props) {
            IconNode = (
                <Icon type={icon}></Icon>
            )
        }
        if(loading) {
            IconNode = (<Icon type="loading-2" spin></Icon>)
        }

        return IconNode;
    }

    componentDidMount() {
        // this.botton.current.addEventListener('click', this.handleClick, false);
    }

    handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let {effect, type, onClick, disabled, href, target} = this.props;
        const {loading} = this.state;

        if(!disabled) {
            onClick && onClick(event);
            if(href) {
                window.open(href, target || '_self');
            }
        }
        
        if (!effect) {
            return false;
        }

        if (type === 'txt') {
            return false;
        }

        type && this.renderStyle(type);

        if(this.botton.current) {
            this.botton.current.setAttribute('click-animating-without-extra-node', 'true');
            this.botton.current.addEventListener('animationend', this.resetEffect, false)
        }

    }

    resetEffect = (ele) => {
        this.botton.current.setAttribute('click-animating-without-extra-node', 'false');

        this.style.remove();

        this.botton.current.removeEventListener('animationend', (e) => {
            if(e.animationName === 'fadeEffect') {
                this.resetEffect(ele)
            }
        })
    }

    componentWillMount() {
        this.setClass();
    }

    componentDidUpdate(nextProps) {
        this.setClass(nextProps);
    }

    renderStyle(type) {
        switch (type) {
            case 'danger':
                this.style.innerText = `html {--waveEffect: #FF4951};`;
                break;
            case 'waring':
                this.style.innerText = `html {--waveEffect: #FFC602};`;
                break;
            case 'success':
                this.style.innerText = `html {--waveEffect: #2CD7AA};`;
                break;
        }
        document.body.appendChild(this.style);
    }

    render() {
        const {className, children, style, onClick, effect, type, href, target, icon, round, disabled, plain, loading, shape, ...other} = this.props;
        const classNameString = classNames(className, this.state.btnArr.join(' '), {'btn-loading': loading, 'btn-circle': shape === 'circle', 'btn-round': shape ==='round', 'is-only-icon': !children});
        return (
            <React.Fragment>
                <button
                    ref={this.botton}
                    tabIndex={disabled ? '-1' : '0'}
                    type="button"
                    onClick={this.handleClick}
                    className={classNameString}
                    style={style}
                    {...other}
                >
                    {this.renderIcon()}
                    {children ? (<span>{children}</span>) : ''}
                </button>
                {this.state.style}
            </React.Fragment>
        );
    }
}

function Group(props) {
    const {className, children, ...other} = props;

    return (
        <div className={classNames('btn-group', className)} {...other}>
            {children}
        </div>
    );
}

Button.Group = Group;

export default Button;