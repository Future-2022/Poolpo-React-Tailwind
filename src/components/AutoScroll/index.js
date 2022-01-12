import React, { useState } from 'react'

import autoleft from '../../img/auto-left.png';
import autoright from '../../img/auto-right.png';
import transparent from '../../img/transparent.png';
import dotrounded from '../../img/dot-rounded.png';
import dot from '../../img/dot.png';
import left from '../../img/chevron-left.png';
import right from '../../img/chevron-right.png';

import motorcycle from '../../img/motorcycle-big.png';



const AutoScroll = (props) => {

    const [index, setIndex] = useState(0);

    return (
        <>
            <img src={props.list[index].image && props.list[index].image.length >= 0 ? props.list[index].image[0].url : motorcycle } alt="moto" className="w-full max-w-400 md:max-w-1/2 object-contain mx-auto" />

            <div className="flex items-center max-w-352 md:max-w-none mx-auto pt-8 md:pt-0">
                <div>
                    <div className="lg:flex items-center pl-2 md:pl-5 pr-2 lg:pl-0 lg:pr-0">
                        {index !== 0 ?
                            <img src={autoleft} alt="left" className="ml-4 xl:ml-6 mr-4 xl:mr-8 cursor-pointer hidden lg:block" onClick={() => setIndex(index - 1 <= 0 ? 0 : index - 1)} />
                            :
                            <img src={transparent} alt="left" className="ml-4 xl:ml-6 mr-4 xl:mr-8 hidden lg:block" />
                        }
                        <div className={`h-full rounded-2xl shadow-xl ${props.list[index].labelColor === "yellow" ? `bg-yellow` : (props.list[index].labelColor === "pink" ? `bg-pink7` : `bg-green5`)} p-6 lg:p-8`}>
                            <div className={`w-56 h-56 rounded-full flex items-center ${props.list[index].labelColor === "yellow" ? `bg-yellow1` : (props.list[index].labelColor === "pink" ? `bg-pink12` : `bg-green6`)}`}>
                                <div className="flex mx-auto">
                                    {props.list[index].icon && <ion-icon name={props.list[index].icon} size="large"></ion-icon>}
                                </div>
                            </div>
                            <p className={`${props.list[index].labelColor === "yellow" ? `text-yellow1` : (props.list[index].labelColor === "pink" ? `text-purple3` : `text-green5`)} font-SpartanSemiBold text-2xl text-center pt-6 pb-5`}>{props.list[index].title}</p>
                            <p className="text-gray font-OpenSansRegular pb-10 leading-loose" style={{ minHeight: "130px" }}>
                                {props.list[index].description}
                            </p>
                            <div className="w-full text-center">
                                <button className={`border rounded-md ${props.list[index].labelColor === "yellow" ? `border-yellow text-yellow1` : (props.list[index].labelColor === "pink" ? `border-purple5 text-purple3` : `border-green1 text-green5`)} font-RobotoMedium px-8 lg:px-15 py-3`}>Ver más</button>
                            </div>
                        </div>
                        {index !== props.list.length - 1 ?
                            <img src={autoright} alt="right" className="ml-4 xl:ml-8 cursor-pointer hidden lg:block" onClick={() => setIndex(index + 1 >= props.list.length ? props.list.length - 1 : index + 1)} />
                            :
                            <img src={transparent} alt="right" className="ml-4 xl:ml-8 hidden lg:block" />
                        }
                    </div>
                    <div className="block lg:hidden">
                        <div className="w-full flex pt-6">
                            <div className="flex items-center mx-auto">
                                <img src={left} alt="left" className="cursor-pointer" onClick={() => setIndex(index - 1 <= 0 ? 0 : index - 1)} />
                                {Array(props.list.length).fill(0).map((item, i) => (
                                    <img key={i} alt={i} src={index === i ? dotrounded : dot} className="mx-2 cursor-pointer" onClick={() => setIndex(i)} />
                                ))}
                                <img src={right} alt="right" className="cursor-pointer" onClick={() => setIndex(index + 1 >= props.list.length ? props.list.length - 1 : index + 1)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AutoScroll;
