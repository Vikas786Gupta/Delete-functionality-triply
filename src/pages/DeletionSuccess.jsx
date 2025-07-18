
import React from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Logo from "@/components/Logo";

const DeletionSuccess = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full bg-gray-100 p-4 flex items-center justify-center shadow-sm">
          <div className="text-xl font-bold text-gray-800"><Logo /></div>
        </header>

        <motion.div
          className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center mb-8"
            variants={itemVariants}
          >
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
              <Check size={48} className="text-green-600" strokeWidth={3} />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Account Successfully Deleted
            </h1>
            <p className="text-gray-600 max-w-xs mx-auto">
              Your account and all related data have been permanently deleted from our systems.
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-xs"
            variants={itemVariants}
          >
            <button
              onClick={() => navigate("/delete")}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-300 font-medium"
            >
              Back to Home
            </button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 text-center mt-8"
          >
            We're sorry to see you go. You can always create a new account if you want to use our services again.
          </motion.p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default DeletionSuccess;
