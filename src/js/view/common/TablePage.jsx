import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../../../components/Table/Table';
import Card from "../../../components/Card/Card";
import ContentHead from '../../../components/ContentHead/ContentHead';
import {Row, Col} from '../../../components/Grid/Grid';



export default class TablePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const columns = [
            {title: 'title1', dataIndex: 'a', key: 'a', width: 100},
            {id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100},
            {title: 'title3', dataIndex: 'c', key: 'c', width: 200},
            {
                title: 'Operations',
                dataIndex: '',
                key: 'd',
                render() {
                    return <a href="#">Operations</a>;
                }
            }
        ];
        const data = [];

        return (
            <React.Fragment>
                <ContentHead title="Table 表格" />
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="Table示例">
                            <div className="layout-no">

                                <div className={'code-demo'}>
                                    <div className={'code-demo-content'}>
                                        <div className={'code-demo-describe'}>
                                            * className classname <br />
                                            * columns 表格列和表头配置<br />
                                            * data 表格渲染数据源<br />
                                            * checkboxable  显示checkbox，默认false<br />
                                            * onChange checkbox 选择触发回调.一个参数value<br />
                                            * expandable 是否开启展开功能，默认false<br />
                                            * expandRowByClick  点击行是否展开，默认false<br />
                                            * expandIconColumnIndex 展开所在的列<br />
                                            * expandIcon 展开icon渲染函数，参数props，返回任意类型<br />
                                            * expandedRowRender 展开行渲染回调，可以返回任意类型<br />
                                            * onExpand 展示时回调函数<br />
                                            * indentSize 子表格缩进，number,例如 indentSize={30}<br />
                                            * showHeader 隐藏表头，默认true<br />
                                            * 其他属性值请参考rc-table文档。http://react-component.github.io/table
                                        </div>
                                        <pre>{`
const columns = [
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
    { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
    { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
    {
        title: 'Operations',
        dataIndex: '',
        key: 'd',
        render() {
            return <a href="#">Operations</a>;
        },
    },
];
const data = [];
<Table columns={columns} data={data} />
                                        `}</pre>
                                    </div>
                                </div>

                            </div>
                            <Table columns={columns} data={data} />
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
};