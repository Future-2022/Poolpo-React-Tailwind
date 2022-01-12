import React, { useState, useEffect } from 'react'

import './index.css'


const CustomInput = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const onFocus = () => {

        if (!props.readOnly) {
            setFocus(true);
            setSpanState(true);
        }

    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    const onBlur = () => {

        setFocus(false);

        if (props.content.length === 0) {
            setSpanState(false);
        }

    }

    const onChange = e => {
        if (!props.readOnly) {
            if (props.type === "number") {
                if ((!!e.target.value && /^\d+$/.test(e.target.value)) || !e.target.value) {
                    props.onChange(e);
                }
            } else {
                props.onChange(e);
            }
        }
    }

    const onKeyDown = e => {
        if (props.type === "number" && !((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 46 || (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86)))) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        if (!!props.content) {
            setSpanState(true);
        }
    }, [props.content]);

    return (
        <div className="w-full relative z-0" style={{ minHeight: "56px"}}>
            <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (props.error ? `border border-red-800` : `border-none`)}`}>
                {spanstate &&
                    <span className={`absolute left-6 top-0 ${props.error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                }
                <input
                    type={props.type}
                    // pattern="\d*"
                    // inputMode={props.type === "number" ? "decimal" : "none"}
                    name={props.name}
                    className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0"
                    value={props.content}
                    placeholder={`${focus ? `` : props.name}`}
                    formNoValidate="formNoValidate"
                    onChange={e => onChange(e)}
                    onKeyDown={e => onKeyDown(e)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    readOnly={props.readOnly}
                />
            </div>
            <p className={`text-red px-5 text-sm text-left z-0 ${props.error ? `block` : `hidden`}`}>{props.errorMsg}</p>

        </div>

    )
}

export default CustomInput;
