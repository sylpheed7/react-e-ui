import React from "react";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import Tree from '../../../components/Tree/Tree';
// import Tree from '../../../components/Tree/Tree';
import Tabs from "../../../components/Tabs/Tabs";
import Icon from "../../../components/Icon/Icon";

const data5 = [
    {
        id: '0',
        code1: "0",
        name: "产品中心",
        isOpen: true,
        type: '0'
    },
    {
        code1: "11001",
        id: 42,
        name: "解决方案类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11002",
        id: 43,
        name: "产品与服务类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11003",
        id: 44,
        name: "商务合作类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "12010",
        id: 45,
        name: "分期支付",
        parentCode1: "11001",
        propertyList: [],
        type: "2"
    },
    {
        code1: "12023",
        id: 57,
        name: "渠道合作",
        parentCode1: "11003",
        propertyList: [],
        type: "2"
    },
    {
        code1: "12024",
        id: 58,
        name: "渠道合作22222",
        parentCode1: "11003",
        propertyList: [],
        type: "2"
    }
];

const data6 = [
    {
        id: '0',
        code: "0",
        name: "产品中心",
        isOpen: true,
        type: '0'
    },
    {
        code: "11001",
        id: 42,
        name: "解决方案类",
        parentCode: "0",
        propertyList: [],
        type: "1"
    },
    {
        code: "11002",
        id: 43,
        name: "产品与服务类",
        parentCode: "0",
        propertyList: [],
        type: "1"
    },
    {
        code: "11003",
        id: 44,
        name: "商务合作类",
        parentCode: "0",
        propertyList: [],
        type: "1"
    },
    {
        code: "12010",
        id: 45,
        name: "分期支付",
        parentCode: "11001",
        propertyList: [],
        type: "2"
    },
    {
        code: "12023",
        id: 57,
        name: "渠道合作",
        parentCode: "11003",
        propertyList: [],
        type: "2"
    }
];

class TreePage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.loadDataAction = this.loadDataAction.bind(this);
        this.state = {
            notice: false
        };
    }
    onClick(item) {
        if (!item.child) {
            alert('标题:' + item.title);
        }
    }
    loadDataAction(item) {
        //这里对应数据格式去依据判断标准
        // console.log(item);
        if (!(item.child && item.child.length)) {
            if (item.title == '0') {
                item.child.push({
                    title: '0-0',
                    key: '0-0',
                    level: 'level2',
                    open: false,
                    child: []
                }, {
                    title: '0-1',
                    key: '0-1',
                    level: 'level2',
                    open: false,
                    child: []
                });
            } else if (item.title == '0-0') {
                item.child.push(
                    {
                        title: '0-0-0',
                        key: '0-0-0',
                        level: 'level3'
                    }
                )
            } else if (item.title == '0-1') {
                item.child.push(
                    {
                        title: '0-1-0',
                        key: '0-1-1',
                        level: 'level3'
                    }
                )
            }
            this.setState({
                notice: true
            });
        }
    }
    clickNodeGetInfo(node) {
        console.log('节点id是：' + node.id + ';节点name是：' + node.name);
        console.log(node);
    }
    handleSelectedNode(leafNodeList, selectedNodeList, treeDataList) {
        console.log("leafNodeList: ", leafNodeList);
        console.log("selectedNodeList: ", selectedNodeList);
        console.log("treeDataList: ", treeDataList);
    }

    render() {
        return (
            <Row>
                <Col span="12">
                    <Card cardHeadTit="Tree - 1 带图标">
                        <div className="layout-no">
                            <Tree treeData={data5}
                                iconclick={true}
                                canSelected={true}
                                clickNodeGetInfo={this.clickNodeGetInfo}
                                selectedNode={this.handleSelectedNode}
                                dataKey={'parentCode1'}
                                // isLabelExpend
                                objKey={'code1'}
                            >
                            </Tree>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * iconclick         是否显示展开图标，默认不显示<br />
                                        * canSelected       是否显示选择框并提供选择功能，默认不显示<br />
                                        * clickNodeGetInfo  点击节点触发方法<br />
                                        * selectedNode      选中节点触发方法<br />
                                        * dataKey           父节点编码字段名 def：parentCode<br />
                                        * objKey            本节点编码字段名 def：code<br />
                                        * isLabelExpend     点击label文字是否可以展开，默认false，只有在iconclick、canSelected为false生效
                                    </div>
                                    <pre>{`

const data5 = [{
        id: '0',
        code1: "0",
        name: "产品中心",
        isOpen: true,
        type:'0'
    },
    {
        code1: "11001",
        id: 42,
        name: "解决方案类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11002",
        id: 43,
        name: "产品与服务类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11003",
        id: 44,
        name: "商务合作类",
        parentCode1: "0",
        propertyList: [],
        type: "1"
    },
    {
        code1: "12010",
        id: 45,
        name: "分期支付",
        parentCode1: "11001",
        propertyList: [],
        type: "2"
    },
    {
        code1: "12023",
        id: 57,
        name: "渠道合作",
        parentCode1: "11003",
        propertyList: [],
        type: "2"
    },
    {
        code1: "12024",
        id: 58,
        name: "渠道合作22222",
        parentCode1: "11003",
        propertyList: [],
        type: "2"
}];   


<Tree treeData={data5}
    iconclick = {true}
    canSelected = {true}
    clickNodeGetInfo = {this.clickNodeGetInfo}
    selectedNode = {this.handleSelectedNode}
    dataKey = {'parentCode1'}
    objKey = {'code1'}
>
</Tree>
                        `}</pre>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span="12">
                    <Card cardHeadTit="Tree - 2 带图标">
                        <div className="layout-no">
                            <Tree treeData={data6}
                                iconclick={false}
                                isLabelExpend
                                canSelected={false}
                                clickNodeGetInfo={this.clickNodeGetInfo}
                            >
                            </Tree>
                        </div>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default TreePage;