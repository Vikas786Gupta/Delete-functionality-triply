import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "./Store";

const ConfirmDeletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [reason, setReason] = useState(""); // Store input field value
  const phoneNumber = location.state?.phoneNumber || "+91 9876543210";
  const { deleteUser } = useAuth();

  const handleDeleteAccount = () => {
    if (!reason.trim()) return; // Prevent submission if reason is empty
    deleteUser({
      reason: reason || ""
    });
    setIsDeleting(true);

  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full bg-gray-100 p-4 flex items-center shadow-sm">
          <button
            onClick={() => navigate("/delete/otp-verification", { state: { phoneNumber } })}
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
            className="text-center mb-8"
          >
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Confirm Account Deletion
            </h1>
            <p className="text-gray-600">
              This action cannot be undone. Are you sure?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              You will lose:
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-red-500 mr-2">•</span>
                <span>All ride history and saved locations</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-red-500 mr-2">•</span>
                <span>Favorite drivers and service preferences</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-red-500 mr-2">•</span>
                <span>Earned rewards and loyalty benefits</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-red-500 mr-2">•</span>
                <span>Any active subscription plans</span>
              </li>
            </ul>

            {/* New Text Input Field for Deletion Reason */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for Deleting Your Account <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please specify your reason..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                rows={3}
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || !reason.trim()} // Disable if no reason is entered
                className={`w-full py-3 px-4 rounded transition-all duration-300 font-medium ${isDeleting || !reason.trim()
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting Account...
                  </div>
                ) : (
                  "Yes, Delete My Account"
                )}
              </button>
              <button
                onClick={() => navigate("/delete")}
                disabled={isDeleting}
                className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Cancel, Keep My Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ConfirmDeletion;
