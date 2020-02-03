import Table from "../../../components/Table/Table";

import {Card, CheckBox, Button} from "../../../components/index";

const data = [
    {
        a: {ad: 1},
        key: "a1",
        // b: 'b2',
        children: [
            {
                key: "a1-1",
                a: "a2-1",
                b: "b2-1",
                c: "c2-1",
                d: "d2-1"
            },
            {
                key: "a1-2",
                a: "a2-2",
                b: "b2-2"
            }
        ]
    },
    {
        key: "a2",
        a: {ad: 2},
        // c: 'c3',
        // d: 'd3',
        children: [
            {
                key: "a2-1",
                a: "a3-1",
                b: "b3-1"
            },
            {
                key: "a2-2",
                a: "a3-2",
                b: "b3-2"
            }
        ]
    }
];

const data2 = [
    {key: 0, a: "123"},
    {key: 1, a: "cdd", b: "edd"},
    {key: 2, a: "1333", c: "eee", d: 2}
];

for (let i = 0; i < 10; i += 1) {
    const str = `${i}`;
    const item = {
        key: i * 10 + 99,
        a: str.repeat(3),
        b: str.repeat(5),
        c: str.repeat(7),
        d: i
    };
    data2.push(item);
}

export default class TableDEMO extends React.Component {
    constructor(props) {
        super(props);

        let stateObj = {
            data, // table 数据
            data2,
            changeData: [], //全选返回的值，默认为空数组
            changeData2: [] //全选返回的值，默认为空数组
        };

        stateObj.data.map((item) => {
            stateObj[item.key] = false;
        });

        this.state = stateObj;
    }

    onExpand = (expanded, record) => {
        console.log("onExpand", expanded, record);
    };

    render() {
        const that = this;
        const columns = [
            {
                title: "商品信息",
                dataIndex: "a",
                key: "a",
                width: 100,
                render: (o, row, index) => {
                    const obj = {
                        children: o,
                        props: {}
                    };

                    if ("children" in row && row.children) {
                        obj.props.colSpan = 7;
                        obj.children = row.a.ad;
                    }

                    return obj;
                }
            },
            {
                title: "货号",
                dataIndex: "b",
                key: "b",
                width: 100,
                render(o, row, index) {
                    const obj = {
                        children: o,
                        props: {}
                    };
                    if ("children" in row && row.children) {
                        obj.props.colSpan = 0;
                    }

                    return obj;
                }
            },
            {
                title: "数量",
                dataIndex: "c",
                key: "c",
                width: 200,
                render(o, row, index) {
                    const obj = {
                        children: o,
                        props: {}
                    };
                    if ("children" in row && row.children) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: "寺库价",
                dataIndex: "d",
                key: "d",
                width: 200,
                render(o, row, index) {
                    const obj = {
                        children: o,
                        props: {}
                    };
                    if ("children" in row && row.children) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: "结算价",
                dataIndex: "e",
                key: "e",
                width: 200,
                render(o, row, index) {
                    const obj = {
                        children: o,
                        props: {}
                    };
                    if ("children" in row && row.children) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: "用户",
                dataIndex: "f",
                key: "f",
                width: 200,
                render(o, row, index) {
                    const obj = {
                        children: o,
                        props: {}
                    };

                    if ("children" in row && row.children) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: "操作",
                dataIndex: "",
                key: "x",
                render: (text, record, index) => {
                    const obj = {
                        children: (
                            <a
                                href="#"
                                onClick={(e) => this.handleClick(record, e)}
                            >
                                click {record.a}
                            </a>
                        ),
                        props: {}
                    };
                    if (record.children) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                }
            }
        ];

        const columns2 = [
            {title: "", dataIndex: "", width: 50, key: "1", align: 'center'},
            {title: "title 1", dataIndex: "a", key: "a", width: 100},
            {title: "title 2", dataIndex: "b", key: "b", width: 100},
            {title: "title 3", dataIndex: "c", key: "c", width: 200},
            {
                title: "Operation",
                dataIndex: "",
                key: "x",
                render: (o, row, index) => {
                    return (
                        <a href="#" onClick={() => remove(index)}>
                            Delete
                        </a>
                    );
                }
            }
        ];

        return (
            <React.Fragment>
                <Card cardHeadTit="TableDEMO-1">
                    <Table
                        className="tabledeom"
                        columns={columns}
                        data={this.state.data}
                        onChange={(value) =>
                            this.setState({changeData: value})
                        }
                        checkboxable
                        expandIcon={(props) => null}
                        defaultExpandAllRows
                        indentSize={0}
                    />
                    <p style={{textAlign: 'center', padding: '20px'}}>
                        <Button type="primary" target="_blank" href="https://codesandbox.io/s/table-demo-6l9x4?fontsize=14&hidenavigation=1&theme=dark">示例代码</Button>
                    </p>
                </Card>
                <Card cardHeadTit="TableDEMO-2">
                    <Table
                        className="tabledeom"
                        columns={columns2}
                        data={this.state.data2}
                        onChange={(value) =>
                            this.setState({changeData2: value})
                        }
                        // expandRowByClick={true}
                        expandIconColumnIndex={0}
                        expandedRowRender={(record) => <p>extra: {record.a}</p>}
                        onExpand={this.onExpand}
                    />
                    <p style={{textAlign: 'center', padding: '20px'}}>
                        <Button type="primary" target="_blank" href="https://codesandbox.io/s/table-demo-6l9x4?fontsize=14&hidenavigation=1&theme=dark">示例代码</Button>
                    </p>
                </Card>
            </React.Fragment>
        );
    }
}
