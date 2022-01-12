import React, { useState, useEffect } from 'react'
import Slider from "react-slick";

import dotrounded from '../../img/dot-rounded.png';
import dot from '../../img/dot.png';
import hero from '../../img/hero.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuotationSelect from '../QuotationSelect';


const SlideShowCarousel = (props) => {

    const [peritem, setPerItem] = useState(props.quotes.length > 3 ? 3 : props.quotes.length);

    const [index, setIndex] = useState(0);

    const [screenWidth, setScreenWidth] = useState(0);

    const [arrow, setArrow] = useState(true);

    var settings = {
        arrows: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        customPaging: function (i) {
            return (
                <a>
                    {i === index ?
                        <img src={dotrounded} alt="current" className="mt-3" />
                        :
                        <img src={dot} alt="others" className="mt-3" />
                    }
                </a>
            )
        },
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    arrows: false
                }
            }
        ]
    };

    useEffect(() => {

        updatePerItem();
        window.addEventListener("resize", updatePerItem);

    }, []);

    const updatePerItem = () => {

        var width = window.innerWidth;
        if (screenWidth !== width) {
            setScreenWidth(width);
            setIndex(0);
            var item = 3;
            if (width >= 1440) { item = 3; }
            if (width >= 1196 && width < 1440) { item = 3; }
            if (width >= 830 && width < 1196) { item = 2; }
            if (width < 830) { item = 1; }
            setPerItem(item > props.quotes.length ? props.quotes.length : item);
        }

        setArrow(width >= 450);

    }

    const afterChange = (i) => {
        setIndex(i);
    }

    return (
        <>
            {props.quotes.length !== 1 ?
                <div className="mb-8 relative">
                    <div className="bg-maingray w-full h-10 absolute top-0"></div>
                    <div className={`${peritem === 2 ? `max-w-1000` : ``} ${peritem === 3 ? `max-w-1296` : ``} mx-auto ${arrow ? `px-8` : `px-4`} sm:px-12 xl:px-24 1xl:px-32`}>
                        <Slider {...settings} slidesToShow={peritem} afterChange={afterChange} className={`${peritem === 3 ? 'bg-white rounded-2xl' : ``} `}>
                            {props.quotes.map((quote => (
                                (
                                    <QuotationSelect key={quote.id} best={quote.isHighlighted} data={quote} peritem={peritem} goHiringPage={(id) => props.goHiringPage(id)} />
                                )
                            )))}
                        </Slider>
                    </div>
                </div>
                :
                <div className="max-w-1000 mb-8 mx-auto px-8 sm:px-12 xl:px-24 1xl:px-32">
                    <div className="w-full flex items-center justify-center">
                        <div className="pr-24 h-full hidden md:block">
                            <div className="w-full flex items-center" style={{ maxWidth: "352px" }}>
                                <img src={hero} alt="hero" className="w-full" />
                            </div>
                        </div>
                        {props.quotes.length !== 0 &&
                            <QuotationSelect best={props.quotes[0].isHighlighted} data={props.quotes[0]} peritem={peritem} goHiringPage={(id) => props.goHiringPage(id)} />
                        }
                    </div>
                </div>

            }
        </>
    )
}

export default SlideShowCarousel;
