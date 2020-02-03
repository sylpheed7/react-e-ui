import CheckBox from '../CheckBox/CheckBox'
import Input from '../Input/Input'
import './index.scss'
class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filterValue: '',
            dataSource: props.dataSource
        };
    }
    handleFilter= (val)=>{
        this.setState({
            filterValue: val
        })
    }
    searchBody = () => {
        const {filterValue} = this.state;
        const {showSearch, disabled} = this.props
        const search = showSearch ? (
            <div className="sc-transfer-list-body-search-wrapper">
                <Input
                    
                    onChange={this.handleFilter}
                    
                    
                    value={filterValue}
                    disabled={disabled}
                />
            </div>
        ) : null;
        return search
    }
    matchFilter(filterValue, item){
        return item.title.indexOf(filterValue) >= 0
    }
    listBody = () => {
        const {dataSource, onItemSelect, checkedKeys, disabled} = this.props
        const {filterValue} = this.state
        const reanderListData = []
        dataSource.forEach(item=>{
            if(filterValue && filterValue.trim()&& this.matchFilter(filterValue, item)){
                reanderListData.push(item)
            }
            if(!this.state.filterValue){
                reanderListData.push(item)
            }
        })
        const listItems = reanderListData.length > 0 && reanderListData.map(item=>{
            const checked = checkedKeys && checkedKeys.indexOf(item.key) >= 0
            return (
                <li className="sc-transfer-list-content-item" key={item.key} onClick={(e) => {if(!disabled){return onItemSelect(item)}}}>
                    <CheckBox checked={checked} disabled={disabled}></CheckBox>
                    <span>{item.title}</span>
                </li>
            )
        })
        return listItems
    }
    getCheckStatus(filteredItems) {
        const {checkedKeys} = this.props;
        if (checkedKeys.length === 0) {
            return 'none';
        }
        if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
            return 'all';
        }
        return 'part';
    }
    getCheckBox(filteredItems,onItemSelectAll,disabled){
        const checkStatus = this.getCheckStatus(filteredItems);
        const checkedAll = checkStatus === 'all';
        const checkAllCheckbox = (
            <CheckBox
                disabled={disabled}
                checked={checkedAll}
                indeterminate={checkStatus === 'part'}
                onChange={() => {
                    onItemSelectAll(
                        filteredItems.filter(item => !item.disabled).map(({key}) => key),
                        !checkedAll
                    )
                }}
            />
        );
        return checkAllCheckbox
    }
    render(){
        const {titleText, dataSource, onItemSelect, selectedKeys, onItemSelectAll, disabled, showSearch, style} = this.props
        const checkAllCheckbox = this.getCheckBox(
            dataSource,
            onItemSelectAll,
            disabled
        );
        const className = classNames({
            "sc-transfer-list-body": true,
            'sc-transfer-list-body-width-search': false,
            'sc-transfer-list-body-width-search': showSearch
        });
        return (
            <div className="sc-transfer-list" style={style}>
                <div className="sc-transfer-list-header">
                    {/* <CheckBox checked={checkedAll} onChnage={()=>onItemSelectAll}></CheckBox> */}
                    {checkAllCheckbox}
                    {/* <span>6项 </span> */}
                    <span className="sc-transfer-list-header-title">{titleText}</span>
                </div>
                <div className={className}>
                    {/* <div className="sc-transfer-list-body-search-wrapper">
                        {this.searchBody()}
                    </div> */}
                    {this.searchBody()}
                    <ul className="sc-transfer-list-content">
                        {this.listBody()}
                    </ul>
                    
                </div>
            </div>
        )
    }
}

export default List;