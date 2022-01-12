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
import { amplitudeLogEvent, checkAge, checkDNI, checkEmail, checkName, getHash, removeSeveralSpace, setUserData } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const Steps = (props) => {

    let searchitem = window.location.search;
    let params = new URLSearchParams(searchitem);
    let leadID = params.get('leadid');
    let vehicleID = params.get('vehicleid');

    let data = useLocation();

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
    });

    const [currentModal, setCurrentModal] = useState(false);

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

    const closeModal = () => {
        setModalIsOpen(false);
    }

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

    const pros = [
        {
            id: 1,
            image: uber,
            content: 'uber'
        },
        {
            id: 2,
            image: cabify,
            content: 'cabify'
        },
        {
            id: 3,
            image: beat,
            content: 'beat'
        },
    ];

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

    const getYearsByGroupId = () => {
        setLoadingYear(true);
        return apiGetYearsByGroupId({ group_id: grouplist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group))[0].id })
            .then(res => {
                console.log("years-----", res);
                setLoadingYear(false);
                setYearList(res);
            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingYear(false);
            })
    }

    const getModelsByBrandGroupYear = (brand_ = false, group_ = false, year_ = false) => {
        setLoadingVersion(true);
        return apiGetModelsByBrandGroupYear({ brand_id: brand_ ? brand_ : makelist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(make))[0].id, group_id: group_ ? group_ : grouplist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group))[0].id, year: year_ ? year_ : year })
            .then(res => {
                console.log("models-----", res);
                setLoadingVersion(false);
                setVersionList(res);
                if (res.length === 0) {
                    toast.error("No existen versiones para este modelo / año");
                }
            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingVersion(false);
            })
    }

    useEffect(() => {

        if (step !== 5) {
            setLoading(true);
        }

        if (step === 1) {
            getBrands();
        }

        if (step === 2) {
            setGroupList([]);
            getGroups();
        }

        if (step === 3) {

            setYearList([]);
            setLoading3A(true);
            setLoading3B(true);

            if (data.state && data.state.brand && data.state.group) {

                apiGetGroupsByBrandName({ brand: make || data.state.brand })
                    .then(res => {
                        console.log("groups-----", res);
                        apiGetYearsByGroupId({ group_id: res.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group || data.state.group))[0].id })
                            .then(res1 => {
                                console.log("years-----", res1);
                                setLoading3B(false);
                                setYearList(res1);
                            })
                            .catch(error => {
                                console.log("err-----", error);
                                setLoading3B(false);
                            })
                    })
                    .catch(error => {
                        console.log("err-----", error);
                        setLoading3A(false);
                    })
            } else {
                getYearsByGroupId();
            }
        }

        if (step === 4) {

            if (data.state && data.state.brand) {
                setLoading4A(true);
                setLoading4B(true);
                apiGetGroupsByBrandName({ brand: make || data.state.brand })
                    .then(res => {
                        console.log("groups-----", res);
                        apiGetModelsByBrandGroupYear({ brand_id: makelist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(make || data.state.brand))[0].id, group_id: res.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group || data.state.group))[0].id, year: year })
                            .then(res => {
                                console.log("models-----", res);
                                setVersionList(res);
                                setLoading4B(false);
                                if (res.length === 0) {
                                    toast.error("No existen versiones para este modelo / año");
                                }
                            })
                            .catch(error => {
                                console.log("err-----", error);
                                setLoading4B(false);
                            })
                    })
                    .catch(error => {
                        console.log("err-----", error);
                        setLoading4A(false);
                    })
            } else {
                getModelsByBrandGroupYear();
            }

        }

    }, [step]);

    const checkValidation = () => {
        let { name: eName,
            age: eAge,
            email: eEmail,
            phone: ePhone,
            postalcodechecked: ePostChk,
            dni: eDNI } = validError;

        eName.error = false;
        eAge.error = false;
        eEmail.error = false;
        eDNI.error = false;
        ePhone.error = false;

        if (!checkEmail(email)) {
            eEmail.error = true;
        }
        if (!checkName(name)) {
            eName.error = true;
        }
        if (!checkDNI(dni)) {
            eDNI.error = true;
        }
        if (!checkAge(age)) {
            eAge.error = true;
        }
        if (!postalcode || !postalcodechecked) {
            ePostChk.error = true;
        }
        if (!phonechecked) {
            ePhone.error = true;
        }

        setValidError({
            ...validError,
            name: eName,
            age: eAge,
            email: eEmail,
            phone: ePhone,
            postalcodechecked: ePostChk,
            dni: eDNI
        });

        if (ePostChk.error || eName.error || eAge.error || eEmail.error || ePhone.error
            || eDNI.error) {
            return false;
        }
        return true;
    }

    const sendData = e => {

        e.preventDefault();

        if (checkValidation()) {

            setUploadModal(true);

            if (leadID && vehicleID) {

                console.log("version-----", version);
                console.log("versionlist-----", versionlist);

                let versionid = versionlist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version))[0].id;

                apiGetModelByCodia(versionid)
                    .then(res => {

                        console.log("res-----", res);

                        let formData = new FormData();
                        formData.append('Hash', vehicleHash);
                        formData.append('Brand', res.data.brand.name);
                        formData.append('Model', res.data.group.name);
                        formData.append('Version', res.data.description);
                        formData.append('ModelID', versionid);
                        formData.append('Domain', !!domain ? domain : "100");
                        formData.append('Year', year);
                        formData.append('isNew', isNew);
                        formData.append('Chassis', !!chassis ? chassis : "100");
                        formData.append('Engine', !!engine ? engine : "100");
                        formData.append('isCar', isCar);

                        apiVehiclesUpdate(formData)
                            .then(res => {
                                console.log("res----", res);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log("err-----", err);
                    })

                let leadData = new FormData();
                leadData.append('Hash', leadID);
                leadData.append('Name', name);
                leadData.append('Email', email);
                leadData.append('Phone', phone);
                leadData.append('Age', age);
                leadData.append('CP', postalcode);
                leadData.append('DNI', dni);
                leadData.append('Address', address);

                apiLeadsUpdate(leadData)
                    .then(res => {
                        console.log("res-----", res);
                        if (res.data.error) {
                            if (res.data.msg) {
                                toast.error(res.data.msg);
                            }
                        }
                    })
                    .catch(err => {
                        console.log("err-----", err);
                    })
            } else {

                let newhash = getHash();

                let formData = new FormData();

                formData.append('Hash', newhash);
                formData.append('Name', name);
                formData.append('Email', email);
                formData.append('Phone', phone);
                formData.append('Age', age);
                formData.append('DNI', dni);
                formData.append('CP', postalcode);
                formData.append('Brand', make);
                formData.append('Year', year);
                formData.append('ModelID', versionlist.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version))[0].id);
                formData.append('isNew', isNew);
                formData.append('PolicyCoverage', 4);
                formData.append('Franchise', 0);
                formData.append('isCar', true);

                apiLeadsSignUp(formData)
                    .then(res => {
                        console.log("res-----", res.data);
                        let response = JSON.parse(res.data.msg)
                        let leadID = response.leadID
                        let VehicleID = response.VehicleID
                        let GroupID = response.GroupID

                        setUserData(leadID, VehicleID, GroupID, name)

                    })
                    .catch(err => {
                        console.log(err);
                        setUploadModal(false);
                    });

            }

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

    const setServicesValueDebounced = useRef(_.debounce(checkPostalCode, 1000));

    useEffect(() => {

        if (!!postalcode) {
            setServicesValueDebounced.current(postalcode);
        }

    }, [postalcode]);

    const handleYear = (item) => {

        setYear(item);

        if (item === (new Date()).getFullYear()) {
            setCurrentModal(true);
        } else {
            setTimeout(function () { setStep(4) }, 500)
        }
    }

    const closeCurrentModal = () => {
        setCurrentModal(false);
    }

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
        if (step === 3) {
            if (data.state && data.state.brand && !!make && data.state.group) {
                if (!loading3A || !loading3B) {
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            } else {
                setLoading(loadingYear);
            }
        }
        if (step === 4) {
            if (data.state && data.state.brand && !!make && !!group && !!year) {
                if (!loading4A || !loading4B) {
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            } else {
                setLoading(loadingVersion);
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
                                    content="Marca de tu auto"
                                    step={step}
                                    list={makelist}
                                    self={make}
                                    tick={true}
                                    stringValue={true}
                                />
                                <StepMarker
                                    number={2}
                                    content="Modelo"
                                    step={step}
                                    list={grouplist}
                                    self={group}
                                    tick={true}
                                    stringValue={true}
                                />
                                <StepMarker
                                    number={3}
                                    content="Año"
                                    step={step}
                                    list={yearlist}
                                    self={year}
                                    tick={true}
                                    raw={true}
                                />
                                <StepMarker
                                    number={4}
                                    content="Versión"
                                    step={step}
                                    list={versionlist}
                                    self={version}
                                    tick={true}
                                    raw={true}
                                />
                                {/* <StepMarker
                                    number={5}
                                    content="Uso profesional"
                                    step={step}
                                    tick={false}
                                />
                                <StepMarker
                                    number={6}
                                    content="Datos personales"
                                    step={step}
                                    tick={false}
                                /> */}
                                <StepMarker
                                    number={5}
                                    content="Datos personales"
                                    step={step}
                                    tick={false}
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
                                    {/* <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 6</p> */}
                                    <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 5</p>

                                </div>
                                {((step === 1 && !!make) || (step === 2 && !!group) || (step === 3 && !!year) || (step === 4 && !!version)) &&
                                    <img src={arrowleft} alt="" className="transform rotate-180 cursor-pointer" onClick={() => setStep(step + 1)} />
                                }
                            </div>
                            <div id="modal-wrapper" className="pt-10 pl-0 sm:pl-8 md:pl-0 lg:pl-16 pb-8 sm:pb-40">
                                {step === 1 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-2 sm:pb-8 pr-4">Seleccioná la marca de tu auto</p>
                                        <div className="pr-4 sm:pr-16 md:pr-8 lg:pr-32 1xl:pr-64">
                                            <div className="w-full hidden md:block">
                                                <div className="w-full flex items-center text-center mx-auto">
                                                    <input type="text" className="w-full h-56 bg-white px-6 py-4 rounded-tl-2xl rounded-bl-2xl" placeholder="Buscá la marca" value={makefilter} onChange={e => setMakeFilter(e.target.value)} />
                                                    <button className="h-56 bg-pink2 rounded-tr-2xl rounded-br-2xl">
                                                        <img src={search} alt="" className="ml-6 mr-10 my-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full grid grid-cols-2 sm:grid-cols-3 col-gap-2 sm:col-gap-8 md:col-gap-4 1xl:col-gap-8 row-gap-2 sm:row-gap-8 md:row-gap-4 1xl:row-gap-8 pt-8 pb-3">
                                                {makelistwithimage.filter(i => i.name.toLocaleLowerCase().includes(makefilter.toLocaleLowerCase())).map(item => (
                                                    <StepItem key={item.id} name={item.name} image={item.image} item={item.name} state={make} onClick={() => { setMake(item.name); setTimeout(function () { setStep(2) }, 500); }} />
                                                ))}
                                                {makelistwithoutimage.filter(i => i.name.toLocaleLowerCase().includes(makefilter.toLocaleLowerCase())).map(item => (
                                                    <StepItem key={item.id} name={item.name} image={item.image} item={item.id} state={make} onClick={() => { setMake(item.name); setTimeout(function () { setStep(2) }, 500); }} />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }
                                {step === 2 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">¿Cuál es el modelo?</p>
                                        <div className="pr-4 sm:pr-16 lg:pr-32 1xl:pr-64">
                                            <div className="w-full flex items-center text-center mx-auto">
                                                <input type="text" className="w-full h-56 bg-white px-6 py-4 rounded-tl-2xl rounded-bl-2xl" placeholder="Buscá el modelo" value={modelfilter} onChange={e => setModelFilter(e.target.value)} />
                                                <button className="h-56 bg-pink2 rounded-tr-2xl rounded-br-2xl">
                                                    <img src={search} alt="" className="ml-6 mr-10 my-3" />
                                                </button>
                                            </div>
                                            {grouplist.filter(i => i.name.toLocaleLowerCase().includes(modelfilter.toLocaleLowerCase())).length !== 0 &&
                                                <div className="w-full mt-2 py-2 pl-3 pr-3 bg-white rounded-xl">
                                                    <div className="w-full model-select bg-white pb-4" style={{ maxHeight: "456px" }}>

                                                        {grouplist.filter(i => i.name.toLocaleLowerCase().includes(modelfilter.toLocaleLowerCase())).map(item => (
                                                            <ModelItem key={item.id} name={item.name} item={item.name} group={group} onClick={() => { setGroup(item.name); setTimeout(function () { setStep(3) }, 500) }} />
                                                        ))}

                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </>
                                }
                                {step === 3 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">¿De qué año es?</p>
                                        <div className="pr-4 sm:pr-16 lg:pr-32 1xl:pr-64">
                                            <div className="w-full flex items-center text-center mx-auto">
                                                <input type="text" className="w-full h-56 bg-white px-6 py-4 rounded-tl-2xl rounded-bl-2xl" placeholder="Buscá el año" value={yearfilter} onChange={e => setYearFilter(e.target.value)} />
                                                <button className="h-56 bg-pink2 rounded-tr-2xl rounded-br-2xl">
                                                    <img src={search} alt="" className="ml-6 mr-10 my-3" />
                                                </button>
                                            </div>
                                            <div className="w-full model-select mt-2 rounded-xl pt-6 pb-4">

                                                <div className="w-full grid grid-cols-2 sm:grid-cols-4 col-gap-4 row-gap-4">
                                                    {yearlist.filter(i => i.toString().includes(yearfilter.toLocaleLowerCase())).filter(i => yearstate === 0 ? i >= 2007 : i < 2007).map(item => (
                                                        <p key={item} className={`${item === year ? `text-black border border-purple bg-pink5 shadow-lg` : `text-gray1 bg-white`} font-OpenSansRegular text-lg md:text-lg px-4 py-3 rounded-xl text-center sm:text-left cursor-pointer`} onClick={() => handleYear(item)}>{item}</p>
                                                    ))}
                                                </div>

                                                {yearlist.length !== 0 &&
                                                    <>
                                                        {yearstate === 0 ?

                                                            <div className="pt-4 flex items-center float-right cursor-pointer" onClick={() => setYearState(1)}>
                                                                <p className="font-OpenSansSemiBold text-base md:text-xl text-purple">Anterior a 2007</p>
                                                                <img src={right1} alt="" />
                                                            </div>

                                                            :

                                                            <div className="pt-4 flex items-center float-right cursor-pointer" onClick={() => setYearState(0)}>
                                                                <img src={right1} alt="" className="transform rotate-180" />
                                                                <p className="font-OpenSansSemiBold text-base md:text-xl text-purple">Posterior a 2006</p>
                                                            </div>
                                                        }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </>
                                }
                                {step === 4 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">Seleccioná la versión de tu auto</p>
                                        <div className="pr-4 sm:pr-16 lg:pr-32 1xl:pr-64">
                                            <div className="w-full flex items-center text-center mx-auto">
                                                <input type="text" className="w-full h-56 bg-white px-6 py-4 rounded-tl-2xl rounded-bl-2xl" placeholder="Buscá la versión" value={versionfilter} onChange={e => setVersionFilter(e.target.value)} />
                                                <button className="h-56 bg-pink2 rounded-tr-2xl rounded-br-2xl">
                                                    <img src={search} alt="" className="ml-6 mr-10 my-3" />
                                                </button>
                                            </div>
                                            {versionlist.filter(i => i.name.toLocaleLowerCase().includes(versionfilter.toLocaleLowerCase())).length !== 0 &&
                                                <div className="w-full mt-2 py-2 pl-3 pr-3 bg-white rounded-xl">
                                                    <div className="w-full model-select bg-white pb-4" style={{ maxHeight: "456px" }}>

                                                        {versionlist.filter(i => i.name.toLocaleLowerCase().includes(versionfilter.toLocaleLowerCase())).map(item => (
                                                            <ModelItem key={item.id} name={item.name} item={item.name} group={version} onClick={() => { setVersion(item.name); setTimeout(function () { setStep(5) }, 500); }} />
                                                        ))}

                                                    </div>
                                                </div>
                                            }
                                            <div className="pt-4 flex items-center float-right cursor-pointer" onClick={() => setModalIsOpen(true)}>
                                                <p className="font-OpenSansSemiBold text-base sm:text-xl text-purple">¿Cuál es la versión de mi auto?</p>
                                                <img src={right1} alt="" />
                                            </div>

                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                            >
                                                <div className="w-full relative rounded-2xl px-4 sm:px-8">
                                                    <img src={cross} alt="" className="absolute top-2 sm:top-4 right-2 sm:right-4 md:top-8 md:right-10 cursor-pointer" onClick={() => setModalIsOpen(false)} />
                                                    <div className="px-0 md:px-24 pt-10 pb-6 sm:pb-10">
                                                        <p className="text-xl md:text-2xl font-SpartanMedium text-gray text-center pb-4 sm:pb-6">Encontrá la versión en tu<br /> <span className="font-SpartanBold">cédula verde</span></p>
                                                        <img src={card} alt="card" className="w-full" />
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </>
                                }
                                {/* {step === 5 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-4">¿Tu auto tiene uso profesional?</p>
                                        <p className="font-OpenSansRegular text-base md:text-lg text-gray pb-6 pr-4">Podemos ofrecerte seguros especiales teniendo<br className="hidden md:block" /> en cuenta tu uso profesional </p>
                                        <div className="pr-8 sm:pr-16 lg:pr-32 1xl:pr-64">
                                            <div className="w-full grid grid-cols-2 sm:grid-cols-3 col-gap-8 row-gap-8">
                                                {pros.map(item => (
                                                    <div key={item.id} className={`w-full flex items-center ${item.id === pro ? `bg-pink5 border border-purple shadow-md` : ` bg-white`} py-3 rounded-lg cursor-pointer px-4`} onClick={() => { setPro(item.id); setTimeout(function () { setStep(6) }, 500); }}>
                                                        <img src={item.image} alt="" className="mx-auto" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-8">
                                                <button className="font-RobotoMedium text-base text-purple2 border border-purple2 px-10 py-3 rounded-lg" onClick={() => setStep(6)}>Saltear paso</button>
                                            </div>
                                        </div>
                                    </>
                                }
                                {step === 6 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">Datos para enviarte la cotización</p>
                                        <form className="pr-8 sm:pr-16 lg:pr-24 1xl:pr-40" onSubmit={sendData} noValidate>
                                            <div className="w-full block sm:flex">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="Nombre y apellido" content={name} error={validError.name.error} errorMsg={validError.name.msg} onChange={e => setName(e.target.value)} />
                                                </div>
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0">
                                                    <CustomInput type="number" name="Edad" content={age} error={validError.age.error} errorMsg={validError.age.msg} onChange={e => setAge(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput type="email" name="Email" content={email} error={validError.email.error} errorMsg={validError.email.msg} onChange={e => setEmail(e.target.value)} />
                                                </div>
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0 relative">
                                                    <CustomInput type="text" special={true} name="Código postal" content={postalcode} error={validError.postalcodechecked.error} errorMsg={validError.postalcodechecked.msg} onChange={e => handlePostalCode(e)} />
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
                                            </div>
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0 relative">
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
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0">
                                                    <CustomInput type="number" name="DNI" content={dni} error={validError.dni.error} errorMsg={validError.dni.msg} onChange={e => setDNI(e.target.value)} />
                                                </div>
                                            </div>
                                            <button type="submit" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 shadow-lg">Cotizar</button>
                                        </form>
                                    </>
                                } */}

                                {step === 5 &&
                                    <>
                                        <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-4">Tus datos para cotizar</p>
                                        <form className="pr-4 sm:pr-16 lg:pr-24 1xl:pr-40" onSubmit={sendData} noValidate>
                                            <div className="w-full block sm:flex">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="Nombre y apellido" content={name} error={validError.name.error} errorMsg={validError.name.msg} onChange={e => setName(e.target.value)} />
                                                </div>
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0">
                                                    <CustomInput type="number" name="Edad" content={age} error={validError.age.error} errorMsg={validError.age.msg} onChange={e => setAge(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput type="email" name="Email" content={email} error={validError.email.error} errorMsg={validError.email.msg} onChange={e => setEmail(e.target.value)} />
                                                </div>
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0 relative">
                                                    <CustomInput type="text" special={true} name="Código postal" content={postalcode} error={validError.postalcodechecked.error} errorMsg={validError.postalcodechecked.msg} onChange={e => setPostalCode(e.target.value)} />
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
                                            </div>
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-3/5 mb-4 sm:mb-0 relative">
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
                                                <div className="w-full sm:w-2/5 pl-0 sm:pl-8 mb-4 sm:mb-0">
                                                    <CustomInput type="number" name="DNI" content={dni} error={validError.dni.error} errorMsg={validError.dni.msg} onChange={e => setDNI(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full text-center sm:text-left">
                                                <button type="submit" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 shadow-lg">Cotizar</button>
                                            </div>
                                        </form>
                                    </>
                                }

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
            {uploadModal && <MessagesModal />}
            <Modal
                isOpen={currentModal}
                onRequestClose={closeCurrentModal}
                style={customStyles}
            >
                <div>
                    <p className="text-xl text-black font-SpartanBold px-20 py-4">
                        es 0KM?
                    </p>
                    <div className="flex items-center justify-between py-4">
                        <button className="text-md text-white font-SpartanRegular px-4 py-2 bg-green-500 rounded-md" onClick={() => { setStep(4); setIsNew(true); setCurrentModal(false); }}>Si</button>
                        <button className="text-md text-white font-SpartanRegular px-4 py-2 bg-pink9 rounded-md" onClick={() => { setStep(4); setIsNew(false); setCurrentModal(false); }}>No</button>
                    </div>
                </div>
            </Modal>
            {loading && <ChargingModal />}
        </>
    )
}

export default Steps;
