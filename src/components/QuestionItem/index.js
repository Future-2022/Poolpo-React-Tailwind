import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';

import questionmark from '../../img/questionmark.png';
import downgray from '../../img/down-gray.png';
import upgray from '../../img/up-gray.png';


const QuestionItem = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full py-2 sm:py-5 relative z-20">
            <div className="w-full rounded-3xl shadow-xl px-4 sm:px-10 py-4 sm:py-8">

                <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
                    <div className="flex items-center">
                        <img src={questionmark} alt="" className="hidden sm:block" />
                        <p className="font-OpenSansRegular text-gray text-base sm:text-xl pl-0 sm:pl-8">{props.title}</p>
                    </div>
                    <img src={open ? upgray : downgray} alt="" />
                </div>
                {open &&
                    <div className="pl-0 sm:pl-24">
                        <ReactMarkdown className="font-OpenSansRegular text-gray1 text-base sm:text-lg px-0 sm:px-4">{props.answer}</ReactMarkdown>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuestionItem;
