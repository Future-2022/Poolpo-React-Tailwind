import React from 'react'

import checkboxtrue from '../../img/checkbox-true.png';
import checkboxfalse from '../../img/checkbox-false.png';


const CustomCheckBox = (props) => {

    return (
        <div className="flex items-center cursor-pointer" onClick={props.onClick}>
            <img src={props.item === props.pay ? checkboxtrue : checkboxfalse} alt="checkbox" />
            <p className="pl-2 font-OpenSansRegular text-lg text-gray">{props.title}</p>
        </div>
    )
}

export default CustomCheckBox;
