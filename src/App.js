import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AmplitudeProvider } from "@amplitude/react-amplitude";
import amplitude from "amplitude-js";

import './App.css';
import "./css/tailwind.output.css";
import './font/font.css';
import './css/fontawesome-free-6.0.0-beta3-web/css/fontawesome.css';
import './css/fontawesome-free-6.0.0-beta3-web/css/brands.css';
import './css/fontawesome-free-6.0.0-beta3-web/css/solid.css';

import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Auto from './pages/Auto';
import Steps from './pages/Steps';
import PolicyCheck from './pages/PolicyCheck';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Questions from './pages/Questions';
import Quotation from './pages/Quotation';
import HiringData from './pages/HiringData';
import HiringVehicle from './pages/HiringVehicle';
import HiringPayment from './pages/HiringPayment';
import HiringCongrats from './pages/HiringCongrats';
import HiringPictures from './pages/HiringPictures';
// import HiringHouse from './pages/HiringHouse';
import HiringHome from './pages/HiringHome';
import HiringCongrats1 from './pages/HiringCongrats1';
import Moto from './pages/Moto';
import MotoSteps from './pages/MotoSteps';
import MotoQuotation from './pages/MotoQuotation';
import HiringDataMoto from './pages/HiringDataMoto';
import HiringPicturesMoto from './pages/HiringPicturesMoto';
import ComingSoon from './pages/ComingSoon';
import Telephone from './pages/Telephone';
import Internet from './pages/Internet';
import TV from './pages/TV';
import Guarantee from './pages/Guarantee';
import CreditCard from './pages/CreditCard';
import PrepaidCard from './pages/PrepaidCard';
import WeLoan from './pages/WeLoan';
import CryptoPage from './pages/CryptoPage';
import Casa from './pages/Casa';
import MotoPolicy from './pages/MotoPolicy';

// Create newly by Aliev
import House from './pages/House';
import Rental from './pages/Rental';
import HouseHiring from './pages/HouseHiring';
import HouseHiringPayment from './pages/HouseHiringPayment';
import HouseHiringProperty from './pages/HouseHiringProperty';

import HouseQuotation from './pages/HouseQuotation';
import HouseCongrats from './pages/HouseCongrats';

const AMPLITUDE_KEY = require("./config")['amplitudeKey'];


function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <React.Fragment>
      <AmplitudeProvider
        amplitudeInstance={amplitude.getInstance()}
        apiKey={AMPLITUDE_KEY}
      >
        <main className="w-full bg-maingray">
          <Switch>
            <Redirect from="/" exact to="/auto" />
            <Route path="/home" component={Home} />
            <Route path="/auto" component={Auto} />
            <Route path="/moto/home" component={Moto} />
            <Route path="/steps" component={Steps} />
            <Route path="/moto/steps" component={MotoSteps} />
            <Route path="/policy/:leadID/:vehicleID" component={PolicyCheck} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contact" component={Contact} />
            <Route path="/questions" component={Questions} />
            <Route path="/quotation/:leadID/:vehicleID" component={Quotation} />
            <Route path="/moto/quotation/:leadID/:vehicleID" component={MotoQuotation} />
            <Route path="/hiring/data/:leadID/:vehicleID/:quoteID" component={HiringData} />
            <Route path="/hiring/vehicle/:leadID/:vehicleID/:quoteID" component={HiringVehicle} />
            <Route path="/hiring/payment/:leadID/:vehicleID/:quoteID" component={HiringPayment} />
            {/* <Route path="/hiring/house/:leadID/:vehicleID/:quoteID" component={HiringHouse} /> */}
            <Route path="/hiring/congrats/:leadID/:vehicleID/:quoteID" component={HiringCongrats1} />
            <Route path="/hiring/pictures/:leadID/:vehicleID/:quoteID" component={HiringPictures} />
            <Route path="/hiring/home/:leadID/:vehicleID/:quoteID" component={HiringHome} />
            <Route path="/moto/hiring/data/:leadID/:vehicleID/:quoteID" component={HiringDataMoto} />
            <Route path="/moto/hiring/pictures/:leadID/:vehicleID/:quoteID" component={HiringPicturesMoto} />
            <Route path="/moto/policy/:leadID/:vehicleID" component={MotoPolicy} />
            <Route path="/casa" component={Casa} />
            <Route path="/hogar/telephone" component={Telephone} />
            <Route path="/hogar/internet" component={Internet} />
            <Route path="/hogar/tv" component={TV} />
            <Route path="/hogar/guarantee" component={Guarantee} />
            <Route path="/bancos/credit-card" component={CreditCard} /> 
            <Route path="/bancos/prepaid-card" component={PrepaidCard} />
            <Route path="/bancos/we-loan" component={WeLoan} />
            <Route path="/crypto" component={CryptoPage} />

            {/* New create page by Aliev */}
            <Route path="/house/basic" component={House} />
            <Route path="/house/steps" component={Rental} />
            <Route path="/house/hiring/data/:leadID/:propertyID/:quoteID" component={HouseHiring}/>
            <Route path="/house/hiring/payment/:leadID/:propertyID/:quoteID" component={HouseHiringPayment}/>
            <Route path="/house/hiring/property/:leadID/:propertyID/:quoteID" component={HouseHiringProperty} />
            <Route path="/house/quotation/:leadID/:quoteID" component={HouseQuotation} />
            <Route path="/house/congratulations/:leadID/:proertyID/:quoteID" component={HouseCongrats} />
          </Switch>
          <ScrollToTop />
        </main>
      </AmplitudeProvider>
    </React.Fragment>
  );
}

export default App;
