import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import './index.scss'

class Tag extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: true,
            defaultProps: 'base'
        }
    }
    static getDerivedStateFromProps(nextProps) {
        if ('visible' in nextProps) {
            return {
                visible: nextProps.visible
            };
        }
        return null;
    }
    getStyle(){
        const {color, style} = this.props
        const isPresetColor = this.isPresetColor();
        return {
            // backgroundColor: isPresetColor ? color : undefined,
            ...style
        }
    }
    getTagClassName(){
        const {className, color, type} = this.props
        const {visible, defaultProps} = this.state
        const colorType = type || defaultProps
        return classNames(
            {
                'sc-tag': true,
                [`sc-tag-${colorType}`]: true,
                'sc-tag-hidden': !visible,
                className
            }
        )
    }
    isPresetColor() {
        const {color} = this.props;
        if (!color) {
            return false;
        }else{
            true
        }
    }
    setVisible(visible, e){
        const {onClose} = this.props
        if(onClose){
            onClose(e)
        }
        // if (e.defaultPrevented) {
        //     return;
        // }
        console.log(this.props)
        if(!('visible' in this.props)){
            this.setState({visible})
        }
    }
    handleIconClick= (e) => {
        
        this.setVisible(false, e)
    }
    renderCloseIcon(){
        const {closeable} = this.props
        return closeable ? <Icon type="close" className='sc-tag-close' onClick={this.handleIconClick}/> : null
    }
    renderTag = () => {
        const {children} = this.props
        return (
            <span
                className={this.getTagClassName()}
                style={this.getStyle()}
            >
                {children}
                {this.renderCloseIcon()}
            </span>
        )
    }
    render(){
        return  <React.Fragment>{this.renderTag()}</React.Fragment>
    }
}
export default Tag;