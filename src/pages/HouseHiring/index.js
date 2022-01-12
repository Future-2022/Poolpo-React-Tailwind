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

import { apiCheckPostalCode, apiHiringDataSend, apiGetStates, apiGetPreLoadedData, apiGetQuotationDataById, apiHiringPictureSend } from '../../services/main';

import loadingimg from '../../img/loading.gif';
import cross from '../../img/cross.png';
import { amplitudeLogEvent, checkDNI, checkEmail, formatDate } from '../../services/utils';

import './index.css';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import QuotationSelectMoto from '../../components/QuotationSelectMoto';
import vector from '../../img/vector.png';
import arrowleft from '../../img/arrow-left.png';
import CustomUpload from '../../components/CustomUpload';

const HouseHiring = (props) => {

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

    const [step, setStep] = useState(1);
    const [make, setMake] = useState("");
    const [group, setGroup] = useState("");
    const [year, setYear] = useState(0);
    const [version, setVersion] = useState(0);
    const [selected, setSelected] = useState("first");
    const [CBUNumber, setCBUNumber] = useState();
    const [bank, setBank] = useState("");



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

        apiGetPreLoadedData(props.match.params.leadID, props.match.params.propertyID, props.match.params.quoteID)
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
                    let url = "/hiring/vehicle/" + props.match.params.leadID + "/" + props.match.params.propertyID + "/" + props.match.params.quoteID;
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

    const handlePicture = (e, name) => {

        var formData = new FormData();

        formData.append("Hash", localStorage.getItem("propertyID"));
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

    return (
        <>
            <Helmet>
                <title>{leadName + " estás a un paso de obtener el mejor seguro, al mejor precio!"}</title>
            </Helmet>
            <div className="w-full bg-pink8 overflow-remove">
                <div className="w-full max-w-1296 mx-auto relative bg-pink8 pb-12" style={{ minHeight: "100vh" }}>
                    <HeaderHiring quotationitem={false} logoID={(quote !== {} && !!quote.insurerObj) ? quote.insurerObj.id : false}>

                        <p className="text-xl sm:text-3xl font-SpartanBold text-black text-left pt-5 sm:text-left pb-2 sm:pb-3 md:pb-0">
                            <span className="text-purple4">
                                {leadName}
                            </span>
                        , ¡excelente elección!
                        </p>
                        <p className="text-lg sm:text-xl font-OpenSansRegular text-gray text-left sm:text-left pt-0">
                            Sólo queda que completemos algunos datos :)
                        </p>
                        
                    </HeaderHiring>
                    
                    <div className="w-full flex flex-row-reverse px-4 sm:px-12 xl:px-24 1xl:px-32">
                        
                        <div className="w-full hidden md:block" style={{ maxWidth: "352px" }}>
                            {quote !== {} && !!quote.insurerObj && !!props.match.params.quoteID &&
                                <QuotationSelectMoto best={true} data={quote} following={true} equal={true} />
                            }
                        </div>
                        {step === 1 && (
                            <>
                            <form className="w-full mr-0 md:mr-8" onSubmit={goHiringVehicle}>
                                <div className="w-full sm:pl-10 sm:pr-15 sm:pt-6 pb-8 border-b sm:border border-purple3 sm:rounded-xl">
                                    <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Completá tus datos personales</p>
                                    <div className="">
                                        <div className="w-full block lg:flex">
                                            <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                                <CustomInput type="text" name="Nombre" content={firstName} error={validError.firstName.error} errorMsg={validError.firstName.msg} onChange={e => setFirstName(e.target.value)} />
                                                <div className="mt-8">
                                                    <CustomInput type="email" name="Email" error={validError.email.error} errorMsg={validError.email.msg} content={email} onChange={e => setEmail(e.target.value)} />
                                                </div>
                                                <div className="mt-8 relative z-20">
                                                    <InputCalendar
                                                        name="Fecha inicio garantía"
                                                        date={Date.now()}
                                                        onChange={(date) => { setBirthDate(date); }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                <CustomInput type="number" name="DNI" content={dni} error={validError.dni.error} errorMsg={validError.dni.msg} onChange={e => setDNI(e.target.value)} />
                                                <div className="w-full relative mt-8">
                                                    <CustomInput type="number" name="Celular" error={validError.phone.error} errorMsg={validError.phone.msg} content={phone} onChange={e => setPhone(e.target.value)} />
                                                </div>
                                                <div className="w-full relative mt-8 z-10">
                                                    <InputCalendar
                                                        name="Fecha nacimiento"
                                                        date={homeCoverage}
                                                        startDate={moment(initialHomeCoverage)}
                                                        endDate={moment(initialHomeCoverage).add(30, 'days')}
                                                        onChange={(date) => { setHomeCoverage(date) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-8">
                                    <p className="font-SpartanBold text-gray text-lg sm:text-xl">¡Ahora, tus documentos!</p>
                                    <p className="text-gray sm:pb-8 pb-6">Necesitamos que cargues tus recibos de sueldo en formato <strong>pdf</strong> o <strong>jpg</strong>.</p>
                                    <div className="">
                                        <div className="w-full block lg:flex">
                                            <CustomUpload name="Adjuntá tu documento" onChange={e => handlePicture(e, "Frente")} />
                                        </div>
                                        <div className="w-full block lg:flex mt-4">
                                            <CustomUpload name="Adjuntá tu documento" onChange={e => handlePicture(e, "Frente")} />
                                        </div>
                                        <div className="w-full block lg:flex mt-4">
                                            <CustomUpload name="Adjuntá tu documento" onChange={e => handlePicture(e, "Frente")} />
                                        </div>                                    
                                    </div>

                                </div>
                                <div className="w-full text-center sm:text-right">
                                    <button type="submit" className="bg-opacity-50  bg-purple text-white rounded-lg font-RobotoMedium text-base px-8 sm:px-16 py-3 mt-8 sm:mt-12 mb-20 md:mb-0 shadow-lg">Siguiente</button>
                                </div>

                            </form>
                            <div className="w-full absolute bottom-0 block md:hidden">
                                {quote !== {} && quote.insurerObj &&
                                    <QuotationSelectBottom open={bottomopen} changeOpenState={() => setBottomOpen(!bottomopen)} best={true} data={quote} option={1} original={1} hiring={true} />
                                }
                            </div>
                        </>
                        )
                    }
                    </div>
                    
                </div>
                <ToastContainer />
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HouseHiring;
