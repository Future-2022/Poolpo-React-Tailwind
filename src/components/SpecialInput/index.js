import React, { useState } from 'react'


const SpecialInput = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const [error, setError] = useState(false);

    const onFocus = e => {

        setFocus(true);
        setSpanState(true);

    }

    const onBlur = e => {

        setFocus(false);

        if (props.content.length === 0) {
            setSpanState(false);
        }

    }

    const onChange = e => {
        props.onChange(e);
    }

    return (
        <div className="w-full relative z-0" style={{ minHeight: "56px" }}>
            <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (error ? `border border-red-800` : `border-none`)}`}>
                {spanstate &&
                    <span className={`absolute left-6 top-0 ${error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                }
                <input type={props.type} className="w-full px-1 py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" value={!!props.content ? props.content : ""} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                {!spanstate &&
                    <p className="font-OpenSansRegular text-black text-lg absolute top-4 left-4">Ingresá a su <span className="font-OpenSansBold text-purple underline">sitio web</span></p>
                }
            </div>
        </div>
    )
}

export default SpecialInput;
