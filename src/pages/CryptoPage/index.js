import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const CryptoPage = () => {

    useEffect(() => {

        amplitudeLogEvent("Crypto");

    });

    return (
        <ComingSoon />
    )

}

export default CryptoPage;
