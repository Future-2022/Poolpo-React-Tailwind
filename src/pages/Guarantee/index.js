import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const Guarantee = () => {

    useEffect(() => {

        amplitudeLogEvent("Home/Guarantee");

    });

    return (
        <ComingSoon />
    )

}

export default Guarantee;
