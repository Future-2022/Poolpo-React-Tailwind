import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import './index.css';

import threelinessmall from '../../img/three-lines-small-other.png';

import HeaderWithoutContact from '../../layouts/HeaderWithoutContact';
import Footer1 from '../../layouts/Footer1';

import { apiContact } from '../../services/main';
import { amplitudeLogEvent } from '../../services/utils';
import ContactModal from '../../components/LoadingModal/ContactModal';


const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const sendContactEmail = e => {

        e.preventDefault();

        setModalIsOpen(true);

        let formData = new FormData();

        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Message', message);

        apiContact(formData)
            .then(function (response) {
                console.log(response);
                if (!response.error) {
                }
            })
            .catch(function (response) {
                console.log(response);
            });

    }

    useEffect(() => {
        amplitudeLogEvent("Contact");
    }, []);

    return (
        <div className="w-full bg-maingray relative">
            <img src={threelinessmall} alt="" className="absolute top-0 right-0 hidden md:block" />
            <HeaderWithoutContact />

            <div className="w-full max-w-1296 mx-auto pt-12 md:pt-5 pb-24 px-4 sm:px-12 xl:px-24 1xl:px-32">
                <p className="font-SpartanBold text-2xl text-black">¡Hola!</p>
                <p className="font-OpenSansRegular text-xl text-black">Decinos en qué te podemos ayudar y te contactamos lo antes posible.</p>
            </div>
            <div className="w-full bg-mainpink">
                <form className="w-full max-w-1296 mx-auto bg-mainpink px-4 sm:px-12 xl:px-24 1xl:px-32" onSubmit={sendContactEmail} method="post">
                    <div className="w-full rounded-3xl bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-10 relative shadow-lg" style={{ top: "-48px" }}>
                        <input type="text" className="contact-input w-full outline-none border-b-2 border-gray-200 py-2 sm:py-4 text-xl font-OpenSansRegular text-gray" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
                        <input type="email" className="contact-input w-full outline-none border-b-2 border-gray-200 py-2 sm:py-4 text-xl font-OpenSansRegular text-gray mt-4 sm:mt-12" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <p className="font-OpenSansRegular text-xl text-gray pt-4 sm:pt-8 pb-4 sm:pb-6">Mensaje</p>
                        <textarea className="contact-textarea rounded-md sm:rounded-3xl border border-gray-600 w-full px-6 py-3 text-lg font-OpenSansLight text-gray h-144 sm:h-288 md:h-400px" placeholder="Escribir acá..." value={message} onChange={e => setMessage(e.target.value)}></textarea>
                        <div className="w-full pt-4 sm:pt-8 pb-3 text-center">
                            <button type="submit" className="px-16 py-4 bg-purple text-white rounded-xl">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="w-full h-8"></div>

            <Footer1 />

            {modalIsOpen && <ContactModal onClose={() => setModalIsOpen(false)} />}

        </div>
    )
}

export default Contact;
