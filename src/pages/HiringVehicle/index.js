import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import CustomInput from '../../components/CustomInput';
import QuotationSelectBottom from '../../components/QuotationSelectBottom';

import HeaderHiring from '../../layouts/HeaderHiring';

import { apiHiringVehicleSend, apiGetPreLoadedData, apiGetQuotationDataById, apiGetModelByCodia } from '../../services/main';
import { amplitudeLogEvent, checkPatent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import QuotationSelect from '../../components/QuotationSelect';


const HiringVehicle = (props) => {

    let history = useHistory();

    const [quote, setQuote] = useState({});

    const [leadName, setLeadName] = useState("");

    const [bottomopen, setBottomOpen] = useState(false);

    const [validError, setValidError] = useState({
        brand: { error: false, msg: "Elegí una opción." },
        model: { error: false, msg: "Elegí una opción." },
        year: { error: false, msg: "Elegí una opción." },
        version: { error: false, msg: "Elegí una opción." },
        patent: { error: false, msg: "Colocá la patente de tu vehículo sin espacios (Ej: AA123ZZ)." },
        framenumber: { error: false, msg: "Colocá el número de chasis o cuadro sin espacios." },
        enginenumber: { error: false, msg: "Colocá el número de motor sin espacios." }
    });

    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");
    const [model, setModel] = useState("");
    const [modelID, setModelID] = useState(0);
    const [version, setVersion] = useState("");
    const [patent, setPatent] = useState("");
    const [framenumber, setFrameNumber] = useState("");
    const [enginenumber, setEngineNumber] = useState("");
    const [isNew, setIsNew] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Hiring-Vehicle");

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

                let year = !!res.data.vehicle.year ? res.data.vehicle.year : "";

                setYear(year);
                setIsNew(!!res.data.vehicle.isNew ? res.data.vehicle.isNew : false);
                setPatent(!!res.data.vehicle.domain ? res.data.vehicle.domain : "");
                setFrameNumber(!!res.data.vehicle.chassis ? res.data.vehicle.chassis : "");
                setEngineNumber(!!res.data.vehicle.engine ? res.data.vehicle.engine : "");
                setModelID(!!res.data.vehicle.code ? res.data.vehicle.code : 0);

                apiGetModelByCodia(res.data.vehicle.code)
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
                setLoading2(false);
            });

    }, []);

    const checkValidation = () => {
        let { brand: eBrand,
            model: eModel,
            year: eYear,
            patent: ePatent } = validError;

        eBrand.error = false;
        eModel.error = false;
        eYear.error = false;
        ePatent.error = false;

        if (!checkPatent(patent)) {
            ePatent.error = true;
        }
        if (brand === 0) {
            eBrand.error = true;
        }
        if (model === 0) {
            eModel.error = true;
        }
        if (!year) {
            eYear.error = true;
        }

        setValidError({
            ...validError,
            brand: eBrand,
            model: eModel,
            year: eYear,
            patent: ePatent,
        });

        if (eBrand.error || eModel.error || eYear.error || ePatent.error) {
            return false;
        }
        return true;
    }

    const goHiringPayment = e => {

        e.preventDefault();

        if (!checkValidation()) return;

        var formData = new FormData();

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
        formData.append('isCar', true);

        apiHiringVehicleSend(formData)
            .then(res => {
                console.log("res-----", res);
                if (res.data.error) {
                    toast.error(res.data.msg);
                } else {
                    let url = "/hiring/payment/" + props.match.params.leadID + "/" + props.match.params.vehicleID + "/" + props.match.params.quoteID;
                    history.push(url);
                }
            })
            .catch(err => {
                console.log("err-----", err);
            })
    }

    useEffect(() => {
        if (!loading1 && !loading2) {
            setLoading(false);
        }
    }, [loading1, loading2]);

    return (
        <>
            <Helmet>
                <title>{leadName + " estás a un paso de obtener el mejor seguro, al mejor precio!"}</title>
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
                            {quote !== {} && quote.insurerObj && !!props.match.params.quoteID &&
                                <QuotationSelect best={quote.isHighlighted} data={quote} following={true} equal={true} />
                            }
                        </div>
                        <form className="w-full mr-0 md:mr-8" onSubmit={goHiringPayment}>
                            <div className="w-full sm:pl-10 sm:pr-15 pt-6 sm:pb-8 sm:border border-purple3 sm:rounded-xl">
                                <p className="font-SpartanBold text-gray text-lg sm:text-xl pb-6">Tu vehículo</p>
                                <div className="">
                                    <div className="w-full block lg:flex">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <div className="relative z-20">
                                                <CustomInput type="text" name="Marca" content={brand} error={validError.brand.error} errorMsg={validError.brand.msg} readOnly={true} />
                                            </div>
                                            <div className="mt-8">
                                                <CustomInput type="text" name="Modelo" content={model} error={validError.model.error} errorMsg={validError.model.msg} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                            <div className="w-full">
                                                <CustomInput type="text" name="Año" content={year} error={validError.year.error} errorMsg={validError.year.msg} readOnly={true} />
                                            </div>
                                            <div className="w-full mt-8">
                                                <CustomInput type="text" name="Versión" content={version} error={validError.version.error} errorMsg={validError.version.msg} readOnly={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full block lg:flex mt-8">
                                        <div className="w-full lg:w-1/2 xl:w-3/5 mb-4 sm:mb-0">
                                            <div className="relative z-20">
                                                <CustomInput type="text" name="Patente" content={patent} error={validError.patent.error} errorMsg={validError.patent.msg} onChange={e => setPatent(e.target.value)} />
                                            </div>
                                            <div className="mt-8">
                                                <CustomInput type="text" name="N° de motor" content={enginenumber} error={validError.enginenumber.error} errorMsg={validError.enginenumber.msg} onChange={e => setEngineNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 xl:w-2/5 pt-4 lg:pt-0 pl-0 lg:pl-8 mb-4 sm:mb-0">
                                            <div className="w-full">
                                                <CustomInput type="text" name="N° de chasis o cuadro" content={framenumber} error={validError.framenumber.error} errorMsg={validError.framenumber.msg} onChange={e => setFrameNumber(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full text-center sm:text-left">
                                <button type="submit" className="bg-purple text-white rounded-lg font-RobotoMedium text-base px-8 sm:px-16 py-3 mt-8 sm:mt-12 mb-20 shadow-lg">Siguiente</button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full absolute bottom-0 block md:hidden z-50">
                        {quote !== {} && quote.insurerObj &&
                            <QuotationSelectBottom open={bottomopen} changeOpenState={() => setBottomOpen(!bottomopen)} best={true} data={quote} option={1} original={1} hiring={true} />
                        }
                    </div>
                    <ToastContainer />
                </div>
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default HiringVehicle;
