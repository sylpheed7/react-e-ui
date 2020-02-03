import React from "react";
import Card from "../../../components/Card/Card";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
import TreeSelect from '../../../components/TreeSelect/TreeSelect';

const data5 = [
    {
        code1: "11001",
        id: 42,
        name: "解决方案类",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11002",
        id: 43,
        name: "产品与服务类",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11003",
        id: 44,
        name: "商务合作类",
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

class TreeSelectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateKey: Date.now()
        }
    }
    clickNodeGetInfo(node) {
        console.log('节点id是：' + node.id + ';节点name是：' + node.name);
        console.log(node);
    }
    handleSelectedNode(selectedNodeList, treeDataList) {
        console.log("selectedNodeList: ", selectedNodeList);
        console.log("treeDataList: ", treeDataList);
    }

    clear = () => {
        this.setState({
            updateKey: Date.now()
        }, () => {
            console.log(data5)
        })
    }

    render() {
        return (
            <Row>
                <Col span="12">
                    <Card cardHeadTit="TreeSelect - 1 带图标">
                        <div className="layout-no">
                            <TreeSelect key={this.state.updateKey} treeData={data5}
                                treeabel={{
                                    dataKey: 'parentCode1',
                                    objKey: 'code1'
                                }}
                                allowClear
                                // maxLabel="2"
                                showCheckedStrategy="SHOW_CHILD"
                                multiple
                                // disabled
                                // defaultValue={['产品与服务类', '解决方案类', '商务合作类']}
                                onSelect={this.clickNodeGetInfo}
                                onChange={this.handleSelectedNode}
                            >
                            </TreeSelect>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <pre className={'code-demo-describe'}>
                                    * onChange                  选中节点触发方法<br />
                                    * multiple                  支持多选，默认单选<br />
                                    * showCheckedStrategy       多选时定义选中项回填的方式，可以填：SHOW_PARENT、SHOW_CHILD、SHOW_ALL 默认值：SHOW_ALL<br />
                                    * placeholder               占位符<br />
                                    * defaultValue              初始化默认值<br />
                                    * allowClear                是否显示清空按钮<br />
                                    * disabled                  禁用<br />
                                    * maxLabel                  最大Label显示数，无默认值<br />
                                    * className <br />
                                    * style <br />
                                    *<br />
                                    * treeabel Object           树形选项props <br />
                                    * treeabel.expendable       是否可以展开，默认值：true<br />
                                    * treeabel.treeCheckable    是否显示checkbox，显示时为多选，multiple失效<br />
                                    * treeabel.dataKey          children节点编码字段名 默认值：parentCode<br />
                                    * treeabel.objKey           父节点编码字段名 默认值：code<br />
                                    * treeabel.style <br />
                                    </pre>
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
        propertyList: [],
        type: "1"
    },
    {
        code1: "11002",
        id: 43,
        name: "产品与服务类",
        propertyList: [],
        type: "1"
    },
    {
        code1: "11003",
        id: 44,
        name: "商务合作类",
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
    treeabel={{
        iconClick: true,
        canSelected: true,
        dataKey: 'parentCode1',
        objKey: 'code1'
    }}
    onSelect = {this.clickNodeGetInfo}
    onChange = {this.handleSelectedNode}
>
</Tree>
                        `}</pre>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span="12">
                    <Card cardHeadTit="TreeSelect - 2 带图标">
                        <div className="layout-no">
                            <TreeSelect treeData={data6}
                                allowClear
                                treeabel={{
                                    iconClick: true
                                }}
                                onSelect={this.clickNodeGetInfo}
                            >
                            </TreeSelect>
                        </div>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default TreeSelectPage;