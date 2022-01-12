import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const Casa = () => {

    useEffect(() => {

        amplitudeLogEvent("Casa");

    });

    return (
        <ComingSoon />
    )

}

export default Casa;
