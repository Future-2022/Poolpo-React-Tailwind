import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiGetQuotationDataById, apiGetPreLoadedData, apiCongrats } from '../../services/main';
import { amplitudeLogEvent, formatNumber, insurerLogo } from '../../services/utils';

import motorcycle1 from '../../img/motorcycle-1.png';
import dollarsign1 from '../../img/dollarsign1.png';
import creditcard from '../../img/credit-card.png';
import phone from '../../img/phone.png';
import headphone from '../../img/headphone.png';
import newphone from '../../img/newphone.png';
import appstore from '../../img/AppStore.png';
import googleplay from '../../img/GooglePlay.png';
import Footer from '../../layouts/Footer';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const HiringCongrats1 = (props) => {

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [appstoreUrl, setAppstoreUrl] = useState("");
    const [googleplayUrl, setGoogleplayUrl] = useState("");

    const [sinisterphone, setSinisterphone] = useState("");
    const [generalphone, setGeneralphone] = useState("");

    const [paymenttype, setPaymenttype] = useState(!!localStorage.getItem("paymenttype") ? Number(localStorage.getItem("paymenttype")) : "");
    const [cbunumber, setCBUnumber] = useState(!!localStorage.getItem("cbunumber") ? localStorage.getItem("cbunumber") : "");
    const [cardnumber, setCardnumber] = useState(!!localStorage.getItem("cardnumber") ? localStorage.getItem("cardnumber") : "");

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Hiring-Congrats");

        apiGetQuotationDataById(props.match.params.quoteID)
            .then(res => {
                console.log("quote-----", res);
                setQuote(res.data);

                apiCongrats(res.data.insurerObj.id)
                    .then(res => {
                        console.log("res-----", res);
                        setLoading2(false);
                        if (!!res.data[0] && !!res.data[0].IosApp) {
                            setAppstoreUrl(res.data[0].IosApp);
                        }
                        if (!!res.data[0] && !!res.data[0].GoogleApp) {
                            setGoogleplayUrl(res.data[0].GoogleApp);
                        }
                        if (!!res.data[0] && !!res.data[0].PhoneSinister) {
                            setSinisterphone(res.data[0].PhoneSinister);
                        }
                        if (!!res.data[0] && !!res.data[0].PhoneGeneral) {
                            setGeneralphone(res.data[0].PhoneGeneral);
                        }
                    })
                    .catch(err => {
                        console.log("err-----", err);
                        setLoading2(false);
                    })
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading1(false);
            });

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.vehicleID, props.match.params.quoteID)
            .then(res => {
                setLeadName(res.data.lead.name);
                setLoading3(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading3(false);
            });

    }, []);

    const goHiringPictures = () => {
        let url = "/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
        history.push(url);
    }

    useEffect(() => {
        if ((!loading1 || !loading2) && !loading3) {
            setLoading(false);
        }
    }, [loading1, loading2, loading3]);

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
                            Te enviamos un mail con la póliza adjunta y los datos de tu cuenta para que<br className="hidden md:block" /> puedas realizar todos tus trámites online.
                        </p>
                    </HeaderHiring>
                    <div className="w-full px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="bg-white px-2 sm:px-10 py-4 sm:py-8">
                            {!!quote.insurerObj &&
                                <img src={insurerLogo(quote.insurerObj.id)} alt="quotation" className="mx-auto h-12 block sm:hidden" />
                            }
                            <div className="flex items-center justify-between pb-5">
                                <div className="pl-2">
                                    <p className="text-black text-xl font-SpartanBold">
                                        Detalle de contratación
                                    </p>
                                    <p className="text-gray4 text-sm font-OpenSansRegular">
                                        Número de solicitud #{localStorage.getItem("PaymentMsg")}
                                    </p>
                                </div>
                                {!!quote.insurerObj &&
                                    <img src={insurerLogo(quote.insurerObj.id)} alt="quotation" className="h-12 hidden sm:block" />
                                }
                            </div>

                            <div className="hidden lg:block">
                                <div className="flex items-center justify-between pt-2 pb-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center">
                                            <img src={motorcycle1} alt="motorcycle" className="mx-auto" />
                                        </div>
                                        <div className="pl-4">
                                            <p className="text-black text-base font-OpenSansBold">
                                                Seguro para autos
                                            </p>
                                            <p className="text-black text-base font-OpenSansLight">
                                                {!!quote.insurerObj ? quote.insurerObj.name : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center">
                                            <img src={dollarsign1} alt="motorcycle" className="mx-auto" />
                                        </div>
                                        <div className="pl-4">
                                            <p className="text-black text-base font-OpenSansBold">
                                                Pago menusal
                                            </p>
                                            <p className="text-black text-base font-OpenSansLight">
                                                {!!quote.price ? "$" + formatNumber(quote.price) : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center flex-shrink-0">
                                            <img src={creditcard} alt="motorcycle" className="mx-auto" />
                                        </div>
                                        <div className="pl-4">
                                            {paymenttype === 1 &&
                                                <>
                                                    <p className="text-black text-base font-OpenSansBold">
                                                        CBU
                                                    </p>
                                                    <p className="text-black text-base font-OpenSansLight">
                                                        {"CBU terminado en " + cbunumber.slice(-4)}
                                                    </p>
                                                </>
                                            }
                                            {paymenttype === 2 &&
                                                <>
                                                    <p className="text-black text-base font-OpenSansBold">
                                                        Tarjeta de crédito
                                                    </p>
                                                    <p className="text-black text-base font-OpenSansLight">
                                                        {"Tarjeta de crédito terminada en " + cardnumber.slice(-4)}
                                                    </p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block lg:hidden">

                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center">
                                        <img src={motorcycle1} alt="motorcycle" className="mx-auto" />
                                    </div>
                                    <div className="pl-4">
                                        <p className="text-black text-base font-OpenSansBold">
                                            Seguro para autos
                                        </p>
                                        <p className="text-black text-base font-OpenSansLight">
                                            {!!quote.insurerObj ? quote.insurerObj.name : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="block sm:flex items-center justify-between pt-4 pb-2 sm:pb-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center flex-shrink-0">
                                            <img src={dollarsign1} alt="motorcycle" className="mx-auto" />
                                        </div>
                                        <div className="pl-4">
                                            <p className="text-black text-base font-OpenSansBold">
                                                Pago menusal
                                                </p>
                                            <p className="text-black text-base font-OpenSansLight">
                                                {!!quote.price ? "$" + formatNumber(quote.price) : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center pt-4 sm:pt-0">
                                        <div className="w-12 h-12 bg-mainpink rounded-xl flex items-center flex-shrink-0">
                                            <img src={creditcard} alt="motorcycle" className="mx-auto" />
                                        </div>
                                        <div className="pl-4">
                                            {paymenttype === 1 &&
                                                <>
                                                    <p className="text-black text-base font-OpenSansBold">
                                                        CBU
                                                    </p>
                                                    <p className="text-black text-base font-OpenSansLight">
                                                        {"CBU terminado en " + cbunumber.slice(-4)}
                                                    </p>
                                                </>
                                            }
                                            {paymenttype === 2 &&
                                                <>
                                                    <p className="text-black text-base font-OpenSansBold">
                                                        Tarjeta de crédito
                                                    </p>
                                                    <p className="text-black text-base font-OpenSansLight">
                                                        {"Tarjeta de crédito terminada en " + cardnumber.slice(-4)}
                                                    </p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="w-full px-4 sm:px-12 xl:px-24 1xl:px-32 pt-10 block lg:flex justify-between mb-12">
                        <div>
                            <p className="text-black text-xl sm:text-3.5xl font-SpartanBold pl-2 pt-10">
                                ¿Necesitás ayuda?
                            </p>
                        </div>
                        <div className="block md:flex items-center">
                            <div className="px-4 sm:pl-10 sm:pr-16 py-8 sm:py-10 rounded-xl shadow-xl mx-auto sm:w-327px">
                                <div className="hidden sm:block">
                                    <div className="w-12 h-12 flex items-center">
                                        <img src={phone} alt="phone" className="mx-auto" />
                                    </div>
                                </div>
                                <div className="block sm:hidden">
                                    <div className="w-full text-center">
                                        <img src={phone} alt="phone" className="mx-auto" />
                                    </div>
                                </div>
                                <p className="pt-4 pb-2 text-black text-xl font-SpartanBold ">Asesorate sobre un siniestro</p>
                                <p className="text-gray5 font-RobotoRegular text-sm">Comunicate al <span className="font-RobotoBold text-green4">{sinisterphone}</span> para poder ayudarte.</p>
                            </div>
                            <div className="pl-0 md:pl-4">
                                <div className="px-4 sm:pl-10 sm:pr-16 py-8 sm:py-10 rounded-xl shadow-xl mx-auto sm:w-327px">
                                    <div className="hidden sm:block">
                                        <div className="w-12 h-12 flex items-center">
                                            <img src={headphone} alt="headphone" className="mx-auto" />
                                        </div>
                                    </div>
                                    <div className="block sm:hidden">
                                        <div className="w-full text-center">
                                            <img src={headphone} alt="headphone" className="mx-auto" />
                                        </div>
                                    </div>
                                    <p className="pt-4 pb-2 text-black text-xl font-SpartanBold ">Resolvé todas tus dudas</p>
                                    <p className="text-gray5 font-RobotoRegular text-sm">Llamanos al <span className="font-RobotoBold text-green4">{generalphone}</span> para solucionar tus consultas.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {!!appstoreUrl && !!googleplayUrl &&
                        <div className="w-full px-4 sm:px-12 xl:px-24 1xl:px-32">
                            <div className="w-full bg-mainpink rounded-xl border border-purple4 flex pt-8 md:pt-12 pb-8 md:pb-0 pl-4 sm:pl-8 md:pl-0 pr-4 sm:pr-8 md:pr-4">
                                <img src={newphone} alt="newphone" className="mx-24 lg:mx-32 hidden md:block" />
                                <div className="pt-2 sm:pt-6">
                                    <p className="text-black text-xl sm:text-2xl font-SpartanBold">
                                        {!!quote.insurerObj ? quote.insurerObj.name : ""} App
                                    </p>
                                    <p className="text-black font-OpenSansRegular pt-2">
                                        Ahora accedé a toda la información que necesitás,<br /> en cualquier momento y lugar 100% online.
                                    </p>
                                    <div className="block sm:flex items-center pt-6">
                                        <div className="flex justify-center">
                                            <a href={appstoreUrl}>
                                                <img src={appstore} alt="appstore" className="mx-auto" />
                                            </a>
                                        </div>
                                        <div className="flex justify-center">
                                            <a href={googleplayUrl}>
                                                <img src={googleplay} alt="googleplay" className="mt-4 sm:mt-0 sm:ml-2 mx-auto" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <Footer />
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HiringCongrats1;
