import React, { useState } from 'react'

import logo from '../../img/logo.png';
import cross from '../../img/cross.png';
import menu from '../../img/menu.png';
import MobileMenu from '../MobileMenu';


const HeaderWithoutContact = (props) => {

    const [menuitem, setMenuItem] = useState(0);

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full relative py-8 md:py-20 mx-auto max-w-1296">
            <div className="absolute top-0 w-full flex items-center justify-between py-8 px-4 sm:px-12 xl:px-24 1xl:px-32">
                <a href="/"><img src={logo} alt="logo" /></a>

                <div className="">
                    {open
                        ?
                        <img src={cross} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(false)} />
                        :
                        <img src={menu} alt="" className="block md:hidden cursor-pointer" onClick={() => setOpen(true)} />
                    }
                </div>

            </div>

            { open && <MobileMenu menuitem={menuitem} setMenuItem={item => setMenuItem(item)} /> }

        </div>
    )
}

export default HeaderWithoutContact;
