import React from 'react'

import check from '../../img/check.png';


const QuotationFilterMoto = (props) => {
    return (
        <div className={`flex items-center justify-center border border-purple ${props.selected ? `bg-pink10` : ``} cursor-pointer rounded-2xl h-16 text-center font-OpenSansRegular text-lg text-gray px-6 flex items-center ${props.margin ? `mr-3` : `mx-2`} `} onClick={() => props.onClick(props.item)}>
            {props.selected &&
                <img src={check} alt="check" className="pr-1" />
            }
            <p className={`flex text-purple whitespace-pre-line leading-none`}>{props.content.replace('<br/>', '\n')}</p>
        </div>
    )
}

export default QuotationFilterMoto;
