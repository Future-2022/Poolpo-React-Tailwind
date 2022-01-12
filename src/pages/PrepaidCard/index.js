import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const PrepaidCard = () => {

    useEffect(() => {

        amplitudeLogEvent("Bancos/Prepaid-Card");

    });

    return (
        <ComingSoon />
    )

}

export default PrepaidCard;
