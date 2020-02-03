import './index.scss';

/*设置小标题模块*/
const Card = props => {
    return (
        /*设置样式*/
        <div className={classNames(props.className, 'card')} style={props.style}>
            {/*判断是否是小标题*/}
            {
                props.cardHeadTit ? <h1 className="card-tit">{props.cardHeadTit}</h1> : ''
            }
            <div className="card-body">
                {props.cardBody}
                {props.children}
            </div>
        </div>
    );
};
/*定义模块的对外接口，输出默认函数*/
export default Card;