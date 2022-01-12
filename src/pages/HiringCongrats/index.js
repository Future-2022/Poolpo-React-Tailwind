import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiGetQuotationDataById, apiGetPreLoadedData } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';


const HiringCongrats = (props) => {

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    useEffect(() => {

        amplitudeLogEvent("Hiring-Congrats");

        apiGetQuotationDataById(props.match.params.quoteID)
            .then(res => {
                console.log("res-----", res);
                setQuote(res.data);
            })
            .catch(err => {
                console.log("err-----", err);
            });

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.vehicleID, props.match.params.quoteID)
            .then(res => {
                setLeadName(res.data.lead.name);
            })
            .catch(err => {
                console.log("err-----", err);
            });

    }, []);

    const goHiringPictures = () => {
        let url = "/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
        history.push(url);
    }

    return (
        <>
            <div className="w-full bg-pink8">
                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={true} logoID={quote !== {} && !!quote.insurerObj ? quote.insurerObj.id : false}>
                        <div className="">
                            <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left sm:text-center pb-2 sm:pb-12 md:pb-0">
                                <span>
                                    ¡Felicitaciones {leadName}! 🎉
                                </span>
                            </p>
                        </div>
                        <p className="font-OpenSansBold text-lg sm:text-xl text-gray text-left sm:text-center">
                            <span className="text-purple4">¡Ya sos parte de <span className="capitalize">{!!quote.insurerObj ? quote.insurerObj.name : ""}</span>! </span><br className="hidden sm:block" />
                            Te enviamos un mail con la póliza adjunta y los datos de tu<br className="hidden md:block" /> cuenta para que puedas realizar todos tus trámites online.
                        </p>
                    </HeaderHiring>
                    <div className="w-full px-8 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="px-0 sm:px-12 xl:px-32 1xl:px-48">
                            <div className="py-8 border-t sm:border border-purple3 sm:rounded-xl">
                                <p className="font-SpartanBold text-gray text-2xl text-left sm:text-center">Datos de contacto</p>
                                <p className="font-OpenSansRegular text-black text-lg text-left sm:text-center">Lorem Ipsum is simply dummy text of the<br className="hidden sm:block" /> printing and typesetting industry. Lorem Ipsum<br className="hidden sm:block" /> has been the industry's standard </p>
                            </div>
                            <button type="button" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-0 sm:mt-12 shadow-lg" onClick={goHiringPictures}>Siguiente</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HiringCongrats;
