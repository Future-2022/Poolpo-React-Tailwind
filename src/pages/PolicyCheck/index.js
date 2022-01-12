import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import _, { remove } from 'lodash';

import logo from '../../img/logo.png';
import arrowleft from '../../img/arrow-left.png';
import loadingimg from '../../img/loading.gif';
import cross from '../../img/cross.png';

import StepMarker from '../../components/StepMarker';
import CustomInput from '../../components/CustomInput';
import InputCalendar from '../../components/InputCalendar';
import InputDropdownBrand from '../../components/InputDropdownBrand';
import InputDropdownYear from '../../components/InputDropdownYear';
import MessagesModal from '../../components/LoadingModal/MessagesModal';

import TelefonoArgentino from '../../services/telefonos_argentinos';

import { apiGetBrands, apiGetGroupsByBrandName, apiGetYearsByBrandId, apiGetVehicleData, apiCheckPostalCode, apiLeadsCompleteFields, apiGetModelsByBrandGroupYear, apiGetLeadData, apiLeadsUpdate, apiGetModelByCodia, apiGetYearsByGroupId } from '../../services/main';
import { amplitudeLogEvent, checkAge, checkDNI, checkEmail, checkName, formatDate, removeSeveralSpace } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const PolicyCheck = (props) => {

    const [step, setStep] = useState(1);

    const [uploadModal, setUploadModal] = useState(false);


    // Step 1
    const [makeList, setMakeList] = useState([]);
    const [make, setMake] = useState("");
    const [groupList, setGroupList] = useState([]);
    const [group, setGroup] = useState("");
    const [versionList, setVersionList] = useState([]);
    const [version, setVersion] = useState("");
    const [yearList, setYearList] = useState([]);
    const [year, setYear] = useState("");
    const [motorname, setMotorName] = useState("");
    const [motornamedisplay, setMotorNameDisplay] = useState(false);
    const [chassis, setChassis] = useState("");
    const [chassisdisplay, setChassisDisplay] = useState(false);

    // Step 2
    const [insuranceCompany, setInsuranceCompany] = useState("");
    const [validUntil, setValidUntil] = useState(moment());

    // Step 3
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [phonechecked, setPhoneChecked] = useState(false);

    const [dni, setDNI] = useState("");

    const [postalcodechecking, setPostalCodeChecking] = useState(true);
    const [postalcodechecked, setPostalCodeChecked] = useState(false);

    const [validError, setValidError] = useState({
        //step1
        brand: { error: false, msg: "Elegí una opción." },
        model: { error: false, msg: "Elegí una opción." },
        year: { error: false, msg: "Elegí una opción." },
        version: { error: false, msg: "Elegí una opción." },
        motorname: { error: false, msg: "Colocá el moto sin espacios." },
        chassis: { error: false, msg: "Colocá el chassis sin espacios." },
        //step2
        insurCompany: { error: false, msg: "Elegí el nombre de la compañía aseguradora." },
        validUntil: { error: false, msg: "Colocá la fecha en la que termina la vigencia." },
        //step3
        name: { error: false, msg: "Por favor ingrese nombre y apellido." },
        age: { error: false, msg: "La edad debe estar entre los 17 y los 99 años." },
        email: { error: false, msg: "Colocá tu email correcamente(Ej: juanperez@gmail.com)." },
        postalcodechecked: { error: false, msg: "Código postal no \nencontrado" },
        phone: { error: false, msg: "Colocá correctamente tu celular (Ej: 1165299315)." },
        dni: { error: false, msg: "El DNI debe ser 9.999.999 o 99.999.999" },
    });

    const [loading, setLoading] = useState(true);
    const [loadingVehicle, setLoadingVehicle] = useState(true);
    const [loadingLead, setLoadingLead] = useState(true);
    const [loadingBrand, setLoadingBrand] = useState(true);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [loadingYear, setLoadingYear] = useState(false);
    const [loadingVersion, setLoadingVersion] = useState(false);

    useEffect(() => {
        console.log("Vehicle", props.match.params.vehicleID);
        amplitudeLogEvent("PolicyCheck");

        if (!!props.match.params.vehicleID) {
            apiGetVehicleData(props.match.params.vehicleID)
                .then(res => {
                    console.log("res-----", res);
                    if (!!res.data.engine) {
                        setMotorName(res.data.engine);
                        setMotorNameDisplay(true);
                    }
                    if (!!res.data.chassis) {
                        setChassis(res.data.chassis);
                        setChassisDisplay(true);
                    }
                    setInsuranceCompany(res.data.policies[0].insurer.name);
                    if (!!res.data.policies[0].expirationDate) {
                        setValidUntil(res.data.policies[0].expirationDate);
                    }
                    if (res.data.brand) {
                        setMake(res.data.brand);
                        // setLoadingGroup(true);
                        // setLoadingYear(true);
                    }
                    // if (res.data.model) {
                    //     setGroup(res.data.model);
                    // }
                    if (res.data.year) {
                        setYear(res.data.year);
                    }
                    // if (res.data.brand && res.data.model && res.data.year) {
                    //     setLoadingVersion(true);
                    // }

                    apiGetModelByCodia(res.data.code)
                        .then(res => {
                            console.log("codia-----", res);

                            setMake(res.data.brand.name);
                            setGroup(res.data.group.name);
                            setVersion(res.data.description);
                            setLoadingVehicle(false);
                        })
                        .catch(err => {
                            console.log("err-----", err);
                            setLoadingVehicle(false);
                        })

                })
                .catch(err => {
                    console.log("err-----", err);
                    setLoadingVehicle(false);
                })
            apiGetLeadData(props.match.params.leadID)
                .then(res => {
                    console.log("res-----", res);
                    setLoadingLead(false);
                    if (res.data.name) {
                        setName(res.data.name);
                    }
                    if (res.data.age) {
                        setAge(res.data.age);
                    }
                    if (res.data.email) {
                        setEmail(res.data.email);
                    }
                    if (res.data.cp) {
                        setPostalCode(res.data.cp);
                    }
                    if (res.data.phone) {
                        setPhone(res.data.phone);
                    }
                    if (res.data.dni) {
                        setDNI(res.data.dni);
                    }
                })
                .catch(err => {
                    console.log("err-----", err);
                    setLoadingLead(false);
                })
        }

    }, []);

    const getBrands = () => {
        setLoadingBrand(true);
        apiGetBrands()
            .then(res => {
                console.log("res-----", res);
                setMakeList(res);
                setLoadingBrand(false);
            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingBrand(false);
            })
    };

    useEffect(() => {

        setSomeUserData(props.match.params.leadID, props.match.params.vehicleID)
        getBrands();

    }, []);

    useEffect(() => {

        if (make !== "" && makeList.length !== 0) {
            getGroups();
        }

    }, [make, makeList]);

    useEffect(() => {

        if (group !== "" && groupList.length !== 0) {
            getYearsByGroupId();
        }

    }, [group, groupList]);

    useEffect(() => {

        if (!!make && !!group && groupList.length !== 0 && !!year && yearList.length !== 0 && groupList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group)).length !== 0) {
            getModelsByBrandGroupYear();
        }

    }, [make, group, year, makeList, groupList, yearList]);

    const getGroups = () => {
        setLoadingGroup(true);
        // setYear("");
        // setVersion("");
        return apiGetGroupsByBrandName({ brand: make })
            .then(res => {

                console.log("groups-----", res);
                setGroupList(res);
                setLoadingGroup(false);

                if (!res.filter(i => i.name === group)[0] && group) {
                    setGroup("");
                    setYear("");
                    setYearList([]);
                    setVersion("");
                    setVersionList([]);
                }

            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingGroup(false);
            })
    }

    const getYearsByGroupId = () => {

        if (!groupList.filter(i => i.name === group)[0]) {
            setYear("");
            setLoadingYear(false);
            return;
        }

        setLoadingYear(true);

        apiGetYearsByGroupId({ group_id: groupList.filter(i => i.name === group)[0].id })
            .then(res => {
                console.log("years-----", res);
                setYearList(res);
                setLoadingYear(false);

            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingYear(false);
            })
    }

    useEffect(() => {

        if (year && !yearList.includes(year)) {
            setYear("");
        }

        if (!year && !group) {
            setVersion("");
            setVersionList([]);
        }

    }, [year, yearList]);

    useEffect(() => {
        if (version && !versionList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version))[0]) {
            setVersion("");
        }
    }, [version, versionList]);

    const getModelsByBrandGroupYear = (brand_ = false, group_ = false, year_ = false) => {

        setLoadingVersion(true);
        apiGetModelsByBrandGroupYear({ brand_id: brand_ ? brand_ : makeList.filter(i => i.name === make)[0].id, group_id: group_ ? group_ : groupList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(group))[0].id, year: year_ ? year_ : year })
            .then(res => {
                console.log("versions-----", res);

                if (make && group && year) {
                    setVersionList(res);

                    // if (!res.filter(i => i.name === version)[0] && version) {
                    //     setVersion("");
                    // }
                } else {
                    setVersionList([]);
                    setVersion("");
                }

                setLoadingVersion(false);

            })
            .catch(error => {
                console.log("err-----", error);
                setLoadingVersion(false);
            })
    }

    const checkStep3Validation = () => {
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
        if (!postalcodechecked) {
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

    const checkStep1Validation = () => {

        console.log("yearerror-----", !year);

        let { brand: eBrand,
            model: eModel,
            year: eYear,
            version: eVersion } = _.cloneDeep(validError);

        eBrand.error = false;
        eModel.error = false;
        eYear.error = false;
        eVersion.error = false;

        if (!make || make.length === 0) {
            eBrand.error = true;
        }
        if (!group || group.length === 0) {
            eModel.error = true;
        }
        if (!version || version.length === 0) {
            eVersion.error = true;
        }
        if (!year || year.length === 0) {
            eYear.error = true;
        }

        setValidError({
            ...validError,
            brand: eBrand,
            model: eModel,
            year: eYear,
            version: eVersion,
        });
        if (eBrand.error || eModel.error || eYear.error || eVersion.error) {
            return false;
        }
        return true;
    }

    const checkStep2Validation = () => {
        let { validUntil: eValidUntil } = validError;

        eValidUntil.error = false;

        if (!validUntil) {
            eValidUntil.error = true;
        }

        setValidError({
            ...validError,
            validUntil: eValidUntil
        });

        if (eValidUntil.error) {
            return false;
        }
        return true;
    }

    const sendData = e => {

        e.preventDefault();

        if (checkStep3Validation()) {

            console.log("versionList-----", versionList);
            console.log("version-----", version);

            let formData = new FormData();

            formData.append('LeadID', props.match.params.leadID);
            formData.append('VehicleID', props.match.params.vehicleID);

            formData.append('DNI', dni);
            formData.append('CP', postalcode);
            formData.append('Brand', make);
            formData.append('Model', version);
            formData.append('ModelID', versionList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version))[0].id);
            formData.append('Year', year);
            formData.append('Engine', motorname);
            formData.append('Insurer', insuranceCompany);
            formData.append('To', formatDate(validUntil));

            formData.append('Chassis', "");
            formData.append('From', "");
            formData.append('Price', "");

            setUploadModal(true);

            apiLeadsCompleteFields(formData)
                .then(res => {
                    console.log("res-----", res.data);
                    setUploadModal(false);

                    if (!res.error) {
                        setUploadModal(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setUploadModal(false);
                });

            let leadData = new FormData();
            leadData.append('Hash', props.match.params.leadID);
            leadData.append('Name', name);
            leadData.append('Email', email);
            leadData.append('Phone', phone);
            leadData.append('Age', age);
            leadData.append('CP', postalcode);
            leadData.append('DNI', dni);

            apiLeadsUpdate(leadData)
                .then(res => {
                    console.log("res-----", res);
                })
                .catch(err => {
                    console.log("err-----", err);
                })

        }

    }

    const setSomeUserData = (leadID, VehicleID) => {
        localStorage.setItem('LeadID', leadID);
        localStorage.setItem('VehicleID', VehicleID);
    };

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

    const gotoStep = value => {
        if (value === 2) {
            if (checkStep1Validation()) {
                setStep(2);
            }
        }
        if (value === 3) {
            if (checkStep2Validation()) {
                setStep(3);
            }
        }
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

    useEffect(() => {
        if (!loadingVehicle && !loadingLead && !loadingBrand && !loadingGroup && !loadingYear && !loadingVersion) {
            setLoading(false);
        }
    }, [loadingVehicle, loadingLead, loadingBrand, loadingGroup, loadingYear, loadingVersion]);

    return (
        <div className="w-full flex bg-maingray" style={{ minHeight: "100vh" }}>
            <div className="w-2/5 bg-maingray hidden md:block">
                <div className="w-full max-w-518 ml-auto">
                    <div className="pl-8 lg:pl-16 xl:pl-24 1xl:pl-40 pt-8">
                        <a href="/"><img src={logo} alt="" /></a>
                        <div className="pl-6 pt-8">

                            <StepMarker
                                number={1}
                                content="Tu vehículo"
                                step={step}
                                list={[]}
                                self={make}
                                tick={false}
                                pointer={true}
                                onClick={() => step > 1 ? setStep(1) : ""}
                            />
                            <StepMarker
                                number={2}
                                content="Tu seguro"
                                step={step}
                                list={[]}
                                self={group}
                                tick={false}
                                pointer={true}
                                onClick={() => step > 2 ? setStep(2) : ""}
                            />
                            <StepMarker
                                number={3}
                                content="Datos personales"
                                step={step}
                                list={[]}
                                self={year}
                                tick={false}
                                pointer={true}
                            //onClick={() => step > 2 ? setStep(2) : ""}                                
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-3/5 bg-maingray md:bg-mainpink md:rounded-tl-2xl md:rounded-tr-2xl">
                <div className="w-full max-w-778 mr-auto">
                    <div className="w-full pl-4 pt-15">
                        <div className="flex items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => setStep(step - 1 === 0 ? 1 : step - 1)}>
                                {step !== 1 &&
                                    <img src={arrowleft} alt="" />
                                }
                                <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 3</p>

                            </div>
                            {((step === 1 && !!make && !!group && !!year && !!version) || (step === 2 && validUntil)) &&
                                <img src={arrowleft} alt="" className="transform rotate-180 cursor-pointer" onClick={() => setStep(step + 1)} />
                            }
                        </div>
                        <div className="pt-10 pl-0 sm:pl-8 lg:pl-16 pb-8 sm:pb-40">
                            {step === 1 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-3 pt-6">Tu vehículo</p>
                                    <p className="text-gray font-OpenSansRegular text-lg pb-8 pr-4">Logramos recopilar esta información de tu póliza pero<br className="hidden 1xl:block" /> nos gustaría que confirmes y completes la restante</p>
                                    <form className="pr-4 sm:pr-16 lg:pr-24 1xl:pr-40">
                                        <div className="w-full block sm:flex">
                                            <div className="w-full sm:w-2/5 mb-4 sm:mb-0 z-20">
                                                <InputDropdownBrand type="text" error={validError.brand.error} errorMsg={validError.brand.msg} list={makeList} name="Marca" selected={makeList.filter(i => i.name === make).length !== 0 ? makeList.filter(i => i.name === make)[0].id : ""} onChange={(id) => setMake(makeList.filter(i => i.id === id)[0].name)} />
                                            </div>
                                            <div className="w-full sm:w-3/5 pl-0 sm:pl-8 mb-4 sm:mb-0 z-10">
                                                <InputDropdownBrand type="text" error={validError.model.error} errorMsg={validError.model.msg} list={groupList} name="Modelo" initialValue={group} selected={groupList.filter(i => i.name === group).length !== 0 ? groupList.filter(i => i.name === group)[0].id : ""} onChange={(id) => setGroup(groupList.filter(i => i.id === id)[0].name)} />
                                            </div>
                                        </div>
                                        <div className="w-full block sm:flex mt-0 sm:mt-10">
                                            <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                                                <InputDropdownYear type="text" error={validError.year.error} errorMsg={validError.year.msg} list={yearList} name="Año" selected={year} onChange={(id) => setYear(id)} />
                                            </div>
                                            <div className="w-full sm:w-3/5 pl-0 sm:pl-8 mb-4 sm:mb-0 z-5">
                                                <InputDropdownBrand type="text" error={validError.version.error} errorMsg={validError.version.msg} list={versionList} name="Versión" initialValue={version} selected={versionList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version)).length !== 0 ? versionList.filter(i => removeSeveralSpace(i.name) === removeSeveralSpace(version))[0].id : ""} onChange={(id) => setVersion(versionList.filter(i => i.id === id)[0].name)} />
                                            </div>
                                        </div>
                                        {motornamedisplay && !chassisdisplay &&
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="Número de motor" error={validError.motorname.error} errorMsg={validError.motorname.msg} content={motorname} onChange={e => setMotorName(e.target.value)} />
                                                </div>
                                            </div>
                                        }
                                        {!motornamedisplay && chassisdisplay &&
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="N° de chasis o cuadro" error={validError.chassis.error} errorMsg={validError.chassis.msg} content={chassis} onChange={e => setChassis(e.target.value)} />
                                                </div>
                                            </div>
                                        }
                                        {motornamedisplay && chassisdisplay &&
                                            <div className="w-full block sm:flex mt-0 sm:mt-10">
                                                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="Número de motor" error={validError.motorname.error} errorMsg={validError.motorname.msg} content={motorname} onChange={e => setMotorName(e.target.value)} />
                                                </div>
                                                <div className="w-full sm:w-3/5 pl-0 sm:pl-8 mb-4 sm:mb-0 z-0">
                                                    <CustomInput type="text" name="N° de chasis o cuadro" error={validError.chassis.error} errorMsg={validError.chassis.msg} content={chassis} onChange={e => setChassis(e.target.value)} />
                                                </div>
                                            </div>
                                        }
                                        <div className="w-full text-center sm:text-left">
                                            <button type="button" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-10 shadow-lg" onClick={() => gotoStep(2)}>Siguiente</button>
                                        </div>
                                    </form>
                                </>
                            }
                            {step === 2 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-4 pr-3 pt-6">Tu seguro</p>
                                    <p className="text-gray font-OpenSansRegular text-lg pb-8 pr-4">Logramos recopilar esta información de tu póliza pero<br className="hidden 1xl:block" /> nos gustaría que confirmes y completes la restante</p>
                                    <div className="pr-4 sm:pr-16 lg:pr-24 1xl:pr-40">
                                        <div className="w-full md:max-w-288">
                                            <CustomInput type="text" name="Compañía aseguradora" content={insuranceCompany} error={validError.insurCompany.error} errorMsg={validError.insurCompany.msg} onChange={e => setInsuranceCompany(e.target.value)} />
                                        </div>
                                        <div className="w-full md:max-w-288 mt-10">
                                            <InputCalendar
                                                date={validUntil}
                                                name="Vigencia hasta"
                                                // error={validError.validUntil.error} 
                                                // errorMsg={validError.validUntil.msg} 
                                                onChange={(date) => setValidUntil(date)} />
                                        </div>
                                        <button type="button" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-10 shadow-lg" onClick={() => gotoStep(3)}>Siguiente</button>
                                    </div>
                                </>
                            }
                            {step === 3 &&
                                <>
                                    <p className="text-black font-SpartanBold text-xl md:text-2xl pb-8 pr-3">Tus datos para cotizar</p>
                                    <form className="pr-4 sm:pr-16 lg:pr-24 1xl:pr-40" onSubmit={sendData}>
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
            {uploadModal && <MessagesModal />}
            {loading && <ChargingModal />}
        </div>
    )
}

export default PolicyCheck;
