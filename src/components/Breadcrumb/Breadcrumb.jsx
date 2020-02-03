import React, {Component} from 'react';
import "./index.scss";

//设置面包屑模块
class Breadcrumb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: Array.isArray(this.props.children) ? this.props.children : [this.props.children]
        };
    }
    /*组装html结构*/
    render() {
        return (
            /*添加样式*/
            <div className={classNames(this.props.className, 'breadcrumb-box')} style={this.props.style}>
                {/*？？？？？？？*/}
                {this.state.items.map((v, i) => {
                    return (
                        <span key={v + i}>
                            {v}
                            <span className="breadcrumb-separator">
                                {this.state.items.length > (i + 1) && this.props.separator}
                            </span>
                        </span>
                    );
                })}
            </div>
        );
    }
}
/*输出选项标题的内容*/
const Item = (props) => (
    <span className="breadcrumb-link">{props.children}</span>
);

Breadcrumb.Item = Item;
/*定义模块的对外接口，输出默认函数*/
export default Breadcrumb;
