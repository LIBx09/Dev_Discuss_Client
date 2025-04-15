// src/pages/Events.jsx
import React from "react";
import { useSelector } from "react-redux";

const Events = () => {
  const eventsList = useSelector((state) => state.events.eventsList);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

      {eventsList.length === 0 ? (
        <p className="text-gray-500 text-center">No upcoming events.</p>
      ) : (
        <div className="space-y-4">
          {eventsList.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg shadow-md ">
              <h3 className="text-lg font-semibold text-blue-600">
                {event.title}
              </h3>
              <p className="text-gray-500 mt-2">{event.description}</p>

              <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;