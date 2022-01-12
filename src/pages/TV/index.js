import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const TV = () => {

    useEffect(() => {

        amplitudeLogEvent("Home/TV");

    });

    return (
        <ComingSoon />
    )

}

export default TV;
