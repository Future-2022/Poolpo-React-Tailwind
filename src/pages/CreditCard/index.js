import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const CreditCard = () => {

    useEffect(() => {

        amplitudeLogEvent("Bancos/Credit-Card");

    });

    return (
        <ComingSoon />
    )

}

export default CreditCard;
