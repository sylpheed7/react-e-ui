import './index.scss'
// import {validProgress} from './utils';

function validProgress(progress) {
    if (!progress || progress < 0) {
        return 0;
    }
    if (progress > 100) {
        return 100;
    }
    return progress;
}
// '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
class Progress extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {percent} = this.props
        const percentStyle = {
            // width:'100%',
            transform: `translate(${validProgress(percent)}%, 0)`,
            height: 8
            // borderRadius: strokeLinecap === 'square' ? 0 : '',
            // ...backgroundProps,
        }
        return (
            <div>
                <div className="progress-outer">
                    <div className="progress-inner">
                        <div className="progress-bg" style={percentStyle}></div>
                    </div>
                </div>
                <span className="progress-text">{validProgress(percent)+'%'}</span>
            </div>
        )
    }
}
export default Progress;