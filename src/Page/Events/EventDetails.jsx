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
    return <p className="text-center mt-10" style={{color: 'var(--text-color)'}}>Loading...</p>;
  if (!event)
    return (
      <p className="text-center mt-10" style={{color: 'var(--button-hover-bg)'}}>
        Event not found.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div 
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'color-mix(in srgb, var(--background) 85%, var(--button-bg))',
          color: 'var(--text-color)'
        }}
      >
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
          <h1 className="text-3xl md:text-4xl font-bold" style={{color: 'var(--text-color)'}}>
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm" style={{color: 'color-mix(in srgb, var(--text-color) 70%, transparent)'}}>
            <div className="flex items-center gap-2">
              <FaCalendarAlt style={{color: 'var(--button-bg)'}} />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <FaClock style={{color: 'var(--button-bg)'}} />
              {event.time} 
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt style={{color: 'var(--button-hover-bg)'}} />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <FaUser style={{color: 'var(--button-bg)'}} />
              {event.organizer}
            </div>
          </div>

          <p className="leading-relaxed text-base" style={{color: 'color-mix(in srgb, var(--text-color) 80%, transparent)'}}>
            {event.description}
          </p>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition"
            style={{
              background: 'var(--button-bg)',
              color: 'var(--button-text)',
              '&:hover': {
                background: 'var(--button-hover-bg)'
              }
            }}
          >
            Join Event <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;