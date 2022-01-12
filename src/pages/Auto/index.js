import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import autocar from '../../img/auto-car.png';
import threelines from '../../img/three-lines.png';

import Footer from '../../layouts/Footer';
import Question from '../../components/Question';
import AutoComplete from '../../components/AutoComplete';
import MessagesModal from '../../components/LoadingModal/MessagesModal';

import { apiPolicyCreate, apiGetAutoQuestions, apiSearchCarInput } from '../../services/main';
import { amplitudeLogEvent, removeSeveralSpace, splitInput } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import HeaderAuto from '../../layouts/HeaderAuto';


const Auto = (props) => {

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
        { brand: "VOLKSWAGEN", description: "GOL", id: 1 },
        { brand: "PEUGEOT", description: "208", id: 2 },
        { brand: "FORD", description: "FIESTA", id: 3 },
        { brand: "CHEVROLET", description: "CORSA", id: 4 },
        { brand: "FIAT", description: "CRONOS", id: 5 },
        { brand: "TOYOTA", description: "COROLLA", id: 6 }]);
    const [carlist, setCarList] = useState([]);

    const [questions, setQuestions] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const policyCreate = (file) => {

        console.log("file-----", file);

        setModalIsOpen(true);

        let formData = new FormData();

        formData.append('policy', file);

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

        if (carlist.length === 0) {
            return;
        }

        let brands = [];
        let groups = [];

        carlist.forEach(item => {

            if (!brands.includes(item.brand.toUpperCase())) {
                brands.push(item.brand.toUpperCase());
            }
            if (!groups.includes(item.description.toUpperCase())) {
                groups.push(item.description.toUpperCase());
            }

        });

        var splited_ = splitInput(carinput);

        if (brands.includes(splited_.brand)) {
            if (!!splited_.group && carlist.filter(i => i.brand === splited_.brand && i.description === splited_.group).length !== 0) {
                history.push("/steps", { brand: brands.filter(i => i === splited_.brand)[0], group: carlist.filter(i => i.brand === splited_.brand && i.description === splited_.group)[0].description });
            } else {
                history.push("/steps", { brand: brands.filter(i => i === splited_.brand)[0] });
            }
        }

    }

    useEffect(() => {
        amplitudeLogEvent("Auto");
        setCarList(defCarlist);

        apiGetAutoQuestions()
            .then(res => {
                console.log("res-----", res);
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading(false);
            })
    }, []);

    const searchCar = (value) => {

        apiSearchCarInput(value)
            .then(res => {

                console.log("search-----", res);
                setCarList(res.data);

            })
            .catch(err => {

            });

    }

    const setServicesValueDebounced = useRef(_.debounce(searchCar, 1000));

    const handleCarInput = value => {

        setCarInput(value);
        setServicesValueDebounced.current(value);

    }

    const receiveInput = (item) => {
        history.push("/steps", { brand: item.brand, group: item.description });
    }

    return (
        <>
            <Helmet>
                <title>Conseguí las mejores ofertas para el seguro de tu auto</title>
            </Helmet>
            <div className="w-full bg-maingray">
                <HeaderAuto clickEvent={executeScroll} />
                <div className="w-full bg-maingray md:bg-mainpink rounded-tl-2xl rounded-tr-2xl">
                    <div className="relative w-full max-w-1296 mx-auto bg-maingray md:bg-mainpink pb-8 md:pb-16 px-4 sm:px-12 xl:px-24 1xl:px-32 pt-1 rounded-tl-2xl rounded-tr-2xl">

                        <div id="auto" ref={myRef} className="pt-2 md:pt-10 pb-2 z-10">
                            <div className="flex items-center pb-6">
                                <span className="text-lg text-purple font-OpenSansRegular">Inicio</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Seguros</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansBold">Auto</span>
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
                                        <p className="text-gray text-lg sm:text-xl font-SpartanSemiBold pb-8">O contanos qué auto tenés</p>
                                        <AutoComplete
                                            carlist={carlist}
                                            carinput={carinput}
                                            goSteps={goSteps}
                                            placeholder="Buscá tu auto"
                                            receiveInput={receiveInput}
                                            handleCarInput={handleCarInput}
                                        />
                                        <div className="flex mt-6">
                                            <div className="flex items-center justify-between mx-auto">
                                                <img src={rus} alt="" className="pl-0 pr-1 sm:pl-3 sm:pr-3" />
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

                <div className="w-full bg-maingray xl:bg-mainpink">
                    <div className="w-full mx-auto max-w-1296 bg-maingray xl:bg-mainpink pr-0 lg:pr-12 xl:pr-32 1xl:pr-64 z-30">
                        <div className="w-full bg-white rounded-3xl pr-4 sm:pr-8 lg:pr-0 pl-4 sm:pl-8 lg:pl-12 xl:pl-32 1xl:pl-40 py-15 relative z-30">
                            <span className="bg-green2 text-green1 font-OpenSansBold text-sm px-2 py-1 absolute top-15 left-40 rounded-md">30% OFF</span>
                            <div className="w-full lg:max-w-1/2 text-center lg:text-left">
                                <p className="text-gray text-lg sm:text-xl font-SpartanSemiBold pt-12">Mejorar lo que pagas por tu<br className="hidden lg:block" /> seguro, <span className="text-green2 font-SpartanExtraBold">es muy fácil</span></p>
                                <div className="flex text-black2 pt-10 pb-10 justify-center lg:justify-start">
                                    <div className="text-center mr-20">
                                        <p className="gradient-text text-2xl font-SpartanBold">01</p>
                                        <p className="text-base sm:text-xl text-black2 font-OpenSansRegular tracking-wide">Tené tu poliza a<br /> mano y subila</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="gradient-text text-2xl font-SpartanBold">02</p>
                                        <p className="text-base sm:text-xl text-black2 font-OpenSansRegular tracking-wide">Elegí el mejor<br /> plan para vos</p>
                                    </div>
                                </div>
                                <div className="flex text-black2 pb-15 justify-center lg:justify-start">
                                    <div className="text-center mr-20">
                                        <p className="gradient-text text-2xl font-SpartanBold">03</p>
                                        <p className="text-base sm:text-xl text-black2 font-OpenSansRegular tracking-wide">Cargá los datos<br /> para pagar</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="gradient-text text-2xl font-SpartanBold">04</p>
                                        <p className="text-base sm:text-xl text-black2 font-OpenSansRegular tracking-wide">¡Listo! Ya tenés<br /> tu seguro</p>
                                    </div>
                                </div>
                                <div className="w-full pr-0 lg:pr-20 text-center">
                                    <p className="px-10 py-3 bg-purple text-white font-RobotoMedium text-base rounded-md mx-auto shadow-lg cursor-pointer" onClick={executeScroll}>Cotizá ahora</p>
                                </div>

                            </div>

                            <img src={autocar} alt="" className="hidden lg:block absolute top-10 z-20 right-minus20 xl:right-minus65 1xl:right-minus95 max-w-1/2" style={{ bottom: "-80px" }} />

                        </div>
                    </div>
                </div>

                <div className="w-full bg-maingray relative z-10 overflow-hidden">


                    <div className="w-full bg-maingray xl:bg-transparent z-30 pt-10px md:pt-50px">

                        <div className="w-full max-w-1296 mx-auto">
                            {questions.length !== 0 &&
                                <>
                                    <p className="font-SpartanSemiBold text-lg sm:text-2xl text-gray text-center pt-8 lg:pt-16 xl:pt-24 pb-4 md:pb-10 xl:pb-16 z-30">¿Alguna duda?</p>
                                    <div className="px-0 sm:px-12 xl:px-24 1xl:px-32 z-30">
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
                                </>
                            }
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

                    <img src={threelines} alt="" className="absolute left-0 top-minus110 hidden xl:block z-minus5" />

                </div>

            </div>
            <ToastContainer />
            {modalIsOpen && <MessagesModal />}
            {loading && <ChargingModal />}
        </>
    )
}

export default Auto;
