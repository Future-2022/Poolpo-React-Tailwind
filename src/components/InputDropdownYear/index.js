import React, { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

import tick from '../../img/chevron-down-1.png';
import { checkEmail } from '../../services/utils';

import ModelItemSmall from '../ModelItemSmall';


const InputDropdownYear = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const [content, setContent] = useState("");

    const [error, setError] = useState(false);

    const [dropdown, setDropdown] = useState(false);

    const onFocus = () => {

        setFocus(true);
        setSpanState(true);

    }

    const onBlur = () => {

        setFocus(false);

        if (content.length === 0) {
            setSpanState(false);
        }

        if (props.type === "email") {
            setError(!checkEmail(content));
        }

    }

    const onChange = e => {
        setContent(e.target.value);
    }

    const onClose = () => {
        setDropdown(false);
    }

    useEffect(() => {

        if (dropdown) {
            onFocus();
        } else {
            onBlur();
        }

    }, [dropdown]);

    const changeOption = (id) => {
        setContent(id);
        props.onChange(id);
        setDropdown(false);
    }

    useEffect(() => {
        setContent(props.selected);
        if (props.list.length !== 0 && props.selected.length !== 0 && props.list.includes(props.selected)) {
            setSpanState(true);
        }
    }, [props.list, props.selected]);

    return (
        <OutsideClickHandler
            onOutsideClick={onClose}
        >
            <div className="w-full relative h-56 sm:z-5">
                <img src={tick} alt="" className="absolute top-3 right-4 z-10 cursor-pointer" onClick={() => setDropdown(!dropdown)} />
                <div className="w-full relative z-0" onClick={() => setDropdown(true)}>
                    <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (error ? `border border-red-800` : `border-none`)}`}>
                        {spanstate &&
                            <span className={`absolute left-6 top-0 ${error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                        }
                        <input type={props.type} className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" value={content} placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                </div>
                {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>}
                {dropdown && props.list.length !== 0 &&
                    <div className="w-full mt-2 bg-white rounded-xl px-3 py-2 sm:z-20">
                        <div className="w-full relative model-select bg-white pb-4 z-20 h-32 sm:h-288">

                            {props.list.map(item => (
                                <ModelItemSmall key={item} content={item} item={item} model={props.selected} onClick={(id) => changeOption(id)} />
                            ))}

                        </div>
                    </div>
                }
            </div>
        </OutsideClickHandler>
    )
}

export default InputDropdownYear;
