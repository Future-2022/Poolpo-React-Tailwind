import React, { useState, useEffect } from 'react'

import threelinesother from '../../img/three-lines-other.png';
import whiteup from '../../img/white-up.png';
import whitedown from '../../img/white-down.png';
import QuotationDetailsMoto from '../QuotationDetailsMoto';
import { formatNumber, randomColor, insurerLogo } from '../../services/utils';


const QuotationSelectBottomMoto = (props) => {

    const [bottomLabels, setBottomLabels] = useState([]);

    useEffect(() => {
        setBottomLabels(!!props.data.labels && props.data.labels.filter(i => i.type === "bottom").length !== 0 ? props.data.labels.filter(i => i.type === "bottom") : []);
    }, []);

    return (
        <div className="w-full relative">

            <img src={threelinesother} alt="" className={`hidden sm:block absolute right-0  ${props.option === 1 ? `${props.original === 1 ? `bottom-0` : `bottom-50px`} ` : ``} ${props.option === 2 ? `bottom-9` : ``} ${props.option === 3 ? `bottom-0` : ``} z-20`} />

            <div className={`w-full px-4 sm:px-8 ${props.best ? `bg-pink9 ${(props.equal || props.original === 1) ? `` : `absolute`} ${(props.option === 1 || props.option === 2) ? `top-minus36` : ``}  ${props.option === 3 ? `top-minus72` : ``} shadow-xl rounded-tl-3xl rounded-tr-3xl` : `bg-white rounded-3xl`}`}>
                <div className="w-full flex items-start justify-between cursor-pointer pt-2" onClick={() => props.changeOpenState()}>
                    <img src={insurerLogo(props.data.insurerObj.id)} alt="quotation" className="w-12 h-10 mt-2 mb-1" />
                    {!props.open &&
                        <div className="pt-2 pb-4">
                            <p>
                                <span className={`font-SpartanBold text-base sm:text-3.5xl text-white`}>${props.data.price}</span>
                                <span className={`font-SpartanMedium text-base text-white`}>/mes</span>
                            </p>
                            <p className={`font-SpartanSemiBold text-lg text-white`}>
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
                        </div>
                    }
                    <img src={props.open ? whitedown : whiteup} alt="whitedown" className="mt-2" />
                </div>
                {props.open &&
                    <div className={`w-full relative pt-6 pb-12`}>
                        <div className="w-full flex justify-between">
                            <p>
                                <span className={`font-SpartanBold text-3.5xl text-white`}>${props.data.price}</span>
                                <span className={`font-SpartanMedium text-base text-white`}>/mes</span>
                            </p>
                            <div></div>
                        </div>
                        <p className={`font-SpartanSemiBold text-lg text-white`}>
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
                        {props.data.coverage.id === 5 &&
                            <p className={`font-SpartanSemiBold pt-4 text-sm text-white`}>
                                Franquicia
                            <span className="pl-4">
                                    {props.data.franchise >= 100 ? "$" + formatNumber(props.data.franchise) : props.data.franchise + "%"}
                                </span>
                            </p>
                        }
                        <p className={`font-OpenSansRegular text-base text-white pt-4`}>¡Precio fijo durante 4 meses!</p>
                        <p className={`font-SpartanSemiBold text-lg text-white py-4`}>Suma asegurada: $1.128.800</p>
                        <div className="w-full flex items-center justify-start pb-4">
                            {bottomLabels.length !== 0 && bottomLabels.map(item => (
                                <div key={item.id} className={`flex items-center px-1 py-1 ${randomColor()} rounded-md mr-2`}>
                                    <p className="text-sm font-OpenSansBold">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <QuotationDetailsMoto best={props.best} coverageid={props.data.coverage.id} />
                    </div>
                }

            </div>
        </div>
    )
}

export default QuotationSelectBottomMoto;
