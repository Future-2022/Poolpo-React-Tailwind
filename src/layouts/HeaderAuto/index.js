import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

import logo from '../../img/logo.png';
import hero from '../../img/hero.png';
import cross from '../../img/cross.png';
import menu from '../../img/menu.png';
import MobileMenu from '../MobileMenu';


const HeaderAuto = (props) => {

    let location = useLocation();
    let history = useHistory();

    const [menuitem, setMenuItem] = useState(0);

    const [open, setOpen] = useState(false);

    const clickAuto = () => {
        if (location.pathname === "/auto") {
            props.clickEvent();
        } else {
            history.push("/auto", { isScroll: true });
        }
    }

    const clickMoto = () => {
        if (location.pathname === "/moto/home") {
            props.clickEvent();
        } else {
            history.push("/moto/home", { isScroll: true });
        }
    }

    return (
        <div className="w-full relative mx-auto max-w-1296">
            <div className="absolute top-0 w-full flex items-center justify-between py-8 px-4 sm:px-12 xl:px-24 1xl:px-32">
                <a href="/"><img src={logo} alt="logo" /></a>

                <div className="">
                    <a href="/contact"><span className="text-purple text-xl font-OpenSansRegular hidden md:block">Contacto</span></a>
                    {open
                        ?
                        <img src={cross} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(false)} />
                        :
                        <img src={menu} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(true)} />
                    }
                </div>

            </div>

            { open && <MobileMenu menuitem={menuitem} setMenuItem={item => setMenuItem(item)} />}

            <div className={`w-full flex items-center ${open ? `pt-8` : `pt-32`} pb-5 md:pb-24 lg:pb-4 lg:pt-12 xl:pt-0 px-4 sm:px-12 xl:px-24 1xl:px-32`}>
                <div className="max-w-auto lg:max-w-1/2">
                    <p className="text-2xl sm:text-4xl leading-snug font-SpartanBold text-black pt-4 md:pt-8 lg:pt-12 xl:pt-20">
                        Que tu guita rinda más
                    </p>
                    <p className="text-lg sm:text-xl font-OpenSansRegular text-gray leading-normal pt-2">
                        ¿Querés <span className="font-OpenSansBold">aumentar tus ahorros</span> por<br className="hidden lg:block" /> mes? Compará el mejor precio acá 👇 <br className="hidden lg:block" /> y ahorrá en todos los servicios
                    </p>
                    <div className="pt-8 pb-4 block sm:flex items-center">
                        <button className={`w-full sm:w-auto ${location.pathname === "/auto" ? `bg-purple text-white` : `border border-purple bg-white text-purple2`} font-RobotoMedium text-base px-15 py-4 rounded-xl`} onClick={clickAuto}>Auto</button>
                        <button className={`w-full sm:w-auto mt-4 sm:mt-0 ${location.pathname === "/moto/home" ? `bg-purple text-white` : `border border-purple bg-white text-purple2`} font-RobotoMedium text-base px-15 py-4 rounded-xl ml-0 sm:ml-6`} onClick={clickMoto}>Moto</button>
                    </div>
                </div>
                <div className="hidden lg:block max-w-1/2">
                    <img src={hero} alt="hero" className="mt-20 mb-4 ml-10" />
                </div>
            </div>
        </div>
    )
}

export default HeaderAuto;
