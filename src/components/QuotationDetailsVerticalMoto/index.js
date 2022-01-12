import React, { useState, useEffect } from 'react'

import checkpurple from '../../img/check-purple.png';
import checkpurple1 from '../../img/check-purple-1.png';
import checkwhite from '../../img/check-white.png';


const QuotationDetailsVerticalMoto = (props) => {

    const [resp, setResp] = useState(false);
    const [servicio, setServicio] = useState(false);
    const [rubo, setRubo] = useState(false);
    const [incendio, setIncendio] = useState(false);
    const [dano, setDano] = useState(false);

    useEffect(() => {

        switch (props.coverageid) {
            case 6:
                setResp(true);
                setServicio(true);
                setRubo(false);
                setIncendio(false);
                setDano(false);
                break;
            case 7:
                setResp(true);
                setServicio(true);
                setRubo(true);
                setIncendio(true);
                setDano(false);
                break;
            case 8:
                setResp(true);
                setServicio(true);
                setRubo(true);
                setIncendio(true);
                setDano(true);
                break;
            default:
                setResp(true);
                setServicio(true);
                setRubo(true);
                setIncendio(true);
                setDano(true);
        }

    }, []);

    return (
        <>
            <div className="pt-4">
                {resp &&
                    <div className="flex items-center pb-2">
                        <img src={resp ? (props.item === props.selected ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${resp ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Responsabilidad civil</p>
                    </div>
                }
                {servicio &&
                    <div className="flex items-center pb-2">
                        <img src={servicio ? (props.item === props.selected ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${servicio ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Servicio de remolque y asistencia</p>
                    </div>
                }
                {rubo &&
                    <div className="flex items-center pb-2">
                        <img src={rubo ? (props.item === props.selected ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${rubo ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Robo y/o hurto total</p>
                    </div>
                }
                {incendio &&
                    <div className="flex items-center pb-2">
                        <img src={incendio ? (props.item === props.selected ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${incendio ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio total</p>
                    </div>
                }
            </div>
            {dano &&
                <div className="pt-4">
                    <div className="flex items-center pb-2">
                        <img src={dano ? (props.item === props.selected ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${dano ? (props.item === props.selected ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.item === props.selected ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daño total por accidente</p>
                    </div>
                </div>
            }
        </>
    )
}

export default QuotationDetailsVerticalMoto;
