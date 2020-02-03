import React, {
    Fragment
} from 'react';
import {
    Link
} from 'react-router-dom';
import Menu from '../../../components/Menu/Menu';
import './AppSidebar.scss';
import Icon from '../../../components/Icon/Icon';
import logo from '../../../resouce/logo.png';

import packages from '../../../../package';

const {SubMenu, MenuItemGroup} = Menu;
/**
 * AppSidebar
 * props.disabled 失效状态
 */
class AppSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            defaultSelectedKey: props.location.pathname.slice(1).replace(/\/(\w)/g, function ($0, $1){
                return $1.toUpperCase();
            })
        };
    }

    onOpenChange(keys, key) {
        console.log('sidebar onOpenChange: ', keys, '---', key);
    }

    onSelectedChange(key) {
        console.log('sidebar onSelectedChange: ', key)
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
                <div className="appSidebar-box">
                    <div className="appSidebar-logo">
                        <img src={logo} alt="logo" /> <span style={{display: !this.props.collapsed ? 'block': 'none'}}>SGEXP <span style={{fontSize: 12}}>V{packages.version}</span></span>
                        
                    </div>
                    <Menu
                        // mode={'horizontal'}
                        inlineIndent={20}
                        defaultSelectedKey={this.state.defaultSelectedKey}
                        // defaultOpenKeys={['commonModules']}
                        onOpenChange={this.onOpenChange.bind(this)}
                        inlineCollapsed={this.props.collapsed}
                        onSelectedChange={this.onSelectedChange.bind(this)}
                    >
                        <SubMenu key="commonModules" title={
                            <>
                                <Icon type="color"></Icon>
                                <span>公共模块</span>
                            </>
                        }>
                            <Menu.Item key="commonButton">
                                <Link to="/common/button">Button 按钮</Link>
                            </Menu.Item>
                            <Menu.Item key="commonIcon">
                                <Link to="/common/icon">Icon 图标</Link>
                            </Menu.Item>
                            <Menu.Item key="commonAvatar">
                                <Link to="/common/avatar">Avatar 头像</Link>
                            </Menu.Item>
                            <Menu.Item key="commonDivider">
                                <Link to="/common/divider">Divider 分割线</Link>
                            </Menu.Item>
                            <Menu.Item key="commonCardpager">
                                <Link to="/common/cardpage">Card 卡片</Link>
                            </Menu.Item>
                            <Menu.Item key="BreadcrumbPage">
                                <Link to="/common/breadcrumbpage">Breadcrumb 面包屑</Link>
                            </Menu.Item>
                            <Menu.Item key="commonLayout">
                                <Link to="/common/Layoutpage">Layout 布局</Link>
                            </Menu.Item>
                            <Menu.Item key="commonMenu">
                                <Link to="/common/menu">Menu 菜单</Link>
                            </Menu.Item>
                            <Menu.Item key="commonDatePicker">
                                <Link to="/common/date-picker">DatePicker 日期选择器</Link>
                            </Menu.Item>
                            <Menu.Item key="commonCheckboxRadio">
                                <Link to="/common/checkbox-radio">Checkbox Radio 多选/单选</Link>
                            </Menu.Item>
                            <Menu.Item key="commonInput">
                                <Link to="/common/input">Input 输入框</Link>
                            </Menu.Item>
                            <Menu.Item key="TablePage">
                                <Link to="/common/TablePage">Table 表格</Link>
                            </Menu.Item>
                            <Menu.Item key="commonDropdown">
                                <Link to="/common/dropdown">Dropdown 下拉菜单</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTabs">
                                <Link to="/common/tabs">Tabs 标签页</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTree">
                                <Link to="/common/tree">Tree 树形控件</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTooltip">
                                <Link to="/common/tooltip">Tooltip 文字提示</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTextType">
                                <Link to="/common/textType">TextType 文字样式</Link>
                            </Menu.Item>
                            <Menu.Item key="commonModal">
                                <Link to="/common/modal">Modal 对话框</Link>
                            </Menu.Item>
                            <Menu.Item key="commonSelect">
                                <Link to="/common/SelectPage">Select 下拉选择框</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTreeselect">
                                <Link to="/common/Treeselect">TreeSelect 树形下拉选择框</Link>
                            </Menu.Item>
                            <Menu.Item key="cascader">
                                <Link to="/common/CascaderPage">Cascader联级下拉</Link>
                            </Menu.Item>
                            <Menu.Item key="commonUpload">
                                <Link to="/common/UploadPage">Upload 上传</Link>
                            </Menu.Item>
                            <Menu.Item key="commonForm">
                                <Link to="/common/FormPage">Form 表单</Link>
                            </Menu.Item>
                            <Menu.Item key="pagination">
                                <Link to="/common/PaginationTest">分页组件</Link>
                            </Menu.Item>
                            <Menu.Item key="commonSwitch">
                                <Link to="/common/switch">Switch 开关</Link>
                            </Menu.Item>
                            <Menu.Item key="commonProgress">
                                <Link to="/common/progress">Progress 进度条</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTransfer">
                                <Link to="/common/transfer">TransferPage 穿梭框</Link>
                            </Menu.Item>
                            <Menu.Item key="commonToast">
                                <Link to="/common/toast">ToastPage 提示</Link>
                            </Menu.Item>
                            <Menu.Item key="commonTag">
                                <Link to="/common/tag">TagPage 标签</Link>
                            </Menu.Item>
                            {/*<Menu.Item key="table">*/}
                            {/*    <Link to="/common/TableTest">table组件</Link>*/}
                            {/*</Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="demo" title={
                            <span>
                                <Icon type="app-list"></Icon>
                                <span>DEMO页</span>
                            </span>
                        }>
                            <Menu.Item key="tableDemo">
                                <Link to="/table/Demo"> table组件Demo</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="exceptionPage" title={<span>
                            <Icon type="warn"></Icon>
                            <span>异常页</span>
                        </span>}>
                            <Menu.Item key="exception403">
                                <Link to="/exception/403">403无权访问</Link>
                            </Menu.Item>
                            <Menu.Item key="exception404">
                                <Link to="/exception/404">404访问的页面不存在</Link>
                            </Menu.Item>
                            <Menu.Item key="exception500">
                                <Link to="/exception/500">500服务器出错了</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="formPage" title={<>
                            <Icon type="table"></Icon>
                            <span>表单页</span>
                        </>}>
                            <Menu.Item key="formBasic">
                                <Link to="/common/FormPage">Form 表单</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="resultPage" title={<>
                            <Icon type="detail"></Icon>
                            <span>结果页</span>
                        </>}>
                            <Menu.Item key="resultSuccess">
                                <Link to="/result/success">成功页</Link>
                            </Menu.Item>
                            <Menu.Item key="resultFail">
                                <Link to="/result/fail">失败页</Link>
                            </Menu.Item>
                            <Menu.Item key="resultCommitting">
                                <Link to="/result/committing">提交中</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="listPage" title={<>
                            <Icon type="table"></Icon>
                            <span>列表页</span>
                        </>}>
                            <Menu.Item key="listTableList">
                                <Link to="/list/table-list">查询表格</Link>
                            </Menu.Item>
                            <Menu.Item key="listBasicList">
                                <Link to="/list/basic-list">标准列表</Link>
                            </Menu.Item>
                            <Menu.Item key="listCardList">
                                <Link to="/list/card-list">卡片列表</Link>
                            </Menu.Item>
                            {/* <Menu.Item key="listArticles">
                                <Link to="/list/articles">搜索列表（文章）</Link>
                            </Menu.Item> */}
                            <Menu.Item key="listProducts">
                                <Link to="/list/products">搜索列表（项目）</Link>
                            </Menu.Item>
                            <Menu.Item key="listApps">
                                <Link to="/list/apps">搜索列表（应用）</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="userPage" title={<>
                            <Icon type="personal"></Icon>
                            <span>个人页</span>
                        </>}>
                            {/* <Menu.Item key="userUserInfo">
                                <Link to="/user/userInfo">个人中心</Link>
                            </Menu.Item> */}
                            <Menu.Item key="userUserSet">
                                <Link to="/user/userSet">用户设置</Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </div>
            </Fragment>
        );
    }
}

export default AppSidebar;
