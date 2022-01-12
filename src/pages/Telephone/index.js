import React, { useEffect } from 'react'
import ComingSoon from '../ComingSoon'
import { amplitudeLogEvent } from '../../services/utils';

const Telephone = () => {

    useEffect(() => {

        amplitudeLogEvent("Home/Telephone");

    });

    return (
        <ComingSoon />
    )

}

export default Telephone;
