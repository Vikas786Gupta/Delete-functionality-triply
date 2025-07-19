import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import DeleteAccount from './pages/DeleteAccount';
import MobileVerification from './pages/MobileVerification';
import OtpVerification from './pages/OtpVerification';
import ConfirmDeletion from './pages/ConfirmDeletion';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />

            <Route path="delete" element={<Index />} />
            <Route path="delete/deleteaccount" element={<DeleteAccount />} />
            <Route path="delete/mobile" element={<MobileVerification />} />
            <Route path=" delete/otp" element={<OtpVerification />} />
            <Route path=" delete/confirm" element={<ConfirmDeletion />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
