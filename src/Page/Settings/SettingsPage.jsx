import React from 'react';
import { motion } from 'framer-motion';
import { FileText, HelpCircle, Calendar, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const cards = [
    {
      id: 1,
      title: "Manage Blog",
      description: "Create, edit, and publish blog content with easy formatting tools.",
      icon: <FileText size={24} />,
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Manage Questions",
      description: "Review and respond to user inquiries and support tickets.",
      icon: <HelpCircle size={24} />,
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Manage Events",
      description: "Schedule and organize upcoming events in an interactive calendar.",
      icon: <Calendar size={24} />,
      color: "bg-blue-700"
    },
    {
      id: 4,
      title: "Manage Users",
      description: "Control user permissions, roles, and account settings.",
      icon: <Users size={24} />,
      color: "bg-blue-800"
    },
    {
      id: 5,
      title: "Track Payments",
      description: "Monitor transactions, revenue, and generate financial reports.",
      icon: <CreditCard size={24} />,
      color: "bg-blue-900"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen  p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Admin Settings</h1>
          <p className="text-blue-700 mt-2">Configure and manage your platform settings</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 "
        >
          {cards.map((card) => (
   <Link to={`/settingsOption/${card.id}`}>
            <motion.div
              key={card.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <div className={`${card.color} p-6 flex items-center justify-center`}>
                <div className="bg-white/20 p-3 rounded-full text-white">
                  {card.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
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