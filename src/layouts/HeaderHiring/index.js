import React, { useState } from 'react'

import logo from '../../img/logo.png';
import cross from '../../img/cross.png';
import menu from '../../img/menu.png';
import MobileMenu from '../MobileMenu';
import { insurerLogo } from '../../services/utils';


const HeaderHiring = (props) => {

    const [menuitem, setMenuItem] = useState(0);

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full relative">
            <div className="absolute top-0 w-full flex items-center justify-between py-8 px-4 sm:px-12 xl:px-24 1xl:px-32">
                <a href="/"><img src={logo} alt="logo" /></a>

                <div className="">
                    {props.quotationitem && !!props.logoID &&
                        <img src={insurerLogo(props.logoID)} alt="quotation" className="w-12 h-10 mt-2 mb-1 hidden md:block" />
                    }
                    {open
                        ?
                        <img src={cross} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(false)} />
                        :
                        <img src={menu} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(true)} />
                    }
                </div>

            </div>
            
            { open && <MobileMenu menuitem={menuitem} setMenuItem={item => setMenuItem(item)} /> }

            <div className={`w-full ${props.children ? `pb-12` : `pb-4`} ${open ? `pt-8` : `pt-32`} px-4 sm:px-12 xl:px-24 1xl:px-32`}>
                {props.children}
            </div>
        </div>
    )
}

export default HeaderHiring;
