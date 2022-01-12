import React from 'react'

import unchecked from '../../img/unchecked.png';
import checked from '../../img/checked.png';


const QuotationCheckBox = (props) => {

    return (
        <div className="w-full flex justify-start cursor-pointer" onClick={() => props.onChange(props.label)}>
            <img src={props.state ? checked : unchecked} alt="unchecked" className="w-6 h-6" />
            <p className="pl-2 font-OpenSansRegular text-lg text-gray capitalize select-none">{props.label}</p>
        </div>
    )
}

export default QuotationCheckBox;
