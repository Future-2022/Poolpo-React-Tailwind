import React, { useEffect, useState } from 'react'

import checkpurple from '../../img/check-purple.png';
import checkpurple1 from '../../img/check-purple-1.png';
import checkwhite from '../../img/check-white.png';
import arrowgreen from '../../img/vector-green.png';


const QuotationDetails = (props) => {

    const [resp, setResp] = useState(false);
    const [servicio, setServicio] = useState(false);
    const [rubo, setRubo] = useState(false);
    const [incendio, setIncendio] = useState(false);
    const [dano, setDano] = useState(false);

    const [open, setOpen] = useState(false);

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
            <div className="flex items-center pb-1">
                <img src={resp ? (props.best ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                <p className={`${resp ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio Parcial y Total</p>
            </div>
            <div className="flex items-center pb-1">
                <img src={servicio ? (props.best ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                <p className={`${servicio ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Servicio de remolque y asistencia</p>
            </div>

            {((props.collapsable && open) || !props.collapsable) &&
                <>
                    <div className="flex items-center pb-1">
                        <img src={rubo ? (props.best ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${rubo ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Robo y/o hurto total</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={incendio ? (props.best ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${incendio ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Incendio total</p>
                    </div>
                    <div className="flex items-center pb-1">
                        <img src={dano ? (props.best ? checkpurple1 : checkpurple) : checkwhite} alt="" />
                        <p className={`${dano ? (props.best ? `text-white font-OpenSansSemiBold` : `text-gray font-OpenSansSemiBold`) : `${props.best ? `text-gray2` : `text-gray3`} font-OpenSansRegular`} text-base pl-2`}>Daños total por accidente</p>
                    </div>
                    {props.collapsable && open &&
                        <div className="flex items-center cursor-pointer mt-4" onClick={() => setOpen(false)}>
                            <p className="font-OpenSansBold text-lg text-green1">Ver menos</p>
                            <img src={arrowgreen} alt="arrow-green" className="ml-4" />
                        </div>
                    }
                </>
            }
            {props.collapsable && !open &&
                <div className="flex items-center cursor-pointer mt-4" onClick={() => setOpen(true)}>
                    <p className="font-OpenSansBold text-lg text-green1">Detalle</p>
                    <img src={arrowgreen} alt="arrow-green" className="ml-4" />
                </div>
            }
        </>
    )
}

export default QuotationDetails;
