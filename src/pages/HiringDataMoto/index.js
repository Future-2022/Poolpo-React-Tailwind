import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import InputCalendar from '../../components/InputCalendar';
import CustomInput from '../../components/CustomInput';
import InputDropdownState from '../../components/InputDropdownState';

import HeaderHiring from '../../layouts/HeaderHiring';

import TelefonoArgentino from '../../services/telefonos_argentinos';

import {
    apiCheckPostalCode,
    apiHiringDataSend,
    apiGetStates,
    apiGetPreLoadedData,
    apiGetQuotationDataById,
    apiHiringPaymentMethodCBUSend,
    apiHiringPaymentMethodCardSend,
    apiHiringAllowedMethod,
    apiGetModelByCodiaMoto,
    apiHiringVehicleSend
} from '../../services/main';

import loadingimg from '../../img/loading.gif';
import cross from '../../img/cross.png';
import vector from '../../img/vector.png';
import arrowleft from '../../img/arrow-left.png';
import chevronleft from '../../img/chevron-left.png';

import { amplitudeLogEvent, checkDNI, checkEmail, checkPatentMoto, formatDate, getCardBrand } from '../../services/utils';

import './index.css';
import QuotationSelectBottomMoto from '../../components/QuotationSelectBottomMoto';
import CustomCheckBox from '../../components/CustomCheckBox';
import MonthCalendar from '../../components/MonthCalendar';
import ChargingModalMoto from '../../components/LoadingModal/ChargingModalMoto';
import MessagesModalMoto from '../../components/LoadingModal/MessagesModalMoto';
import QuotationSelectMoto from '../../components/QuotationSelectMoto';


