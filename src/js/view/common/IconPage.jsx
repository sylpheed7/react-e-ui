import React from 'react';
import Card from '../../../components/Card/Card';
import ContentHead from '../../../components/ContentHead/ContentHead';
import '../../../scss/pageLayout/icon.scss';
import Icon from '../../../components/Icon/Icon';
/*IconPage继承React.Component所有属性和方法*/
class IconPage extends React.Component {
    /*构造函数方法*/
    constructor() {
        /*父类的实例。子类必须在constructor方法中调用surper，否则新建实例时会报错*/
        super();
    }
    /*组装生成组件的HTML结构*/
    render() {
        return (
            /*作为顶级标签来包裹子标签，编译后消失*/
            <React.Fragment>
                {/*设置标题*/}
                <ContentHead title="Icon 图标"></ContentHead>
                <Card cardHeadTit='图标集合'>
                    {/*设置每个图表样式和名字*/}
                    <div className="icon-list">
                        <ul>
                            <li>
                                <Icon type="detail"></Icon>
                                <p className="icon-name">detail</p>
                            </li>
                            <li>
                                <Icon type="help"></Icon>
                                <p className="icon-name">help</p>
                            </li>
                            <li>
                                <Icon type="edit"></Icon>
                                <p className="icon-name">edit</p>
                            </li>
                            <li>
                                <Icon type="location"></Icon>
                                <p className="icon-name">location</p>
                            </li>
                            <li>
                                <Icon type="share"></Icon>
                                <p className="icon-name">share</p>
                            </li>
                            <li>
                                <Icon type="like"></Icon>
                                <p className="icon-name">like</p>
                            </li>
                            <li>
                                <Icon type="personal"></Icon>
                                <p className="icon-name">personal</p>
                            </li>
                            <li>
                                <Icon type="personal-2"></Icon>
                                <p className="icon-name">personal-2</p>
                            </li>
                            <li>
                                <Icon type="personal-setting"></Icon>
                                <p className="icon-name">personal-setting</p>
                            </li>
                            <li>
                                <Icon type="close"></Icon>
                                <p className="icon-name">close</p>
                            </li>
                            <li>
                                <Icon type="close-2"></Icon>
                                <p className="icon-name">close-2</p>
                            </li>
                            <li>
                                <Icon type="all-app"></Icon>
                                <p className="icon-name">all-app</p>
                            </li>
                            <li>
                                <Icon type="app"></Icon>
                                <p className="icon-name">app</p>
                            </li>
                            <li>
                                <Icon type="app-list"></Icon>
                                <p className="icon-name">app-list</p>
                            </li>
                            <li>
                                <Icon type="left"></Icon>
                                <p className="icon-name">left</p>
                            </li>
                            <li>
                                <Icon type="right"></Icon>
                                <p className="icon-name">right</p>
                            </li>
                            <li>
                                <Icon type="up"></Icon>
                                <p className="icon-name">up</p>
                            </li>
                            <li>
                                <Icon type="down"></Icon>
                                <p className="icon-name">down</p>
                            </li>
                            <li>
                                <Icon type="left-arrow-calendar"></Icon>
                                <p className="icon-name">left-arrow-calendar</p>
                            </li>
                            <li>
                                <Icon type="right-arrow-calendar"></Icon>
                                <p className="icon-name">right-arrow-calendar</p>
                            </li>
                            <li>
                                <Icon type="left-arrows"></Icon>
                                <p className="icon-name">left-arrows</p>
                            </li>
                            <li>
                                <Icon type="right-arrows"></Icon>
                                <p className="icon-name">right-arrows</p>
                            </li>
                            <li>
                                <Icon type="left-arrow"></Icon>
                                <p className="icon-name">left-arrow</p>
                            </li>
                            <li>
                                <Icon type="right-arrow"></Icon>
                                <p className="icon-name">right-arrow</p>
                            </li>
                            <li>
                                <Icon type="up-arrow"></Icon>
                                <p className="icon-name">up-arrow</p>
                            </li>
                            <li>
                                <Icon type="down-arrow"></Icon>
                                <p className="icon-name">down-arrow</p>
                            </li>
                            <li>
                                <Icon type="sort"></Icon>
                                <p className="icon-name">sort</p>
                            </li>
                            <li>
                                <Icon type="sort-up"></Icon>
                                <p className="icon-name">sort-up</p>
                            </li>
                            <li>
                                <Icon type="sort-down"></Icon>
                                <p className="icon-name">sort-down</p>
                            </li>
                            <li>
                                <Icon type="upload"></Icon>
                                <p className="icon-name">upload</p>
                            </li>
                            <li>
                                <Icon type="download"></Icon>
                                <p className="icon-name">download</p>
                            </li>
                            <li>
                                <Icon type="bookmarks"></Icon>
                                <p className="icon-name">bookmarks</p>
                            </li>
                            <li>
                                <Icon type="bookmarksed"></Icon>
                                <p className="icon-name">bookmarksed</p>
                            </li>
                            <li>
                                <Icon type="delete"></Icon>
                                <p className="icon-name">delete</p>
                            </li>
                            <li>
                                <Icon type="deleted"></Icon>
                                <p className="icon-name">deleted</p>
                            </li>
                            <li>
                                <Icon type="add"></Icon>
                                <p className="icon-name">add</p>
                            </li>
                            <li>
                                <Icon type="minus"></Icon>
                                <p className="icon-name">minus</p>
                            </li>
                            <li>
                                <Icon type="add-2"></Icon>
                                <p className="icon-name">add-2</p>
                            </li>
                            <li>
                                <Icon type="minus-2"></Icon>
                                <p className="icon-name">minus-2</p>
                            </li>
                            <li>
                                <Icon type="success-2"></Icon>
                                <p className="icon-name">success-2</p>
                            </li>
                            <li>
                                <Icon type="success"></Icon>
                                <p className="icon-name">success</p>
                            </li>
                            <li>
                                <Icon type="info"></Icon>
                                <p className="icon-name">info</p>
                            </li>
                            <li>
                                <Icon type="infoed"></Icon>
                                <p className="icon-name">infoed</p>
                            </li>
                            <li>
                                <Icon type="zoomin"></Icon>
                                <p className="icon-name">zoomin</p>
                            </li>
                            <li>
                                <Icon type="zoom"></Icon>
                                <p className="icon-name">zoom</p>
                            </li>
                            <li>
                                <Icon type="right-align"></Icon>
                                <p className="icon-name">right-align</p>
                            </li>
                            <li>
                                <Icon type="left-align"></Icon>
                                <p className="icon-name">left-align</p>
                            </li>
                            <li>
                                <Icon type="setting"></Icon>
                                <p className="icon-name">setting</p>
                            </li>
                            <li>
                                <Icon type="calendar"></Icon>
                                <p className="icon-name">calendar</p>
                            </li>
                            <li>
                                <Icon type="organization"></Icon>
                                <p className="icon-name">organization</p>
                            </li>
                            <li>
                                <Icon type="check"></Icon>
                                <p className="icon-name">check</p>
                            </li>
                            <li>
                                <Icon type="message"></Icon>
                                <p className="icon-name">message</p>
                            </li>
                            <li>
                                <Icon type="tag"></Icon>
                                <p className="icon-name">tag</p>
                            </li>
                            <li>
                                <Icon type="shutdown"></Icon>
                                <p className="icon-name">shutdown</p>
                            </li>
                            <li>
                                <Icon type="color"></Icon>
                                <p className="icon-name">color</p>
                            </li>
                            <li>
                                <Icon type="dropdown"></Icon>
                                <p className="icon-name">dropdown</p>
                            </li>
                            <li>
                                <Icon type="notice"></Icon>
                                <p className="icon-name">notice</p>
                            </li>
                            <li>
                                <Icon type="printer"></Icon>
                                <p className="icon-name">printer</p>
                            </li>
                            <li>
                                <Icon type="global"></Icon>
                                <p className="icon-name">global</p>
                            </li>
                            <li>
                                <Icon type="warn"></Icon>
                                <p className="icon-name">warn</p>
                            </li>
                            <li>
                                <Icon type="echart"></Icon>
                                <p className="icon-name">echart</p>
                            </li>
                            <li>
                                <Icon type="search"></Icon>
                                <p className="icon-name">search</p>
                            </li>
                            <li>
                                <Icon type="more"></Icon>
                                <p className="icon-name">more</p>
                            </li>
                            <li>
                                <Icon type="comment"></Icon>
                                <p className="icon-name">comment</p>
                            </li>
                            <li>
                                <Icon type="history"></Icon>
                                <p className="icon-name">history</p>
                            </li>
                            <li>
                                <Icon type="menu"></Icon>
                                <p className="icon-name">menu</p>
                            </li>
                            <li>
                                <Icon type="menu-2"></Icon>
                                <p className="icon-name">menu-2</p>
                            </li>
                            <li>
                                <Icon type="redo" spin></Icon>
                                <p className="icon-name">redo</p>
                            </li>
                            <li>
                                <Icon type="loading-2" spin></Icon>
                                <p className="icon-name">loading-2</p>
                            </li>
                            <li>
                                <Icon type="ashcan"></Icon>
                                <p className="icon-name">ashcan</p>
                            </li>
                            {/*component 自定义icon图标，type不生效*/}
                            <li>
                                <Icon component={(<a>aaaaa</a>)} />
                                <p>自定义icon图标</p>
                            </li>
                        </ul>
                    </div>
                    {/*添加图标注释*/}
                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                * type icon 类型<br />
                                * className class<br />
                                * style 行内样式<br />
                                * rotate 旋转多少度<br />
                                * spin 是否开启旋转动画<br />
                                * component 自定义icon图标，type不生效<br />
                                * 支持所有React事件
                            </div>
                            <pre>{`
<Icon type="loading-2" />
<Icon type="loading-2" spin />
<Icon component={(<a>aaaaa</a>)} />
                                `}</pre>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}
/*定义模块的对外接口，输出默认函数*/
export default IconPage;