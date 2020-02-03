import './index.scss'

class Switch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checked: props.defaultChecked || false
        }
    }
    onChange = (e) => {
        console.log(e)
        this.setState({
            checked: !this.state.checked
        }, () => {
            this.props.onChange && this.props.onChange(this.state.checked)
        });
    }
    render(){
        const {disabled, className, ...other} = this.props;

        const classNameStr = classNames('switch', {
            'disabled': disabled,
            "switch-unchecked": !this.state.checked
        });
        return (
            

            <label className={classNameStr} {...other}>
                <input className='swith-input' type="checkbox" disabled={disabled || false} checked={this.state.checked} value={this.state.checked} onChange={this.onChange} />
            </label>
           
        )
    }
}
export default Switch;