const HiringDataMoto = (props) => {

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [bottomopen, setBottomOpen] = useState(false);

    const [validError, setValidError] = useState({
        firstName: { error: false, msg: "Por favor ingrese nombre." },
        lastName: { error: false, msg: "Por favor ingrese apellido." },
        dni: { error: false, msg: "El DNI debe ser 9.999.999 o 99.999.999" },
        email: { error: false, msg: "Colocá tu email correcamente(Ej: juanperez@gmail.com)." },
        phone: { error: false, msg: "Colocá correctamente tu celular (Ej: 1165299315)." },
        birthDate: { error: false, msg: "Elegí una fecha válida de lunes a viernes." },
        homeCoverage: { error: false, msg: "Colocá la fecha de inicio de vigencia." },
        province: { error: false, msg: "Elegí tu provincia de residencia." },
        address: { error: false, msg: "Colocá tu domicilio." },
        city: { error: false, msg: "Colocá tu ciudad de residencia." },
        number: { error: false, msg: "Colocá el número de tu domicilio." },
        postalcodechecked: { error: false, msg: "Código postal no \nencontrado" },
        brand: { error: false, msg: "Elegí una opción." },
        model: { error: false, msg: "Elegí una opción." },
        year: { error: false, msg: "Elegí una opción." },
        version: { error: false, msg: "Elegí una opción." },
        patent: { error: false, msg: "Colocá la patente de tu vehículo sin espacios (Ej: A123ABC)." },
        framenumber: { error: false, msg: "Colocá el número de chasis o cuadro sin espacios." },
        enginenumber: { error: false, msg: "Colocá el número de motor sin espacios." }
    });
    const [validStep1Error, setValidStep1Error] = useState({
        firstName: { error: false, msg: "Por favor ingrese nombre." },
        lastName: { error: false, msg: "Por favor ingrese apellido." },
        dni: { error: false, msg: "El DNI debe ser 9.999.999 o 99.999.999" },
        email: { error: false, msg: "Colocá tu email correcamente(Ej: juanperez@gmail.com)." },
        phone: { error: false, msg: "Colocá correctamente tu celular (Ej: 1165299315)." },
        birthDate: { error: false, msg: "Elegí una fecha válida de lunes a viernes." },
        homeCoverage: { error: false, msg: "Colocá la fecha de inicio de vigencia." },
        province: { error: false, msg: "Elegí tu provincia de residencia." },
        address: { error: false, msg: "Colocá tu domicilio." },
        city: { error: false, msg: "Colocá tu ciudad de residencia." },
        number: { error: false, msg: "Colocá el número de tu domicilio." },
        postalcodechecked: { error: false, msg: "Código postal no \nencontrado" },
    });
    const [validStep2Error, setValidStep2Error] = useState({
        brand: { error: false, msg: "Elegí una opción." },
        model: { error: false, msg: "Elegí una opción." },
        year: { error: false, msg: "Elegí una opción." },
        version: { error: false, msg: "Elegí una opción." },
        patent: { error: false, msg: "Colocá la patente de tu vehículo sin espacios (Ej: A123ZZZ)." },
        framenumber: { error: false, msg: "Colocá el número de chasis o cuadro sin espacios." },
        enginenumber: { error: false, msg: "Colocá el número de motor sin espacios." }
    });
    const [validStep3Error, setValidStep3Error] = useState({
        cardnumber: { error: false, msg: "Colocá el número de tu tarjeta de crédito." },
        bank: { error: false, msg: "Colocá el nombre de tu banco." },
        nameandsurname: { error: false, msg: "Colocá tu nombre y apellido completos (Ej: Juan Pérez)." },
        expirationDate: { error: false, msg: "Colocá una fecha de vencimiento válida(Ej: 12/23)." },
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDNI] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phonechecked, setPhoneChecked] = useState(false);
    const [birthDate, setBirthDate] = useState(moment().subtract(18, "year"));
    const [homeCoverage, setHomeCoverage] = useState(moment());
    const [initialHomeCoverage, setInitialHomeCoverage] = useState(moment());

    const [province, setProvince] = useState(0);
    const [provinceList, setProvinceList] = useState([]);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [floor, setFloor] = useState("");
    const [department, setDepartment] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [postalcodechecking, setPostalCodeChecking] = useState(true);
    const [postalcodechecked, setPostalCodeChecked] = useState(false);

    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");
    const [model, setModel] = useState("");
    const [modelID, setModelID] = useState(0);
    const [version, setVersion] = useState("");
    const [patent, setPatent] = useState("");
    const [framenumber, setFrameNumber] = useState("");
    const [enginenumber, setEngineNumber] = useState("");
    const [isNew, setIsNew] = useState(false);

    const [pay, setPay] = useState(2);

    const [payCBU, setPayCBU] = useState(false);
    const [payCard, setPayCard] = useState(false);

    const [cbunumber, setCBUNumber] = useState("");
    const [cardnumber, setCardNumber] = useState("");
    const [bank, setBank] = useState("");
    const [nameandsurname, setNameAndSurname] = useState("");
    const [expirationDate, setExpirationDate] = useState(moment().add(1, 'months'));

    const [cbunumberError, setCBUNumberError] = useState(false);
    const [cbunumberErrorMsg, setCBUNumberErrorMsg] = useState("");

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    const [step, setStep] = useState(1);

    const [step1Valid, setStep1Valid] = useState(false);
    const [step2Valid, setStep2Valid] = useState(false);
    const [step3Valid, setStep3Valid] = useState(false);

    const [processModal, setProcessModal] = useState(false);


    useEffect(() => {

        amplitudeLogEvent("Moto/Hiring/PersonalData");

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

        apiGetStates()
            .then(res => {
                //console.log("states-----", res);
                setProvinceList(res.data);
                setLoading2(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading2(false);
            })

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.vehicleID, props.match.params.quoteID)
            .then(res => {
                console.log("preloaded------", res);
                setLoading3(false);

                setLeadName(res.data.lead.name);

                setFirstName(res.data.lead.name);
                setLastName(res.data.lead.last);
                setEmail(res.data.lead.email);
                setDNI(res.data.lead.dni);
                setPhone(res.data.lead.phone);
                setPostalCode(res.data.lead.cp);
                setAddress(res.data.lead.address);

                setHomeCoverage(res.data.dateToHire);
                setInitialHomeCoverage(res.data.dateToHire);

                let year = !!res.data.vehicle.year ? res.data.vehicle.year : "";

                setYear(year);
                setFrameNumber(!!res.data.vehicle.chassis ? res.data.vehicle.chassis : "");
                setEngineNumber(!!res.data.vehicle.engine ? res.data.vehicle.engine : "");
                setModelID(!!res.data.vehicle.code ? res.data.vehicle.code : 0);
                setIsNew(!!res.data.vehicle.isNew ? res.data.vehicle.isNew : false);

                apiGetModelByCodiaMoto(res.data.vehicle.code)
                    .then(res => {
                        console.log("codia-----", res);
                        setBrand(res.data.brand.name);
                        setModel(res.data.group.name);
                        setVersion(res.data.description);
                    })
                    .catch(err => {
                        console.log("err-----", err);
                    })

            })
            .catch(err => {
                console.log("err-----", err);
                setLoading3(false);
            });

    }, []);

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

        let tel = new TelefonoArgentino(phone);

        setPhoneChecked(tel.isValid() && phone.length >= 8);

    }, [phone]);

    const setServicesValueDebounced = useRef(_.debounce(checkPostalCode, 1000));

    useEffect(() => {

        setServicesValueDebounced.current(postalcode);

    }, [postalcode]);

    const checkValidation = () => {
        let { firstName: eFN,
            lastName: eLN,
            dni: eDNI,
            email: eEmail,
            phone: ePhone,
            birthDate: eBD,
            homeCoverage: eHC,
            province: ePV,
            address: eAddr,
            city: eCity,
            number: eNumber,
            postalcodechecked: ePCC } = validError;

        eEmail.error = false;
        eFN.error = false;
        eLN.error = false;
        eDNI.error = false;
        ePhone.error = false;
        eBD.error = false;
        eHC.error = false;
        ePV.error = false;
        eAddr.error = false;
        eCity.error = false;
        eNumber.error = false;

        if (!checkEmail(email)) {
            eEmail.error = true;
        }
        if (!firstName || firstName.length === 0) {
            eFN.error = true;
        }
        if (!lastName || lastName.length === 0) {
            eLN.error = true;
        }
        if (!checkDNI(dni)) {
            eDNI.error = true;
        }
        if (!birthDate) {
            eBD.error = true;
        }

        if (!homeCoverage) {
            eHC.error = true;
        }
        else {
            let _diffDay = moment().diff(homeCoverage, "days");
            if (_diffDay > 0 || _diffDay < -30)
                eHC.error = true;
        }
        if (!province) {
            ePV.error = true;
        }
        if (!address) {
            eAddr.error = true;
        }
        if (!city) {
            eCity.error = true;
        }
        if (!number) {
            eNumber.error = true;
        }
        if (!phonechecked) {
            ePhone.error = true;
        }
        if (!postalcode) {
            ePCC.error = true;
        }


        setValidError({
            ...validError,
            firstName: eFN,
            lastName: eLN,
            dni: eDNI,
            email: eEmail,
            phone: ePhone,
            birthDate: eBD,
            homeCoverage: eHC,
            province: ePV,
            address: eAddr,
            city: eCity,
            number: eNumber
        });

        if (eFN.error || eLN.error || eDNI.error || eEmail.error
            || ePhone.error || eBD.error || eHC.error || ePV.error
            || eAddr.error || eCity.error || eNumber.error || ePCC.error) {
            return false;
        }
        return true;
    }

    const checkValidationVehicle = () => {
        let { brand: eBrand,
            model: eModel,
            year: eYear,
            version: eVersion,
            patent: ePatent } = validError;

        eBrand.error = false;
        eModel.error = false;
        eYear.error = false;
        eVersion.error = false;
        ePatent.error = false;

        if (brand === 0) {
            eBrand.error = true;
        }
        if (model === 0) {
            eModel.error = true;
        }
        if (!year) {
            eYear.error = true;
        }
        if (!version) {
            eVersion.error = true;
        }
        if (!checkPatentMoto(patent)) {
            ePatent.error = true;
        }


        setValidError({
            ...validError,
            brand: eBrand,
            model: eModel,
            year: eYear,
            version: eVersion,
            patent: ePatent
        });

        if (eBrand.error || eModel.error || eYear.error || eVersion.error || ePatent.error) {
            return false;
        }
        return true;
    }

    const checkPaymentValidation = () => {
        if (pay === 1) {
            if (!cbunumber) {
                setCBUNumberError(true);
                return false;
            }
            return true;
        }
        else {
            let { cardnumber: eCN,
                bank: eBank,
                nameandsurname: eNS,
                expirationDate: eExpDate } = validStep3Error;

            eCN.error = false;
            eBank.error = false;
            eNS.error = false;
            eExpDate.error = false;

            if (!bank) {
                eBank.error = true;
            }
            if (!cardnumber || cardnumber.length <= 2) {
                eCN.error = true;
            }
            if (!nameandsurname) {
                eNS.error = true;
            }
            if (!expirationDate) {
                eExpDate.error = true;
            }

            setValidStep3Error({
                ...validStep3Error,
                cardnumber: eCN,
                bank: eBank,
                nameandsurname: eNS,
                expirationDate: eExpDate
            });

            if (eCN.error || eBank.error || eNS.error || eExpDate.error) {
                return false;
            }
            return true;
        }
    }

    const goStep2 = e => {

        e.preventDefault();

        if (!checkValidation()) return;

        let formData = new FormData();

        formData.append('Hash', localStorage.getItem("LeadID"));
        formData.append('QuoteId', props.match.params.quoteID);
        formData.append('personType', true);
        formData.append('Name', firstName);
        formData.append('Last', lastName);
        formData.append('Email', email);
        formData.append('Phone', phone);
        formData.append('DNI', dni);
        formData.append('BirthDate', formatDate(birthDate));
        formData.append('Address', address);
        formData.append('AddressNumber', number);
        formData.append('AddressDepartment', department);
        formData.append('City', city);
        formData.append('State', province);
        formData.append('PostalCode', postalcode);
        formData.append('HiringDate', formatDate(homeCoverage));

        apiHiringDataSend(formData)
            .then(res => {
                console.log("res-----", res);
                if (res.error) {
                    toast.error(res.data.msg);
                } {
                    localStorage.setItem("CustomerID", res.data.msg);
                    setStep(2);
                }
            })
            .catch(err => {
                console.log("err-----", err);
            })

    }

    const goStep3 = e => {

        e.preventDefault();

        if (!checkValidationVehicle()) return;

        let formData = new FormData();

        formData.append('Hash', props.match.params.vehicleID);
        formData.append('Brand', brand);
        formData.append('Model', model);
        formData.append('Version', version);
        formData.append('ModelID', modelID);
        formData.append('Domain', patent);
        formData.append('Year', year);
        formData.append('isNew', isNew);
        formData.append('Chassis', framenumber);
        formData.append('Engine', enginenumber);
        formData.append('isCar', false);

        apiHiringVehicleSend(formData)
            .then(res => {
                console.log("res-----", res);
                if (res.data.error) {
                    toast.error(res.data.msg);
                } else {
                    setStep(3);
                }
            })
            .catch(err => {
                console.log("err-----", err);
            })

    }

    useEffect(() => {
        if (!loading1 && !loading2 && !loading3) {
            setLoading(false);
        }
    }, [loading1, loading2, loading3]);

    useEffect(() => {

        setStep1Valid(checkStep1());

    }, [firstName, lastName, dni, phone, phonechecked, email, homeCoverage, birthDate, province, address, city, number, postalcode, postalcodechecked]);

    useEffect(() => {

        setStep2Valid(checkStep2());

    }, [brand, model, year, version, patent]);

    useEffect(() => {

        setStep3Valid(checkStep3());

    }, [cbunumber, bank, cardnumber, nameandsurname, expirationDate, pay]);

    const checkStep1 = () => {
        let { firstName: eFN,
            lastName: eLN,
            dni: eDNI,
            email: eEmail,
            phone: ePhone,
            birthDate: eBD,
            homeCoverage: eHC,
            province: ePV,
            address: eAddr,
            city: eCity,
            number: eNumber,
            postalcodechecked: ePCC } = validStep1Error;

        eEmail.error = false;
        eFN.error = false;
        eLN.error = false;
        eDNI.error = false;
        ePhone.error = false;
        eBD.error = false;
        eHC.error = false;
        ePV.error = false;
        eAddr.error = false;
        eCity.error = false;
        eNumber.error = false;
        ePCC.error = false;

        if (!checkEmail(email)) {
            eEmail.error = true;
        }
        if (!firstName || firstName.length === 0) {
            eFN.error = true;
        }
        if (!lastName || lastName.length === 0) {
            eLN.error = true;
        }
        if (!checkDNI(dni)) {
            eDNI.error = true;
        }
        if (!birthDate) {
            eBD.error = true;
        }

        if (!homeCoverage) {
            eHC.error = true;
        }
        else {
            let _diffDay = moment().diff(homeCoverage, "days");
            if (_diffDay > 0 || _diffDay < -30)
                eHC.error = true;
        }

        if (!phonechecked) {
            ePhone.error = true;
        }

        if (!province) {
            ePV.error = true;
        }
        if (!address) {
            eAddr.error = true;
        }
        if (!city) {
            eCity.error = true;
        }
        if (!number) {
            eNumber.error = true;
        }
        if (!postalcodechecked) {
            ePCC.error = true;
        }

        if (eFN.error || eLN.error || eDNI.error || eEmail.error
            || ePhone.error || eBD.error || eHC.error ||
            ePV.error || eAddr.error || eCity.error || eNumber.error || ePCC.error) {
            return false;
        }
        return true;
    }



    const checkStep2 = () => {

        let { brand: eBrand,
            model: eModel,
            year: eYear,
            version: eVersion,
            patent: ePatent } = validStep2Error;

        eBrand.error = false;
        eModel.error = false;
        eYear.error = false;
        eVersion.error = false;
        ePatent.error = false;

        if (brand === 0) {
            eBrand.error = true;
        }
        if (model === 0) {
            eModel.error = true;
        }
        if (!year) {
            eYear.error = true;
        }
        if (!version) {
            eVersion.error = true;
        }
        if (!checkPatentMoto(patent)) {
            ePatent.error = true;
        }

        if (eBrand.error || eModel.error || eYear.error || eVersion.error || ePatent.error) {
            return false;
        }
        return true;
    }


    const checkStep3 = () => {
        if (pay === 1) {
            if (!cbunumber) {
                return false;
            }
            return true;
        }
        else {
            let { cardnumber: eCN,
                bank: eBank,
                nameandsurname: eNS,
                expirationDate: eExpDate } = _.cloneDeep(validStep3Error);

            eCN.error = false;
            eBank.error = false;
            eNS.error = false;
            eExpDate.error = false;

            if (!bank) {
                eBank.error = true;
            }
            if (!cardnumber || cardnumber.length <= 2) {
                eCN.error = true;
            }
            if (!nameandsurname) {
                eNS.error = true;
            }
            if (!expirationDate) {
                eExpDate.error = true;
            }

            if (eCN.error || eBank.error || eNS.error || eExpDate.error) {
                return false;
            }
            return true;
        }
    }

    useEffect(() => {
        if (step === 3) {

            setCBUNumberErrorMsg("Colocá los 22 dígitos de tu CBU sin espacios.");

            apiHiringAllowedMethod(localStorage.getItem("CustomerID"), props.match.params.quoteID)
                .then(res => {
                    if (res.includes("Credit Card")) {
                        setPayCard(true);
                    }
                    if (res.includes("CBU")) {
                        setPayCBU(true);
                    }
                    if (res.includes("Credit Card") && !res.includes("CBU")) {
                        setPay(2);
                    }
                    if (res.includes("CBU")) {
                        setPay(1);
                    }
                })
                .catch(err => {
                    console.log("res-----", err);
                });

        }

    }, [step]);

    const goHiringPictures = e => {

        e.preventDefault();

        if (!checkPaymentValidation()) return;

        var formData;

        localStorage.setItem("paymenttype", pay);

        if (pay === 1) {

            localStorage.setItem("cbunumber", cbunumber);

            setProcessModal(true);

            formData = new FormData();

            formData.append("Hash", localStorage.getItem("LeadID"));
            formData.append("CBU", cbunumber);
            formData.append("QuoteID", props.match.params.quoteID);

            apiHiringPaymentMethodCBUSend(formData)
                .then(res => {
                    setProcessModal(false);
                    console.log("res-----", res);
                    if (res.data.error) {
                        toast.error(res.data.msg);
                    } else {
                        localStorage.setItem("PaymentMsg", res.data.msg);
                        let url = "/moto/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
                        history.push(url);
                    }
                })
                .catch(err => {
                    setProcessModal(false);
                    if (err.response && err.response.data.error) {
                        toast.error(err.response.data.msg);
                    }
                    console.log("err-----", err);
                });

        } else {

            localStorage.setItem("cardnumber", cardnumber);

            setProcessModal(true);

            formData = new FormData();

            formData.append("Hash", localStorage.getItem("LeadID"));
            formData.append("Card", getCardBrand(cardnumber));
            formData.append("Bank", bank);
            formData.append("Number", cardnumber);
            formData.append("Name", nameandsurname);
            formData.append("ExpiricyDate", expirationDate.format("YYYY/MM"));
            formData.append("QuoteID", props.match.params.quoteID);

            console.log("pay2-----", formData);

            apiHiringPaymentMethodCardSend(formData)
                .then(res => {
                    setProcessModal(false);
                    if (res.data.error) {
                        toast.error(res.data.msg);
                    } else {
                        localStorage.setItem("PaymentMsg", res.data.msg);
                        let url = "/moto/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
                        history.push(url);
                    }
                })
                .catch(err => {
                    setProcessModal(false);
                    if (err.response && err.response.data.error) {
                        toast.error(err.response.data.msg);
                    }
                    console.log("err-----", err);
                });

        }

    }

    useEffect(() => {
        if (processModal) {
            document.getElementById("modal-message").innerHTML = "Estamos contratando tu seguro. Este proceso demorará unos 30 segundos.";
        }
    }, [processModal]);


    return (
        <>
            <Helmet>
                <title>{leadName + " estás a un paso de obtener el mejor seguro, al mejor precio!"}</title>
            </Helmet>
            <div className="w-full bg-pink8 overflow-remove">
                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={false} logoID={(quote !== {} && !!quote.insurerObj) ? quote.insurerObj.id : false} moto={true}>
                    </HeaderHiring>
                    <div className="w-full px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="hidden sm:block">
                            <div className="flex items-center pb-4">
                                <span className="text-lg text-purple font-OpenSansRegular">Incio</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Seguros motos</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Planes</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansBold">Contratación</span>
                            </div>
                            <div className="flex">
                                <div className="flex items-center cursor-pointer py-4" onClick={() => setStep(step - 1 === 0 ? 1 : step - 1)}>
                                    <img src={arrowleft} alt="" />
                                    <p className="pl-2 text-purple font-OpenSansSemiBold text-lg">Paso {step} de 3</p>
                                </div>
                            </div>

                        </div>
                        <div className="block sm:hidden">
                            <div className="flex items-center py-4">
                                <img src={chevronleft} alt="left" />
                                <p className="font-OpenSansRegular text-lg text-purple">Seguro de motos</p>
                            </div>
                        </div>
                        <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left">
                            <span className="text-purple4">
                                {leadName}
                            </span>
                        , ¡excelente elección!
                        </p>
                        <p className="text-lg font-OpenSansRegular text-gray text-left pb-4">
                            Sólo queda que completemos algunos datos :)
                        </p>
                    </div>
                    <div className="w-full flex flex-row-reverse px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="w-full hidden md:block" style={{ maxWidth: "352px" }}>
                            {quote !== {} && !!quote.insurerObj && !!props.match.params.quoteID &&
                                <QuotationSelectMoto best={quote.isHighlighted} data={quote} equal={true} following={true} />
                            }
                        </div>
                        {(step === 1 || step === 2) &&
                            <>
                                {step === 1 &&
                                    <form className="w-full mr-0 md:mr-8" onSubmit={goStep2}>

                                        <div className="w-full sm:pl-10 sm:pr-15 sm:pt-6 pb-8 border-b sm:border border-purple3 sm:rounded-xl">
                                            <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Completá tus datos personales</p>
                                            <div className="">
                                                <div className="w-full block lg:flex">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Nombre" content={firstName} error={validError.firstName.error} errorMsg={validError.firstName.msg} onChange={e => setFirstName(e.target.value)} />
                                                        <div className="mt-8">
                                                            <CustomInput type="text" name="Apellido" content={lastName} error={validError.lastName.error} errorMsg={validError.lastName.msg} onChange={e => setLastName(e.target.value)} />
                                                        </div>
                                                        <div className="mt-8">
                                                            <CustomInput type="email" name="Email" error={validError.email.error} errorMsg={validError.email.msg} content={email} onChange={e => setEmail(e.target.value)} />
                                                        </div>
                                                        <div className="mt-8 relative z-20">
                                                            <InputCalendar
                                                                name="Fecha nacimiento"
                                                                date={birthDate}
                                                                // error={validError.birthDate.error}
                                                                // errorMsg={validError.birthDate.msg}
                                                                endDate={moment().subtract(18, 'year')}
                                                                onChange={(date) => { setBirthDate(date); }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="number" name="DNI" content={dni} error={validError.dni.error} errorMsg={validError.dni.msg} onChange={e => setDNI(e.target.value)} />
                                                        <div className="w-full relative mt-8">
                                                            <CustomInput type="number" name="Celular" error={validError.phone.error} errorMsg={validError.phone.msg} content={phone} onChange={e => setPhone(e.target.value)} />
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
                                                        <div className="w-full relative mt-8 z-10">
                                                            <InputCalendar
                                                                name="Inicio cobertura"
                                                                date={homeCoverage}
                                                                startDate={moment(initialHomeCoverage)}
                                                                endDate={moment().add(30, 'days')}
                                                                // error={validError.homeCoverage.error} errorMsg={validError.homeCoverage.msg}
                                                                onChange={(date) => { setHomeCoverage(date) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:pl-10 sm:pr-15 pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl mt-8">
                                            <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Tu hogar</p>
                                            <div className="">
                                                <div className="w-full block lg:flex">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <InputDropdownState type="text" content={province} error={validError.province.error} errorMsg={validError.province.msg} list={provinceList} selected={province} name="Provincia" onChange={(id) => setProvince(id)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Ciudad" content={city} error={validError.city.error} errorMsg={validError.city.msg} onChange={e => setCity(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Domicilio" content={address} error={validError.address.error} errorMsg={validError.address.msg} onChange={e => setAddress(e.target.value)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="number" name="Número" content={number} error={validError.number.error} errorMsg={validError.number.msg} onChange={e => setNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="number" name="Piso" content={floor} onChange={e => setFloor(e.target.value)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Departamento" content={department} onChange={e => setDepartment(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <div className="w-full relative">
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
                                                    <div className="w-full lg:w-1/2 xl:w-2/5">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center sm:justify-between">
                                            <div></div>
                                            <button type="submit" className={`${step1Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 mb-20 md:mb-0 shadow-lg`}>Siguiente</button>
                                        </div>
                                    </form>

                                }
                                {step === 2 &&
                                    <form className="w-full mr-0 md:mr-8" onSubmit={goStep3}>

                                        <div className="w-full sm:pl-10 sm:pr-15 pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl">
                                            <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Tu vehículo</p>
                                            <div className="rounded my-2 pt-4"></div>
                                            <div className="">
                                                <div className="w-full block lg:flex">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Marca" content={brand} error={validError.brand.error} errorMsg={validError.brand.msg} readOnly={true} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Modelo" content={model} error={validError.model.error} errorMsg={validError.model.msg} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Año" content={year} error={validError.year.error} errorMsg={validError.year.msg} readOnly={true} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Versión" content={version} error={validError.version.error} errorMsg={validError.version.msg} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="Patente" content={patent} error={validError.patent.error} errorMsg={validError.patent.msg} onChange={e => setPatent(e.target.value)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="N° de chasis o cuadro" content={framenumber} error={validError.framenumber.error} errorMsg={validError.framenumber.msg} onChange={e => setFrameNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="w-full block lg:flex mt-8">
                                                    <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                        <CustomInput type="text" name="N° de motor" content={enginenumber} error={validError.enginenumber.error} errorMsg={validError.enginenumber.msg} onChange={e => setEngineNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center sm:justify-between">
                                            <div></div>
                                            <button type="submit" className={`${step2Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 mb-20 md:mb-0 shadow-lg`}>Siguiente</button>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                        {step === 3 &&
                            <form className="w-full mr-0 md:mr-8" onSubmit={goHiringPictures}>
                                <div className="w-full sm:pl-10 sm:pr-15 pt-6 pb-8 border-b sm:border border-purple3 sm:rounded-xl">
                                    <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">¿Cómo querés pagar?</p>
                                    <div>
                                        {payCBU &&
                                            <CustomCheckBox title="CBU" item={1} pay={pay} onClick={() => setPay(1)} />
                                        }
                                        {payCard &&
                                            <div className="pt-4">
                                                <CustomCheckBox title="Tarjeta de crédito" item={2} pay={pay} onClick={() => setPay(2)} />
                                            </div>
                                        }
                                    </div>
                                </div>
                                {pay === 1 &&
                                    <div className="w-full sm:pl-10 sm:pr-15 sm:pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl mt-8">
                                        <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Completá tu CBU</p>
                                        <div className="">
                                            <div className="w-full block sm:flex">
                                                <div className="w-full lg:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput name="Número de CBU" content={cbunumber} error={cbunumberError} errorMsg={cbunumberErrorMsg} onChange={e => setCBUNumber(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {pay === 2 &&
                                    <div className="w-full sm:pl-10 sm:pr-15 pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl mt-8">
                                        <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Completá los datos de tu tarjeta</p>
                                        <div className="">
                                            <div className="w-full block lg:flex">
                                                <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                    <CustomInput type="number" name="Número de tarjeta" content={cardnumber} error={validStep3Error.cardnumber.error} errorMsg={validStep3Error.cardnumber.msg} onChange={e => setCardNumber(e.target.value)} />
                                                    <div className="mt-8">
                                                        <CustomInput type="text" name="Nombre y apellido" content={nameandsurname} error={validStep3Error.nameandsurname.error} errorMsg={validStep3Error.nameandsurname.msg} onChange={e => setNameAndSurname(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 sm:pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                    <CustomInput type="text" name="Banco" content={bank} error={validStep3Error.bank.error} errorMsg={validStep3Error.bank.msg} onChange={e => setBank(e.target.value)} />
                                                    <div className="mt-8">
                                                        <MonthCalendar
                                                            date={expirationDate}
                                                            name="Fecha de vencimiento"
                                                            // error={validStep3Error.expirationDate.error}
                                                            // errorMsg={validStep3Error.expirationDate.msg}
                                                            format="MM/YYYY"
                                                            onChange={(date) => { setExpirationDate(date) }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="w-full flex justify-center sm:justify-between">
                                    <div></div>
                                    <button type="submit" className={`${step3Valid ? `bg-purple` : `bg-pink2`} text-white rounded-lg font-RobotoMedium text-base px-4 sm:px-16 py-3 mt-8 sm:mt-12 mb-20 md:mb-0 shadow-lg`}>Contratar seguro</button>
                                </div>
                            </form>
                        }
                    </div>
                    <div className="w-full absolute bottom-0 block md:hidden">
                        {quote !== {} && quote.insurerObj &&
                            <QuotationSelectBottomMoto open={bottomopen} changeOpenState={() => setBottomOpen(!bottomopen)} best={true} data={quote} option={1} original={1} hiring={true} />
                        }
                    </div>
                </div>
                <ToastContainer />
                {loading && <ChargingModalMoto />}
                {processModal && <MessagesModalMoto />}
            </div>
        </>
    )
}

export default HiringDataMoto;
