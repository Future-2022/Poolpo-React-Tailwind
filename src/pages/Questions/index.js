import React, { useEffect, useState } from 'react'

import logo from '../../img/logo.png';
import threelinessmall from '../../img/three-lines-small.png';

import QuestionItem from '../../components/QuestionItem';
import Footer2 from '../../layouts/Footer2';

import { apiGetFAQs } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const Questions = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        amplitudeLogEvent("Questions");
        apiGetFAQs()
            .then(res => {
                console.log("res-----", res);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full bg-maingray relative" style={{ minHeight: "100vh" }}>
            <img src={threelinessmall} alt="" className="absolute top-0 right-0" />
            <div className="w-full max-w-1296 mx-auto flex items-center justify-between py-8 px-4 sm:px-12 xl:px-24 1xl:px-32">
                <a href="/"><img src={logo} alt="logo" /></a>
                <div></div>
            </div>

            <div className={`w-full pt-8 sm:pt-18 pb-5 md:pb-16 px-4 sm:px-12 xl:px-24 1xl:px-32`}>
                <p className="font-OpenSansRegular text-lg text-gray text-center pb-2">Preguntas frecuentes</p>
                <p className="font-SpartanBold text-xl sm:text-2xl text-black text-center">¿Como podemos ayudarte?</p>
            </div>

            <div className="w-full mx-auto max-w-1296 relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 1xl:px-238px z-20" style={{ paddingBottom: "460px" }}>

                {data.map(item => (<QuestionItem key={item.id} title={item.title} answer={item.description} />))}

            </div>

            <Footer2 />
            {loading && <ChargingModal />}

        </div>
    )
}

export default Questions;
