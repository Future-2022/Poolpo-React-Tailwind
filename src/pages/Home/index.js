import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
    useMasonry,
    usePositioner,
    createResizeObserver,
    useContainerPosition,
    useScroller,
} from "masonic";
import { useWindowSize } from '@react-hook/window-size'

import frontmotor from '../../img/frontmotor.png';
import dollarsign from '../../img/dollarsign.png';
import wifi from '../../img/wifi-outline.png';
import imagenotfound from '../../img/image-notfound.png';

import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import MenuBar from '../../layouts/MenuBar';
import SlideShow from '../../components/SlideShow';
import MarkView from '../../components/MarkView';
import { apiGetHomeData, apiGetHomeOffers } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import { useHistory } from 'react-router';


const Home = (props) => {

    let history = useHistory();

    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [offers, setOffers] = useState([]);

    const [cardWidth, setCardWidth] = useState(1000);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {

        amplitudeLogEvent("Home");

        apiGetHomeData()
            .then(res => {
                console.log("res-----", res);
                setLoading1(false);
                setCompanies(res.data.companies);
                setProducts(res.data.products);
                let arrOffers = res.data.offers;
                if (!!arrOffers && arrOffers.length > 3) {
                    let value = arrOffers[0];
                    arrOffers[0] = arrOffers[3];
                    arrOffers[3] = value;
                }
                // setOffers(arrOffers);
            })
            .catch(err => {
                console.log(err);
                setLoading1(false);
            });

        apiGetHomeOffers()
            .then(res => {
                console.log("offersmodified-----", res);
                setOffers(res.data);
                setLoading2(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading2(false);
            })

        window.addEventListener('resize', onResize);

        onResize();

    }, []);

    useEffect(() => {

        if(!loading1 && !loading2) {
            setLoading(false);
        }

    }, [loading1, loading2]);

    const onResize = () => {
        var width = window.innerWidth;
        setCardWidth(width - 40);
    }

    const MasonryCard = ({ index, data, width }) => {
        return (
            <div key={data.title} className="max-w-352 w-full px-0 sm:px-4 py-2 mx-auto" style={{ width: cardWidth >= 340 ? "340px" : cardWidth + "px" }}>
                <div className="w-full bg-white p-4 lg:p-6 rounded-2xl relative shadow-lg">
                    <span className={`${data.labelColor === "blue" ? `text-blue-600 bg-blue` : (data.labelColor === "green" ? `text-green1 bg-green2`
                        : (data.labelColor === "pink" ? ` text-pink bg-pink`
                            : (data.labelColor === "yellow" ? `text-yellow1 bg-yellow` : `text-black bg-indigo-400`)))} 
                    font-OpenSansBold px-2 py-1 absolute top-2 sm:top-8 md:top-10 left-2 sm:left-8 md:left-10 rounded-md text-sm`}>{data.label}</span>
                    <SlideShow list={data.image} index={index} />
                    <p className="text-base sm:text-lg text-black font-SpartanBold pt-6">{data.title}</p>
                    <p className="text-sm font-OpenSansRegular text-gray pb-3">{data.description}</p>
                    <a href={data.link}>
                        <button className="px-10 py-3 text-base border border-purple rounded-md text-purple font-RobotoMedium">Cotizar ahora</button>
                    </a>
                </div>
            </div>
        )
    };

    const MyMasonry = (props) => {
        const containerRef = React.useRef(null);
        const [windowWidth, height] = useWindowSize()
        const { offset, width } = useContainerPosition(containerRef, [
            windowWidth,
            height,
        ]);
        const { scrollTop, isScrolling } = useScroller(offset);
        const positioner = usePositioner({ width, columnWidth: 300, columnGutter: 20 });

        return useMasonry({
            positioner,
            scrollTop,
            isScrolling,
            height,
            containerRef,
            resizeObserver: createResizeObserver(positioner, (updates) => { }),
            ...props,
        })
    }
    
    const goAutoPage = () => {
        history.push("/auto", {isScroll: true});
    }

    return (
        <>
            <Helmet>
                <title>Poolpo. Tu recomendado inteligente. En Poolpo te ayudamos a que ahorres plata y tiempo!</title>
            </Helmet>
            <div className="w-full bg-maingray">

                <Header />

                <div className="w-full bg-maingray md:bg-mainpink rounded-tl-2xl rounded-tr-2xl">

                    <div className="relative w-full mx-auto max-w-1296 px-0 sm:px-12 xl:px-24 1xl:px-32 pt-1">

                        <MenuBar />

                        <div className="pt-16 pb-2 z-10 hidden md:block">
                            <p className="text-2xl text-gray font-SpartanSemiBold">
                                ¿Te imaginás todo lo que<br /> podrías <span className="text-green font-SpartanExtraBold">ahorrar</span> por mes?
                            </p>
                        </div>

                        <div className="w-full z-10">
                            <MyMasonry items={offers} columnGutter={20} columnWidth={300} render={MasonryCard} />
                        </div>

                    </div>

                    <div className="relative w-full mx-auto max-w-1296 px-0 sm:px-12 xl:px-24 1xl:px-32 pt-1 pb-4 rounded-b-2xl xl:rounded-b-none">

                        <MarkView data={companies} />

                    </div>

                </div>

                <div className="w-full relative z-10">
                    <div className="w-full bg-maingray xl:bg-mainpink rounded-bl-2xl rounded-br-2xl" style={{ height: "328px" }}></div>
                    <div className="w-full bg-maingray" style={{ height: "200px" }}></div>
                    <div className="w-full bg-maingray xl:bg-transparent absolute top-10px md:top-50px">

                        <div className="w-full max-w-1296 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-gap-2 row-gap-2 justify-between mt-0 sm:mt-8 mx-auto px-4 sm:px-12 xl:px-24 1xl:px-32">

                            {products.map(item => (

                                item.imagePosition === "top" ?

                                    <a key={item.title} href={item.link}>
                                        <div className="max-w-352 bg-white p-3 sm:p-6 rounded-2xl shadow-lg mx-auto">
                                            <img src={!!item.image ? item.image.url : imagenotfound} alt="" className="w-full h-224 rounded-tr-2xl rounded-tl-2xl" />
                                            <div className={`relative w-full h-169 ${item.background === "blue" ? `bg-blue` : (item.background === "yellow" ? `bg-yellow` : `bg-pink1`)} py-1 text-center rounded-br-2xl rounded-bl-2xl`}>
                                                <img src={item.icon === "moto" ? frontmotor : (item.icon === "wifi" ? wifi : dollarsign)} alt="" className="mx-auto" />
                                                <p className={`${item.background === "blue" ? `text-blue1` : (item.background === "yellow" ? `text-yellow1` : `text-purple1`)} text-center text-lg sm:text-xl font-SpartanBold pb-3 leading-none`}>{item.title}</p>
                                                <div className="w-full absolute bottom-4">
                                                    <button className={`px-1 sm:px-10 py-1 sm:py-3 mx-4 text-base border ${item.background === "blue" ? `border-blue text-blue1` : (item.background === "yellow" ? `border-yellow text-yellow1` : `border-purple text-purple`)} rounded-md font-RobotoMedium leading-tight`}>{item.buttonText}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    :

                                    <a key={item.title} href={item.link}>
                                        <div className="max-w-352 bg-white p-3 sm:p-6 rounded-2xl shadow-lg mx-auto mt-8 md:mt-0">
                                            <div className={`relative w-full h-224 ${item.background === "blue" ? `bg-blue` : (item.background === "yellow" ? `bg-yellow` : `bg-pink1`)} py-4 text-center rounded-tr-2xl rounded-tl-2xl`}>
                                                <img src={item.icon === "moto" ? frontmotor : (item.icon === "wifi" ? wifi : dollarsign)} alt="" className="mx-auto mt-12" />
                                                <p className={`${item.background === "blue" ? `text-blue1` : (item.background === "yellow" ? `text-yellow1` : `text-purple1`)} text-center text-lg sm:text-xl font-SpartanBold pb-3 leading-none`}>{item.title}</p>
                                                <div className="w-full absolute bottom-4">
                                                    <button className={`px-1 sm:px-10 py-1 sm:py-3 mx-4 text-base border ${item.background === "blue" ? `border-blue text-blue1` : (item.background === "yellow" ? `border-yellow text-yellow1` : `border-purple text-purple`)} text-sm rounded-md font-RobotoMedium`}>{item.buttonText}</button>
                                                </div>
                                            </div>
                                            <img src={!!item.image ? item.image.url : imagenotfound} alt="" className="w-full h-169 rounded-br-2xl rounded-bl-2xl" />
                                        </div>
                                    </a>

                            ))}

                        </div>

                        <div className="w-full bg-maingray px-0 sm:px-12 py-2 block md:hidden">
                            <div className="bg-mainpink w-full flex justify-between items-center rounded-bl-2xl rounded-br-2xl sm:rounded-2xl px-2 sm:px-8 lg:px-24 py-2">
                                <p className="text-gray text-base sm:text-lg font-SpartanBold">¿Empezamos?</p>
                                <p className="px-1 sm:px-10 py-3 bg-purple rounded-md text-white font-RobotoMedium text-base shadow-lg cursor-pointer text-center" onClick={goAutoPage}>Cotizar ahora</p>
                            </div>
                        </div>

                        <div className="w-full bg-maingray">
                            <div className="w-full mx-auto max-w-1296 px-4 sm:px-12 xl:px-24 1xl:px-32 pt-4 sm:pt-16">
                                <p className="text-black text-lg sm:text-2xl font-SpartanBold pb-6">Ahorrá en seguros de auto</p>
                                <p className="text-gray1 text-base font-OpenSansRegular tracking-normal sm:tracking-wide">
                                    Creamos nuestro negocio pensando en vos. Estamos comprometidos a ofrecer el mejor servicio posible en el menor tiempo posible. Nos tomamos muy en serio tu satisfacción: el 95% de los usuarios recomendarían Poolpo a amigos o familiares.<br />
                                Sabemos que administrar tus finanzas no es algo en lo que quieras utilizar todo tu tiempo, por eso queremos hacer el trabajo duro por vos. Mejoramos constantemente nuestro servicio para agregar las pequeñas cosas que hacen que el uso de Poolpo  sea lo más rápido y fácil posible
                                Sabemos que el precio es importante para vos, después de todo, por eso estás comparando. Pero todos tienen necesidades diferentes, por lo que te vamos a ayudar a encontrar el producto adecuado, ya sea permitiéndote filtrar los resultados de búsqueda o recomendando lo que creemos que es la mejor alternativa para vos.
                            </p>
                            </div>
                        </div>

                        <div className="w-full bg-maingray">
                            <div className="block md:flex px-4 sm:px-12 xl:px-24 1xl:px-32 pt-12 pb-4 sm:pb-0 w-full mx-auto max-w-1296">
                                <div className="grid grid-cols-2">
                                    <div className="pr-8">
                                        <p className="text-gray1 text-base font-OpenSansBold">Seguros</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Seguros de Auto</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Seguros de Moto</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Seguros de Hogar</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Seguros de Mascota</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Seguros de Viaje</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Prepagas</p>
                                    </div>
                                    <div className="pr-8">
                                        <p className="text-gray1 text-base font-OpenSansBold">Tarjetas Prepagas</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Tarjeta de Crédito</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Préstamos personales</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Cripto</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-6 md:mt-0">
                                    <div className="pr-8">
                                        <p className="text-gray1 text-base font-OpenSansBold">Servicios </p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Telefonía Celular</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Internet</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">TV Cable</p>
                                        <p className="text-gray1 text-base font-OpenSansRegular tracking-wide">Garantías de Alquiler</p>
                                    </div>
                                    <div className="pr-8">
                                        <p className="text-gray1 text-base font-OpenSansBold">Finanzas</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-maingray">

                            <div className="w-full mx-auto max-w-1296 bg-maingray px-8 sm:px-12 xl:px-24 1xl:px-32 pt-2 hidden md:block">
                                <div className="bg-mainpink w-full flex justify-between items-center rounded-2xl px-8 lg:px-24 py-8 lg:py-10">
                                    <p className="text-gray text-xl font-SpartanBold">¿Empezamos? Compará y elegí tu seguro</p>
                                    <p className="px-10 py-3 bg-purple rounded-md text-white font-RobotoMedium text-base shadow-lg cursor-pointer" onClick={goAutoPage}>Cotizar ahora</p>
                                </div>
                            </div>

                        </div>

                        <Footer />

                    </div>
                </div>
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default Home;
