import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const WeLoan = () => {

    useEffect(() => {

        amplitudeLogEvent("Bancos/we-loan");

    });

    return (
        <ComingSoon />
    )

}

export default WeLoan;
