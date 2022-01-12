import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';

import downgreen from '../../img/down-green.png';
import upgreen from '../../img/up-green.png';


const Question = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={props.hr ? "border-b-2 pb-2 sm:pb-4" : "pb-2 sm:pb-4"}>
            <div className="flex items-center justify-between pt-8 pb-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <p className={open ? "text-green1 text-base sm:text-xl font-OpenSansBold" : "text-black text-base sm:text-xl font-OpenSansRegular"}>{props.title}</p>
                <img src={open ? upgreen : downgreen} alt="" />
            </div>
            {open &&
                <ReactMarkdown className="text-sm sm:text-lg text-black font-OpenSansRegular tracking-wide pl-2">{props.description}</ReactMarkdown>

            }
        </div>
    )
}

export default Question;
