import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';

import './index.css';

import search from '../../img/search.png';


const AutoComplete = (props) => {

    const [completed, setCompleted] = useState(true);

    const onClose = () => {
        setCompleted(true);
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            props.goSteps();
        }
    }

    const clickItem = (item) => {
        props.receiveInput(item);
    }

    const onFocus = () => {
        setCompleted(false)
    }

    return (
        <OutsideClickHandler
            onOutsideClick={onClose}
        >
            <div className="w-full relative">
                <div className="flex">
                    <div className="flex items-center text-center mx-auto">
                        <input
                            type="text"
                            className="w-full h-56 bg-white px-6 py-4 font-OpenSansRegular text-gray1 text-lg rounded-tl-2xl rounded-bl-2xl"
                            placeholder={props.placeholder}
                            value={props.carinput}
                            onFocus={(e) => { onFocus(); }}
                            onChange={e => props.handleCarInput(e.target.value)}
                            onKeyDown={e => handleKeyDown(e)}
                            onClick={() => setCompleted(false)}
                        />
                        <button className="h-56 bg-pink2 px-6 py-3 rounded-tr-2xl rounded-br-2xl" onClick={() => props.goSteps(props.carinput)}>
                            <img src={search} alt="" className="" />
                        </button>
                    </div>
                </div>
                {props.carlist.length !== 0 && !completed &&
                    <div className="w-full list-wrapper absolute z-50 bg-white rounded-lg shadow-lg px-2 py-2 overflow-y-auto" style={{ top: "64px", maxHeight: "400px" }}>

                        {props.carlist.map(item => (
                            <p
                                key={item.brand + item.description}
                                className="border-b border-gray-600 py-3 font-OpenSansRegular text-gray1 text-lg cursor-pointer hover:bg-gray-200 text-left"
                                onClick={() => clickItem(item)}
                            >
                                {item.brand + " " + item.description}
                            </p>
                        ))}

                    </div>
                }
            </div>
        </OutsideClickHandler>
    )
}

export default AutoComplete;
