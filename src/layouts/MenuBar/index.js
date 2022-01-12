import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

import item1 from '../../img/item1.png';
import item2 from '../../img/item2.png';
import item3 from '../../img/item3.png';
import item4 from '../../img/item4.png';
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
import MenuBarItem from '../../components/MenuBarItem';


const MenuBar = (props) => {

    let location = useLocation();
    let history = useHistory();

    const [item, setItem] = useState(0);

    const goCryptoPage = () => {
        history.push("/crypto");
    }

    return (
        <div className="relative md:absolute w-full px-0 md:px-12 xl:px-24 1xl:px-32 py-6 z-10 md:top-minus100 md:right-0 hidden md:block mx-auto" {...props}>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-0">
                <div className="rounded-xl md:rounded-br-none md:rounded-tr-none md:rounded-bl-xl md:rounded-tl-xl shadow-lg mb-4 md:mb-0" onMouseEnter={() => setItem(1)} onMouseLeave={() => setItem(0)}>
                    <div className={`flex justify-center items-center md:block px-8 md:px-0 relative border-r-2 border-gray-100 ${(location.pathname === "/auto" || location.pathname === "/moto/home") ? `bg-selected` : `bg-white`} py-2 md:py-4 ${item === 1 ? `rounded-tl-xl rounded-tr-xl` : `rounded-xl`} rounded-tl-xl rounded-tr-xl md:rounded-br-none md:rounded-tr-none md:rounded-bl-xl md:rounded-tl-xl  hover:bg-gray-100 cursor-pointer`}>

                        <img src={item1} alt="item1" className="md:mx-auto h-12 pr-8" />
                        <div className="flex">
                            <p className="flex items-center mx-auto">
                                <span className="text-xl font-SpartanMedium text-black pr-4 md:pr-0">Seguros</span>
                                <img src={down} alt="down" className="" />
                            </p>
                        </div>

                    </div>

                    {item === 1 &&
                        <div className="rounded-xl relative md:absolute pt-0 md:pt-2">
                            <div className="block xl:flex">
                                <div className="px-2 pt-2 pb-0 bg-pink3 md:bg-white rounded-none md:rounded-tl-xl md:rounded-tr-xl xl:rounded-tr-none xl:rounded-tl-xl">
                                    <a href="/auto">
                                        <MenuBarItem image={sub1} title="Auto" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-0 xl:pt-2 pb-0 bg-pink3 md:bg-white rounded-none xl:rounded-tr-xl">
                                    <a href="/casa">
                                        <MenuBarItem image={sub2} title="Casa" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                            </div>
                            <div className="block xl:flex">
                                <div className="px-2 pt-0 pb-2 bg-pink3 md:bg-white rounded-br-xl rounded-bl-xl xl:rounded-bl-xl xl:rounded-br-none">
                                    <a href="/moto/home">
                                        <MenuBarItem image={sub3} title="Moto" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-0 pb-2 bg-white rounded-br-xl hidden xl:block">
                                    <div className="w-280 bg-white">
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className="rounded-xl md:rounded-br-none md:rounded-tr-none md:rounded-bl-xl md:rounded-tl-xl shadow-lg mb-4 md:mb-0" onMouseEnter={() => setItem(2)} onMouseLeave={() => setItem(0)}>
                    <div className={`flex justify-center items-center md:block px-8 md:px-0 relative border-r-2 border-gray-100 bg-white py-2 md:py-4 ${item === 2 ? `rounded-tl-xl rounded-tr-xl` : `rounded-xl`} rounded-tl-xl rounded-tr-xl md:rounded-none  hover:bg-gray-100 cursor-pointer`} onClick={() => setItem(item === 2 ? 0 : 2)}>

                        <img src={item2} alt="item1" className="md:mx-auto h-12 pr-8" />
                        <div className="flex">
                            <p className="flex items-center mx-auto">
                                <span className="text-xl font-SpartanMedium text-black pr-10 md:pr-0">Servicios</span>
                                <img src={down} alt="down" className="" />
                            </p>
                        </div>

                    </div>

                    {item === 2 &&
                        <div className="rounded-xl relative md:absolute pt-0 md:pt-2">
                            <div className="block xl:flex">
                                <div className="px-2 pt-2 pb-0 bg-pink3 md:bg-white rounded-none md:rounded-tl-xl md:rounded-tr-xl xl:rounded-tl-xl xl:rounded-tr-none">
                                    <a href="/hogar/telephone">
                                        <MenuBarItem image={subphone} title="Telefonía" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-2 pb-0 bg-pink3 md:bg-white rounded-none xl:rounded-tr-xl">
                                    <a href="/hogar/tv">
                                        <MenuBarItem image={subtv} title="TV" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                            </div>
                            <div className="block xl:flex">
                                <div className="px-2 pt-0 pb-0 bg-pink3 md:bg-white rounded-none xl:rounded-bl-xl">
                                    <a href="/hogar/internet">
                                        <MenuBarItem image={subinternet} title="Internet" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-0 pb-2 bg-pink3 md:bg-white rounded-bl-xl rounded-br-xl xl:rounded-br-xl xl:rounded-bl-none">
                                    <a href="/hogar/guarantee">
                                        <MenuBarItem image={subkey} title="Garantía de alquiler" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className="rounded-xl md:rounded-br-none md:rounded-tr-none md:rounded-bl-xl md:rounded-tl-xl shadow-lg mb-4 md:mb-0" onMouseEnter={() => setItem(3)} onMouseLeave={() => setItem(0)}>

                    <div className={`flex justify-center items-center md:block px-8 md:px-0 relative border-r-2 border-gray-100 bg-white py-2 md:py-4 ${item === 3 ? `rounded-tl-xl rounded-tr-xl` : `rounded-xl`} rounded-tl-xl rounded-tr-xl md:rounded-none hover:bg-gray-100 cursor-pointer`} onClick={() => setItem(item === 3 ? 0 : 3)}>
                        <img src={item3} alt="item1" className="md:mx-auto h-12 pr-8" />
                        <div className="flex">
                            <p className="flex items-center mx-auto">
                                <span className="text-xl font-SpartanMedium text-black pr-8 md:pr-0">Bancos</span>
                                <img src={down} alt="down" className="" />
                            </p>
                        </div>

                    </div>
                    {item === 3 &&
                        <div className="rounded-xl relative md:absolute pt-0 md:pt-2">
                            <div className="block xl:flex">
                                <div className="px-2 pt-2 pb-0 bg-pink3 md:bg-white rounded-none md:rounded-tl-xl md:rounded-tr-xl xl:rounded-tl-xl xl:rounded-tr-none">
                                    <a href="/bancos/credit-card">
                                        <MenuBarItem image={subcard} title="Tarjeta de crédito" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-2 pb-0 bg-pink3 md:bg-white rounded-none xl:rounded-tr-xl">
                                    <a href="/bancos/we-loan">
                                        <MenuBarItem image={subhanddollar} title="Préstamos" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                            </div>
                            <div className="block 1xl:flex rounded-br-xl">
                                <div className="px-2 pt-0 pb-2 bg-pink3 md:bg-white rounded-br-xl rounded-bl-xl xl:rounded-bl-xl 1xl:rounded-br-none">
                                    <a href="/bancos/prepaid-card">
                                        <MenuBarItem image={subinternet} title="Tarjeta prepaga" content="Conseguí un 15% de descuento en tu seguro de auto." />
                                    </a>
                                </div>
                                <div className="px-2 pt-0 pb-2 bg-white rounded-br-xl hidden 1xl:block">
                                    <div className="w-280 bg-white">
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="flex justify-center items-center md:block px-8 md:px-0 bg-white p2-4 md:py-4 rounded-xl md:rounded-bl-none md:rounded-tl-none md:rounded-br-xl md:rounded-tr-xl mb-4 md:mb-0 shadow-lg hover:bg-gray-100 cursor-pointer" onClick={goCryptoPage}>

                    <img src={item4} alt="item1" className="md:mx-auto h-12 pr-8 md:pr-0" />
                    <div className="flex">
                        <p className="flex items-center mx-auto">
                            <span className="text-xl font-SpartanMedium text-black pr-20 md:pr-0">Crypto</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default MenuBar;
