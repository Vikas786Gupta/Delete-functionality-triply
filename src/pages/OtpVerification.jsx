
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import OtpInput from "../components/OtpInput";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { mobileNumbState, useAuth } from "./Store";
import { useRecoilValue } from "recoil";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const { data: MobileNumbState } = useRecoilValue(mobileNumbState)
  const { verifyOtp, sendOtp } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  useEffect(() => {
    if (!MobileNumbState.phoneNumber) {
      navigate("/delete/mobile-verification")
    }
  }, [MobileNumbState])
  const handleResendOtp = () => {
    if (timer === 0) {
      setIsResending(true);
      sendOtp(true, MobileNumbState.phoneNumber, MobileNumbState.countrycode);
      // Simulate API call for resending OTP
      setTimeout(() => {
        setTimer(30);
        setIsResending(false);
        setOtp("");
        toast.success("OTP resent successfully!");
      }, 1000);
    }
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      verifyOtp(MobileNumbState.countrycode, true, MobileNumbState.phoneNumber, otp)
    } else {
      toast.error("Please enter the complete OTP.");
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    const parts = phone.split(" ");
    if (parts.length === 2) return phone;

    const countryCode = phone.substring(0, 3);
    const number = phone.substring(3);
    return `${countryCode} ${number}`;
  };

  const maskedPhoneNumber = () => {
    const formattedNumber = formatPhoneNumber(MobileNumbState.phoneNumber);
    const parts = formattedNumber.split(" ");
    if (parts.length !== 2) return formattedNumber;

    const countryCode = parts[0];
    const number = parts[1];
    if (number.length <= 4) return formattedNumber;

    const visiblePart = number.substring(number.length - 4);
    const maskedPart = number.substring(0, number.length - 4).replace(/\d/g, "*");
    return `${countryCode} ${maskedPart}${visiblePart}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full bg-gray-100 p-4 flex items-center shadow-sm">
          <button
            onClick={() => navigate("/delete/mobile-verification")}
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h1>
            <p className="text-gray-600">
              Enter the verification code sent to{" "}
              <span className="font-medium">{maskedPhoneNumber()}</span>{" "}
              <button
                onClick={() => navigate("/delete/mobile-verification")}
                className="text-blue-600">
                Edit
              </button>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="mb-6">
              <OtpInput length={4} value={otp} onChange={setOtp} />
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {timer > 0 ? `Resend in ${timer}s` : "Didn't receive code?"}
              </p>
              <button
                className={`text-sm font-medium ${timer === 0 ? "text-blue-600" : "text-gray-400"
                  }`}
                onClick={handleResendOtp}
                disabled={timer > 0 || isResending}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.length !== 4}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify
            </button>
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

export default OtpVerification;
