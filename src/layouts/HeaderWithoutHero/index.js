import React, { useState } from 'react'

import logo from '../../img/logo.png';
import cross from '../../img/cross.png';
import menu from '../../img/menu.png';
import rocket from '../../img/rocket.png';
import MobileMenu from '../MobileMenu';


const HeaderWithoutHero = (props) => {

    const [menuitem, setMenuItem] = useState(0);

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-1296 mx-auto relative">
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

            <div className={`w-full pb-5 md:pb-24 lg:pb-24 ${open ? `pt-8` : `pt-32`} px-4 sm:px-12 xl:px-24 1xl:px-32`}>
                <p className="text-2xl sm:text-3xl font-SpartanBold text-black text-left md:text-center pb-12 md:pb-0">
                    Las mejores ofertas para tu<br className="block" />
                    <span className="text-purple4 px-0 md:px-2">
                        {props.name}
                    </span>
                </p>
                <p className="text-xl font-OpenSansRegular text-gray text-center pt-5 hidden md:block">
                    {props.leadName}, estas son las
                    <span className="font-OpenSansBold"> mejores cotizaciones </span>
                    que detectamos
                </p>
                <div className="hidden md:block">
                    <div className="flex w-full">
                        <p className="flex text-xl font-OpenSansRegular text-gray text-center mx-auto">
                            gracias a nuestra
                        <span className="font-OpenSansBold px-1"> inteligencia artificial, </span>
                        ¡aprovechalas!‍ <img src={rocket} className="w-6 ml-2" alt="rocket" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderWithoutHero;
