import React from 'react'

import blacklogo from '../../img/black-logo.png';
import footerimage1 from '../../img/footer-image-1.png';
import facebook from '../../img/facebook.png';
import instagram from '../../img/instagram.png';
import mobilefooter from '../../img/mobile-footer.png';


const Footer1 = () => {
    return (
        <>
            <div className="w-full bg-maingray hidden lg:block">
                <div className="w-full mx-auto max-w-1296 bg-maingray flex items-center lg:items-end justify-between px-4 sm:px-12 xl:px-24 1xl:px-32 pb-3">
                    <div className="pb-10 pt-8 lg:pt-0">
                        <a href="/"><img src={blacklogo} alt="" className="mb-3" /></a>
                        <p className="text-black1 font-OpenSansRegular py-1"><a href="/about-us">Nosotros</a></p>
                        <p className="text-black1 font-OpenSansRegular py-1"><a href="/questions">Preguntas frecuentes</a></p>
                        <p className="text-black1 font-OpenSansRegular py-1"><a href="/about-us?item=2">Prensa</a></p>
                        <p className="text-black1 font-OpenSansRegular py-1"><a href="/contact">Contacto</a></p>
                    </div>
                    <img src={footerimage1} alt="" className="hidden lg:block" style={{ width: "650px" }} />
                    <div className="pb-10">
                        <div className="w-full flex justify-between items-center px-1">
                            <img src={facebook} alt="" className="mr-3" />
                            <img src={instagram} alt="" />
                        </div>
                        <p className="text-black1 font-OpenSansRegular pt-6">© Copyright Poolpo</p>
                    </div>

                </div>
            </div>

            <div className="block lg:hidden">
                <div className="w-full bg-maingray flex items-end justify-between pl-4 sm:pl-8">
                    <div className="py-8">
                        <div className="pb-4 lg:pt-0">
                            <a href="/"><img src={blacklogo} alt="" className="mb-3" /></a>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/about-us">Nosotros</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/contact">Contacto</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/questions">Preguntas frecuentes</a></p>
                        </div>
                        <div className="">
                            <div className="flex items-center">
                                <img src={facebook} alt="" className="mr-3" />
                                <img src={instagram} alt="" />
                            </div>
                            <p className="text-black1 font-OpenSansRegular pt-6">© Copyright Poolpo</p>
                        </div>
                    </div>
                    <img src={mobilefooter} className="h-full" alt="" />
                </div>
            </div>
        </>
    )
}

export default Footer1;
