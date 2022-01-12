import React from 'react'
import QuotationFilter from '../QuotationFilter';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const QuotationFilterSet = (props) => {

    var settings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1130,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    };

    var data = [
        { id: 1, title: "Todo riesgo", number: 5 },
        { id: 2, title: "Terceros\ncompletos", number: 4 },
        { id: 3, title: "Terceros", number: 3 },
        { id: 4, title: "Resp. civil", number: 1 },
    ];

    return (
        <>
            <Slider {...settings} className="max-w-518 xl:max-w-778 mx-auto xl:ml-0 pb-4 xl:pb-0 mb-4 xl:mb-0">
                {data.map((item => (
                    (
                        <QuotationFilter key={item.id} content={item.title} item={item.number} selected={props.buttonsList.includes(item.number)} onClick={props.handleButtonsList} />
                    )
                )))}
            </Slider>
        </>
    )
}

export default QuotationFilterSet;
