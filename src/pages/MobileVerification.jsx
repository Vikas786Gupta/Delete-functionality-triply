
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "./Store";

const MobileVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const { sendOtp } = useAuth();
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    setIsValid(value.length >= 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      sendOtp(true, phoneNumber, countryCode.replace("+", ""));
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full bg-gray-100 p-4 flex items-center shadow-sm">
          <button
            onClick={() => navigate("/delete/delete-account")}
            className="text-gray-600 mr-4"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-xl font-bold text-gray-800"><Logo /></div>
        </header>

        <div className="max-w-md w-full mx-auto px-4 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Enter mobile number
            </h1>
            <p className="text-gray-600">
              We'll send you a verification code to confirm it's you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                <div className="flex">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="mr-2 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+86">🇨🇳 +86</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            </form>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm text-gray-500 text-center"
          >
            © 2025 Triply. All rights reserved.
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
};

export default MobileVerification;
