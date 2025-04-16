import React from "react";
import { FaFireAlt } from "react-icons/fa";
import QuizCard from "../../components/QuizCard/QuizCard";
import ShortQuestionCard from "../../components/ShortQuestion/ShortQuestion";
import ProblemSolvingCard from "../../components/ProblemSolvingCard/ProblemSolvingCard";
const Events = () => {


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl flex items-center gap-2 font-bold ">Events from Dev discuss <FaFireAlt className="text-red-500"/></h2>
      <p className="text-gray-700 mb-4">Join events test you're coding mind & earn pro badges</p>
<div className="grid md:grid-cols-2  gap-5">
<QuizCard></QuizCard>
<ShortQuestionCard></ShortQuestionCard>
<ProblemSolvingCard></ProblemSolvingCard>
</div>


    </div>
  );
};

export default Events;
