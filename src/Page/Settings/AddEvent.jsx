// src/pages/AddEvent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    organizer: "",
    link: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://dev-discuss-server-chi.vercel.app/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Event added successfully!");
        navigate("/events");
      } else {
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-transparent shadow rounded mt-10">
      <h2 className="text-2xl text-pink-400 font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Title" },
          { name: "date", label: "Date", type: "date" },
          { name: "time", label: "Time", type: "time" },
          { name: "description", label: "Description" },
          { name: "location", label: "Location" },
          { name: "organizer", label: "Organizer" },
          { name: "link", label: "Event Link" },
          { name: "image", label: "Image URL" }
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium text-purple-400">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEvent;