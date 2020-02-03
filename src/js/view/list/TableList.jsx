import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";  // 面包屑
import Card from '../../../components/Card/Card';  // card 组件
import Button from '../../../components/Button/Button';  // 按钮组件
import ContentHead from '../../../components/ContentHead/ContentHead';   // 
import '../../../scss/pageLayout/list.scss';  // 
import Select from 'rc-select';
import Pagination from 'rc-pagination';   // 分页
import '../../../scss/lib/select.scss';
import '../../../scss/lib/pagination.scss';

class TableList extends React.Component {
    constructor(props) {
        super(props);
    }
    onShowSizeChange = (current, pageSize) => {
        console.log(current);
        console.log(pageSize);
    }

    onChange = (current, pageSize) => {
        console.log('onChange:current=', current);
        console.log('onChange:pageSize=', pageSize);
    }
    componentWillMount() {
        console.log(this.props);
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="查询表格">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <i className="icon icon-zhiye" />
                            首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">列表页</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>查询表格</Breadcrumb.Item>
                    </Breadcrumb>
                </ContentHead>
                <Card>
                    <div className="list-box">
                        <div className="table-operator">
                            <span>
                                <Button type="primary">
                                    <i className="icon icon-tianjia" /> 新建
                                </Button>
                            </span>
                            <span>
                                <Button plain>批量操作</Button>
                            </span>
                            <span>
                                <Button plain>更多操作</Button>
                            </span>
                        </div>
                        <div className="table-info">
                            <i className="icon icon-xinxi-mianxing"></i>
                            <span className="ant-alert-message">
                                已选择 <span>0</span> 项&nbsp;&nbsp;
                                <span>服务调用次数总计&nbsp;<span>0 万</span></span>
                                <a href="javascript:;">清空</a>
                            </span>
                        </div>
                        <div className="table-content">
                            <table className="table-list">
                                <thead className="table-thead">
                                    <tr>
                                        <th className="table-align-center"><input type="checkbox" /></th>
                                        <th className="table-align-left">公司名称</th>
                                        <th className="table-align-left">联络人</th>
                                        <th className="table-align-left">产品</th>
                                        <th className="table-align-left">处理状态</th>
                                        <th className="table-align-left">分配状态</th>
                                        <th className="table-align-left">更新时间</th>
                                        <th className="table-align-center">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="table-tbody">
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-default"></span>已关闭
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-default"></span>已关闭
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-success"></span>已上线
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-success"></span>已上线
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-error"></span>异常
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-error"></span>异常
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-error"></span>异常
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-error"></span>异常
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-processing"></span>运行中
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                    <tr>
                                        <td className="table-align-center"><input type="checkbox" /></td>
                                        <td className="table-align-left">XXXXXXX(北京)有限公司</td>
                                        <td className="table-align-left">徐尚</td>
                                        <td className="table-align-left">现金罗盘</td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-warning"></span>运行中
                                        </td>
                                        <td className="table-align-left">
                                            <span className="badge-status-dot badge-status-warning"></span>运行中
                                        </td>
                                        <td className="table-align-left">2018/9/26 14:39</td>
                                        <td className="table-align-center"><i className="icon icon-gengduocaozuo"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-pagination">
                            <Pagination
                                selectComponentClass={Select}
                                showSizeChanger
                                showQuickJumper={{goButton: <button>确定</button>}}
                                defaultPageSize={20}
                                defaultCurrent={5}
                                onShowSizeChange={this.onShowSizeChange}
                                onChange={this.onChange}
                                total={450}
                            />
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}

export default TableList;