import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import noso from '../../img/noso.png';
import threelinessmall from '../../img/three-lines-small.png';
import threelinesbig from '../../img/three-lines-big.png';
import doubleright from '../../img/double-right.png';
import threelinesside from '../../img/three-lines-side.png';
import imagenotfound from '../../img/image-notfound.png';

import HeaderWithoutContact from '../../layouts/HeaderWithoutContact';
import Footer1 from '../../layouts/Footer1';
import PressPagination from '../../components/PressPagination';
import { apiGetTeamMembers, apiGetPressList } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';


const AboutUs = () => {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let query = params.get('item');

    const [item, setItem] = useState(query ? Number(query) : 1);

    const [page, setPage] = useState(0);

    const [teammembers, setTeamMembers] = useState([]);
    const [presslist, setPressList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("AboutUs");

        apiGetTeamMembers()
            .then(res => {
                console.log("res-----", res);
                setTeamMembers(res.data);
                setLoading1(false);
            })
            .catch(err => {
                console.log(err);
                setLoading1(false);
            });

        apiGetPressList()
            .then(res => {
                console.log("press-----", res);
                setPressList(res.data);
                setLoading2(false);
            })
            .catch(err => {
                console.log(err);
                setLoading2(false);
            });

    }, []);

    const handlePage = v => {
        setPage(v);
    }

    useEffect(() => {
        if (!loading1 && !loading2) {
            setLoading(false);
        }
    }, [loading1, loading2]);

    return (
        <>
            <Helmet>
                <title>Acerca de Poolpo</title>
            </Helmet>
            <div className="w-full bg-maingray relative">
                <img src={threelinessmall} alt="" className="absolute top-0 right-0 hidden md:block" />

                <HeaderWithoutContact />

                <div className={`w-full mx-auto max-w-1296 pt-12 pb-5 md:pb-20 lg:pb-8 px-8 sm:px-12 xl:px-24 1xl:px-32`}>
                    <p className="font-SpartanRegular text-4xl text-black text-center">Somos <span className="font-SpartanBold text-green3">Poolpo</span></p>
                </div>

                <div className={`w-full mx-auto max-w-1296 pt-6 sm:pt-18 pb-5 md:pb-24 lg:pb-8 px-4 sm:px-12 xl:px-24 1xl:px-32`}>

                    <div className="w-full mx-auto max-w-1296 flex">
                        <div className={`w-1/2 sm:w-auto mr-2 sm:mr-20 cursor-pointer ${item === 1 ? `opacity-100` : `opacity-25`}`} onClick={() => setItem(1)}>
                            <p className="text-purple px-2 sm:px-12 border-b-2 border-purple font-SpartanBold text-xl leading-loose text-center">Nosotros</p>
                        </div>
                        <div className={`w-1/2 sm:w-auto cursor-pointer ${item === 2 ? `opacity-100` : `opacity-25`}`} onClick={() => setItem(2)}>
                            <p className="text-purple px-2 sm:px-12 border-b-2 border-purple font-SpartanBold text-xl leading-loose text-center">Prensa</p>
                        </div>
                    </div>

                    {item === 1 &&
                        <div className="w-full mx-auto max-w-1296 pt-10 sm:pt-18">
                            <p className="text-black font-SpartanBold text-2xl">Obtener el mayor ahorro en<br className="hidden md:block" /> diferentes servicios en el menor<br className="hidden md:block" /> tiempo posible.</p>
                            <p className="font-OpenSansLight text-gray text-xl pt-2">-Ariel Lipschutz - CEO</p>
                        </div>
                    }
                    {item === 2 &&
                        <div className="w-full mx-auto max-w-1296 pt-10 sm:pt-18">
                            <p className="text-black font-SpartanMedium text-2xl pb-5"><span className="font-SpartanExtraBold">Poolpo</span> en la prensa</p>
                            <p className="font-OpenSansRegular text-gray text-lg">Conocé las últimas repercusiones de Poolpo en los medios y<br className="hidden md:block" /> enterate hacia dónde va la industria de seguros.</p>
                        </div>
                    }

                </div>

                {item === 1 &&

                    <>
                        <div className="w-full mx-auto max-w-1296 pt-6 lg:pt-18 px-4 sm:px-12 xl:px-32 1xl:px-32">

                            <div className="w-full bg-maingray z-30">
                                <div className="w-full bg-white rounded-3xl pr-4 lg:pr-0 pl-4 lg:pl-12 xl:pl-20 1xl:pl-20 py-10 lg:py-20 relative z-30">
                                    <div className="w-full lg:max-w-1/2 text-center lg:text-left">
                                        <p className="text-black2 text-base sm:text-xl font-OpenSansRegular pt-0 lg:pt-12 text-left md:text-center">¿Que es Poolpo?</p>
                                        <p className="font-OpenSansRegular text-gray text-base sm:text-2xl pt-6 text-left md:text-center">PoolPo es un <span className="font-OpenSansBold text-green1">sistema de inteligencia artificial</span> que lee e interpreta pólizas de seguros, obteniendo información sobre la persona, el vehículo y su seguro.</p>
                                        <p className="font-OpenSansLight text-gray text-base sm:text-2xl pt-12 pb-0 lg:pb-20 text-left md:text-center">Conociendo esta información, nuestro sistema evalúa distintas propuestas en diferentes aseguradoras, con el fin de ofrecerle a nuestros usuarios la opción que se adecue mejor a sus necesidades.</p>
                                    </div>
                                    <img src={noso} alt="" className="hidden lg:block absolute top-15 z-20 xl:right-minus65 1xl:right-minus95 max-w-1/2" style={{ bottom: "-80px", right: "-75px" }} />
                                </div>
                            </div>

                        </div>

                        <div className="w-full mx-auto max-w-1296 pt-8 lg:pt-64 pb-8 relative">
                            <img src={threelinesbig} alt="" className="absolute left-0 z-10" style={{ top: "-35px" }} />
                            <p className="pt-4 sm:pt-16 pb-4 sm:pb-12 text-gray text-2xl font-SpartanSemiBold text-center z-0">
                                Nuestro equipo
                            </p>

                            <div className="w-full block md:flex items-center justify-center z-20 px-4 sm:px-8">
                                {teammembers.map(item => (
                                    <div key={item.id} className="flex px-4 pt-4 md:pt-0">
                                        <div className="max-w-352 bg-white px-2 sm:px-6 py-5 rounded-3xl relative shadow-lg z-20 mx-auto">
                                            <div className="overflow-y-hidden rounded-tl-2xl rounded-tr-2xl" style={{ maxHeight: "231px" }}>
                                                <img src={item.image ? item.image.url : imagenotfound} alt="" className="w-full" style={{ maxWidth: "304px" }} />
                                            </div>
                                            <div className="w-full bg-blue px-2 sm:px-6 pt-4 sm:pt-12 pb-4 sm:pb-15 text-blue rounded-bl-3xl rounded-br-3xl">
                                                <p className="font-SpartanBold text-lg">{item.name}</p>
                                                <p className="font-RobotoMedium text-base">{item.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>

                        </div>
                    </>
                }

                {item === 2 &&
                    <div className="w-full mx-auto max-w-1296 realtive">
                        <img src={threelinesside} alt="" className="absolute right-0 z-10" style={{ bottom: "240px" }} />
                        <div className="w-full flex justify-between px-4 sm:px-8 lg:px-16 xl:px-32 1xl:px-48">
                            <div></div>
                            <div className="hidden md:block">
                                <div className="flex items-center justify-center pr-0 lg:pr-8 pb-6">
                                    {Array(Math.ceil(presslist.length / 4)).fill(0).map((item, index) => (
                                        <p key={index} className={`${page === index ? `px-1 rounded-full border border-purple` : `px-2`} flex items-center  w-28px h-28px py-3 cursor-pointer text-center`} onClick={() => setPage(index)}>
                                            <span className="mx-auto">{index + 1}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="block md:hidden">
                                <PressPagination list={presslist} page={page} setPage={handlePage} />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 col-gap-8 row-gap-8 lg:row-gap-16 xl:row-gap-32 px-4 lg:px-16 xl:px-32 1xl:px-48 pt-8 pb-16 md:pb-24 sm:pt-0">
                            {presslist.slice(page * 4, page * 4 + 4 > presslist.length ? presslist.length : page * 4 + 4).map((item, index) => (
                                <div key={index} className="w-full bg-white rounded-3xl shadow-lg mx-auto px-4 sm:px-8 pt-6 pb-4 relative z-20" style={{ maxWidth: "448px" }}>
                                    <span className={`text-xs ${item.labelColor === "green" ? `bg-green4 text-green1` : (item.labelColor === "blue" ? `bg-blue text-blue` : (item.labelColor === "pink" ? `bg-pink7 text-purple3` : `bg-pink6 text-pink1`))} bg-blue text-blue font-OpenSansBold px-8 py-2 rounded-md uppercase`}>{item.label}</span>
                                    <div className="pt-5">
                                        <p className="font-OpenSansSemiBold text-xl text-gray leading-normal tracking-normal sm:tracking-wide" style={{ minHeight: "128px" }}>{item.title}</p>
                                        <p className="font-OpenSansLight text-base text-gray leading-normal sm:leading-loose" style={{ minHeight: "128px", overflowWrap: "break-word" }}>{item.Description}</p>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <a href={item.link} className="text-purple text-sm font-RobotoMedium">LEER MÁS</a>
                                        <img src={doubleright} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex items-center text-center md:hidden">
                            <div className="flex mx-auto">
                                <PressPagination list={presslist} page={page} setPage={handlePage} />
                            </div>
                        </div>

                    </div>
                }

                <Footer1 />
                {loading && <ChargingModal />}

            </div>
        </>
    )
}

export default AboutUs;
