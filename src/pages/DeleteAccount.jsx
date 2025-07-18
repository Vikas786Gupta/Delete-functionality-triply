
import React from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full bg-gray-100 p-4 flex items-center justify-between shadow-sm">
          <div className="text-xl font-bold text-gray-800"><Logo /></div>
        </header>

        <div className="max-w-md w-full mx-auto px-4 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Delete Your Account</h1>
            <p className="text-gray-600">
              We're sorry to see you go. Please confirm if you really want to delete your account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Before you delete your account:
            </h2>

            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <p>Your profile, trip history, and saved places will be permanently deleted</p>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <p>Any active subscriptions will be canceled</p>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <p>This action cannot be undone</p>
              </li>
            </ul>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate("/delete/mobile-verification")}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-all duration-300 font-medium"
              >
                Continue to Delete
              </button>

              <button
                onClick={() => navigate("/delete")}
                className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
          <Outlet />
        </div>
      </div>
    </PageTransition>
  );
};

export default DeleteAccount;
