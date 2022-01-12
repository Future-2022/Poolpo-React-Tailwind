import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-modal';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

import './index.css';

import logo from '../../img/logo.png';
import arrowleft from '../../img/arrow-left.png';
import right1 from '../../img/chevron-right1.png';
import search from '../../img/search.png';
import card from '../../img/card.png';
import cross from '../../img/cross.png';
import uber from '../../img/uber.png';
import cabify from '../../img/cabify.png';
import beat from '../../img/beat.png';
import loadingimg from '../../img/loading.gif';

import StepMarker from '../../components/StepMarker';
import StepItem from '../../components/StepItem';
import ModelItem from '../../components/ModelItem';
import CustomInput from '../../components/CustomInput';
import MessagesModal from '../../components/LoadingModal/MessagesModal';

import TelefonoArgentino from '../../services/telefonos_argentinos.js';

import {
    apiGetBrands,
    apiGetGroupsByBrandName,
    apiGetModelsByBrandGroupYear,
    apiCheckPostalCode,
    apiLeadsSignUp,
    apiGetVehicleData,
    apiGetModelByCodia,
    apiVehiclesUpdate,
    apiLeadsUpdate,
    apiGetLeadData,
    apiGetYearsByGroupId,
} from '../../services/main';
import { amplitudeLogEvent, checkAge, checkDNI, checkEmail, checkBlank, checkName, getHash, removeSeveralSpace, setUserData } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import {Radio} from '../../components/Radio';
import InputDropdown from '../../components/InputDropdown';

