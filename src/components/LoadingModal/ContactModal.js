import React, { Component } from 'react'
import Styled from 'styled-components'

import cross from '../../img/cross.png'

import './index.css';
import { useHistory } from 'react-router-dom';

const ModalContainer = Styled.div`
    position: fixed;
    background-color: #73737399;
    top: 0px;
    width: 100%;
    height: 100%;
    margin: 0px;
    z-index: 9999;
`
const ContactModal = (props) => {

    let history = useHistory();

    return (
        <ModalContainer>
            <div className="loading-modal relative w-4/5 sm:w-1/2 mx-auto white">
                <img src={cross} alt="cross" className="absolute top-4 right-8 cursor-pointer" onClick={() => props.onClose()} />
                <h2 className="modal-title py-3 text-xl sm:text-3.5xl font-SpartanBold">¡Gracias!</h2>
                <p className="modal-text text-base sm:text-xl font-OpenSansRegular pb-10" id="modal-message">Su mensaje fue enviado con éxito</p>
                <button className="px-10 py-4 font-RobotoMedium border border-purple2 rounded-xl text-base text-purple2" onClick={() => history.push("/auto")}>Volver al inicio</button>
            </div>
        </ModalContainer>
    )
}

export default ContactModal;
