import { drop } from 'lodash';
import React, { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

import tick from '../../img/chevron-down-1.png';
import { checkEmail } from '../../services/utils';

import ModelItemSmall from '../ModelItemSmall';


const InputDropdown = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const [content, setContent] = useState("");

    const [error, setError] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [value, setValue] = useState('');

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
    const onClick = e => {
        console.log(e)
        setDropdown(false);
        setContent(e);
    }
    const onClose = () => {
        setDropdown(false);
    }

    useEffect(() => {
        console.log('change dropdown', dropdown)
        if (dropdown) {
            onFocus();
        } else {
            onBlur();
        }

    }, [dropdown])

    return (
        <OutsideClickHandler>
            <div className="w-full relative h-56 sm:z-5" onClick={() => { if (!dropdown) setDropdown(true)}}>
                <img src={tick} alt="" className="absolute top-3 right-4 z-10 cursor-pointer" onClick={() => setDropdown(!dropdown)} />
                <div className="w-full relative z-0">
                    <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (error ? `border border-red-800` : `border-none`)}`}>
                        {spanstate &&
                            <span className={`absolute left-6 top-0 ${error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                        }
                        <input type={props.type} className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={content}/>
                    </div>
                </div>
                {dropdown && props.list.length !== 0 &&
                    <div className="w-full mt-2 bg-white rounded-xl px-3 py-2 sm:z-20">
                        <div className="w-full relative model-select bg-white pb-4 z-20 h-32 sm:h-288">

                            {props.list.map(item => (
                                <ModelItemSmall key={item.id} content={item.content} item={item.id} model={1} onClick={onClick} />
                            ))}

                        </div>
                    </div>
                }
            </div>
        </OutsideClickHandler>
    )
}

export default InputDropdown;
