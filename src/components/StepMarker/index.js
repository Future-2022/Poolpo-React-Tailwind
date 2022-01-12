import React from 'react'

import tick from '../../img/tick.png';


const StepMarker = (props) => {

    const getValue = () => {

        if (props.stringValue) {
            return !!props.self ? props.self : "";
        } else {
            if (props.raw) {
                return !!props.self ? props.self : "";
            } else {
                if (props.list) {
                    let filtered = props.list.filter(i => i.id === props.self);
                    if (!!filtered && filtered.length !== 0) {
                        return filtered[0].name;
                    } else {
                        return " ";
                    }
                } else {
                    return " ";
                }
            }

        }

    }

    return (
        <div className={`w-full pb-12 ${props.pointer ? `cursor-pointer` : ``}`} onClick={props.onClick}>
            <div className="w-full flex items-center pb-2">
                {props.step > props.number && props.tick ?
                    <div className={`w-10 h-10 rounded-full bg-green3 text-gray font-OpenSansSemiBold text-2xl text-center flex items-center ${props.step === props.number ? `` : `opacity-30`}`}>
                        <span className="mx-auto">
                            <img src={tick} alt="" />
                        </span>
                    </div>
                    :
                    <div className={`w-10 h-10 rounded-full bg-green3 text-gray font-OpenSansSemiBold text-2xl text-center flex items-center ${props.step === props.number ? `` : `opacity-30`}`}><span className="mx-auto">{props.number}</span></div>
                }
                <p className={`pl-8 text-lg font-OpenSansSemiBold text-gray ${props.step === props.number ? `` : `opacity-30`}`}>{props.content}</p>
            </div>
            <p className="pl-18 pr-3 font-OpenSansSemiBold text-xl text-black h-4 leading-tight">{getValue()}</p>
        </div>
    )
}

export default StepMarker;
