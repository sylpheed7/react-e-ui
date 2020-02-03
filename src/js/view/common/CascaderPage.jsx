import Cascader from '../../../components/Cascader/Cascader';
import ContentHead from '../../../components/ContentHead/ContentHead';
import Card from '../../../components/Card/Card';
import {Row, Col} from '../../../components/Grid/Grid';
import Tooltip from "../../../components/Tooltip/Tooltip";


class CascaderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            reset: false,
            keys: '',
            defaultValue: [],
            optionData: [
                {
                    label: '北京',
                    value: 'beijing',
                    isLeaf: false
                },
                {
                    label: '江西',
                    value: 'jx',
                    children: [
                        {
                            label: '吉安',
                            value: 'ja'
                        },
                        {
                            label: '南昌',
                            value: 'nc'
                        },
                        {
                            label: '宜春',
                            value: 'yc'
                        }
                    ]
                },
                {
                    label: '天津',
                    value: 'tj',
                    disabled: true,
                    children: [
                        {
                            label: '武清',
                            value: 'wq'
                        },
                        {
                            label: '和平',
                            value: 'hp'
                        }
                    ]
                }
            ]
        };
    }

    onChange = data => {
        this.setState({
            value: data
        });
        console.log('selected value: ', data);
    }

    loadData = (optionSelected) => {
        console.log(optionSelected);

        optionSelected.loading = true;

        const optArr = [
            {
                label: optionSelected.label + '/朝阳',
                value: 'chaoyang'
            },
            {
                label: '东城',
                value: 'dongcheng'
            },
            {
                label: '西城',
                value: 'xicheng'
            },
            {
                label: '海淀',
                value: 'haidian',
                isLeaf: false
            }
        ];

        const add = [
            {
                label: '五道口',
                value: 'wudaokou'
            }
        ];

        const that = this;

        setTimeout(() => {
            if(optionSelected.value == 'beijing') {
                optionSelected.children = optArr;
                optionSelected.loading = false;

            }

            if(optionSelected.value == 'haidian') {
                optionSelected.children = add;
                optionSelected.loading = false;
            }
            

            that.setState({
                optionData: [...that.state.optionData]
            })
        }, 1000)
    }

    render() {
        return (
            <React.Fragment>
                <ContentHead title="Cascader 组件" />
                <Row>
                    <Col span="12">
                        <Card cardHeadTit="默认多级标签">
                            <Cascader
                                // changeOnSelect
                                // defaultValue={["jx", "nc"]}
                                options={this.state.optionData} 
                                onChange={this.onChange}
                            ></Cascader>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * options       级联数据<br/>
                                        * onChange      选中数据时触发事件<br/>
                                    </div>
                                    <pre>{`
数据格式：
optionData: [
    {
        label: '北京',
        value: 'beijing',
        isLeaf: false
    },
    {
        label: '江西',
        value: 'jx',
        children: [
            {
                label: '吉安',
                value: 'ja'
            },
            {
                label: '南昌',
                value: 'nc'
            },
            {
                label: '宜春',
                value: 'yc'
            }
        ]
    },
    {
        label: '天津',
        value: 'tj',
        disabled: true,
        children: [
            {
                label: '武清',
                value: 'wq'
            },
            {
                label: '和平',
                value: 'hp'
            }
        ]
    }
]

<Cascader
    // changeOnSelect
    options={this.state.optionData} 
    onChange={this.onChange}
></Cascader>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card cardHeadTit="ajax loadData多级标签">
                            <Cascader
                                changeOnSelect
                                loadData={this.loadData}
                                options={this.state.optionData} 
                                onChange={this.onChange}
                            ></Cascader>

                            <div className={'code-demo'}>
                                <div className={'code-demo-content'}>
                                    <div className={'code-demo-describe'}>
                                        * changeOnSelect    loadData时选中叶子节点是否触发onChange事件<br/>
                                        * loadData          选中叶子节点时加载下一级数据<br/>
                                    </div>
                                    <pre>{`
loadData = (optionSelected) => {
    console.log(optionSelected);

    const optArr = [
        {
            label: optionSelected.label + '/朝阳',
            value: 'chaoyang'
        },
        {
            label: '东城',
            value: 'dongcheng'
        },
        {
            label: '西城',
            value: 'xicheng'
        },
        {
            label: '海淀',
            value: 'haidian',
            isLeaf: false
        }
    ];

    const add = [
        {
            label: '五道口',
            value: 'wudaokou'
        }
    ];

    const that = this;

    setTimeout(() => {
        if(optionSelected.value == 'beijing') {
            optionSelected.children = optArr;
            optionSelected.loading = false;

        }

        if(optionSelected.value == 'haidian') {
            optionSelected.children = add;
            optionSelected.loading = false;
        }
        

        that.setState({
            optionData: [...that.state.optionData]
        })
    }, 1000)
}


<Cascader
    changeOnSelect
    loadData={this.loadData}
    options={this.state.optionData} 
    onChange={this.onChange}
></Cascader>
                                        `}</pre>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default CascaderPage;
