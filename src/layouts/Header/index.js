import React, { useState } from 'react'

import logo from '../../img/logo.png';
import hero from '../../img/hero.png';
import cross from '../../img/cross.png';
import menu from '../../img/menu.png';
import MobileMenu from '../MobileMenu';


const Header = () => {

    const [menuitem, setMenuItem] = useState(0);

    const [open, setOpen] = useState(false);

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
            
            { open && <MobileMenu menuitem={menuitem} setMenuItem={item => setMenuItem(item)} /> }

            <div className={`w-full flex items-center ${open ? `pt-8` : `pt-32`} pb-5 md:pb-24 lg:pb-8 lg:pt-12 xl:pt-0 px-4 sm:px-12 xl:px-24 1xl:px-32`}>
                <div className="max-w-auto lg:max-w-1/2">
                    <p className="text-2xl sm:text-4xl leading-snug font-SpartanBold text-black pt-6">
                        Tu recomendador inteligente
                    </p>
                    <p className="text-lg sm:text-xl font-OpenSansRegular text-gray leading-normal pt-2">
                        ¿Querés <span className="font-OpenSansBold">aumentar tus ahorros</span> por<br className="hidden lg:block" /> mes? Compará y conseguí tus servicios<br className="hidden lg:block" /> al mejor precio <span className="font-OpenSansBold">acá</span> 👇
                    </p>
                </div>
                <div className="hidden lg:block max-w-1/2">
                    <img src={hero} alt="hero" className="mt-20 mb-12 ml-10" />
                </div>
            </div>
        </div>
    )
}

export default Header;
