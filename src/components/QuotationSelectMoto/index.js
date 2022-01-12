import React, { useState, useEffect } from 'react'

import QuotationDetailsMoto from '../QuotationDetailsMoto';
import { formatNumber, randomColor, insurerLogo } from '../../services/utils';

import './index.css';


const QuotationSelectMoto = (props) => {

    const [headerLabels, setHeaderLabels] = useState([]);
    const [bottomLabels, setBottomLabels] = useState([]);

    useEffect(() => {

        setHeaderLabels(!!props.data.labels && props.data.labels.filter(i => i.type === "header").length !== 0 ? props.data.labels.filter(i => i.type === "header") : []);
        setBottomLabels(!!props.data.labels && props.data.labels.filter(i => i.type === "bottom").length !== 0 ? props.data.labels.filter(i => i.type === "bottom") : []);

    }, []);

    return (
        <div className={`w-full z-50 mx-auto select-none ${(!props.equal && !props.best && props.peritem !== 1) ? `pt-8` : ``}`} style={{ maxWidth: "352px" }}>

            <div className={`w-full relative cursor-pointer`}>

                <div className={`w-full ${props.best ? `bg-pink2 shadow-xl rounded-3xl` : `bg-white rounded-3xl`}`}>
                    <div className={`w-full relative pb-6`}>
                        <div className={`w-full pl-8 pt-4`}>
                            <div className={`w-full flex items-center justify-between`} >
                                <img src={insurerLogo(props.data.insurerObj.id)} alt="quotation" className="w-12 h-10 mt-2 mb-1" />
                                {headerLabels.length !== 0 && headerLabels.slice(1).map(item => (
                                    <div key={item.id} className={`h-8 bg-white ${props.best ? `shadow-lg` : ``} rounded-tl-lg rounded-bl-lg border-t border-b border-l border-purple7 flex items-center`}>
                                        <p className="font-SpartanBold text-purple6 text-xs px-2 text-center flex items-center pt-1 whitespace-no-wrap">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`w-full px-4 sm:px-8 relative ${(props.best || props.option === 2) ? `pt-2 pb-4` : ``}`}>

                            <p className="font-SpartanBold text-lg text-purple2 pt-4 pb-2">
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
                                    <span className={`font-SpartanBold text-base sm:text-3.5xl ${props.best ? `text-white` : `text-black`}`}>${formatNumber(props.data.price)}</span>
                                    <span className={`font-SpartanMedium text-base ${props.best ? `text-white` : `text-black2`}`}>/mes</span>
                                </p>
                            </div>

                            {props.data.coverage.id === 5 &&
                                <p className={`font-SpartanSemiBold pt-4 text-sm ${props.best ? `text-white` : `text-black`}`}>
                                    Franquicia
                                    <span className="pl-4">
                                        {props.data.franchise >= 100 ? "$" + formatNumber(props.data.franchise) : props.data.franchise + "%"}
                                    </span>
                                </p>
                            }
                            <p className={`font-OpenSansRegular text-base ${props.best ? `text-white` : `text-black`} pt-2`}>¡Precio fijo durante {props.data.months} meses!</p>
                            <p className={`font-SpartanSemiBold text-lg ${props.best ? `text-white` : `text-purple6`} pt-2 pb-3`}>Suma asegurada: ${formatNumber(props.data.sumInsured)}</p>
                            <div className="w-full flex items-center justify-start pb-4">
                                {bottomLabels.length !== 0 && bottomLabels.map(item => (
                                    <div key={item.id} className={`flex items-center px-1 py-1 ${randomColor()} rounded-md mr-2`}>
                                        <p className="text-sm font-OpenSansBold">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                            {!props.hrHide &&
                                <hr className="pb-4" />
                            }
                            <QuotationDetailsMoto best={props.best} coverageid={props.data.coverage.id} collapsable={props.hrHide} />
                            <div className="pt-4">
                                {!props.following &&
                                    <button className={`${props.best ? `text-white bg-purple` : `text-purple2`} h-12 text-center font-RobotoMedium px-12 border border-purple2 rounded-lg`} onClick={() => props.goHiringPage(props.data.id)}>Siguiente</button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default QuotationSelectMoto;
