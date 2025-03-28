import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import axios from "axios";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import useAxios from "../MainLayout/Shared/Hooks/useAxios";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import { IoBookmarksOutline } from "react-icons/io5";

const QuestionDetails = () => {
  const axios = useAxios();
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  // console.log(user);
  useEffect(() => {
    axios
      .get(`/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question details:", error);
        setLoading(false);
      });
  }, [id]);
  const saveCollection = { ...question, email }
  const handleSave = (_id) => {
    console.log(_id);
    console.log(question);
    axios.post("/saves", saveCollection)
      .then(res => {
        console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "This question has been successfully bookmarked",
            icon: "success",
            draggable: true
          });
        }
        setBookmarked(true);
      })
      .catch(error => {
        console.log(error);
      })

  };
  return (
    <div className="p-6">
      <Link to="/questions" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Questions
      </Link>

      {loading ? (
        <p>Loading question details...</p>
      ) : question ? (
        <div className="border p-4 rounded shadow">
          <h2 className="text-2xl font-bold text-blue-600">{question.title}</h2>
          <p className="mt-2 text-gray-700">{question.body}</p>
          <div className="flex items-center justify-between">
            <div className="mt-4 text-sm text-gray-500">
              <span>Tag: {question.tag}</span> | <span>Date: {question.date}</span>
            </div>
            < button onClick={() => handleSave(question._id)} disabled={bookmarked} className={`pt-4 ${bookmarked ? "md:text-2xl text-xl  cursor-not-allowed text-gray-400" : " md:text-3xl text-2xl text-blue-500 hover:text-blue-700"}`}>
              {bookmarked ? <IoBookmarksOutline /> : <PiBookmarkSimpleLight />}
            </button>
          </div>
        </div>
      ) : (
        <p>Question not found.</p>
      )}
    </div>
  );
};

export default QuestionDetails;
