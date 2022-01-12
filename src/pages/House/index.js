import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import HouseHeader from '../../layouts/HouseHeader';
import MenuBar from '../../layouts/MenuBar';
import SlideShow from '../../components/SlideShow';
import MarkView from '../../components/MarkView';
import './index.css';
import { apiGetHomeData, apiGetHomeOffers, apiGetMotoQuestions } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ChargingModal from '../../components/LoadingModal/ChargingModal';
import { useHistory } from 'react-router';
import vector from '../../img/vector.png';

import image2 from '../../img/image2.png';
import image3 from '../../img/image1.png';
import image4 from '../../img/image4.png';
import image5 from '../../img/image3.png';
import subimage from '../../img/subtitle.jpg';
import house_back from '../../img/house_back1.png';
import home_back2 from '../../img/home_back2.png';
import home_back3 from '../../img/home_back3.png';

import icon1 from '../../img/icon1.png';
import icon2 from '../../img/icon2.png';
import icon3 from '../../img/icon3.png';
import icon4 from '../../img/icon4.png';


import Question from '../../components/Question';
import ItemsCarousel from 'react-items-carousel';
import MenuBarTemp from '../../layouts/MenuBar/MenuBarTemp';



const House = (props) => {

    let history = useHistory();

    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [offers, setOffers] = useState([]);

    const [cardWidth, setCardWidth] = useState(1000);

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [questions, setQuestions] = useState([]);
    
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

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

        apiGetMotoQuestions()
            .then(res => {
                console.log("res-----", res);
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("err-----", err);
                setLoading(false);
            });

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
                        <button className="px-10 py-3 text-base border border-purple rounded-md text-purple font-RobotoMedium">Quiero mi garantía</button>
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

                <HouseHeader />

                <div className="w-full bg-maingray md:bg-mainpink rounded-tl-2xl rounded-tr-2xl">

                    <div className="relative w-full mx-auto max-w-1296 px-0 sm:px-12 xl:px-24 1xl:px-32 pt-1">

                        <MenuBarTemp />  
                    
                        <div className="w-full z-10 pt-15">
                            <div className="flex items-center pb-6 p-3">
                                <span className="text-lg text-purple font-OpenSansRegular">Incio</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansRegular">Hogar</span>
                                <img src={vector} alt="" className="mx-3" />
                                <span className="text-lg text-purple font-OpenSansBold">Garantía de alquiler</span>
                            </div>
                            
                            <div className="flex pt-6 items-center pb-8">
                                <div className='hidden lg:block'>
                                    <img src={home_back2} width={700} height={500} className='rounded-xl'/>
                                </div>
                                <div className='p-3 sm:pl-10'>
                                    <p className='text-lg text-gray font-OpenSansBold'>obtené tu garantía de alquiler</p>
                                    <h1 className='text-2xl text-gray sm:text-4xl font-OpenSansBold'>
                                        Ahora podés hacerlo 100% online, <span className='text-green'>fácil y rápido.</span> 
                                    </h1>
                                    <p className='text-lg text-gray'>
                                        Encontrá la mejor garantía para vos y tu hogar simplemente tenes que completar algunos datos :)
                                    </p>
                                    <div className='d-flex justify-between pt-4 text-center sm:text-left'>
                                        <Link to='/house/steps'><button className="px-3 sm:px-12 py-4 bg-purple text-white rounded-md shadow-lg w-100 sm:w-50">Quiero mi garantía</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='mx-auto relative w-full sm:w-1120 h-400px'>
                    <div className='flex absolute z-30 top-36 right-36 mx-auto px-6 pt-5'>
                        <div className='grow pr-0 sm:pr-8 pt-6 w-100 sm:w-50'>
                            <div>
                                <div className='text-2xl sm:text-3xl text-gray font-OpenSansBold'>Sólo relajate.</div>
                                <div><p>Te ofrecemos la mejor opción para garantizar tu alquiler y tranquilidad.</p></div>
                            </div>
                            <div className='flex pt-8'>
                                <div className='flex flex-col'>
                                    <div className='text-gray text-sm sm:text-base pr-2 sm:pr-8'><img src={icon1} width={30} /><span className='font-OpenSansBold'>Alquilá </span>en sólo tres pasos kol.</div>
                                    <div className='text-gray text-sm sm:text-base pr-2 sm:pr-8 pt-5'><img src={icon2} width={30} /><span className='font-OpenSansBold'>Elegí </span>la mejor opción para vos.</div>                                    
                                </div>
                                <div className='flex flex-col'>
                                <div className='text-gray text-sm sm:text-base pr-2 sm:pr-8'><img src={icon3} width={30} /><span className='font-OpenSansBold'>Compará </span>las diferentes garatías</div>
                                    <div className='text-gray text-sm sm:text-base pr-2 sm:pr-8 pt-5'><img src={icon4} width={30} /><span className='font-OpenSansBold'>Contratá </span>sin moverte de tu casa.</div>
                                </div>
                            </div>
                        </div>
                        <div className='grow-[3] z-10 w-50 hidden md:block'>
                            <img src={home_back3} width={400} className="m-auto hidden md:block"/>
                        </div>
                    </div>
                </div>

                <div className='bg-mainpink pt-3 sm:pt-32 mt-5'>
                    <div className='w-full px-5 sm:px-0 flex flex-col sm:flex-row justify-between'>
                        <div className='w-full text-left sm:text-right'>
                            <div className='w-100 sm:w-50' style={{display:"inline-block"}}>
                                <div><p className="font-OpenSansBold text-gray text-left">TE PUEDE INTERESAR</p></div>
                                <div className='text-2xl sm:text-3xl text-gray font-OpenSansBold text-left'>Seguridad al <br/>100%</div>
                                <div className='pt-5 text-left'>
                                    {/* <i className="fas fa-circle-arrow-left text-2xl text-gray-disable"></i>   
                                    <i className="fas fa-circle-arrow-right text-2xl text-gray pl-3"></i>  */}
                                </div>  
                            </div>                      
                        </div>
                        <div className='gradient-layout'></div>
                        <div className='max-w-932 pl-18'>
                            <ItemsCarousel
                                requestToChangeActive={setActiveItemIndex}
                                activeItemIndex={activeItemIndex}
                                numberOfCards={3}
                                gutter={20}
                                leftChevron={<i className="fas fa-circle-arrow-left text-2xl text-gray r-1000 sm:r-110" style={{position: 'absolute', top:'60%', transform: 'translate(-50%,-50%)'}}></i>}
                                rightChevron={<i className="fas fa-circle-arrow-right text-2xl text-gray pl-3 r-3000 sm:r-520" style={{position: 'absolute', top:'60%', transform: 'translate(-50%,-50%)'}}></i> }
                                outsideChevron
                                chevronWidth={chevronWidth}
                            >
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-md shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-md rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image2} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>Seguro de auto</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-md shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-md rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image4} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>categoria</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-md shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-md rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image5} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>Seguro de auto</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-2xl shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-2xl rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image2} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>Seguro de auto</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-md shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-md rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image5} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>Seguro de auto</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                                <div>                               
                                    <div className="max-w-352 bg-white rounded-2xl shadow-lg mx-auto">
                                        <div className='relative text-gray w-full h-240 rounded-2xl rounded-tr-2xl rounded-tl-2xl'>
                                            <div className='cropped rounded-t-md mx-auto mb-2'><img src={image2} className="rounded-t-md mx-auto mb-2"/></div>
                                            <p className={`text-lg sm:text-base font-OpenSansBold p-1 px-4 leading-none`}>Seguro de auto</p>
                                            <p className={`text-base sm:text-lg p-2 px-4 leading-none`}>Nombre del producto</p>
                                            <p className={`text-lg sm:text-xl p-2 px-4 leading-none`}>Desde $240 /mes</p>
                                        </div>
                                    </div>
                                </div>
                            </ItemsCarousel>
                        </div>
                    </div>
                </div>                

                <div className='bg-mainpink pt-5 sm:pt-0'>
                    <div className='mx-3 sm:mx-auto relative w-1120'>
                        <div className='w-full relative z-10 overflow-hidden md:pt-50px'>
                            <img src={house_back} className='w-100 mx-auto rounded-xl'/>
                            <div style={{position:'absolute', left:40, bottom:80}}>
                                <div className='text-2xl sm:text-3xl text-white font-OpenSansBold'>La garantía de cumplir tu sueño.</div>
                                <div><p className='text-white'>Alquilá con la tranquilidad que necesitás. <br/>Ahora 100% online, rápido y seguro.</p></div>
                            </div>                            
                        </div>                        
                    </div>
                </div>

                <div className="w-full bg-maingray relative z-10 overflow-hidden">

                    <div className="w-full bg-maingray xl:bg-transparent z-10 pt-10px">

                        <div className="w-full max-w-1296 mx-auto pb-15">
                            
                            <p className="font-SpartanSemiBold text-lg sm:text-2xl text-gray text-center pt-8 pb-4 z-10">¿Alguna duda?</p>
                            <div className="px-0 sm:px-12 xl:px-24 1xl:px-32 z-10">
                                <div className="rounded-2xl bg-white px-4 sm:px-12 xl:px-16 py-2 shadow-lg">
                                    {questions.map((question, index) => (
                                        <Question
                                            key={question.id}
                                            title={question.title}
                                            description={question.description}
                                            hr={index !== questions.length - 1}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        <Footer />

                    </div>

                    <div className="w-full bg-maingray xl:bg-mainpink rounded-bl-2xl rounded-br-2xl absolute top-0 z-minus10" style={{ height: "378px" }}></div>
                    <div className="w-full bg-maingray h-screen absolute z-minus10" style={{ top: "378px" }}></div>

                </div>
                {loading && <ChargingModal />}
            </div>
        </>
    )
}

export default House;
