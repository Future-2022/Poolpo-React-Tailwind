import React, { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';
import { BrowserView, MobileView } from 'react-device-detect';
import DatePicker from 'rmc-date-picker';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

import left from '../../img/chevron-left.png';
import right from '../../img/chevron-right.png';
import calendar from '../../img/calendar.png';
import { add } from 'lodash';


const InputCalendar = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(true);

    const [content, setContent] = useState("");
    const [contentChanged, setContentChanged] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [dateFormat, setDateFormat] = useState("DD/MM/yyyy");

    const [date, setDate] = useState(!!props.date ? moment(new Date(props.date)) : moment());

    const [currentDate, setCurrentDate] = useState(!!props.date ? moment(new Date(props.date)) : moment());

    const [store, setStore] = useState(moment());

    useEffect(() => {

        setDate(moment(new Date(props.date)));

    }, [props.date]);

    useEffect(() => {
        if (!!props.format)
            setDateFormat(props.format);
    }, []);

    const beforeDate = () => {
        return currentDate.clone().startOf('month').day();
    }

    const afterDate = () => {
        return currentDate.clone().endOf('month').day();
    }

    const monthLength = () => {
        return currentDate.daysInMonth();
    }

    const onFocus = e => {

        setFocus(true);
        setSpanState(true);

    }

    const onBlur = () => {

        setFocus(false);

        if (content.length === 0) {
            setSpanState(false);
        }

        if (!!content && contentChanged) {
            let _changedDate = content;
            let _selDate = moment(_changedDate, dateFormat);
            if (!_selDate.isValid) _selDate = moment();
            if (!!props.startDate) {
                if (_selDate.diff(props.startDate, "days") < 0)
                    _selDate = props.startDate;
            }
            if (!!props.endDate) {
                if (_selDate.diff(props.endDate, "days") > 0)
                    _selDate = props.endDate;
            }
            setDate(_selDate);
            setContentChanged(false);
        }
    }

    const onChange = e => {
        setContent(e.target.value);
        setContentChanged(true);
    }

    const previousMonth = () => {

        if (!!props.startDate) {
            if (props.startDate.isSameOrAfter(currentDate.clone().subtract(1, 'months'))) {
                setDate(props.startDate);
            } else {
                setDate(currentDate.clone().subtract(1, 'months'));
            }
        } else {
            setDate(currentDate.clone().subtract(1, 'months'));
        }

    }

    const nextMonth = () => {

        if (!!props.endDate) {
            if (props.endDate.isSameOrBefore(currentDate.clone().add(1, 'months'))) {
                setDate(props.endDate);
            } else {
                setDate(currentDate.clone().add(1, 'months'));
            }
        } else {
            setDate(currentDate.clone().add(1, 'months'));
        }

    }

    const curretMonthYear = () => {

        var option1 = { month: 'long' };
        var option2 = { year: 'numeric' };

        return capitalize(new Date(currentDate).toLocaleDateString("es-ES", option1)) + " " + new Date(currentDate).toLocaleDateString("es-ES", option2);

    }

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    const changeDate = day => {
        console.log("day------", day);
        if (!!props.startDate) {
            if (!!props.endDate) {
                if (props.endDate.isSameOrAfter(currentDate.clone().set('date', day)) && props.startDate.isSameOrBefore(currentDate.clone().set('date', day + 1))) {
                    setDate(currentDate.clone().set('date', day));
                    setDropdown(false);
                }
            } else {
                if (props.startDate.isSameOrBefore(currentDate.clone().set('date', day - 1))) {
                    setDate(currentDate.clone().set('date', day));
                    setDropdown(false);
                }
            }
        } else {
            if (!!props.endDate) {
                if (props.endDate.isSameOrAfter(currentDate.clone().set('date', day))) {
                    setDate(currentDate.clone().set('date', day));
                    setDropdown(false);
                }
            } else {
                setDate(currentDate.clone().set('date', day));
                setDropdown(false);
            }
        }
    }

    useEffect(() => {
        setCurrentDate(date);
        let format = "MM/DD/yyyy";
        props.onChange(date.format(format));
        if (!!dateFormat) {
            format = dateFormat;
        }
        setContent(date.format("DD/MM/yyyy"));

    }, [date]);

    useEffect(() => {

        if (dropdown) {
            onFocus();
        } else {
            onBlur();
            setStore(date);
        }

    }, [dropdown]);

    const onClose = () => {

        setDropdown(false);
    }

    const setMobileDate = (newDate) => {
        console.log("newDate-----", newDate);

        if (!!props.startDate) {
            if (!!props.endDate) {
                if (props.endDate.isSameOrAfter(newDate) && props.startDate.isSameOrBefore(newDate)) {
                    setDate(moment(newDate));
                }
            } else {
                if (props.startDate.isSameOrBefore(newDate)) {
                    setDate(moment(newDate));
                }
            }
        } else {
            if (!!props.endDate) {
                if (props.endDate.isSameOrAfter(newDate)) {
                    setDate(moment(newDate));
                }
            } else {
                setDate(moment(newDate));
            }
        }

    }

    useEffect(() => {

        onFocus();

    }, [content])

    const datePicker = (
        <DatePicker
            rootNativeProps={{ 'data-xx': 'yy' }}
            defaultDate={(moment(store).toDate()) || new Date()}
            mode={'date'}
            minDate={!!props.startDate ? props.startDate.toDate() : new Date(1950, 1, 1)}
            maxDate={!!props.endDate ? props.endDate.toDate() : new Date(2050, 12, 31)}
            onDateChange={(newDate) => setStore(newDate)}
        />
    );

    return (
        <>
            <BrowserView>
                <OutsideClickHandler
                    onOutsideClick={onClose}
                >
                    <div className="w-full relative h-56 z-0">
                        <img src={calendar} alt="" className="absolute top-3 right-4 z-5 cursor-pointer" onClick={() => setDropdown(!dropdown)} />
                        <div className="w-full relative z-0">
                            <div className={`bg-white rounded-2xl px-6 py-2 relative z-0 ${focus ? `border border-purple` : (props.error ? `border border-red-800` : `border-none`)}`}>
                                {spanstate &&
                                    <span className={`absolute left-6 top-0 ${props.error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                                }
                                <input type="text" className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" onClick={() => setDropdown(true)} placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={content} />
                            </div>
                        </div>
                        {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`} >{props.errorMsg}</p>}
                        {dropdown &&
                            <div className="w-full relative model-select mt-2 rounded-xl bg-white px-6 py-6 shadow-lg" style={{ maxWidth: "400px", minWidth: "252px" }}>
                                <div className="flex items-center justify-between pb-2">
                                    <p className="font-PoppinsMedium text-black text-xl">{curretMonthYear()}</p>
                                    <div className="flex items-center">
                                        <img src={left} alt="" className="cursor-pointer" onClick={previousMonth} />
                                        <img src={right} alt="" className="cursor-pointer" onClick={nextMonth} />
                                    </div>
                                </div>

                                <div className="w-full grid grid-cols-7 col-gap-1">
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">D</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">L</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">M</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">M</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">J</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">V</div>
                                    <div className="mx-auto opacity-25 text-black font-RobotoRegular text-base">S</div>
                                </div>

                                <div className="w-full grid grid-cols-7 col-gap-1">
                                    {Array(beforeDate()).fill(0).map((item, index) => (
                                        <div key={index} className="mx-auto text-black font-RobotoRegular text-base"></div>
                                    ))}
                                    {Array(monthLength()).fill(0).map((item, index) => (
                                        <div key={index} className={`mx-auto w-8 h-6 text-center ${date.get('year') === currentDate.get('year') && date.get('month') === currentDate.get('month') && date.get('date') === index + 1 ? `text-white bg-green3 rounded-md` : `text-black bg-white`} font-RobotoRegular text-base cursor-pointer`} onClick={() => changeDate(index + 1)}>{index + 1}</div>
                                    ))}
                                    {Array(6 - afterDate()).fill(0).map((item, index) => (
                                        <div key={index} className="mx-auto text-black font-RobotoRegular text-base"></div>
                                    ))}
                                </div>

                            </div>
                        }
                    </div>
                </OutsideClickHandler>
            </BrowserView>
            <MobileView>
                <div className="w-full relative h-56 z-0">
                    <img src={calendar} alt="" className="absolute top-3 right-4 z-5 cursor-pointer" onClick={() => setDropdown(!dropdown)} />
                    <div className="w-full relative z-0">
                        <div className={`bg-white rounded-2xl px-6 py-2 relative z-0 ${focus ? `border border-purple` : (props.error ? `border border-red-800` : `border-none`)}`}>
                            {spanstate &&
                                <span className={`absolute left-6 top-0 ${props.error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                            }
                            <input type="text" readOnly={true} className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" onClick={() => setDropdown(true)} placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={content} />
                        </div>
                    </div>
                    {/* {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>} */}
                    <PopupDatePicker
                        title={props.name}
                        datePicker={datePicker}
                        transitionName="rmc-picker-popup-slide-fade"
                        maskTransitionName="rmc-picker-popup-fade"
                        visible={dropdown}
                        onDismiss={() => setDropdown(false)}
                        onOk={() => { setMobileDate(store); setDropdown(false); }}
                        okText="OK"
                        dismissText="CANCEL"
                    />
                </div>
            </MobileView>
        </>
    )
}

export default InputCalendar;
