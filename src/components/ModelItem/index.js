import React from 'react'

import { removeSeveralSpace } from '../../services/utils';


const ModelItem = (props) => {
    return (
        <p className={`${removeSeveralSpace(props.item) === removeSeveralSpace(props.group) ? `bg-gray-200` : ``} text-base md:text-lg font-OpenSansRegular text-gray1 px-2 sm:px-4 py-3 border-b border-gray-200 cursor-pointer`} onClick={props.onClick}>{props.name}</p>
    )
}

export default ModelItem;
