import React from 'react'
import Slider from 'react-rangeslider'

import './index.css';

const RangeSlider = (props) => {

    const handleChange = value => {
        props.onChange(value);
    }

    return (
        <Slider
            value={props.value}
            min={props.min}
            max={props.max}
            format={(value) => { return props.format(value); }}
            orientation="horizontal"
            onChange={handleChange}
        />
    )
}

export default RangeSlider;
