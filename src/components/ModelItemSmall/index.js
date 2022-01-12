import React from 'react'


const ModelItemSmall = (props) => {
    return (
        <p className={`${props.item === props.model ? `bg-gray-200` : ``} text-lg md:text-xl font-OpenSansRegular text-gray1 px-4 py-2 border-b border-gray-200 cursor-pointer`} onClick={() => props.onClick(props.content)}>{props.content}</p>
    )
}

export default ModelItemSmall;

