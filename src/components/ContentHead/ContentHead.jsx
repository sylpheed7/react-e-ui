import './index.scss';

/*设置标题*/
const ContentHead = props => {
    return (
        /*设置样式*/
        <div className={classNames(props.className, 'content-head')} style={props.style}>
            {props.children}
            {/*标题*/}
            <h1 className="title">{props.title}</h1>
            {/*小标题和正文*/}
            {props.text && <p className="text">{props.text}</p>}
        </div>
    );
};
/*定义模块的对外接口，输出默认函数*/
export default ContentHead;
