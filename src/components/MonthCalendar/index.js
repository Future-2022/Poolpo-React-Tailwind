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

const MonthCalendar = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(true);

    const [content, setContent] = useState("");
    const [contentChanged, setContentChanged] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [dateFormat, setDateFormat] = useState("MM/yyyy");

    const [store, setStore] = useState(moment());

    const onFocus = () => {

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
            props.onChange(_selDate);
            setContentChanged(false);
        }

    }

    const onChange = e => {
        setContent(e.target.value);
        setContentChanged(true);
    }

    const previousYear = () => {
        if (moment().isSameOrBefore(props.date.clone().subtract(1, 'years'))) {
            props.onChange(props.date.clone().subtract(1, 'years'))
        } else {
            if (moment().isSameOrBefore(props.date.clone().subtract(1, 'years').set('months', 11))) {
                props.onChange(props.date.clone().subtract(1, 'years').set('months', 11))
            }
        }
    }

    const nextYear = () => {
        props.onChange(props.date.clone().add(1, 'years'))
    }

    const currentYear = () => {
        return props.date.get('year');
    }

    const changeMonth = month => {
        if (moment().isSameOrBefore(props.date.clone().set('months', month))) {
            props.onChange(props.date.clone().set('months', month));
            setDropdown(false);
        }
    }

    useEffect(() => {
        setContent(props.date.format("MM/yyyy"));
    }, [props.date]);

    useEffect(() => {

        if (dropdown) {
            onFocus();
        } else {
            onBlur();
            setStore(props.date)
        }

    }, [dropdown]);

    const onClose = () => {

        setDropdown(false);
    }

    const setMobileDate = (newDate) => {
        props.onChange(moment(newDate));
    }

    useEffect(() => {

        onFocus();

    }, [content]);

    const datePicker = (
        <DatePicker
            rootNativeProps={{ 'data-xx': 'yy' }}
            defaultDate={moment(store).toDate() || new Date(moment().add(1, 'months'))}
            mode={'month'}
            minDate={new Date(moment().add(1, 'months'))}
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
                        {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>}
                        {dropdown &&
                            <div className="w-full relative model-select mt-2 rounded-xl bg-white px-6 py-6 shadow-lg">
                                <div className="flex items-center justify-between pb-2">
                                    <img src={left} alt="" className="cursor-pointer" onClick={previousYear} />
                                    <p className="font-PoppinsMedium text-black text-xl">{currentYear()}</p>
                                    <img src={right} alt="" className="cursor-pointer" onClick={nextYear} />
                                </div>

                                <div className="w-full grid grid-cols-4 col-gap-1 row-gap-1">
                                    {Array(12).fill(0).map((item, index) => (
                                        <div key={index} className={`mx-auto w-8 h-6 text-center ${props.date.get('month') === index ? `text-white bg-green3 rounded-md` : `text-black bg-white`} font-RobotoRegular text-base cursor-pointer`} onClick={() => changeMonth(index)}>{index + 1}</div>
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
                    {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>}
                    <PopupDatePicker
                        title={props.name}
                        datePicker={datePicker}
                        transitionName="rmc-picker-popup-slide-fade"
                        maskTransitionName="rmc-picker-popup-fade"
                        visible={dropdown}
                        onOk={() => { setMobileDate(store); setDropdown(false); }}
                        onDismiss={() => setDropdown(false)}
                        okText="OK"
                        dismissText="CANCEL"
                    />
                </div>
            </MobileView>
        </>
    )
}

export default MonthCalendar;
