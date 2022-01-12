import React from 'react'

import blacklogo from '../../img/black-logo.png';
import footerimage1 from '../../img/footer-image-1.png';
import facebook from '../../img/facebook.png';
import instagram from '../../img/instagram.png';
import mobilefooter from '../../img/mobile-footer.png';
import threelinesside from '../../img/three-lines-side.png';


const Footer3 = () => {
    return (
        <>
            <div className="w-full bg-gray1 absolute bottom-0 z-20">

                <div className="hidden lg:block">
                    <div className="w-full max-w-1296 mx-auto bg-gray1 relative flex items-center lg:items-end justify-between px-4 sm:px-12 1xl:px-16 pb-3">

                        <div className="pb-10 pt-8 lg:pt-0">
                            <a href="/"><img src={blacklogo} alt="" className="mb-3" /></a>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/about-us">Nosotros</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/questions">Preguntas frecuentes</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/about-us?item=2">Prensa</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/contact">Contacto</a></p>
                            <p className="text-black1 font-OpenSansRegular py-1"><a href="/">Log in</a></p>
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
                    <div className="w-full bg-gray1 flex items-end justify-between pl-4 sm:pl-8">
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

            </div>
        </>
    )
}

export default Footer3;
