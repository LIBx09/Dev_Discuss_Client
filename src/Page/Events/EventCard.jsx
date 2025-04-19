// src/components/EventCard/EventCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const { _id, title, date, description, image, location } = event;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>

        <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-400 gap-3">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
            {new Date(date).toDateString()}
          </span>
          {location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500 dark:text-red-400" />
              {location}
            </span>
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        <Link
          to={`/events/${_id}`}
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;