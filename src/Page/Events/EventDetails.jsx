// src/pages/EventDetails/EventDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dev-discuss-server-chi.vercel.app/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading event:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 dark:text-white">Loading...</p>;
  if (!event)
    return (
      <p className="text-center mt-10 text-red-500 dark:text-red-400">
        Event not found.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Event Image */}
        <div className="relative h-60 md:h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Event Content */}
        <div className="p-6 md:p-10 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-400" />
              {event.time} 
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-green-400" />
              {event.organizer}
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            {event.description}
          </p>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Join Event <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;