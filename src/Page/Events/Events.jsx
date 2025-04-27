import { useEffect, useState } from "react";
import { FaFireAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import QuizCard from "../../components/QuizCard/QuizCard";
import ShortQuestionCard from "../../components/ShortQuestion/ShortQuestion";
import ProblemSolvingCard from "../../components/ProblemSolvingCard/ProblemSolvingCard";
import EventCard from './EventCard';
import LoadingPage from '../Loading/LoadingPage';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev-discuss-server-chi.vercel.app/events") // ✅ fetch from backend
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl flex items-center gap-2 font-bold">
            Events from DevDiscuss <FaFireAlt className="text-red-500" />
          </h2>
          <p className="text-gray-700">
            Join events, test your coding mind & earn pro badges.
          </p>
        </div>
     
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-8">
        <QuizCard />
        <ShortQuestionCard />
        <ProblemSolvingCard />
      </div>

      <h3 className="text-xl font-semibold mb-4">🔥 Featured Community Events</h3>
      {loading ? (
        <LoadingPage />
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} /> // ✅ use _id if from MongoDB
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;