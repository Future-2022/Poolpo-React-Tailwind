import React, { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

import tick from '../../img/chevron-down-1.png';

import ModelItemSmall from '../ModelItemSmall';


const InputDropdownBrand = (props) => {

    const [focus, setFocus] = useState(false);
    const [spanstate, setSpanState] = useState(false);

    const [content, setContent] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const [dropdown, setDropdown] = useState(false);
    const [listItems, setListItems] = useState([]);

    useEffect(() => {

        setContent(!!props.initialValue ? props.initialValue : "");

    }, [props.initialValue]);

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

    const onClose = () => {
        setDropdown(false);
    }

    const setDropdownVariables = inputValue => {
        let _filtered = props.list.filter((item) => {
            return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
        });
        setContent(inputValue);
        setListItems(_filtered);
    }

    useEffect(() => {

        if (dropdown) {
            onFocus();
        } else {
            if (content !== selectedValue) {
                let _selected = props.list.filter(i => i.id === props.selected)[0]?.name;
                if (!!_selected) {
                    setSelectedValue(_selected);
                    setDropdownVariables(_selected);
                }
                else {
                    setContent("");
                    setSelectedValue("");
                    setListItems(props.list);
                }
            }
            onBlur();
        }

    }, [dropdown]);

    const changeOption = (id) => {
        let _content = props.list.filter(i => i.id === id)[0].name;
        setContent(_content);
        setSelectedValue(_content);
        props.onChange(id);
        setDropdown(false);
    }

    useEffect(() => {
        setContent(props.list.filter(i => i.id === props.selected).length !== 0 ? props.list.filter(i => i.id === props.selected)[0].name : props.initialValue);
        if (props.list.length !== 0 && props.selected !== 0 && props.list.filter(i => i.id === props.selected).length > 0) {
            setSpanState(true);
        }
        setListItems(props.list);
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
                        <input type={props.type} className="w-full py-2 pr-6 outline-none font-OpenSansRegular text-gray1 text-lg z-0" value={content} placeholder={`${focus ? `` : props.name}`} formNoValidate="formNoValidate" onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                </div>
                {!dropdown && <p className={`text-red px-5 text-sm text-left z-0" + ${props.error ? "visible" : "invisible"}`}>{props.errorMsg}</p>}
                {dropdown && listItems.length !== 0 &&
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

export default InputDropdownBrand;
