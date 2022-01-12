import React from 'react'
import QuotationFilterMoto from '../QuotationFilterMoto';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const QuotationFilterSetMoto = (props) => {

    var settings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
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
        { id: 1, title: "Resp.civil", number: 6 },
        { id: 2, title: "Robo<br/> y/o incendio", number: 7 },
        { id: 3, title: "Premium", number: 8 },
    ];

    return (
        <>
            <Slider {...settings} className="max-w-518 xl:max-w-778 mx-auto md:ml-0 pb-4 sm:pb-0 mb-8 sm:mb-0">
                {data.map((item => (
                    (
                        <QuotationFilterMoto key={item.id} content={item.title} item={item.number} selected={props.buttonsList.includes(item.number)} onClick={props.handleButtonsList} />
                    )
                )))}
            </Slider>
        </>
    )
}

export default QuotationFilterSetMoto;
