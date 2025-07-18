
import React, { useRef, useState, useEffect } from "react";


const OtpInput = ({ length, value, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length);
      setOtp([...otpArray, ...Array(length - otpArray.length).fill("")]);
    } else {
      setOtp(Array(length).fill(""));
    }
  }, [value, length]);

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]?.focus();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Handle case when user pastes OTP
    if (newValue.length > 1) {
      const pastedOtp = newValue.split("").slice(0, length);
      const newOtp = [...Array(length).fill("")];
      
      pastedOtp.forEach((digit, i) => {
        if (i < length) {
          newOtp[i] = digit;
        }
      });
      
      setOtp(newOtp);
      onChange(newOtp.join(""));
      
      // Focus on the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex(val => val === "");
      if (nextEmptyIndex !== -1) {
        focusInput(nextEmptyIndex);
      } else {
        focusInput(length - 1);
      }
      return;
    }
    
    // Single digit input handling
    if (/^\d*$/.test(newValue)) {
      const newOtp = [...otp];
      newOtp[index] = newValue.charAt(0);
      setOtp(newOtp);
      onChange(newOtp.join(""));
      
      // Auto focus next input if current input is filled
      if (newValue && index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (e) => {
    // Move focus to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
    
    // Move focus on arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.replace(/[^\d]/g, "").split("").slice(0, length);
    
    const newOtp = [...Array(length).fill("")];
    pastedOtp.forEach((digit, i) => {
      if (i < length) {
        newOtp[i] = digit;
      }
    });
    
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e)}
          className="w-14 h-14 text-xl font-semibold text-center border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default OtpInput;
