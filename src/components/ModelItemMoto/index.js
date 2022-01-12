import React from 'react'
import { removeSeveralSpace } from '../../services/utils'


const ModelItemMoto = (props) => {
    return (
        <p className={`${removeSeveralSpace(props.item) === removeSeveralSpace(props.group) ? `font-OpenSansBold text-purple` : `font-OpenSansRegular text-gray1`} text-base md:text-lg px-2 sm:px-4 py-3 border-b border-gray-200 cursor-pointer`} onClick={props.onClick}>{props.name}</p>
    )
}

export default ModelItemMoto;
