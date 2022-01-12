import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiGetPreLoadedData, apiGetQuotationDataById, apiHiringPictureSend } from '../../services/main';

import cross from '../../img/cross.png';
import leftside from '../../img/moto-leftside.png';
import frontside from '../../img/moto-frontside.png';
import licence from '../../img/moto-licence.png';
import rightside from '../../img/moto-rightside.png';
import backside from '../../img/moto-backside.png';
import alertcircle from '../../img/alert-circle.png';
import CustomUpload from '../../components/CustomUpload';
import rightpurple from '../../img/chevron-right-purple.png';

import './index.css';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModalMoto from '../../components/LoadingModal/ChargingModalMoto';


const HiringPicturesMoto = (props) => {

    Modal.setAppElement('#root');

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [helpModal, setHelpModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Moto/Hiring/Pictures");

        apiGetQuotationDataById(props.match.params.quoteID)
            .then(res => {
                console.log("res-----", res);
                setQuote(res.data);
                setLoading1(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading1(false);
            });

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.vehicleID, props.match.params.quoteID)
            .then(res => {

                console.log("preloaded------", res);
                setLeadName(res.data.lead.name);
                setLoading2(false);

            })
            .catch(err => {
                console.log("err-----", err);
                setLoading2(false);
            });

    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
        }
    };

    const closeHelpModal = () => {
        setHelpModal(false);
    }

    const handlePicture = (e, name) => {

        var formData = new FormData();

        formData.append("Hash", localStorage.getItem("VehicleID"));
        formData.append("Image", e.target.files[0]);
        formData.append("Name", name);

        apiHiringPictureSend(formData)
            .then(res => {
                if (res.data.error) {
                    toast.error(res.data.msg);
                }
            })
            .catch(err => {
                console.log("err-----", err);
            });

    }

    const goHiringCongrats = () => {
        let url = "/hiring/congrats/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
        history.push(url);
    }

    useEffect(() => {
        if (!loading1 && !loading2) {
            setLoading(false);
        }
    }, [loading1, loading2]);

    return (
        <>
            <div className="w-full bg-pink8">
                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={true} logoID={quote !== {} && !!quote.insurerObj ? quote.insurerObj.id : false}>
                        <div className="">
                            <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left sm:text-center pb-2 sm:pb-12 md:pb-0">
                                ¡Felicitaciones {leadName}! 🎉
                            </p>
                        </div>
                        <p className="font-OpenSansBold text-lg sm:text-xl text-gray text-left sm:text-center">
                            <span className="text-purple4">¡Ya sos parte de <span className="capitalize">{!!quote.insurerObj ? quote.insurerObj.name : ""}</span>! </span><br className="hidden sm:block" />
                        Te enviamos un mail con la póliza adjunta y los datos de tu<br className="hidden md:block" /> cuenta para que puedas realizar todos tus trámites online.
                        </p>
                    </HeaderHiring>
                    <div className="w-full px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="w-full px-0 sm:px-12 xl:px-32 1xl:px-48">
                            <div className="w-full sm:pl-10 sm:pr-15 pt-6 pb-0 sm:pb-8 border-t sm:border border-purple3 sm:rounded-xl">
                                <div className="flex items-center">
                                    <p className="font-SpartanBold text-gray text-lg sm:text-xl text-center">Fotos de tu vehículo</p>
                                    <img src={alertcircle} alt="alertcircle" className="ml-4 mb-2" />
                                </div>
                                <p className="font-OpenSansRegular text-black text-lg text-left pt-2">Necesitamos <span className="font-OpenSansSemiBold">6 fotos de tu vehículo</span> para que evites la inspección física<br className="hidden xl:block" /> de la unidad (tendrías que llevar el moto a que sea inspeccionado).<br className="hidden xl:block" /> <span className="font-OpenSansSemiBold text-purple">¡Podés completarlas más tarde!</span></p>
                                <div className="pt-8">
                                    <div className="w-full">
                                        <div className="w-full block md:flex">
                                            <div className="w-full md:w-3/5 mb-4 sm:mb-0">
                                                <CustomUpload name="Frente" onChange={e => handlePicture(e, "Frente")} />
                                                <div className="mt-8">
                                                    <CustomUpload name="Lateral derecho" onChange={e => handlePicture(e, "Lateral derecho")} />
                                                </div>
                                                <div className="mt-8">
                                                    <CustomUpload name="Cédula de motos" onChange={e => handlePicture(e, "Cédula de motos")} />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-2/5 pt-10 md:pt-0 pl-0 md:pl-8">
                                                <CustomUpload name="Atrás" onChange={e => handlePicture(e, "Atrás")} />
                                                <div className="mt-8">
                                                    <CustomUpload name="Lateral izquierdo" onChange={e => handlePicture(e, "Lateral izquierdo")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-8 flex items-center justify-between">
                                            <div></div>
                                            <div className="pt-4 flex items-center float-right cursor-pointer" onClick={() => setHelpModal(true)}>
                                                <p className="font-OpenSansSemiBold text-base md:text-xl text-purple">¿Cómo saco las fotos?</p>
                                                <img src={rightpurple} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal
                                    isOpen={helpModal}
                                    onRequestClose={closeHelpModal}
                                    style={customStyles}
                                    contentLabel="Help Modal"
                                >
                                    <div className="w-full relative rounded-2xl px-6 pt-10 pb-8">
                                        <img src={cross} alt="cross" className="absolute top-4 right-10 cursor-pointer" onClick={closeHelpModal} />
                                        <p className="font-SpartanMedium text-2xl text-gray text-center pt-3 pb-6">¿Cómo saco las fotos?</p>
                                        <div className="pt-1 grid grid-cols-2 sm:grid-cols-3 col-gap-5 row-gap-4">
                                            <div>
                                                <img src={leftside} alt="leftside" />
                                                <p className="font-OpenSansRegular text-gray text-base sm:text-lg text-center tracking-tight sm:tracking-normal">Lateral derecho</p>
                                            </div>
                                            <div>
                                                <img src={frontside} alt="frontside" />
                                                <p className="font-OpenSansRegular text-gray text-base sm:text-lg text-center tracking-tight sm:tracking-normal">Frente</p>
                                            </div>

                                            <div>
                                                <img src={licence} alt="boardside" />
                                                <p className="font-OpenSansRegular text-gray text-base sm:text-lg text-center tracking-tight sm:tracking-normal">Cédula de la moto</p>
                                            </div>
                                            <div>
                                                <img src={rightside} alt="rightside" />
                                                <p className="font-OpenSansRegular text-gray text-base sm:text-lg text-center tracking-tight sm:tracking-normal">Lateral izquierdo</p>
                                            </div>
                                            <div>
                                                <img src={backside} alt="backside" />
                                                <p className="font-OpenSansRegular text-gray text-base sm:text-lg text-center tracking-tight sm:tracking-normal">Atrás</p>
                                            </div>
                                        </div>

                                    </div>
                                </Modal>
                            </div>
                            <div className="w-full text-center sm:text-left">
                                <button type="button" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-8 sm:px-16 py-3 mt-8 sm:mt-12 shadow-lg" onClick={goHiringCongrats}>Saltear</button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
                {loading && <ChargingModalMoto />}
            </div>
        </>
    )
}

export default HiringPicturesMoto;
