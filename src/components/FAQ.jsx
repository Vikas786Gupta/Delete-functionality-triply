import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconMessageCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const faqData = [
    {
        question: 'What makes Triply different from other platforms?',
        answer: 'Triply focuses on building a community of commuters to provide reliable, affordable, and eco-friendly cab sharing, unlike generic ride-hailing services. Our route optimization and subscription model are tailored for daily office travel.'
    },
    {
        question: 'How much does Triply charge?',
        answer: 'We offer various subscription plans that can save you up to 60% compared to traditional cab services. Pricing depends on your route and the plan you choose. You can find detailed pricing in the app.'
    },
    {
        question: 'What if I already have a benefits scheme in place?',
        answer: 'Triply can work alongside your existing corporate travel benefits. Many companies are happy to include our service as a greener, more efficient commuting option for their employees.'
    },
    {
        question: 'Do I need another app?',
        answer: 'Yes, Triply operates through its own dedicated mobile app, which allows for seamless booking, tracking, and management of your shared rides and subscriptions.'
    },
    {
        question: 'Do I have to sign a long contract?',
        answer: 'No, we offer flexible subscription models, including monthly and quarterly plans. You can choose the one that best fits your needs without being locked into a long-term commitment.'
    },
    {
        question: 'Is my data safe?',
        answer: 'Absolutely. We use industry-standard encryption and security protocols to protect your personal information and travel data. Your privacy and security are our top priorities.'
    }
];

const AccordionItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-1 last:border-b-0">
            <button
                onClick={onClick}
                className="flex justify-between items-center w-full py-4 text-left text-gray-800"
            >
                <span className="font-medium">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <IconChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pt-2 pb-4 text-gray-600">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 lg:gap-16 items-start">
                {/* Left Column */}
                <div className="lg:pr-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        What would you like to know about Triply?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-md">
                        Frequently asked questions about our service. If you can't find the answer you're looking for, feel free to reach out to us.
                    </p>
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-colors cursor-pointer"
                    >
                        <IconMessageCircle size={20} />
                        <span>Talk to us</span>
                    </Link>
                </div>

                {/* Right Column*/}
                <div className="mt-12 lg:mt-0">
                    <div className="space-y-2">
                        {faqData.map((faq, index) => (
                             <div key={index} className="bg-purple-200/50 rounded-2xl px-6">
                                <AccordionItem
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => handleToggle(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ; 