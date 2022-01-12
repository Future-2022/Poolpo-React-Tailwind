import React, { Component } from 'react'
import CarMoving from './CarMoving.js'
import Styled from 'styled-components'

const ModalContainer = Styled.div`
    position: fixed;
    background-color: #73737399;
    top: 0px;
    width: 100%;
    height: 100%;
    margin: 0px;
    z-index: 9999;
`
export default class StaticModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 0
        }
    }
    componentDidMount() {
        this.setState({ number: this.props.number })
    }
    renderMessages() {
        if (this.state.number === 0) {
            return (
                <div className="loading-modal col-xs-11 col-sm-5 col-md-5 col-lg-5 white">
                    <CarMoving />
                    <h2 className="modal-title">Estamos procesando tus datos</h2>
                    <p className="modal-text">¿Sabías que contratando a través de Poolpo ahorrás hasta un 30% anual?</p>
                </div>)
        } else if (this.state.number === 1) {
            return (
                <div className="loading-modal col-xs-11 col-sm-5 col-md-5 col-lg-5 white">
                    <CarMoving />
                    <h2 className="modal-title">Estamos procesando tu información</h2>
                    <p className="modal-text">Estamos guardando el medio de pago elegido</p>
                </div>
            )
        }
    }
    render() {
        return (
            <ModalContainer>
                {this.renderMessages()}
            </ModalContainer>
        )
    }
}
