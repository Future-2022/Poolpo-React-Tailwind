import React, { useState, useEffect } from 'react'
import Modal from "react-modal"
import OutsideClickHandler from "react-outside-click-handler"

import logo from "../../img/logo.png"
import alertcircle from "../../img/alert-circle.png"
import downsmall from "../../img/down-small.png"
import cross from "../../img/cross.png"

import QuotationCheckBox from "../../components/QuotationCheckBox"
import RangeSlider from "../../components/RangeSlider"
import { formatNumber } from '../../services/utils'


const QuotationFilterModalMoto = (props) => {

    const [price, setPrice] = useState(props.price)
    const [priceMin, setPriceMin] = useState(props.priceMin)
    const [priceMax, setPriceMax] = useState(props.priceMax)
    const [insuranceSum, setInsuranceSum] = useState(props.insuranceSum)
    const [insuranceSumMin, setInsuranceSumMin] = useState(props.insuranceSumMin)
    const [insuranceSumMax, setInsuranceSumMax] = useState(props.insuranceSumMax)

    const [insurers, setInsurers] = useState(props.insurers)
    const [insurersLength, setInsurersLength] = useState(3)
    const [months, setMonths] = useState(props.months)

    const [selectedInsurers, setSelectedInsurers] = useState([])
    const [selectedMonths, setSelectedMonths] = useState([])

    const [showPriceTooltip, setShowPriceTooltip] = useState(false)

    const [changed, setChanged] = useState(false)

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
        },
    }

    const filterRemove = () => {
        setSelectedInsurers([])
        setSelectedMonths([])
        setPrice(priceMax)
        setInsuranceSum(insuranceSumMax)
        setInsurersLength(3)
    }

    const handleInsurers = (value) => {
        if (selectedInsurers.includes(value)) {
            setSelectedInsurers(
                selectedInsurers.filter((item) => {
                    return item !== value
                })
            )
        } else {
            setSelectedInsurers([value, ...selectedInsurers])
        }
    }

    const handleMonths = (value) => {
        let number = Number(value.slice(0, -6))

        if (selectedMonths.includes(number)) {
            setSelectedMonths(
                selectedMonths.filter((item) => {
                    return item !== number
                })
            )
        } else {
            setSelectedMonths([number, ...selectedMonths])
        }
    }

    useEffect(() => {
        filterRemove();
        setPrice(props.price);
        setPriceMin(props.priceMin);
        setPriceMax(props.priceMax);
        setInsuranceSum(props.insuranceSum);
        setInsuranceSumMax(props.insuranceSumMax);
        setInsuranceSumMin(props.insuranceSumMax);
        setInsurers(props.insurers);
        setMonths(props.months);
    }, [props.isOpen, props.price, props.priceMin, props.priceMax, props.insuranceSum, props.insuranceSumMin, props.insuranceSumMax, props.insurers, props.months]);

    useEffect(() => {
        setChanged(price !== props.price || insuranceSum !== props.insuranceSum || selectedInsurers.length !== 0 || selectedMonths.length !== 0);
    }, [price, insuranceSum, selectedInsurers, selectedMonths]);

    const applyChanges = () => {
        props.receiveData(price, insuranceSum, selectedInsurers, selectedMonths);
        props.onRequestClose();
    }


    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            style={customStyles}
        >
            <div
                className="w-full relative px-2 sm:px-8 modal-filter"
                style={{
                    maxHeight: "100vh",
                    overflowX: "hidden",
                    overflowY: "scroll",
                }}
            >
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo"
                        className="mr-2 sm:mr-8 md:mr-32"
                    />
                    <img
                        src={cross}
                        alt="cross"
                        className="cursor-pointer"
                        onClick={() => props.onRequestClose()}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <p className="font-SpartanBold text-2xl text-black">
                        Filtros
                    </p>
                    <p
                        className="font-OpenSansRegular text-base text-purple cursor-pointer select-none"
                        onClick={() => filterRemove()}
                    >
                        Eliminar filtros
                    </p>
                </div>
                <div className="border-b border-purple3">
                    <p className="font-SpartanBold text-lg text-black pt-3 pb-4">
                        Aseguradora
                    </p>
                    {insurers.length !== 0 &&
                        insurers
                            .slice(0, insurersLength)
                            .map((insurer, index) => (
                                <div key={index} className="pb-4">
                                    <QuotationCheckBox
                                        label={insurer}
                                        state={selectedInsurers.includes(insurer)}
                                        onChange={handleInsurers}
                                    />
                                </div>
                            ))}
                    {insurers.length > insurersLength && (
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setInsurersLength(insurersLength + 3)}
                        >
                            <p className="font-OpenSansSemiBold text-purple text-base pb-4">
                                Ver más
                            </p>
                            <img
                                src={downsmall}
                                alt="downsmall"
                                className="pb-2 ml-1"
                            />
                        </div>
                    )}
                </div>
                <div className="border-b border-purple3">
                    <p className="font-SpartanBold text-lg text-black pt-3 pb-2">
                        Precio
                        <span className="font-SpartanMedium text-sm">/mes</span>
                    </p>
                    <div className="w-full flex items-center justify-between font-OpenSansRegular text-lg text-black">
                        <p>${formatNumber(priceMin)}</p>
                        <p>${formatNumber(priceMax)}</p>
                    </div>
                    <RangeSlider
                        min={priceMin}
                        max={priceMax}
                        format={(value) => {
                            return formatNumber(value)
                        }}
                        value={price}
                        onChange={(value) => setPrice(value)}
                    />
                </div>
                <div className="border-b border-purple3">
                    <div className="w-full relative flex items-center justify-start">
                        <p className="font-SpartanBold text-lg text-black pt-3 pb-2">
                            Suma asegurada
                        </p>
                        <OutsideClickHandler
                            onOutsideClick={() => setShowPriceTooltip(false)}
                        >
                            <img
                                src={alertcircle}
                                alt=""
                                className="ml-4 cursor-pointer"
                                onClick={() => setShowPriceTooltip(true)}
                            />
                        </OutsideClickHandler>
                        {showPriceTooltip && (
                            <div
                                className="absolute top-12 left-3 p-4 rounded-xl bg-purple2 text-white z-50"
                                style={{ width: "276px" }}
                            >
                                <p className="text-base">
                                    Monto máximo por el cual una aseguradora fija su responsabilidad frente al asegurado.{" "}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between font-OpenSansRegular text-lg text-black">
                        <p>${formatNumber(insuranceSumMin)}</p>
                        <p>${formatNumber(insuranceSumMax)}</p>
                    </div>
                    <RangeSlider
                        min={insuranceSumMin}
                        max={insuranceSumMax}
                        format={(value) => {
                            return formatNumber(value)
                        }}
                        value={insuranceSum}
                        onChange={(value) => setInsuranceSum(value)}
                    />
                </div>
                <div>
                    <p className="font-SpartanBold text-lg text-black pt-3 pb-4">
                        Precio fijo durante
                    </p>
                    {months.length !== 0 &&
                        months.map((month, index) => (
                            <div key={index} className="pb-4">
                                <QuotationCheckBox
                                    label={month + " meses"}
                                    state={selectedMonths.includes(month)}
                                    onChange={handleMonths}
                                />
                            </div>
                        ))}
                </div>
                <button type="button" className={`${changed ? `bg-purple` : `bg-pink2`} w-full text-white rounded-lg font-RobotoMedium text-base px-16 py-3 mt-8 sm:mt-12 mb-4 shadow-lg`} onClick={applyChanges}>Aplicar</button>
            </div>
        </Modal>
    )
}

export default QuotationFilterModalMoto;
