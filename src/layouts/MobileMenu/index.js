import React from 'react'

import item1 from '../../img/item1.png';
import item2 from '../../img/item2.png';
import item3 from '../../img/item3.png';
import item4 from '../../img/item4.png';
import up from '../../img/up.png';
import down from '../../img/down.png';
import sub1 from '../../img/sub1.png';
import sub2 from '../../img/sub2.png';
import sub3 from '../../img/sub3.png';
import subphone from '../../img/sub-phone.png';
import subtv from '../../img/sub-tv.png';
import subinternet from '../../img/sub-internet.png';
import subkey from '../../img/sub-key.png';
import subcard from '../../img/sub-card.png';
import subhanddollar from '../../img/sub-handdollar.png';


const MobileMenu = (props) => {
    return (
        <div className="block md:hidden">
            <div className="w-full bg-maingray grid grid-cols-1 gap-0 pt-24 sm:pt-32">

                <div className="bg-maingray hover:bg-white">
                    <div className={`flex justify-between items-center relative border-r-2 border-gray-100 py-4 px-4 sm:px-12 xl:px-24 1xl:px-32 cursor-pointer`} onClick={() => props.setMenuItem(props.menuitem === 1 ? 0 : 1)}>

                        <div className="flex items-center">
                            <img src={item1} alt="item1" className="pr-6" />
                            <span className="text-xl font-SpartanMedium pr-4">Seguros</span>
                        </div>
                        <img src={props.menuitem === 1 ? up : down} alt="down" className="" />

                    </div>

                    {props.menuitem === 1 &&
                        <div className="">
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/auto">
                                        <div className="w-auto p-3 relative">
                                            <img src={sub1} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Auto</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/casa">
                                        <div className="w-auto p-3 relative">
                                            <img src={sub2} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Casa</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/moto/home">
                                        <div className="w-auto p-3 relative">
                                            <img src={sub3} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Moto</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento<br className="hidden md:block" /> en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className="bg-maingray hover:bg-white">
                    <div className={`flex justify-between items-center relative border-r-2 border-gray-100 py-4 px-4 sm:px-12 xl:px-24 1xl:px-32 cursor-pointer`} onClick={() => props.setMenuItem(props.menuitem === 2 ? 0 : 2)}>

                        <div className="flex items-center">
                            <img src={item2} alt="item1" className="pr-6" />
                            <span className="text-xl font-SpartanMedium pr-4">Servicios</span>
                        </div>
                        <img src={props.menuitem === 2 ? up : down} alt="down" className="" />

                    </div>

                    {props.menuitem === 2 &&
                        <div className="relative">
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/hogar/telephone">
                                        <div className="w-auto p-3 relative">
                                            <img src={subphone} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Telefonía</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/hogar/tv">
                                        <div className="w-auto p-3 relative">
                                            <img src={subtv} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">TV</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/hogar/internet">
                                        <div className="w-auto p-3 relative">
                                            <img src={subinternet} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Internet</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/hogar/guarantee">
                                        <div className="w-auto p-3 relative">
                                            <img src={subkey} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Garantía de alquiler</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className="bg-maingray hover:bg-white">

                    <div className={`flex justify-between items-center border-r-2 border-gray-100 py-4 px-4 sm:px-12 xl:px-24 1xl:px-32 cursor-pointer`} onClick={() => props.setMenuItem(props.menuitem === 3 ? 0 : 3)}>

                        <div className="flex items-center">
                            <img src={item3} alt="item1" className="pr-6" />
                            <span className="text-xl font-SpartanMedium pr-4">Bancos</span>
                        </div>
                        <img src={props.menuitem === 3 ? up : down} alt="down" className="" />

                    </div>
                    {props.menuitem === 3 &&
                        <div className="relative">
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/bancos/credit-card">
                                        <div className="w-auto p-3 relative">
                                            <img src={subcard} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Tarjeta de crédito</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/bancos/we-loan">
                                        <div className="w-auto p-3 relative">
                                            <img src={subhanddollar} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Préstamos</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="block 1xl:flex">
                                <div className="px-4 py-1 bg-pink3 hover:bg-mainpink cursor-pointer">
                                    <a href="/bancos/prepaid-card">
                                        <div className="w-auto p-3 relative">
                                            <img src={subinternet} alt="" className="w-12 h-12 absolute top-4 left-4" />
                                            <div className="w-auto pl-16">
                                                <p className="text-black text-base font-SpartanMedium">Tarjeta prepaga</p>
                                                <p className="text-black2 text-base font-OpenSansRegular">Conseguí un 15% de descuento<br /> en tu seguro de auto.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="bg-maingray hover:bg-white">
                    <a href="/crypto">
                        <div className="flex justify-between items-center py-4 px-4 sm:px-12 xl:px-24 1xl:px-32 cursor-pointer">
                            <div className="flex items-center">
                                <img src={item4} alt="item1" className="pr-6" />
                                <span className="text-xl font-SpartanMedium pr-4 md:pr-0">Crypto</span>
                            </div>
                            <div></div>
                        </div>
                    </a>
                </div>

                <div className="bg-maingray hover:bg-white">

                    <div className="flex justify-between items-center py-6 px-4 sm:px-12 xl:px-24 1xl:px-32 cursor-pointer">

                        <div className="flex items-center">
                            <a href="/contact"><span className="text-xl text-purple font-OpenSansRegular pr-4 md:pr-0">Contacto</span></a>
                        </div>
                        <div></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MobileMenu;
