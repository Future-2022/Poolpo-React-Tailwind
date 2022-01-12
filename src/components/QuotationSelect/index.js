import React, { useState, useEffect } from 'react'

import threelinesother from '../../img/three-lines-other.png';
import QuotationDetails from '../QuotationDetails';
import { formatNumber, randomColor, insurerLogo } from '../../services/utils';

import './index.css';


const QuotationSelect = (props) => {

    const [headerLabels, setHeaderLabels] = useState([]);
    const [bottomLabels, setBottomLabels] = useState([]);

    useEffect(() => {

        setHeaderLabels(!!props.data.labels && props.data.labels.filter(i => i.type === "header").length !== 0 ? props.data.labels.filter(i => i.type === "header") : []);
        setBottomLabels(!!props.data.labels && props.data.labels.filter(i => i.type === "bottom").length !== 0 ? props.data.labels.filter(i => i.type === "bottom") : []);

    }, []);

    return (
        <div className={`w-full z-50 mx-auto select-none ${(!props.equal && !props.best && props.peritem !== 1) ? `pt-8` : ``}`} style={{ maxWidth: "352px" }} style={{backgroundColor:"#f8f6fd"}}>

            <div className={`w-full relative cursor-pointer`}>

                {props.best &&
                    <img src={threelinesother} alt="" className={`absolute right-0 image-drag-none select-none bottom-50px z-20`} />
                }

                <div className={`w-full px-4 sm:px-8 ${props.best ? `bg-pink9 shadow-xl rounded-3xl` : `bg-white rounded-3xl`}`}>
                    <div className={`w-full relative pt-12 pb-6`}>
                        <div className={`absolute flex flex-row-reverse items-center right-0 top-0`}>
                            {headerLabels.length !== 0 && headerLabels.map(item => (
                                <div key={item.id} className="h-8 bg-gradient-to-r from-purple1 to-purple2 rounded-lg mr-2 flex items-center">
                                    <p className="font-SpartanSemiBold text-white text-xs px-2 text-center flex items-center pt-1 whitespace-no-wrap">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p>
                                <span className={`font-SpartanBold text-base sm:text-3.5xl ${props.best ? `text-white` : `text-black`}`}>${formatNumber(props.data.price)}</span>
                                <span className={`font-SpartanMedium text-base ${props.best ? `text-white` : `text-black2`}`}>/mes</span>
                            </p>
                            <img src={insurerLogo(props.data.insurerObj.id)} alt="quotation" className="w-12 h-10 mt-2 mb-1" />
                        </div>
                        <p className={`font-SpartanSemiBold text-lg ${props.best ? `text-white` : `text-black`}`}>
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
                            <p className={`font-SpartanSemiBold pt-4 text-sm ${props.best ? `text-white` : `text-black`}`}>
                                Franquicia
                            <span className="pl-4">
                                    {props.data.franchise >= 100 ? "$" + formatNumber(props.data.franchise) : props.data.franchise + "%"}
                                </span>
                            </p>
                        }
                        <p className={`font-OpenSansRegular text-base ${props.best ? `text-white` : `text-black`} pt-4`}>¡Precio fijo durante {props.data.months} meses!</p>
                        <p className={`font-SpartanSemiBold text-lg ${props.best ? `text-white` : `text-purple5`} py-4`}>Suma asegurada: ${formatNumber(props.data.sumInsured)}</p>
                        <div className="w-full flex items-center justify-start pb-4">
                            {bottomLabels.length !== 0 && bottomLabels.map(item => (
                                <div key={item.id} className={`flex items-center px-1 py-1 ${randomColor()} rounded-md mr-2`}>
                                    <p className="text-sm font-OpenSansBold">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <QuotationDetails best={props.best} coverageid={props.data.coverage.id} />
                        <div className="pt-4">
                            {!props.following &&
                                <button className={`${props.best ? `text-white bg-purple` : `text-purple2`} h-12 text-center font-RobotoMedium px-12 border border-purple2 rounded-lg`} onClick={() => props.goHiringPage(props.data.id)}>Siguiente</button>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default QuotationSelect;
