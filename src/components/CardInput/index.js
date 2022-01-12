import React, { useState } from 'react'

import cardsmall from '../../img/card-small.png';
import { checkEmail } from '../../services/utils';


const CardInput = (props) => {

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

        if (props.type === "email") {
            setError(!checkEmail(props.content));
        }

    }

    const onChange = e => {
        props.onChange(e);
    }

    return (
        <div className="w-full relative z-0" style={{ minHeight: "56px" }}>
            <img src={cardsmall} alt="" className="absolute top-3 right-4 z-10 cursor-pointer" />

            <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (error ? `border border-red-800` : `border-none`)}`}>
                {spanstate &&
                    <span className={`absolute left-6 top-0 ${error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                }
                <input type={props.type} className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
            </div>
            {error && props.type === "email" &&
                <p className="text-red text-sm text-center z-0">Colocá tu email correcamente (Ej: juanperez@gmail.com</p>
            }
        </div>
    )
}

export default CardInput;
