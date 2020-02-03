import Button from '../Button/Button'
import Icon from '../Icon/Icon';
const Operation = ({
    leftArrowText,
    rightArrowText,
    moveToLeft,
    moveToRight,
    disabled
}) => (
    <React.Fragment>
        <Button
            disabled={disabled}
            className="opration-btn"
            round
            type="primary"
            onClick={moveToRight}
            icon="right"
        >
            {/* <Icon type="right-arrows"></Icon> */}
            {/* {rightArrowText} */}
        </Button>
        <Button
            disabled={disabled}
            className="opration-btn"
            type="primary"
            round
            onClick={moveToLeft}
            icon="left"
        >
            {/* <Icon type="left-arrows"></Icon> */}
            {/* {leftArrowText} */}
        </Button>
    </React.Fragment>
)
export default Operation;