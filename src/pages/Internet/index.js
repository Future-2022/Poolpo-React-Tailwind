import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const Internet = () => {

    useEffect(() => {

        amplitudeLogEvent("Home/Internet");

    });

    return (
        <ComingSoon />
    )

}

export default Internet;
