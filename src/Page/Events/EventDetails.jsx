// src/pages/EventDetails/EventDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaExternalLinkAlt } from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
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

  if (loading) return <p className="text-center mt-10 dark:text-white">Loading...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500 dark:text-red-400">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-60 md:h-80 object-cover"
        />
        <div className="p-6 md:p-8 space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 text-sm gap-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <FaClock /> {event.time}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {event.location}
            </div>
            <div className="flex items-center gap-2">
              <FaUser /> {event.organizer}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {event.description}
          </p>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded-md transition"
          >
            Join Event <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;