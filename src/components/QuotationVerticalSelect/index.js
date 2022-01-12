import React from 'react'

import star from '../../img/star.png';

import QuotationDetailsVertical from '../QuotationDetailsVertical';
import { formatNumber, insurerLogo } from '../../services/utils';


const QuotationVerticalSelect = (props) => {

    return (
        <div className={`w-full ${props.item === props.selected ? `bg-pink9` : ` bg-white`} relative mt-6 pt-12 pb-6 px-10 rounded-2xl`}>
            {props.item === props.selected &&
                <div className="flex items-center absolute left-10 top-0 h-8 bg-gradient-to-r from-purple1 to-purple2 rounded-lg">
                    <img src={star} alt="star" className="ml-1" />
                    <p className="font-SpartanSemiBold text-white text-xs px-1 text-center flex items-center pt-1">MEJOR COTIZACIÓN</p>
                </div>
            }
            <div className="w-full flex justify-between">
                <div>
                    <div className="w-full flex justify-between">
                        <p>
                            <span className={`font-SpartanBold text-3.5xl ${props.item === props.selected ? `text-white` : `text-black`}`}>${formatNumber(props.data.price)}</span>
                            <span className={`font-SpartanMedium text-base ${props.item === props.selected ? `text-white` : `text-black2`}`}>/mes</span>
                        </p>
                    </div>
                    <p className={`font-SpartanSemiBold text-lg ${props.item === props.selected ? `text-white` : `text-black`}`}>
                        {props.data.coverage.id === 1 ?
                            "Responsabilidad civil"
                            :
                            <>
                                {props.data.coverage.id === 3 ?
                                    "Terceros"
                                    :
                                    <>
                                        {props.data.coverage.id === 4 ?
                                            "Terceros completos"
                                            :
                                            <>
                                                {props.data.coverage.id === 5 ?
                                                    "Todo riesgo"
                                                    :
                                                    ""
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                    </p>
                    {props.data.coverage.id === 5 &&
                        <p className={`font-SpartanSemiBold pt-4 text-sm ${props.item === props.selected ? `text-white` : `text-black`}`}>
                            Franquicia
                            <span className="pl-4">
                                {props.data.franchise >= 100 ? "$" + formatNumber(props.data.franchise) : props.data.franchise + "%"}
                            </span>
                        </p>
                    }
                    <p className={`font-OpenSansRegular text-base ${props.item === props.selected ? `text-white` : `text-black`} pt-4`}>¡Precio fijo durante {props.data.months} meses!</p>
                    <p className={`font-SpartanSemiBold text-lg ${props.item === props.selected ? `text-white` : `text-purple5`} py-4`}>Suma asegurada: ${formatNumber(props.data.sumInsured)}</p>
                </div>
                <QuotationDetailsVertical item={props.item} selected={props.selected} coverageid={props.data.coverage.id} />
            </div>
            <div className="w-full flex items-center justify-between">
                <img src={insurerLogo(props.data.insurerObj.id)} alt="quotation" className="w-12 h-10 mt-2 mb-1" />
                <button className={`h-12 font-RobotoMedium text-lg rounded-lg border border-purple2 px-10 ${props.item === props.selected ? `bg-purple text-white` : `text-purple2`}`} onClick={() => props.goHiringPage(props.data.id)}>Siguiente</button>
            </div>
        </div>

    )
}

export default QuotationVerticalSelect;
