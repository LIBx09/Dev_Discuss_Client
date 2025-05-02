// src/components/EventCard/EventCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const EventCard = ({ event, index }) => {
  const { _id, title, date, description, image, location } = event;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="flex flex-col h-full"
    >
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Image Section */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            variants={imageVariants}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow text-white">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

          <div className="flex flex-wrap text-sm text-gray-300 gap-4 mb-3">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" />
              {new Date(date).toDateString()}
            </span>
            {location && (
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" />
                {location}
              </span>
            )}
          </div>

          <p className="text-gray-300 line-clamp-3 mb-4">{description}</p>

          <div className="mt-auto">
            <Link
              to={`/events/${_id}`}
              className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition"
            >
              View Details
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaArrowRight />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;