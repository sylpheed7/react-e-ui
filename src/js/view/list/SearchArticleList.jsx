import ContentHead from '../../../components/ContentHead/ContentHead';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Card from '../../../components/Card/Card';
import '../../../scss/pageLayout/searchArticleList.scss';

class SearchArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let taskBody = null,
            basicListBody = null;

        return (
            <React.Fragment>
                <ContentHead title="搜索列表">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <i className="icon icon-zhiye" />
                            首页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">列表页</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>搜索列表（文章）</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="search-bar">
                        <input type="text" placeholder="请输入"/>
                        <button>搜索</button>
                    </div>
                </ContentHead>
                <Card>{taskBody}</Card>
                <Card>{basicListBody}</Card>
            </React.Fragment>
        )
    }
}

export default SearchArticleList;
