
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("authToken")
  }, [])
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-gray-100 p-4 flex items-center justify-between shadow-sm">
        <div className="text-xl font-bold text-gray-800"><Logo /></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Triply</h1>
            <p className="text-gray-600 mt-2">Your premium ride service</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Affordable, eco-friendly commutes</h2>
                <p className="text-gray-600 mt-1">Experience our fully electric vehicle fleet</p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-800">On time, every time</h2>
                <p className="text-gray-600 mt-1">No last minute cancellations</p>
              </div>

              <button
                onClick={() => navigate("/delete/delete-account")}
                className="w-full py-3 px-4 mt-8 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-all duration-300 font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-gray-500 mt-8"
        >
          © 2025 Triply. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
