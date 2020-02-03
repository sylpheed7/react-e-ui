import React from 'react';
import Transfer from '../../../components/Transfer/Transfer'
import Card from "../../../components/Card/Card.jsx";
import Button from "../../../components/Button/Button.jsx";
import ContentHead from "../../../components/ContentHead/ContentHead";
import {
    Row,
    Col
} from "../../../components/Grid/Grid";
class TransferPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mockData: [],
            targetKeys: [],
            selectedKeys: [],
            disabled: true
        };
    }
    componentDidMount() {
        this.getMock();
    }
    
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({mockData, targetKeys});
    };
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        console.log(targetKeys)
        this.setState({targetKeys});
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    disabledFn=()=>{
        this.setState({
            disabled: true
        })
    }
    noDisabledFn=()=>{
        this.setState({
            disabled: false
        })
    }
    render() {
        return (
            <div>               
                <ContentHead title="Transfer 穿梭框组件" />
                <Button onClick={this.noDisabledFn}>启用{this.state.disabled} </Button>
                <Button onClick={this.disabledFn} disabled={this.state.disabled}>禁用</Button>
                <Row>
                    <Col span="24">
                        <Card cardHeadTit="默认">
                            <Transfer 
                                style={{height: "400px"}}
                                dataSource={this.state.mockData}
                                showSearch
                                listStyle={{
                                    width: 300,
                                    height: 300
                                }}
                                // filterOption={this.filterOption}
                                targetKeys={this.state.targetKeys}
                                // selectedKeys={this.state.selectedKeys}
                                onChange={this.handleChange}
                                // onSearch={this.handleSearch}
                                // render={item => item.title}
                                disabled={this.state.disabled}
                            />
                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * dataSource 必填 源数据 <br/>
                                        * targetKeys 必填 target 数据<br/>
                                        * onChange 必填 数据change时间<br/>
                                    </div>
                                    <pre>{`
<Transfer 
dataSource={this.state.mockData}
targetKeys={this.state.targetKeys}
onChange={this.handleChange}
/>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                  
                </Row>
              
            </div>
        )
    }
}


export default TransferPage;