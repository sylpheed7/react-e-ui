import './index.scss'
import Operation from './Opration'
import CheckBox from '../CheckBox/CheckBox'
import Input from '../Input/Input'

import List from './List'
class Transfer extends React.Component {
    constructor(props) {
        super(props);
        const {selectedKeys = [], targetKeys = []} = props;
        this.state = {
            sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
            targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1)
        }
        
    }
    getSelectedKeysName(direction) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    }
    getTitles(){
        const {props} = this;
        if (props.titles) {
            return props.titles;
        }
        return ['Source', 'Target'];
    }
    separateDataSource() {
        const {dataSource, rowKey, targetKeys = []} = this.props;
        const leftDataSource = [];
        const rightDataSource = new Array(targetKeys.length);
        dataSource.forEach(record => {
            if (rowKey) {
                record.key = rowKey(record);
            }
    
            // rightDataSource should be ordered by targetKeys
            // leftDataSource should be ordered by dataSource
            const indexOfKey = targetKeys.indexOf(record.key);
            if (indexOfKey !== -1) {
                rightDataSource[indexOfKey] = record;
            } else {
                leftDataSource.push(record);
            }
        });
    
        return {
            leftDataSource,
            rightDataSource
        };
    }

    moveToLeft = () => this.moveTo('left');

    moveToRight = () => this.moveTo('right');
    moveTo = (direction) => {
        const {targetKeys = [], dataSource = [], onChange} = this.props;
        const {sourceSelectedKeys, targetSelectedKeys} = this.state;
        const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
        // filter the disabled options
        const newMoveKeys =  moveKeys.filter(
            (key) => !dataSource.some(data => !!(key === data.key && data.disabled))
        );
        // move items to target box
        const newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1)

        // empty checked keys
        const oppositeDirection = direction === 'right' ? 'left' : 'right';
        this.setState({
            [this.getSelectedKeysName(oppositeDirection)]: []
        });
        // this.handleSelectChange(oppositeDirection, []);

        if (onChange) {
            onChange(newTargetKeys, direction, newMoveKeys);
        }
    }
    handleSelectChange(direction, holder) {
        const {sourceSelectedKeys, targetSelectedKeys} = this.state;

        const {onSelectChange} = this.props;
        if (!onSelectChange) {
            return;
        }

        if (direction === 'left') {
            onSelectChange(holder, targetSelectedKeys);
        } else {
            onSelectChange(sourceSelectedKeys, holder);
        }
    }
    handleFilter = (direction, e) => {
        const {onSearchChange, onSearch} = this.props;
        const {value} = e.target;
        if (onSearchChange) {
            onSearchChange(direction, e);
        }
        if (onSearch) {
            onSearch(direction, value);
        }
    };
    
    handleLeftFilter = (e) => this.handleFilter('left', e);
    
    handleRightFilter = (e) => this.handleFilter('right', e);
    onLeftItemSelect(item){
        const {sourceSelectedKeys} = this.state;
        const holder = [...sourceSelectedKeys]
        const index = sourceSelectedKeys.indexOf(item.key)
        const checked = sourceSelectedKeys.indexOf(item.key) >= 0
        if(index > -1){
            holder.splice(index, 1);
        }
        if(!checked){
            holder.push(item.key)
        }
        this.setState({
            sourceSelectedKeys: holder
        })
    }
    onRightItemSelect(item){
        const {targetSelectedKeys} = this.state;
        const holder = [...targetSelectedKeys]
        const index = targetSelectedKeys.indexOf(item.key)
        const checked = targetSelectedKeys.indexOf(item.key) >= 0
        if(index > -1){
            holder.splice(index, 1);
        }
        if(!checked){
            holder.push(item.key)
        }
        this.setState({
            targetSelectedKeys: holder
        })
    }
    onLeftItemSelectAll = (selectedKeys, checkAll)=>  this.onItemSelectAll('left', selectedKeys, checkAll);
    onRightItemSelectAll = (selectedKeys, checkAll)=>  this.onItemSelectAll('right', selectedKeys, checkAll);
    onItemSelectAll= (direction, selectedKeys, checkAll) => {
        if(this.props.disabled) return
        const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];

        let mergedCheckedKeys = [];
        if (checkAll) {
            // Merge current keys with origin key
            mergedCheckedKeys = Array.from(new Set([...originalSelectedKeys, ...selectedKeys]));
        } else {
            // Remove current keys from origin keys
            mergedCheckedKeys = originalSelectedKeys.filter(
                (key) => selectedKeys.indexOf(key) === -1,
            );
        }

        this.handleSelectChange(direction, mergedCheckedKeys);
        this.setState({
            [this.getSelectedKeysName(direction)]: mergedCheckedKeys
        });
        if (!this.props.selectedKeys) {
            this.setState({
                [this.getSelectedKeysName(direction)]: mergedCheckedKeys
            });
        }
       
    }

    componentDidUpdate(prevProps) {
        if(this.props.disabled !== prevProps.disabled) {
            // this.setState({
            //     disabled: this.props.disabled
            // })
        }
    }

    render() {
        const {listStyle,disabled,showSearch, style} = this.props
        const {sourceSelectedKeys,targetSelectedKeys} = this.state
        const {leftDataSource, rightDataSource} = this.separateDataSource();
        const titles = this.getTitles();
        
        return (
            <React.Fragment>
                <div style={style} className='sc-transfer'>
                    <List
                        style={listStyle}
                        titleText={titles[0]}
                        dataSource={leftDataSource}
                        // checkedKeys={sourceSelectedKeys}
                        showSearch={showSearch}
                        handleFilter={this.handleLeftFilter}
                        onItemSelect={this.onLeftItemSelect.bind(this)}
                        onItemSelectAll={this.onLeftItemSelectAll}
                        checkedKeys={sourceSelectedKeys}
     
                        disabled={disabled}
                    ></List>
                    <div className="sc-transfer-operation">
                        <Operation
                            disabled={disabled}
                            className="sc-transfer-operation"
                            rightArrowText='right'
                            leftArrowText='left'
                            moveToRight={this.moveToRight}
                            moveToLeft={this.moveToLeft}
                        >
                        </Operation>
                    </div>
                    <List
                        style={listStyle}
                        titleText={titles[1]}
                        dataSource={rightDataSource}
                        // checkedKeys={targetSelectedKeys}
                        showSearch={showSearch}
                        handleFilter={this.handleRightFilter}
                        onItemSelect={this.onRightItemSelect.bind(this)}
                        onItemSelectAll={this.onRightItemSelectAll}
                        checkedKeys={targetSelectedKeys}

                        disabled={disabled}
                    ></List>
                </div>
            </React.Fragment>
        )
    }
}


export default Transfer;