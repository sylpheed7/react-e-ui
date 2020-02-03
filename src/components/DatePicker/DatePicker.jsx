import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from './RangeCalendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import './index.scss';
import Icon from '../Icon/Icon';
import isEqual from 'lodash/isEqual';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

moment.locale('zh-cn');
const format = 'YYYY-MM-DD HH:mm:ss';
// const cn = location.search.indexOf('cn') !== -1;
const cn = true;

const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
    return time ? format : 'YYYY-MM-DD';
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

class DatePickers extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            showTime: false,
            locale: zhCN,
            disabled: props.disabled,
            allowClear: props.allowClear,
            showDateInput: false,
            afterToday: props.afterToday ? true : false,
            defaultValue: props.defaultValue,
            value: props.defaultValue ? moment(props.defaultValue) : null
        };

        // this.getLocale();

        this.calendarContainerRef = React.createRef();

        this.state.value && this.state.value.length > 0 && this.props.onChange(props.defaultValue || '');
    }
    static defaultProps = {
        formatStr: 'YYYY-MM-DD',
        defaultValue: ''
    }

    // async getLocale() {
    //     const aa = await import('rc-calendar/lib/locale/' + (this.props.locale || 'zh_CN'));

    //     this.setState({
    //         locale: aa.default
    //     })
    // }

    onChange = (value) => {
        this.setState({
            value,
            allowClear: true
        });

        if (this.props.onChange) {
            this.props.onChange(this.format(value));
        }
    }

    format(v) {
        return v ? moment(v).format(this.props.formatStr) : '';
    }

    disabledDate = (current) => {
        let {
            minValue,
            maxValue
        } = this.props;

        if (!current) {
            return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);

        if (minValue) {
            return current.valueOf() < minValue.valueOf();
        }

        if (maxValue) {
            return current.valueOf() > maxValue.valueOf();
        }

        return this.state.afterToday && current.valueOf() < date.valueOf();  // can not select days before today
    }

    handelClear = (e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();

        this.setState({
            value: null,
            allowClear: false
        });

        if (this.props.onChange) {
            this.props.onChange('');
        }
    }
    renderClearBtn() {
        const {allowClear, defaultValue, disabled} = this.props;

        const falg = (defaultValue || this.state.value) && (allowClear && this.state.allowClear) && !disabled;

        return falg ? (<Icon onClick={this.handelClear} className="clear" type="deleted" />) : '';
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.defaultValue !== prevProps.defaultValue) {
            this.setState({
                defaultValue: this.props.defaultValue,
                value: this.props.defaultValue
            });
        }
    }



    render() {
        const state = this.state;

        const {defaultValue, style, showTime, allowClear, value, disabledDate, locale, onChange, formatStr, className, disabled, ...other} = this.props;
        const calendar = (
            <Calendar
                locale={cn ? zhCN : enUS}
                timePicker={showTime ? timePickerElement : null}
                defaultValue={this.state.defaultValue ? moment(this.state.defaultValue) : undefined}
                showDateInput={state.showDateInput}
                disabledDate={disabledDate || this.disabledDate}
                disabled={state.disabled}
                {...other}
            />
        );

        return (
            <DatePicker
                value={state.value ? moment(state.value) : null}
                onChange={this.onChange}
                animation="slide-up"
                calendar={calendar}
                align={{offset: [0, 33]}}
                getCalendarContainer={() => {return this.calendarContainerRef.current;}}
                disabled={state.disabled}
                {...other}
            >
                {
                    ({value}) => {
                        return (
                            <div className={classNames('calendar-picker-box', className)} style={style}>
                                <input
                                    placeholder="请选择日期"
                                    disabled={state.disabled}
                                    className="date-picker-input"
                                    value={(value && this.format(value)) || ''}
                                    readOnly />
                                {this.renderClearBtn()}
                                <Icon type="calendar" />
                                <div className="datePicker" ref={this.calendarContainerRef} />
                            </div>);
                    }
                }
            </DatePicker>);
    }
}

DatePickers.RangePicker = RangeCalendar;


export default DatePickers;