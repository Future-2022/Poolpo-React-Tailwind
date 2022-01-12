import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import InputCalendar from '../../components/InputCalendar';
import CustomInput from '../../components/CustomInput';
import QuotationSelectBottom from '../../components/QuotationSelectBottom';
import InputDropdownState from '../../components/InputDropdownState';

import HeaderHiring from '../../layouts/HeaderHiring';

import TelefonoArgentino from '../../services/telefonos_argentinos';

import { apiCheckPostalCode, apiHiringDataSend, apiGetStates, apiGetPreLoadedData, apiGetQuotationDataById } from '../../services/main';

import loadingimg from '../../img/loading.gif';
import cross from '../../img/cross.png';
import { amplitudeLogEvent, checkDNI, checkEmail, formatDate } from '../../services/utils';

import './index.css';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import QuotationSelect from '../../components/QuotationSelect';


const HiringData = (props) => {

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

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Hiring-PersonalData");

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

            })
            .catch(err => {
                console.log("err-----", err);
                setLoading3(false);
            });

    }, []);

    const checkPostalCode = value => {
        alert(value)
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
            //setErrEmail(true);            
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

    const goHiringVehicle = e => {

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
                    let url = "/hiring/vehicle/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
                    history.push(url);
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

    return (
        <>
            <Helmet>
                <title>{leadName + " estás a un paso de obtener el mejor seguro, al mejor precio!"}</title>
            </Helmet>
            <div className="w-full bg-pink8 overflow-remove">
                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={false} logoID={(quote !== {} && !!quote.insurerObj) ? quote.insurerObj.id : false}>
                        <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left sm:text-center pb-2 sm:pb-12 md:pb-0">
                            <span className="text-purple4">
                                {leadName}
                            </span>
                        , ¡excelente elección!
                        </p>
                        <p className="text-lg sm:text-xl font-OpenSansRegular text-gray text-left sm:text-center pt-5">
                            Solo queda que revisemos juntos los datos que nos<br className="hidden sm:block" /> brindaste para contratar
                        </p>
                    </HeaderHiring>
                    <div className="w-full flex flex-row-reverse px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="w-full hidden md:block" style={{ maxWidth: "352px" }}>
                            {quote !== {} && !!quote.insurerObj && !!props.match.params.quoteID &&
                                <QuotationSelect best={quote.isHighlighted} data={quote} following={true} equal={true} />
                            }
                        </div>
                        <form className="w-full mr-0 md:mr-8" onSubmit={goHiringVehicle}>
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
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
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
                                                    endDate={moment(initialHomeCoverage).add(30, 'days')}
                                                    // error={validError.homeCoverage.error} errorMsg={validError.homeCoverage.msg}
                                                    onChange={(date) => { setHomeCoverage(date) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:pl-10 sm:pr-15 pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl mt-8">
                                <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Tu domicilio</p>
                                <div className="">
                                    <div className="w-full block lg:flex">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <InputDropdownState type="text" error={validError.province.error} errorMsg={validError.province.msg} list={provinceList} selected={province} name="Provincia" onChange={(id) => setProvince(id)} />
                                        </div>
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                            <CustomInput type="text" name="Ciudad" content={city} error={validError.city.error} errorMsg={validError.city.msg} onChange={e => setCity(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full block lg:flex mt-8">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <CustomInput type="text" name="Domicilio" content={address} error={validError.address.error} errorMsg={validError.address.msg} onChange={e => setAddress(e.target.value)} />
                                        </div>
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                            <CustomInput type="number" name="Número" content={number} error={validError.number.error} errorMsg={validError.number.msg} onChange={e => setNumber(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full block lg:flex mt-8">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <CustomInput type="number" name="Piso" content={floor} onChange={e => setFloor(e.target.value)} />
                                        </div>
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                            <CustomInput type="text" name="Departamento" content={department} onChange={e => setDepartment(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full block lg:flex mt-8">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <div className="w-full relative">
                                                <CustomInput type="text" special={true} name="Código postal" content={postalcode} error={validError.postalcodechecked.error} errorMsg={validError.postalcodechecked.msg} onChange={e => setPostalCode(e.target.value)} />
                                                <div className="relative top-4 right-4">
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
                            <div className="w-full text-center sm:text-left">
                                <button type="submit" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-8 sm:px-16 py-3 mt-8 sm:mt-12 mb-20 md:mb-0 shadow-lg">Siguiente</button>
                            </div>

                        </form>
                    </div>
                    <div className="w-full absolute bottom-0 block md:hidden">
                        {quote !== {} && quote.insurerObj &&
                            <QuotationSelectBottom open={bottomopen} changeOpenState={() => setBottomOpen(!bottomopen)} best={true} data={quote} option={1} original={1} hiring={true} />
                        }
                    </div>
                </div>
                <ToastContainer />
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HiringData;
