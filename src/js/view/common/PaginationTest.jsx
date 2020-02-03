import React from 'react';
import Pagination from '../../../components/Pagination/Pagination';  // 按钮组件
import {ContentHead} from '../../../components/index';
import Tooltip from "../../../components/Tooltip/Tooltip";

class PaginationTest extends React.Component {
    constructor() {
        super()
    }
    state = {
        current: 3,
        total: 2500,
        pageSize: 20,
        showSizeChanger: true,
        showSelect: true,
        pageSizeOptions: ['100', '200', '300', '400']
    }
    onChange = (page) => {
        console.log(page);
        this.setState({
            current: page
        });
    }
    onShowSizeChange = (current, pageSize) => {
        console.log(current);
        console.log(pageSize);
        this.setState({pageSize});
    }
    render() {
        return (
            <React.Fragment>
                <ContentHead title="翻页组件"></ContentHead>
                <div className="paginationPage">
                    <Pagination
                        current={this.state.current}
                        total={this.state.total}
                        pageSizeOptions={this.state.pageSizeOptions}
                        showSizeChanger={this.state.showSelect}
                        pageSize={this.state.pageSize}
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.onChange}
                        showTotal={total => `aaaa`}
                    > </Pagination>

                    <div className={'code-demo'}>
                        <div className={'code-demo-content'}>
                            <div className={'code-demo-describe'}>
                                Pagination参数：<br/>
                                * current: 当前页码<br/>
                                * total: 总条数<br/>
                                * pageSize: 每页多少条<br/>
                                * showSizeChanger: 显示每页多少条的后选项<br/>
                                * pageSizeOptions: 每页多少条的后选项，（page）接收参数，每页多少条<br/>
                                * onShowSizeChange: 改变显示每页多少条的事件，(current, pageSize)---接收参数：当前页码、每页多少条<br/>
                                * onChange: 页码点击事件<br/>
                            </div>
                            <pre>{`
state = {
    current: 3,
    total: 2500,
    pageSize: 20,
    showSizeChanger: true,
    showSelect: true,
    pageSizeOptions: ['100', '200', '300', '400']
}

onChange = (page) => {
    console.log(page);
    this.setState({
        current: page
    });
}

onShowSizeChange = (current, pageSize) => {
    console.log(current);
    console.log(pageSize);
    this.setState({pageSize});
}

<Pagination
    current={this.state.current}
    total={this.state.total}
    pageSizeOptions={this.state.pageSizeOptions}
    showSizeChanger={this.state.showSelect}
    pageSize={this.state.pageSize}
    showSelect={this.state.showSelect}
    onShowSizeChange={this.onShowSizeChange}


    onChange={this.onChange}

> </Pagination>
                                        `}</pre>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}
export default PaginationTest;