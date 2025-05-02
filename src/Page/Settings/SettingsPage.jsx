import React from 'react';
import { motion } from 'framer-motion';
import { FileText, HelpCircle, Calendar, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const cards = [
    {
      id: 1,
      title: "Manage Questions",
      description: "Review and respond to user inquiries and support tickets.",
      icon: <HelpCircle size={24} />,
    },
    {
      id: 2,
      title: "Manage Events",
      description: "Schedule and organize upcoming events in an interactive calendar.",
      icon: <Calendar size={24} />,
    },
    {
      id: 3,
      title: "Manage Users",
      description: "Control user permissions, roles, and account settings.",
      icon: <Users size={24} />,
    },
    {
      id: 4,
      title: "Track Payments",
      description: "Monitor transactions, revenue, and generate financial reports.",
      icon: <CreditCard size={24} />,
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Admin Settings</h1>
          <p className="text-purple-300 mt-2">Configure and manage your platform settings</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <Link to={`/settingsOption/${card.id}`} key={card.id}>
              <motion.div
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full bg-gradient-to-br from-[#1f1c2c] via-[#302b63] to-[#0f0c29] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon Header */}
                <div className="p-6 flex justify-center items-center bg-pink-500/20">
                  <div className="bg-pink-500 p-3 rounded-full text-white shadow-md">
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow text-white">
                  <h3 className="text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text font-semibold mb-3">{card.title}</h3>
                  <p className="text-purple-300 mb-4 flex-grow">{card.description}</p>
                  <span className="text-pink-400 font-medium hover:text-pink-300 transition">Go to settings →</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;