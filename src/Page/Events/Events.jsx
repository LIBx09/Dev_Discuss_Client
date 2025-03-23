import React from "react";

const Events = () => {
  // Sample events data
  const eventsList = [
    {
      id: 1,
      title: "React Conference 2025",
      date: "April 15, 2025",
      location: "San Francisco, CA",
      description:
        "Join the biggest React conference with industry experts discussing the future of React and front-end development.",
    },
    {
      id: 2,
      title: "JavaScript Bootcamp",
      date: "May 10, 2025",
      location: "Online",
      description:
        "A free JavaScript bootcamp covering advanced topics like closures, async programming, and best practices.",
    },
    {
      id: 3,
      title: "Web Development Hackathon",
      date: "June 5, 2025",
      location: "New York, NY",
      description:
        "Compete with other developers in building innovative web applications in 24 hours!",
    },
  ];

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
