import React, { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

import tick from '../../img/chevron-down-1.png';

import ModelItemSmall from '../ModelItemSmall';


const InputDropdownState = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const [content, setContent] = useState(props.content);
    const [stateName, setStateName] = useState("");

    const [dropdown, setDropdown] = useState(false);
    const [listItems, setListItems] = useState([]);

    const onFocus = () => {

        setFocus(true);
        setSpanState(true);

    }

    const onBlur = () => {

        setFocus(false);

        if (!!content && content.length === 0) {
            setSpanState(false);
        }

    }

    const onChange = e => {
        let inputValue = e.target.value;
        setDropdownVariables(inputValue);
    }

    const setDropdownVariables = inputValue => {
        let _filtered = props.list.filter((item) => {
            return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
        });
        setContent(inputValue);
        setListItems(_filtered);
    }

    const onClose = () => {
        setDropdown(false);
    }

    useEffect(() => {
        setListItems(props.list);
    }, [props.list]);

    useEffect(() => {
        if (dropdown) {
            onFocus();
        } else {
            if (content !== stateName) {
                let state = props.list.filter(i => i.id === props.selected)[0]?.name;
                if (!!state) {
                    setStateName(state);
                    setDropdownVariables(state);
                }
                else {
                    setContent("");
                    setStateName("");
                    setListItems(props.list);
                }
            }
            onBlur();
        }

    }, [dropdown]);

    const changeOption = (id) => {
        let state = props.list.filter(i => i.id === id)[0].name;
        setContent(state);
        setStateName(state);
        props.onChange(id);
        setDropdown(false);
    }

    useEffect(() => {

        if (props.list.length !== 0 && props.selected !== 0) {
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
                    <div className={`bg-white rounded-2xl px-5 py-2 relative z-0 ${focus ? `border border-purple` : (props.error ? `border border-red-800` : `border-none`)}`}>
                        {spanstate &&
                            <span className={`absolute left-6 top-0 ${props.error ? `text-red-800` : `text-purple`} text-xs z-0`}>{props.name}</span>
                        }
                        <input type={props.type} value={content} className="w-full py-2 outline-none font-OpenSansRegular text-gray1 text-lg z-0" placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} autoComplete="false" />
                    </div>
                </div>
                {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>}
                {dropdown && !!listItems && listItems.length !== 0 &&
                    <div className="w-full mt-2 bg-white rounded-xl px-3 py-2 sm:z-20">
                        <div className="w-full relative model-select bg-white pb-4 z-20 h-32 sm:h-288">

                            {listItems.map(item => (
                                <ModelItemSmall key={item.id} content={item.name} item={item.id} model={props.selected} onClick={(id) => changeOption(id)} />
                            ))}

                        </div>
                    </div>
                }
            </div>
        </OutsideClickHandler>
    )
}

export default InputDropdownState;
