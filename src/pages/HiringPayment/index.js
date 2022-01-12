import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import CustomCheckBox from '../../components/CustomCheckBox';
import CustomInput from '../../components/CustomInput';
import QuotationSelectBottom from '../../components/QuotationSelectBottom';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiHiringAllowedMethod, apiHiringPaymentMethodCBUSend, apiHiringPaymentMethodCardSend, apiGetQuotationDataById, apiGetPreLoadedData } from '../../services/main';
import { amplitudeLogEvent, getCardBrand } from '../../services/utils';
import MessagesModal from '../../components/LoadingModal/MessagesModal';
import MonthCalendar from '../../components/MonthCalendar';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import QuotationSelect from '../../components/QuotationSelect';

import './index.css';


const HiringPayment = (props) => {

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [bottomopen, setBottomOpen] = useState(false);

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
    const [validError, setValidError] = useState({
        cardnumber: { error: false, msg: "Colocá el número de tu tarjeta de crédito." },
        bank: { error: false, msg: "Colocá el nombre de tu banco." },
        nameandsurname: { error: false, msg: "Colocá tu nombre y apellido completos (Ej: Juan Pérez)." },
        expirationDate: { error: false, msg: "Colocá una fecha de vencimiento válida(Ej: 12/23)." },
    });

    const [processModal, setProcessModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {

        setCBUNumberErrorMsg("Colocá los 22 dígitos de tu CBU sin espacios.");

        amplitudeLogEvent("Hiring/Payment");

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

        apiHiringAllowedMethod(localStorage.getItem("CustomerID"), props.match.params.quoteID)
            .then(res => {
                setLoading2(false);
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
                setLoading2(false);
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

    const checkValidation = () => {
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
                expirationDate: eExpDate } = validError;

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

            setValidError({
                ...validError,
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

    const goHiringPictures = e => {

        e.preventDefault();

        if (!checkValidation()) return;

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
                        let url = "/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
                        history.push(url);
                    }
                })
                .catch(err => {
                    console.log("response-----", err.response);
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
                        let url = "/hiring/pictures/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
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

    useEffect(() => {
        if (!loading1 && !loading2 && !loading3) {
            setLoading(false);
        }
    }, [loading1, loading2, loading3]);

    return (
        <>
            <Helmet>
                <title>{"Un paso más!"}</title>
            </Helmet>
            <div className="w-full bg-pink8">
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
                                                <CustomInput name="Número de tarjeta" content={cardnumber} error={validError.cardnumber.error} errorMsg={validError.cardnumber.msg} onChange={e => setCardNumber(e.target.value)} />
                                                <div className="mt-8">
                                                    <CustomInput type="text" name="Nombre y apellido" content={nameandsurname} error={validError.nameandsurname.error} errorMsg={validError.nameandsurname.msg} onChange={e => setNameAndSurname(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                                <CustomInput type="text" name="Banco" content={bank} error={validError.bank.error} errorMsg={validError.bank.msg} onChange={e => setBank(e.target.value)} />
                                                <div className="mt-8">
                                                    <MonthCalendar
                                                        date={expirationDate}
                                                        name="Fecha de vencimiento"
                                                        // error={validError.expirationDate.error}
                                                        // errorMsg={validError.expirationDate.msg}
                                                        format="MM/YYYY"
                                                        onChange={(date) => { setExpirationDate(date) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="w-full text-center sm:text-left">
                                <button type="submit" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-4 sm:px-16 py-3 mt-8 sm:mt-12 mb-40 shadow-lg">Contratar seguro</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full absolute bottom-0 block md:hidden">
                        {quote !== {} && !!quote.insurerObj &&
                            <QuotationSelectBottom open={bottomopen} changeOpenState={() => setBottomOpen(!bottomopen)} best={true} data={quote} option={1} original={1} hiring={true} />
                        }
                    </div>

                </div>
                <ToastContainer />
                {processModal && <MessagesModal />}
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HiringPayment;