const rentalDurationList = [
    {"id":1, "content":"1 año"},
    {"id":2, "content":"2 años"},
    {"id":3, "content":"3 años"},
]
const Rental = (props) => {

    let searchitem = window.location.search;
    let params = new URLSearchParams(searchitem);
    let leadID = params.get('leadid');
    let vehicleID = params.get('vehicleid');
    let data = useLocation();
    console.log(data);
    Modal.setAppElement('#root')

    const [step, setStep] = useState(1);

    const [make, setMake] = useState("");
    const [makelist, setMakeList] = useState([]);
    const [makelistwithimage, setMakeListWithImage] = useState([]);
    const [makelistwithoutimage, setMakeListWithoutImage] = useState([]);
    const [grouplist, setGroupList] = useState([]);
    const [group, setGroup] = useState("");
    const [yearlist, setYearList] = useState([]);
    const [year, setYear] = useState(0);
    const [yearstate, setYearState] = useState(0);
    const [versionlist, setVersionList] = useState([]);
    const [version, setVersion] = useState(0);

    const [vehicleHash, setVehicleHash] = useState(0);

    const [makefilter, setMakeFilter] = useState("");
    const [modelfilter, setModelFilter] = useState("");
    const [yearfilter, setYearFilter] = useState("");
    const [versionfilter, setVersionFilter] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [phonechecked, setPhoneChecked] = useState(false);
    const [dni, setDNI] = useState("");
    const [address, setAddress] = useState("");


    const [domain, setDomain] = useState("");
    const [engine, setEngine] = useState("");
    const [isCar, setIsCar] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [chassis, setChassis] = useState("");

    const [postalcodechecking, setPostalCodeChecking] = useState(true);
    const [postalcodechecked, setPostalCodeChecked] = useState(false);

    const [validError, setValidError] = useState({
        name: { error: false, msg: "Por favor ingrese nombre y apellido." },
        age: { error: false, msg: "La edad debe estar entre los 17 y los 99 años." },
        email: { error: false, msg: "Colocá tu email correcamente(Ej: juanperez@gmail.com)." },
        postalcodechecked: { error: false, msg: "Código postal no \n encontrado" },
        phone: { error: false, msg: "Colocá correctamente tu celular (Ej: 1165299315)." },
        dni: { error: false, msg: "El DNI debe ser 9.999.999 o 99.999.999" },
        postalcodechecked: { error: false, msg: "Código postal no \nencontrado" },
        cell: {error:false, msg:'Cell should be number'},
        rentalAmount : {error:false, msg:'RentalAmount should be required or number'},
        expenseAmount : {error:false, msg:'ExpenseAmount should be required or number'},
        surface: {error:false, msg:'Cell should be required'},
    });


    const [loading, setLoading] = useState(true);
    const [loadingVehicle, setLoadingVehicle] = useState(true);
    const [loadingCodia, setLoadingCodia] = useState(true);
    const [loadingLead, setLoadingLead] = useState(true);

    const [loadingBrand, setLoadingBrand] = useState(true);
    const [loadingGroup, setLoadingGroup] = useState(true);
    const [loadingYear, setLoadingYear] = useState(true);
    const [loadingVersion, setLoadingVersion] = useState(true);

    const [loading3A, setLoading3A] = useState(true);
    const [loading3B, setLoading3B] = useState(true);
    const [loading4A, setLoading4A] = useState(true);
    const [loading4B, setLoading4B] = useState(true);
    const [selected, setSelected] = useState("first");
    const [rentalAmount, setRentalAmount] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [surface, setSurface] = useState('');
    const [cell, setCell] = useState('');
        

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const getBrands = () => {

        setLoadingBrand(true);

        apiGetBrands()
            .then(res => {
                let withlist = [];
                let withoutlist = [];
                console.log("res-----", res);
                setLoadingBrand(false);
                setMakeList(res);

                res.forEach(item => {
                    if (!!item.image) {
                        withlist.push(item);
                    } else {
                        withoutlist.push(item);
                    }
                });
                console.log("with-----", withlist);
                console.log("without-----", withoutlist);
                setMakeListWithImage(withlist);
                setMakeListWithoutImage(withoutlist);

            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingBrand(false);
            })
    }

    useEffect(() => {

        amplitudeLogEvent("Steps");

        if (data.state && data.state.brand) {

            setMake(data.state.brand);

            if (data.state.group) {
                setGroup(data.state.group);
                setStep(3);
            } else {
                setStep(2);
            }

        }

        if (leadID && vehicleID) {

            apiGetVehicleData(vehicleID)
                .then(res => {

                    console.log("res-----", res);

                    setYear(res.data.year);
                    setVehicleHash(res.data.hash);

                    if (res.data.domain) {
                        setDomain(res.data.domain);
                    }
                    if (res.data.engine) {
                        setEngine(res.data.engine);
                    }
                    if (res.data.isCar) {
                        setIsCar(res.data.isCar);
                    }
                    if (res.data.isNew) {
                        setIsNew(res.data.isNew);
                    }
                    if (res.data.chassis) {
                        setChassis(res.data.chassis);
                    }

                    apiGetModelByCodia(res.data.code)
                        .then(res => {
                            console.log("res-----", res);
                            setLoadingCodia(false);
                            setMake(res.data.brand.name);
                            setGroup(res.data.group.name);
                            setVersion(res.data.description);
                        })
                        .catch(err => {
                            console.log("err-----", err);
                            setLoadingCodia(false);
                        })
                })
                .catch(err => {
                    console.log("err-----", err);
                    setLoadingVehicle(false);
                });

            apiGetLeadData(leadID)
                .then(res => {
                    console.log("lead-----", res);
                    setLoadingLead(false);
                    if (res.data.address) {
                        setAddress(res.data.address);
                    }
                    if (res.data.age) {
                        setAge(res.data.age);
                    }
                    if (res.data.dni) {
                        setDNI(res.data.dni);
                    }
                    if (res.data.email) {
                        setEmail(res.data.email);
                    }
                    if (res.data.name) {
                        setName(res.data.name);
                    }
                    if (res.data.phone) {
                        setPhone(res.data.phone);
                    }
                    if (res.data.cp) {
                        setPostalCode(res.data.cp);
                        checkPostalCode(res.data.cp);
                    }
                })
                .catch(err => {
                    console.log("err-----", err);
                    setLoadingLead(false);
                })

        }

    }, []);

    const getGroups = (brand_ = false) => {
        setLoadingGroup(true);
        return apiGetGroupsByBrandName({ brand: brand_ ? brand_ : make })
            .then(res => {
                console.log("groups-----", res);
                setLoadingGroup(false);
                setGroupList(res);
            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingGroup(false);
            })
    }

    useEffect(() => {

        if (step === 1) {
            getBrands();
        }

        if (step === 2) {
            setGroupList([]);
            getGroups();
        }

    }, [step]);

    const checkValidation = () => {
        if(step === 1) {
            let { 
                postalcodechecked: ePostChk,
                surface : eSurface,
                rentalAmount : eRentalAmount,
                expenseAmount: eExpenseAmount,
            } = validError;
            eSurface.error = false;
            eRentalAmount.error = false;
            eExpenseAmount.error = false;

            if (!postalcode || !postalcodechecked) {
                ePostChk.error = true;
            }
            if (!checkBlank(rentalAmount)) {
                eRentalAmount.error = true;
            }
            if (!checkBlank(expenseAmount)) {
                eExpenseAmount.error = true;
            }
            if(!checkBlank(surface)) {
                eSurface.error = true;
            } 

            setValidError({
                ...validError,
                postalcodechecked: ePostChk,
                surface:eSurface,
            });

            if (eSurface.error || eRentalAmount.error || eExpenseAmount.error || ePostChk.error) {
                return false;
            }
            return true;
        }
        else if (step == 2) {
            let { 
                email: eEmail,
                phone: ePhone,
                postalcodechecked: ePostChk,
                dni: eDNI,
                cell: eCell,
                name:eName, 
            } = validError;

            eEmail.error = false;
            eDNI.error = false;
            ePhone.error = false;
            eCell.error = false;
            eName.error = false;
            ePhone.error = false;
            if (!checkEmail(email)) {
                eEmail.error = true;
            }
            if (!checkDNI(dni)) {
                eDNI.error = true;
            }
            if(!checkBlank(cell)) {
                eCell.error = true;
            }
            if(!checkName(name)) {
                eName.error = true;
            }
            if (!phonechecked) {
                ePhone.error = true;
            }
            setValidError({
                ...validError,
                email: eEmail,
                phone: ePhone,
                postalcodechecked: ePostChk,
                dni: eDNI,
                cell:eCell,
            });

            if (eDNI.error || eCell.error || eEmail.error || eName.error || ePhone.error) {
                return false;
            }
            alert('check complete');
            return true;
        }
    }

    const checkPostalCode = value => {
        setPostalCodeChecking(true);
        setPostalCodeChecked(false);
        apiCheckPostalCode(value)
            .then(res => {

                console.log('res-----', res);

                setPostalCodeChecking(false);
                setPostalCodeChecked(res);
                let { postalcodechecked: ePCC } = validError;
                if (!res) {
                    ePCC.error = true;
                }
                else
                    ePCC.error = false;
                setValidError({ ...validError, postalcodechecked: ePCC });

            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {

        setPhoneChecked(false);
        let tel = new TelefonoArgentino(phone);
        setPhoneChecked(tel.isValid() && phone.length >= 8);

    }, [phone]);

    const nextStep = () => {
        var temp = checkValidation();
        if(temp == true) {
            setStep(step + 1)
        }
    }

    const setServicesValueDebounced = useRef(_.debounce(checkPostalCode, 1000));

    useEffect(() => {

        if (!!postalcode) {
            setServicesValueDebounced.current(postalcode);
        }

    }, [postalcode]);

    useEffect(() => {
        if (step === 1) {
            if (!loadingBrand) {
                setLoading(false);
            } else {
                if (leadID && vehicleID && ((!loadingVehicle && !loadingLead) || (!loadingCodia && !loadingLead)) && !loadingBrand) {
                    setLoading(false);
                } else {
                    setLoading(loadingBrand);
                }
            }
        }
        if (step === 2) {
            if (!loadingGroup) {
                setLoading(false);
            } else {
                setLoading(loadingGroup);
            }
        }
    }, [loadingVehicle,
        loadingCodia,
        loadingLead,
        loadingBrand,
        loadingGroup,
        loadingYear,
        loadingVersion,
        loading3A,
        loading3B,
        loading4A,
        loading4B,
        step
    ]);

    return (
        <>
            <div className="w-full flex bg-maingray" style={{ minHeight: "100vh" }}>
                <div className="w-2/5 bg-maingray hidden md:block">
                    <div className="w-full max-w-518 ml-auto">
                        <div className="w-full pl-8 lg:pl-16 xl:pl-24 1xl:pl-40 pt-8">
                            <a href="/"><img src={logo} alt="" /></a>
                            <div className="pl-6 pt-8">

                                <StepMarker
                                    number={1}
                                    content="Sobre tu alquiler"
                                    step={step}
                                    list={makelist}
                                    self={make}
                                    tick={true}
                                    stringValue={true}
                                />
                                <StepMarker
                                    number={2}
                                    content="Datos personales"
                                    step={step}
                                    list={grouplist}
                                    self={group}
                                    tick={true}
                                    stringValue={true}
                                />

                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-3/5 bg-maingray md:bg-mainpink md:rounded-tl-2xl md:rounded-tr-2xl">
                    <div className="w-full max-w-778 mr-auto">
                        <div className="w-full pl-4 sm:pl-8 pt-15">
                            <div className="flex items-center">
                                <div className="flex items-center cursor-pointer" onClick={() => setStep(step - 1 === 0 ? 1 : step - 1)}>
                                    {step !== 1 &&
                                        <img src={arrowleft} alt="" />
                                    }
                                    <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 2</p>

                                </div>
                                {((step === 1 && !!make) || (step === 2 && !!group) || (step === 3 && !!year) || (step === 4 && !!version)) &&
                                    <img src={arrowleft} alt="" className="transform rotate-180 cursor-pointer" onClick={() => setStep(step + 1)} />
                                }
                            </div>
                            <div id="modal-wrapper" className="pt-10 pl-0 sm:pl-8 md:pl-0 lg:pl-16 pb-8 sm:pb-40">
                                {step === 1 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-2 sm:pb-8 pr-4">Contanos sobre tu hogar</p>
                                        <div className="pr-4 sm:pr-16 md:pr-8 lg:pr-32 1xl:pr-64">
                                            <div className="w-full md:block">
                                                <div className="w-full flex flex-col items-center text-center mx-auto sm:flex-row">
                                                    <div className='pt-4'><CustomInput type="number" name="Monto de alquiler" className="w-50 h-56 sm:w-full" error={validError.rentalAmount.error} errorMsg={validError.rentalAmount.msg} style={{marginRight:20}} content={rentalAmount} onChange={e => setRentalAmount(e.target.value)}/></div>
                                                    <div style={{width:"20px"}}></div>
                                                    <div className='pt-4'><CustomInput type="number" name="Monto de expensas" className="w-50 h-56 sm:w-full" error={validError.expenseAmount.error} errorMsg={validError.expenseAmount.msg} content={expenseAmount} onChange={e => setExpenseAmount(e.target.value)}/></div>                                                                                            
                                                </div>
                                                <div className='pt-5'>
                                                    <InputDropdown type="text" name="Duración de alquiler" className="w-full h-56" list={rentalDurationList}/>
                                                </div>
                                                <div className='pt-5'>
                                                    <CustomInput type="text" special={true} className="w-full h-56" name="Código postal" content={postalcode} error={validError.postalcodechecked.error} errorMsg={validError.postalcodechecked.msg} onChange={e => setPostalCode(e.target.value)} />
                                                    <div className="absolute top-4 right-4">
                                                        {postalcode.length !== 0 ?
                                                            <>
                                                                {
                                                                    postalcodechecking ?
                                                                        <img src={loadingimg} className="w-6 h-6" alt="loading" />
                                                                        :
                                                                        <>
                                                                            {
                                                                                postalcodechecked ?
                                                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 78.369 78.369" fill="#AAAAAA">
                                                                                        <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z" />
                                                                                    </svg>
                                                                                    :
                                                                                    <img src={cross} className="w-6 h-6" alt="loading" />

                                                                            }
                                                                        </>
                                                                }
                                                            </>
                                                            :
                                                            <img src={cross} className="w-6 h-6" alt="loading" />
                                                        }
                                                    </div>
                                                </div>
                                                <div className='pt-5'>
                                                    <CustomInput type="number" name="Superficie" className="w-full h-56" error={validError.surface.error} errorMsg={validError.surface.msg} content={surface} onChange={e => setSurface(e.target.value)}/>
                                                </div>
                                                <div className='pt-5'><p className='text-gray text-base font-OpenSansBold'>¿Tenés propiedad reservada?</p></div>
                                                <div>
                                                <div className='flex'>
                                                    <Radio
                                                        value="first"
                                                        selected={selected}
                                                        text="Si"
                                                        onChange={setSelected}
                                                        marginType={1}
                                                    />
                                                    <div style={{width:"30px"}}></div>
                                                    <Radio
                                                        value="second"
                                                        selected={selected}
                                                        text="No"
                                                        onChange={setSelected}
                                                        marginType={1}
                                                    />
                                                </div>
                                                </div>
                                                <div className='mt-6 text-right'>
                                                    <button className="px-10 py-3 font-RobotoMedium border bg-purple2 rounded-xl text-base text-white" onClick={nextStep} >
                                                        Siguiente
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {step === 2 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">También, sobre vos</p>
                                        <div className="pr-4 sm:pr-16 lg:pr-32 1xl:pr-64">
                                            <div className="w-full items-center text-center mx-auto">
                                                <div className='pt-5'>
                                                    <CustomInput type="text" name="Nombre y apellido" className="w-full h-56"  error={validError.name.error} errorMsg={validError.name.msg} content={name} onChange={e => setName(e.target.value)}/>
                                                </div>
                                                <div className='pt-5'>
                                                    <CustomInput type="number" name="DNI" className="w-full h-56" content={dni} error={validError.dni.error} errorMsg={validError.dni.msg}  onChange={e => setDNI(e.target.value)}/>
                                                </div>
                                                <div className='pt-5'>
                                                    <CustomInput type="email" name="Email" className="w-full h-56" error={validError.email.error} errorMsg={validError.email.msg} content={email} onChange={e => setEmail(e.target.value)}/>
                                                </div>
                                                <div className='pt-5'>
                                                    <CustomInput type="number" name="Celular" content={phone} error={validError.phone.error} errorMsg={validError.phone.msg} onChange={e => setPhone(e.target.value)} />
                                                    <div className="absolute top-4 right-4">
                                                        {phonechecked ?
                                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 78.369 78.369" fill="#AAAAAA">
                                                                <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z" />
                                                            </svg>
                                                            :
                                                            <img src={cross} className="w-6 h-6" alt="loading" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-6 text-right'>
                                                <button className="px-10 py-3 font-RobotoMedium border bg-purple2 rounded-xl text-base text-white" onClick={checkValidation}>
                                                    Cotizar
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {loading && <ChargingModal />}
        </>
    )
}

export default Rental;
