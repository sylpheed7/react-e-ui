import React, {
    Fragment
} from 'react';

import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Card from "../../../components/Card/Card";
import {
    Link
} from 'react-router-dom';
import Menu from '../../../components/Menu/Menu';
import Icon from "../../../components/Icon/Icon";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Radio from "../../../components/Radio/Radio";

const CheckBoxGroup = CheckBox.CheckBoxGroup;
const RadioGroup = Radio.RadioGroup;

console.log(Menu)
const {SubMenu, MenuItemGroup} = Menu;

/**
 * MenuPage
 * props.disabled 失效状态
 */
class MenuPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuBtnData: {
                disable: false,
                options: [
                    {label: "展开", value: true},
                    {label: "收起", value: false}
                ],
                value: false
            },
            showCode: {
                horizontal: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                inline: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                },
                vertical: {
                    disable: false,
                    options: [
                        {label: "显示代码", value: true},
                        {label: "隐藏代码", value: false}
                    ],
                    value: false
                }
            }
        };
    }

    radioGroupBtnChange(val, ele){
        this.state.menuBtnData.value = val;
        this.setState({
            menuBtnData: this.state.menuBtnData
        });
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
                <ContentHead title="菜单" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="菜单 horizontal（水平）">
                            <div>
                                <Menu
                                    mode={'horizontal'}
                                    defaultSelectedKey="option1"
                                    defaultOpenKeys={[]}
                                >
                                    <Menu.Item key="option1">
                                        <Icon type="table"></Icon>
                                        <span>Option 1</span>
                                    </Menu.Item>
                                    <Menu.Item key="option2">
                                        <Icon type="table"></Icon>
                                        <span>Option 2</span>
                                    </Menu.Item>
                                    <SubMenu
                                        key="Navigation-1"
                                        title={(
                                            <>
                                                <Icon type="color"></Icon>
                                                <span>Navigation 1</span>
                                            </>
                                        )}
                                    >
                                        <MenuItemGroup key="group1" title="group 1">
                                            <Menu.Item key="option1-1">Option 1-1</Menu.Item>
                                            <Menu.Item key="option1-2">Option 1-2</Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup key="group2" title="group 2">
                                            <Menu.Item key="option2-1">Option 2-1</Menu.Item>
                                            <Menu.Item key="option2-2">Option 2-1</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                    <SubMenu
                                        key="Navigation-2"
                                        title={(
                                            <>
                                                <Icon type="table"></Icon>
                                                <span>Navigation 2</span>
                                            </>
                                        )}
                                    >
                                        <Menu.Item key="5">Option 3</Menu.Item>
                                        <Menu.Item key="6">Option 4</Menu.Item>
                                        <SubMenu key="SubMenu3" title="Submenu">
                                            <Menu.Item key="option-sub-3-1">Option sub 3-1</Menu.Item>
                                            <Menu.Item key="option-sub-3-2">Option sub 3-2</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>

                                </Menu>
                            </div>


                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={this.state.showCode.horizontal.options}
                                    value={this.state.showCode.horizontal.value}
                                    onChange={(val, ele)=>{
                                        this.state.showCode.horizontal.value = val;
                                        this.setState({
                                            showCode: this.state.showCode
                                        });
                                    }}
                                    button
                                ></RadioGroup>
                                <div className={'code-demo-content'} style={{display: this.state.showCode.horizontal.value?'block':'none'}}>
                                    <div className={'code-demo-describe'}>
                                        * mode: 菜单类型，现在支持垂直、水平、和内嵌模式三种 --- string: vertical horizontal inline, def:inline<br/>
                                        * defaultOpenKeys: 初始展开的 SubMenu 菜单项 key 数组<br/>
                                        * defaultSelectedKeys: 初始选中的菜单项 key 数组<br/>
                                        * onOpenChange: SubMenu 展开/关闭的回调<br/>
                                        * onSelectedChange: 点击 MenuItem 调用此函数
                                    </div>

                                    <pre>
                                        {
                                            `<Menu
    mode={'horizontal'}
    defaultSelectedKey="option1"
    defaultOpenKeys={[]}
>
    <Menu.Item key="option1">
        <Icon type="table"></Icon>
        Option 1
    </Menu.Item>
    <Menu.Item key="option2">
        <Icon type="table"></Icon>
        Option 2
    </Menu.Item>
    <SubMenu
        key="Navigation-1"
        title={(
            <span>
                <Icon type="table"></Icon>
                <span>Navigation 1</span>
            </span>
        )}
    >
        <MenuItemGroup key="group1" title="group 1">
            <Menu.Item key="option1-1">Option 1-1</Menu.Item>
            <Menu.Item key="option1-2">Option 1-2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup key="group2" title="group 2">
            <Menu.Item key="option2-1">Option 2-1</Menu.Item>
            <Menu.Item key="option2-2">Option 2-1</Menu.Item>
        </MenuItemGroup>
    </SubMenu>
    <SubMenu
        key="Navigation-2"
        title={(
            <span>
                <Icon type="table"></Icon>
                <span>Navigation 2</span>
            </span>
        )}
    >
        <Menu.Item key="5">Option 3</Menu.Item>
        <Menu.Item key="6">Option 4</Menu.Item>
        <SubMenu key="SubMenu3" title="Submenu">
            <Menu.Item key="option-sub-3-1">Option sub 3-1</Menu.Item>
            <Menu.Item key="option-sub-3-2">Option sub 3-2</Menu.Item>
        </SubMenu>
    </SubMenu>
</Menu>`
                                        }
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <Card cardHeadTit="菜单 inline（内嵌）, 第一层不要使用MenuItemGroup">
                            <RadioGroup
                                options={this.state.menuBtnData.options}
                                value={this.state.menuBtnData.value}
                                disabled={this.state.menuBtnData.disable}
                                onChange={this.radioGroupBtnChange.bind(this)}
                                button
                            ></RadioGroup>

                            <div className="inlineMenu" style={{border: '1px solid #ccc', display: 'inline-block', marginTop: '20px'}}>
                                <Menu
                                    // mode={'inline'}
                                    inlineCollapsed={!this.state.menuBtnData.value}
                                    defaultSelectedKey="commonButton"
                                    defaultOpenKeys={['commonModules', 'sub1']}
                                >
                                    <Menu.Item key="9">
                                        <Icon type="table"/>
                                        <span>Option 9</span>
                                    </Menu.Item>
                                    <Menu.Item key="10">
                                        <Icon type="table"/>
                                        <span>Option 10</span>
                                    </Menu.Item>
                                    <SubMenu
                                        key="sub1"
                                        title={(
                                            <>
                                                <Icon type="color"/>
                                                <span>Navigation One</span>
                                            </>
                                        )}
                                    >
                                        <MenuItemGroup key="g1" title="Item 1">
                                            <Menu.Item key="1">Option 1</Menu.Item>
                                            <Menu.Item key="2">Option 2</Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup key="g2" title="Item 2">
                                            <Menu.Item key="3">Option 3</Menu.Item>
                                            <Menu.Item key="4">Option 4</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={(
                                            <>
                                                <Icon type="detail"/>
                                                <span>Navigation Two</span>
                                            </>
                                        )}
                                    >
                                        <Menu.Item key="5">Option 5</Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                        <SubMenu key="sub3" title="Submenu">
                                            <Menu.Item key="7">Option 7</Menu.Item>
                                            <Menu.Item key="8">Option 8</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>

                                </Menu>
                            </div>

                            <div className={'code-demo'}>
                                <RadioGroup
                                    options={this.state.showCode.inline.options}
                                    value={this.state.showCode.inline.value}
                                    onChange={(val, ele)=>{
                                        this.state.showCode.inline.value = val;
                                        this.setState({
                                            showCode: this.state.showCode
                                        });
                                    }}
                                    button
                                ></RadioGroup>
                                <div className={'code-demo-content'} style={{display: this.state.showCode.inline.value?'block':'none'}}>
                                    <div className={'code-demo-describe'}>
                                        * inlineCollapsed：inline 时菜单是否收起状态
                                    </div>

                                    <pre>
                                        {`
<Menu
    mode={'inline'}
    inlineCollapsed={true}
    defaultSelectedKey=""
    defaultOpenKeys={[]}
>
    <Menu.Item key="9">
        <Icon type="table"/>
        Option 9
    </Menu.Item>
    <Menu.Item key="10">
        <Icon type="table"/>
        Option 10
    </Menu.Item>
    <SubMenu
        key="sub1"
        title={(
            <span>
                <Icon type="color" />
                <span>Navigation One</span>
            </span>
        )}
    >
        <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
        </MenuItemGroup>
    </SubMenu>
    <SubMenu
        key="sub2"
        title={(
            <span>
                <Icon type="table" />>
                <span>Navigation Two</span>
            </span>
        )}
    >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
    </SubMenu>

</Menu>
                                        `}
                                    </pre>
                                </div>
                            </div>

                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <Card cardHeadTit="菜单 vertical（垂直）">

                            <div style={{border: '1px solid #ccc', display: 'inline-block', marginTop: '20px'}}>
                                <Menu
                                    // mode={'vertical'}
                                    defaultSelectedKey="11"
                                    defaultOpenKeys={['commonModules', 'sub1']}
                                >
                                    <Menu.Item key="9">
                                        <Icon className="icon-shijian"/>
                                        <span>Option 9</span>
                                    </Menu.Item>
                                    <Menu.Item key="10">
                                        <Icon type="table"/>
                                        <span>Option 10</span>
                                    </Menu.Item>
                                    <MenuItemGroup key="g11" title="Item 11">
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                    </MenuItemGroup>
                                    <MenuItemGroup key="g12" title="Item 12">
                                        <Menu.Item key="13">Option 13</Menu.Item>
                                        <Menu.Item key="14">Option 14</Menu.Item>
                                    </MenuItemGroup>
                                    <SubMenu
                                        key="sub1"
                                        title={(
                                            <>
                                                <Icon type="color" />
                                                <span>Navigation One</span>
                                            </>
                                        )}
                                    >
                                        <MenuItemGroup key="g1" title="Item 1">
                                            <Menu.Item key="1">Option 1</Menu.Item>
                                            <Menu.Item key="2">Option 2</Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup key="g2" title="Item 2">
                                            <Menu.Item key="3">Option 3</Menu.Item>
                                            <Menu.Item key="4">Option 4</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={(
                                            <>
                                                <Icon type="table" />
                                                <span>Navigation Two</span>
                                            </>
                                        )}
                                    >
                                        <Menu.Item key="5">Option 5</Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                        <SubMenu key="sub3" title="Submenu">
                                            <Menu.Item key="7">Option 7</Menu.Item>
                                            <Menu.Item key="8">Option 8</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>

                                </Menu>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default MenuPage;