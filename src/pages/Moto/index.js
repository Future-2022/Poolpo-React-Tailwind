import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import DropZone from 'react-drop-zone'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import _ from 'lodash'

import './index.css';

import vector from '../../img/vector.png';
import uploadcloud from '../../img/upload-cloud.png';
import rus from '../../img/rus-logo.png';
import allianz from '../../img/allianz-logo.png';
import mark41 from '../../img/mark4-1.png';
import threelines from '../../img/three-lines.png';

import Footer from '../../layouts/Footer';
import Question from '../../components/Question';
import AutoComplete from '../../components/AutoComplete';
import MessagesModalMoto from '../../components/LoadingModal/MessagesModalMoto';

import { apiPolicyCreate, apiGetMotoQuestions, apiGetOffersMoto, apiSearchCarInputMoto } from '../../services/main';
import { amplitudeLogEvent, splitInput } from '../../services/utils';
import AutoScroll from '../../components/AutoScroll';
import ChargingModalMoto from '../../components/LoadingModal/ChargingModalMoto';
import HeaderAuto from '../../layouts/HeaderAuto';


const Moto = (props) => {

    const myRef = useRef(null);

    const executeScroll = useCallback(() => myRef.current.scrollIntoView(), [myRef]);

    let history = useHistory();

    let data = useLocation();

    useEffect(() => {
        if (myRef && data.state && data.state.isScroll) {
            executeScroll();
        }
    }, [myRef.current, executeScroll]);

    const [carinput, setCarInput] = useState("");

    const [defCarlist, setDefCarList] = useState([
        { brand: "HONDA", description: "WAVE", id: 1, defitem: true },
        { brand: "GILERA", description: "SMASH", id: 2, defitem: true },
        { brand: "CORVEN", description: "ENERGY", id: 3, defitem: true },
        { brand: "MOTOMEL", description: "BLITZ", id: 4, defitem: true },
        { brand: "KELLER", description: "KN", id: 5, defitem: true },
        { brand: "GUERRERO", description: "", id: 6, defitem: true }]);


    const [carlist, setCarList] = useState([]);

    const [questions, setQuestions] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [loadingBenefits, setLoadingBenefits] = useState(true);
    const [loading, setLoading] = useState(true);

    const [benefitList, setBenefitList] = useState([]);

    const policyCreate = (file) => {

        console.log("file-----", file);

        setModalIsOpen(true);

        let formData = new FormData();

        formData.append('policy', file);
        formData.append('isCar', false);

        apiPolicyCreate(formData)
            .then(res => {
                console.log("res-----", res);

                return res.json();
            })
            .then(data => {
                console.log("data-----", data);

                if (!!data.errors) {
                    setModalIsOpen(false);
                    toast.error(data.errors.policy[0]);
                } else {
                    let { lead } = data;
                    localStorage.setItem('LeadID', lead.hash);
                }

            });

    }

    const goSteps = (input) => {

        let brands = [];
        let versions = [];

        if (carlist.length === 0) {
            return;
        }

        carlist.forEach(item => {
            if (!brands.includes(item.brand.toUpperCase())) {
                brands.push(item.brand.toUpperCase());
            }
            if (!versions.includes(item.description.toUpperCase())) {
                versions.push(item.description.toUpperCase());
            }

        });

        var splited_ = splitInput(carinput);

        if (brands.includes(splited_.brand)) {
            if (!!splited_.group && carlist.filter(i => i.brand === splited_.brand && i.description === splited_.group).length !== 0 && !carlist[0].defitem) {
                history.push("/moto/steps", { brand: brands.filter(i => i === splited_.brand)[0], version: carlist.filter(i => i.brand === splited_.brand && i.description === splited_.group)[0].description });
            } else {
                history.push("/moto/steps", { brand: brands.filter(i => i === splited_.brand)[0] });
            }
        }

    }

    useEffect(() => {
        amplitudeLogEvent("Moto");
        setCarList(defCarlist);

        apiGetMotoQuestions()
            .then(res => {
                console.log("res-----", res);
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading(false);
            });

        apiGetOffersMoto()
            .then(res => {
                console.log("offers-----", res);
                setBenefitList(res.data);
            })
            .catch(err => {
                console.log("err-----", err);
            })

    }, []);

    const searchMoto = (value) => {

        apiSearchCarInputMoto(value)
            .then(res => {
                console.log("search-----", res);
                setCarList(res);
            })
            .catch(err => {
                console.log("err-----", err);
            });

    }

    const setServicesValueDebounced = useRef(_.debounce(searchMoto, 1000));

    const handleCarInput = value => {

        setCarInput(value);
        setServicesValueDebounced.current(value);

    }

    const receiveInput = (item) => {
        if (item.defitem) {
            handleCarInput(item.brand + " " + item.description);
        } else {
            history.push("/moto/steps", { brand: item.brand, version: item.description });
        }
    }

    useEffect(() => {
        if (!loadingQuestions && !loadingBenefits) {
            setLoading(false);
        }
    }, [loadingQuestions, loadingBenefits]);

    return (
        <>
            <Helmet>
                <title>Conseguí las mejores ofertas para el seguro de tu moto</title>
            </Helmet>
            <div className="w-full bg-maingray">

                <HeaderAuto clickEvent={executeScroll} />

                <div className="w-full bg-maingray md:bg-mainpink rounded-tl-2xl rounded-tr-2xl">
                    <div className="relative w-full max-w-1296 mx-auto bg-maingray md:bg-mainpink pb-8 md:pb-16 px-4 sm:px-12 xl:px-24 1xl:px-32 pt-1 rounded-tl-2xl rounded-tr-2xl">

                        <div id="moto" ref={myRef} className="pt-2 md:pt-10 pb-2 z-10">
                            <div className="flex items-center pb-6">
                                <span className="text-lg text-purple font-OpenSansRegular">Inicio</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Seguros</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansBold">Moto</span>
                            </div>

                            <div className="w-full block md:flex items-center justify-between">
                                <div className="w-full md:w-1/2 lg:w-3/5 pr-0 xl:pr-10" draggable={true}>
                                    <div className="w-full bg-white px-6 lg:px-12 py-4 lg:py-8 rounded-3xl">
                                        <DropZone onDrop={(file, text) => policyCreate(file)}>
                                            {
                                                ({ over, overDocument }) =>
                                                    <div>
                                                        {
                                                            over ?
                                                                <div className="relative">
                                                                    <p className="text-lg sm:text-xl text-gray font-SpartanSemiBold text-center pb-4">Subí tu <span className="text-green font-SpartanExtraBold">póliza</span> y accedé<br /> a los mejores precios</p>
                                                                    <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                                        <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                                        <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                                            Deslizá tu póliza<br /> hasta acá y compará
                                                                        </p>
                                                                        <button className="px-3 sm:px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                                    </div>
                                                                    <div className="absolute w-full h-full flex items-center top-0 opacity-75 bg-white">
                                                                        <p className="text-2xl font-SpartanBold mx-auto">¡Soltalo!</p>
                                                                    </div>
                                                                </div>
                                                                :
                                                                overDocument ?
                                                                    <>
                                                                        <p className="text-lg sm:text-xl text-gray font-SpartanSemiBold text-center pb-4">Subí tu <span className="text-green font-SpartanExtraBold">póliza</span> y accedé<br /> a los mejores precios</p>
                                                                        <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                                            <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                                            <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                                                Deslizá tu póliza<br /> hasta acá y compará
                                                                            </p>
                                                                            <button className="px-3 sm:px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p className="text-xl sm:text-2xl text-gray font-SpartanSemiBold text-center pb-4">Subí tu <span className="text-green font-SpartanExtraBold">póliza</span> y accedé<br /> a los mejores precios</p>
                                                                        <div className="border border-dashed border-gray-400 bg-gradient-to-b from-white to-blue-100 rounded-2xl pt-2 pb-8 text-center">
                                                                            <img src={uploadcloud} alt="" className="mx-auto mb-3 sm:mb-0" />
                                                                            <p className="text-center text-purple text-lg pb-3 hidden sm:block">
                                                                                Deslizá tu póliza<br /> hasta acá y compará
                                                                            </p>
                                                                            <button className="px-3 sm:px-12 py-4 bg-purple text-white rounded-md shadow-lg">Subir póliza</button>
                                                                        </div>
                                                                    </>
                                                        }
                                                    </div>
                                            }
                                        </DropZone>
                                    </div>
                                </div>
                                <div className="text-right px-0 sm:px-4 lg:px-8 pt-12">
                                    <div className="text-center">
                                        <p className="text-gray text-lg sm:text-xl font-SpartanSemiBold pb-8">O contanos qué moto tenés</p>
                                        <AutoComplete
                                            carlist={carlist}
                                            carinput={carinput}
                                            goSteps={goSteps}
                                            placeholder="Buscá tu moto"
                                            receiveInput={receiveInput}
                                            handleCarInput={handleCarInput}
                                        />
                                        <div className="flex mt-6">
                                            <div className="flex items-center justify-between mx-auto">
                                                <img src={rus} alt="" className="px-1 sm:px-3" />
                                                <img src={allianz} alt="" className="px-1 sm:px-3" />
                                                <img src={mark41} alt="" className="px-1 sm:px-3 hidden sm:block" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-maingray md:bg-mainpink">
                    <div className="relative w-full max-w-1296 mx-auto bg-maingray md:bg-mainpink md:pb-16 px-8 sm:px-12 xl:px-24 1xl:px-32 pt-4">
                        <p className="text-black font-SpartanBold text-2xl md:text-4xl pb-2 relative z-30">
                            Tu moto protegida,<br />
                            con más beneficios
                        </p>
                    </div>
                </div>


                <div className="w-full bg-maingray md:bg-mainpink">
                    <div className="relative w-full max-w-1296 mx-auto bg-maingray md:bg-mainpink pb-8 md:pb-16 px-0 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="block md:flex rounded-2xl bg-white px-4 lg:px-8 py-4 lg:py-10 relative z-30">
                            {benefitList.length !== 0 && <AutoScroll list={benefitList} />}
                        </div>
                        <img src={threelines} alt="" className="absolute left-0 top-minus72 hidden xl:block z-20" />
                    </div>
                </div>

                <div className="w-full bg-maingray relative z-10 overflow-hidden">

                    <div className="w-full bg-maingray xl:bg-transparent z-10 pt-10px md:pt-50px">

                        <div className="w-full max-w-1296 mx-auto">
                            <p className="font-SpartanSemiBold text-lg sm:text-2xl text-gray text-center pt-8 lg:pt-16 xl:pt-24 pb-4 md:pb-10 xl:pb-16 z-10">¿Alguna duda?</p>
                            <div className="px-0 sm:px-12 xl:px-24 1xl:px-32 z-10">
                                <div className="rounded-2xl bg-white px-4 sm:px-12 xl:px-16 py-2 shadow-lg">
                                    {questions.map((question, index) => (
                                        <Question
                                            key={question.id}
                                            title={question.title}
                                            description={question.description}
                                            hr={index !== questions.length - 1}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="w-full bg-maingray px-0 sm:px-12 xl:px-24 1xl:px-32 pt-2 mt-8 sm:mt-12">
                                <div className="bg-mainpink w-full flex justify-between items-center rounded-bl-2xl rounded-br-2xl sm:rounded-2xl px-2 sm:px-8 lg:px-24 py-8 lg:py-10">
                                    <p className="text-gray text-base sm:text-lg font-SpartanBold block md:hidden">¿Empezamos?</p>
                                    <p className="text-gray text-xl font-SpartanBold hidden md:block">¿Empezamos? Compará y elegí tu seguro</p>
                                    <p className="px-1 sm:px-10 py-3 bg-purple rounded-md text-white font-RobotoMedium text-base shadow-lg cursor-pointer text-center" onClick={executeScroll}>Cotizar ahora</p>
                                </div>
                            </div>

                        </div>

                        <Footer />

                    </div>

                    <div className="w-full bg-maingray xl:bg-mainpink rounded-bl-2xl rounded-br-2xl absolute top-0 z-minus10" style={{ height: "378px" }}></div>
                    <div className="w-full bg-maingray h-screen absolute z-minus10" style={{ top: "378px" }}></div>

                </div>

            </div>
            <ToastContainer />
            {modalIsOpen && <MessagesModalMoto />}
            {loading && <ChargingModalMoto />}
        </>
    )
}

export default Moto;
