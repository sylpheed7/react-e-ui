
import RCPagination from 'rc-pagination';
import Select from 'rc-select';

import './index.scss';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {showSizeChanger, pageSize, current, onShowSizeChange, pageSizeOptions, onChange, total, showTotal, other} = this.props;

        console.log(this.props)
        return (
            <div>
                
                <RCPagination
                    selectComponentClass={Select}
                    showSizeChanger={!!showSizeChanger}
                    showQuickJumper={{goButton: <button>确定</button>}}
                    defaultPageSize={pageSize}
                    defaultCurrent={current}
                    onShowSizeChange={onShowSizeChange}
                    pageSizeOptions={pageSizeOptions}
                    onChange={onChange}
                    total={total}
                    pageSize={pageSize ? pageSize : 10}
                    showTotal={showTotal}
                    {...other}
                />
            </div>
        );
    }
}
export default Pagination;
