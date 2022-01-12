import React from 'react'

import logo from '../../img/logo.png';
import hero from '../../img/coming-hero.png';
import round from '../../img/coming-round.png';
import threelines from '../../img/coming-threelines.png';
import Footer3 from '../../layouts/Footer3';


const ComingSoon = () => {
    return (
        <div className="w-full relative bg-gray1" style={{ minHeight: "100vh" }}>
            <div className="w-full bg-gray1 relative mx-auto max-w-1296" style={{ paddingBottom: "350px" }}>
                <img src={round} alt="round" className="absolute left-0 top-minus100 max-w-1/2 z-10 hidden sm:block" />
                <img src={threelines} alt="threelines" className="absolute right-0 top-0 z-20" />
                <div className="absolute top-0 w-full flex items-center justify-between py-8 px-8 sm:px-12 xl:px-24 1xl:px-32 z-20">
                    <a href="/"><img src={logo} alt="logo" /></a>
                </div>

                <div className="hidden sm:block">
                    <div className="w-full relative flex items-center pt-8 pb-5 md:pb-24 lg:pb-8 lg:pt-12 xl:pt-0 px-4 sm:px-12 xl:px-24 1xl:px-32">
                        <div className="max-w-auto lg:max-w-1/2 relative z-20">
                            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-snug font-SpartanBold text-black pt-20">
                                Próximamente.....
                            </p>
                            <p className="text-lg sm:text-xl font-OpenSansRegular text-gray leading-normal pt-4">
                                Bancanos :) Pronto vas a tener muchas<br />
                                novedades que te van a encantar
                            </p>
                            <a href="/">
                                <button className="text-white mt-10 px-15 py-4 text-lg font-RobotoMedium rounded-md bg-purple">Ir al inicio</button>
                            </a>
                        </div>
                        <div className="max-w-1/2">
                            <img src={hero} alt="hero" className="mt-20 mb-12 ml-10" />
                        </div>
                    </div>
                </div>

                <img src={round} alt="round" className="max-w-3/4 relative z-10 block sm:hidden" style={{ top: "-40px" }} />

                <div className="block sm:hidden">
                    <div className="w-full relative pt-8 pb-5 px-4">
                        <img src={hero} alt="hero" className="" style={{ marginTop: "-35px" }} />
                        <p className="text-2xl lg:text-5xl leading-snug font-SpartanBold text-black">
                            Próximamente.....
                        </p>
                        <p className="text-lg sm:text-xl font-OpenSansRegular text-gray leading-normal pt-4">
                            Bancanos :) Pronto vas a tener muchas
                            novedades que te van a encantar
                        </p>
                        <a href="/">
                            <button className="text-white mt-6 sm:mt-10 px-4 sm:px-12 py-4 text-lg font-RobotoMedium rounded-md bg-purple">Ir al inicio</button>
                        </a>
                    </div>
                </div>

            </div>
            <Footer3 />
        </div>
    )
}

export default ComingSoon;
