import RCTable from 'rc-table';
import CheckBox from '../CheckBox/CheckBox';

import './index.scss';

class Table extends React.Component {
    constructor(props) {
        super(props);

        function initLoop(dataArray) {
            dataArray.map(item => {
                item.isLeaf = true;

                if(item['key'] === undefined) {
                    throw Error('Row key must have, and is unique!');
                }

                if('children' in item && item.children.length) {
                    item.isLeaf = false;
                    
                    initLoop(item.children);
                }
            });
            return dataArray;
        }

        

        this.state ={
            allCheck: false,
            tableData: initLoop(props.data),
            indeterminate: false,
            changeData: []
        }
    }

    toggleCheckData(allCheck, indeterminate, changeData) {
        this.setState({
            allCheck,
            indeterminate,
            changeData
        });

        this.props.onChange && this.props.onChange(changeData);
    }

    loopAllChecked = row => {
        const allCheck = this.state.tableData.every(item => item['checked'] === true);
        const indeterminate = this.state.tableData.some(item => item['checked'] === true);
        let cloneArr = [];

        if(allCheck) {
            cloneArr = this.state.tableData; 
        }

        if(indeterminate && !allCheck) {
            cloneArr = this.state.tableData.filter(item => item.key !== row.key)
        }

        this.toggleCheckData(allCheck ? true : false, allCheck ? false : indeterminate, cloneArr);

        
    }

    allCheckedRender() {
        return (
            <CheckBox 
                checked={this.state.allCheck} 
                indeterminate={this.state.indeterminate}
                onChange={value => {
                    this.state.tableData.map(item => item['checked'] = value);

                    this.toggleCheckData(value, false, value ? this.state.tableData : []);
                }}
            />
        )
    }

    checkedRender(row) {
        return (
            <CheckBox 
                checked={row['checked']} 
                onChange={(value, item) => {
                    row['checked'] = value;
                    this.loopAllChecked(row);
                }}
            />
        )
    }

    render() {
        const {onChange, selectionWidth, checkboxable, columns, expandable, ...other} = this.props;
        let columnsNew  = columns;

        if(checkboxable) {

            columnsNew = [{
                className: 'table-checkbox',
                title: this.allCheckedRender(),
                dataIndex: '',
                width: selectionWidth || 50,
                align: 'center',
                render: (o, row, index) => {
                    const obj = {
                        children: o,
                        props: {}
                    };

                    if(!o.isLeaf) {
                        obj.children = this.checkedRender(row);
                        obj.props.className = 'table-checkbox';
                    }

                    return obj;
                }
            },...columns]
        }

        return (
            <React.Fragment>
                {console.log(columnsNew)}
                <RCTable 
                    columns={columnsNew}
                    expandable={expandable} 
                    // defaultExpandAllRows={defaultExpandAllRows}
                    data={this.state.tableData}
                    {...other}
                />
            </React.Fragment>
        )
    }
}
export default Table;