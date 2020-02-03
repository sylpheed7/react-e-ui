import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Icon from '../Icon/Icon';
import isEqual from 'lodash/isEqual';


import moment, {months} from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = true;

if (cn) {
    moment.locale('zh-cn');
} else {
    moment.locale('en-gb');
}

const now = moment();
if (cn) {
    now.utcOffset(8);
} else {
    now.utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
    <TimePickerPanel
        defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
    />
);

function newArray(start, end) {
    const result = [];
    for (let i = start; i < end; i+=1) {
        result.push(i);
    }
    return result;
}


function disabledTime(time, type) {
    if (type === 'start') {
        return {
            disabledHours() {
                const hours = newArray(0, 60);
                hours.splice(20, 4);
                return hours;
            },
            disabledMinutes(h) {
                if (h === 20) {
                    return newArray(0, 31);
                } else if (h === 23) {
                    return newArray(30, 60);
                }
                return [];
            },
            disabledSeconds() {
                return [55, 56];
            }
        };
    }
    return {
        disabledHours() {
            const hours = newArray(0, 60);
            hours.splice(2, 6);
            return hours;
        },
        disabledMinutes(h) {
            if (h === 20) {
                return newArray(0, 31);
            } else if (h === 23) {
                return newArray(30, 60);
            }
            return [];
        },
        disabledSeconds() {
            return [55, 56];
        }
    };
}

function isValidRange(v) {
    return v && v[0] && v[1];
}

export default class RangeCalendarPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled,
            value: this.props.defaultValue || [],
            allowClear: this.props.defaultValue ? true : false
        }
        this.calendarContainerRef = React.createRef();
    }

    static defaultProps = {
        separator: '~',
        formatStr: 'YYYY-MM-DD'
    }

    disabledDate = (current) => {
        const date = moment();
        const currentMoment = current ? current : date;
        date.hour(0);
        date.minute(0);
        date.second(0);

        let {
            minValue,
            maxValue
        } = this.props;

        if (minValue && current.isBefore(minValue)) {
            return true;
        }

        if (maxValue && current.isAfter(maxValue)) {
            return true;
        }

        return this.props.afterToday ? currentMoment.isBefore(date) : null;  // can not select days before today
    }

    format(v) {
        return v ? moment(v).format(this.props.formatStr) : '';
    }

    onChange = (value) => {
        this.setState({
            value,
            allowClear: true
        });

        if(this.props.onChange) {
            this.props.onChange(value.map((v) => {return this.format(v)}));
        }
    }

    handelClear = (e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        this.setState({
            value: [],
            allowClear: false
        });

        if (this.props.onChange) {
            this.props.onChange('');
        }
    }
    renderClearBtn() {
        const {allowClear, defaultValue, disabled} = this.props;

        const flag = (defaultValue || this.state.value) && (allowClear && this.state.allowClear) && !disabled;

        return flag ? (<Icon onClick={this.handelClear} className="clear" type="deleted" />) : '';
    }

    onOk = (e) => {
        // this.setState({
        //     disabled: false
        // })
    }

    componentDidUpdate(prevProps) {
        if(!isEqual(this.props.defaultValue, prevProps.defaultValue)) {
            this.setState({
                defaultValue: this.props.defaultValue,
                value: this.props.defaultValue
            })
        }
    }

    render() {
        const state = this.state;
        const {value, style, showToday, showTime, allowClear, disabledDate, formatStr, defaultValue, showOk, showDateInput, className, separator, onChange, dateInputPlaceholder, ...other} = this.props;
        const calendar = (
            <RangeCalendar
                disabledDate={disabledDate || this.disabledDate}
                onOk={this.onOk}
                showOk={showOk || false}
                locale={cn ? zhCN : enUS}
                showDateInput={showDateInput || false}
                showToday={showToday || false}
                showWeekNumber={false}
                dateInputPlaceholder={dateInputPlaceholder || ['start', 'end']}
                defaultValue={state.defaultValue ? [moment(state.defaultValue[0]), moment(state.defaultValue[1])] : [now, now.clone().add(1, 'months')]}
                timePicker={showTime ? timePickerElement : null}
                disabled={state.disabled}
                {...other}
            />
        );
        // console.log(state.value.length > 0 ? [moment(state.value[0]), moment(state.value[1])]: []);
        return (
            <Picker
                value={state.value.length > 0 ? [moment(state.value[0]), moment(state.value[1])]: []}
                onChange={this.onChange}
                animation="slide-up"
                calendar={calendar}
                align={{offset: [0, 33]}}
                // defaultValue={[now, now]}
                getCalendarContainer={() => {return this.calendarContainerRef.current;}}
                disabled={state.disabled}
                {...other}
            >
                {
                    ({value}) => {
                        
                        return (
                            <div className={classNames('calendar-picker-box', className)} style={style}>
                                <input placeholder="请选择日期"
                                    disabled={state.disabled}
                                    readOnly
                                    className="date-picker-input"
                                    value={(isValidRange(value) && `${this.format(value[0])} ${separator} ${this.format(moment(value[1]))}`) || ''}
                                />
                                {this.renderClearBtn()}
                                <Icon type="calendar" />
                                <div className="datePicker" ref={this.calendarContainerRef} />
                            </div>
                        );
                    }
                }
            </Picker>);
    }
}
