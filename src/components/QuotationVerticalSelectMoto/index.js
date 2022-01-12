import React from 'react'

import star from '../../img/star.png';

import { formatNumber, insurerLogo } from '../../services/utils';
import QuotationDetailsVerticalMoto from '../QuotationDetailsVerticalMoto';


const QuotationVerticalSelectMoto = (props) => {

    return (
        <div className={`w-full ${props.item === props.selected ? `bg-pink9` : ` bg-white`} relative mt-6 pt-10 pb-0 px-10 rounded-2xl`}>
            {props.item === props.selected &&
                <div className="flex items-center absolute left-10 top-0 h-8 bg-gradient-to-r from-purple1 to-purple2 rounded-lg">
                    <img src={star} alt="star" className="ml-1" />
                    <p className="font-SpartanSemiBold text-white text-xs px-1 text-center flex items-center pt-1">MEJOR COTIZACIÓN</p>
                </div>
            }
            <div className="w-full flex justify-start">
                <div className="pr-8 lg:pr-12">
                    <img src={insurerLogo(props.data.insurerObj.id)} alt="quotation" className="w-12 h-10" />
                    <p className={`font-SpartanBold text-2xl pb-2 ${props.item === props.selected ? `text-white` : `text-purple2`}`}>
                        {props.data.coverage.id === 6 ?
                            "Resp. civil"
                            :
                            <>
                                {props.data.coverage.id === 7 ?
                                    "Incendio y robo"
                                    :
                                    <>
                                        {props.data.coverage.id === 8 ?
                                            "Premium"
                                            :
                                            ""
                                        }
                                    </>
                                }
                            </>
                        }
                    </p>
                    <div className="w-full flex justify-between">
                        <p>
                            <span className={`font-SpartanBold text-3.5xl ${props.item === props.selected ? `text-white` : `text-black`}`}>${formatNumber(props.data.price)}</span>
                            <span className={`font-SpartanMedium text-base ${props.item === props.selected ? `text-white` : `text-black2`}`}>/mes</span>
                        </p>
                    </div>

                    {props.data.coverage.id === 5 &&
                        <p className={`font-SpartanSemiBold pt-4 text-sm ${props.item === props.selected ? `text-white` : `text-black`}`}>
                            Franquicia
                            <span className="pl-4">
                                {props.data.franchise >= 100 ? "$" + formatNumber(props.data.franchise) : props.data.franchise + "%"}
                            </span>
                        </p>
                    }
                    <p className={`font-OpenSansRegular text-sm ${props.item === props.selected ? `text-white` : `text-black`} pt-1`}>¡Precio fijo durante {props.data.months} meses!</p>
                    <p className={`font-SpartanSemiBold text-sm ${props.item === props.selected ? `text-white` : `text-purple4`} py-1`}>Suma asegurada: ${formatNumber(props.data.sumInsured)}</p>
                </div>
                <QuotationDetailsVerticalMoto item={props.item} selected={props.selected} coverageid={props.data.coverage.id} />
            </div>
            <div className="w-full flex items-center justify-between">
                <div></div>
                <button className={`h-12 relative top-minus36 font-RobotoMedium text-lg rounded-lg border border-purple2 px-10 ${props.item === props.selected ? `bg-purple text-white` : `text-purple2`}`} onClick={() => props.goHiringPage(props.data.id)}>Siguiente</button>
            </div>
        </div>

    )
}

export default QuotationVerticalSelectMoto;
