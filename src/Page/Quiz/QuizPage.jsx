import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { motion } from 'framer-motion';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null); // 'correct', 'incorrect', or null
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // Get stored scores from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('quizHistory');
    if (storedHistory) {
      setUserHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Set up timer - 30 seconds per question
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);
  
  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart
  } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => handleTimeout(),
    autoStart: true 
  });

  // Reset timer for each question
  const resetTimer = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    restart(time);
  };

  // Handle when time runs out
  const handleTimeout = () => {
    if (!answerStatus) {
      handleAnswerSelection(null);
    }
  };

  const quiz = {
    quizTitle: "JavaScript MCQ Challenge",
    quizSynopsis: "Sharpen your JS skills! Answer these questions to test your JavaScript knowledge.",
    nrOfQuestions: "20",
    progressBarColor: "#00b894",
    questions: [
      {
        question: "Which of the following is a primitive data type in JavaScript?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["Object", "Array", "Number", "Function"],
        correctAnswer: "3",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope, try again!",
        explanation: "Number is a primitive type in JS.",
        point: "5"
      },
      {
        question: "What will `typeof null` return?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["'null'", "'object'", "'undefined'", "'number'"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope, it's a JS quirk!",
        explanation: "typeof null returns 'object' due to a bug in JS.",
        point: "5"
      },
      {
        question: "Which keyword declares a constant in JavaScript?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["const", "let", "var", "constant"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Yup!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "`const` is used for constants.",
        point: "5"
      },
      {
        question: "Which method converts a JSON string into an object?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Good one!",
        messageForIncorrectAnswer: "Nah bro!",
        explanation: "JSON.parse() parses a string into an object.",
        point: "5"
      },
      {
        question: "Which one is NOT a looping structure in JavaScript?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["for", "while", "foreach", "loop"],
        correctAnswer: "4",
        messageForCorrectAnswer: "Spot on!",
        messageForIncorrectAnswer: "Think again!",
        explanation: "There's no `loop` statement in JS.",
        point: "5"
      },
      {
        question: "Which array method adds one or more elements to the end?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["shift()", "push()", "pop()", "unshift()"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Try again!",
        explanation: "push() adds to end of array.",
        point: "5"
      },
      {
        question: "What is the result of `2 + '2'`?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["4", "'22'", "NaN", "undefined"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Nice!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "It performs string concatenation.",
        point: "5"
      },
      {
        question: "What will `[] == false` return?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["true", "false", "undefined", "NaN"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Almost!",
        explanation: "Empty array is truthy, but `==` makes it `true` here.",
        point: "5"
      },
      {
        question: "Which one is NOT a valid way to define a function in JS?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["function hello() {}", "const hello = () => {}", "hello() => {}", "const hello = function() {}"],
        correctAnswer: "3",
        messageForCorrectAnswer: "Right!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "That syntax is invalid.",
        point: "5"
      },
      {
        question: "What is the output of `typeof NaN`?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["'NaN'", "'undefined'", "'number'", "'object'"],
        correctAnswer: "3",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "NaN is considered a number in JS.",
        point: "5"
      },
      {
        question: "Which object is the parent of all JavaScript objects?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["Object", "Function", "Global", "Window"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Yep!",
        messageForIncorrectAnswer: "Not quite!",
        explanation: "`Object` is at the top of the prototype chain.",
        point: "5"
      },
      {
        question: "Which of these creates a deep copy in JavaScript?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["Object.assign()", "JSON.parse(JSON.stringify())", "=", "clone()"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Try again!",
        explanation: "That's the most common deep clone hack.",
        point: "5"
      },
      {
        question: "Which operator checks both value and type?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["==", "=", "===", "!="],
        correctAnswer: "3",
        messageForCorrectAnswer: "You got it!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "`===` checks value + type.",
        point: "5"
      },
      {
        question: "What does `setTimeout()` return?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["delay", "timer ID", "function", "undefined"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Wrong pick!",
        explanation: "It returns a timer ID.",
        point: "5"
      },
      {
        question: "Which method is used to join array elements into a string?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["join()", "concat()", "split()", "merge()"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "join() joins array elements.",
        point: "5"
      },
      {
        question: "Which of these is a falsy value in JS?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["0", "{}", "[]", "'false'"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Nice one!",
        messageForIncorrectAnswer: "Nah!",
        explanation: "`0` is falsy. The others are truthy.",
        point: "5"
      },
      {
        question: "What does `Array.isArray([])` return?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["false", "true", "null", "undefined"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "It checks if the value is an array.",
        point: "5"
      },
      {
        question: "What is the correct way to check if `x` is `undefined`?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["x == undefined", "typeof x === 'undefined'", "x === undefined", "All of the above"],
        correctAnswer: "4",
        messageForCorrectAnswer: "Yes bro!",
        messageForIncorrectAnswer: "Try again!",
        explanation: "All options work, but `typeof` is safest.",
        point: "5"
      },
      {
        question: "Which one causes a ReferenceError?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["console.log(a); let a = 5;", "let a = 5; console.log(a);", "const a = 5;", "var a = 5;"],
        correctAnswer: "1",
        messageForCorrectAnswer: "Correct!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "Accessing `let` before declaration = ReferenceError.",
        point: "5"
      },
      {
        question: "What is a closure in JavaScript?",
        questionType: "text",
        answerSelectionType: "single",
        answers: ["Function inside loop", "Function + its lexical scope", "Function with no return", "Function returned from another"],
        correctAnswer: "2",
        messageForCorrectAnswer: "Smart pick!",
        messageForIncorrectAnswer: "Nope!",
        explanation: "Closure = function + lexical scope it's defined in.",
        point: "5"
      }
    ]
  };

  // Shuffle questions once on component mount
  const [shuffledQuestions] = useState(() => {
    return [...quiz.questions].sort(() => Math.random() - 0.5);
  });

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelection = (answerIndex) => {
    pause(); // Pause timer
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex !== null && 
                     (answerIndex + 1).toString() === currentQuestion.correctAnswer;
    
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prevScore => prevScore + parseInt(currentQuestion.point));
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswerStatus(null);
      setShowExplanation(false);
      resetTimer();
    } else {
      // Quiz completed
      const newResult = {
        date: new Date().toLocaleString(),
        score: score,
        totalPossible: shuffledQuestions.length * 5
      };
      
      const updatedHistory = [...userHistory, newResult];
      setUserHistory(updatedHistory);
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setQuizCompleted(false);
    setShowExplanation(false);
    resetTimer();
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex) / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">🧠 {quiz.quizTitle}</h1>
          <p className="text-center mt-2 text-blue-100">{quiz.quizSynopsis}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="h-full bg-green-500 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Timer */}
        <div className="flex justify-between items-center px-6 py-3 bg-gray-50">
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
          </div>
          <div className={`font-mono text-lg font-bold ${seconds < 10 ? 'text-red-500' : 'text-blue-600'}`}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        {!quizCompleted ? (
          <div className="p-6">
            {/* Question */}
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              
              {/* Answers */}
              <div className="space-y-3">
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => !answerStatus && handleAnswerSelection(index)}
                    disabled={answerStatus !== null}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === index 
                        ? answerStatus === 'correct'
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : (parseInt(currentQuestion.correctAnswer) - 1 === index && answerStatus !== null)
                          ? 'bg-green-100 border-green-500'
                          : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{answer}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <p className="font-medium text-blue-800">
                  {answerStatus === 'correct' 
                    ? currentQuestion.messageForCorrectAnswer 
                    : currentQuestion.messageForIncorrectAnswer}
                </p>
                <p className="mt-2 text-gray-700">{currentQuestion.explanation}</p>
              </motion.div>
            )}

            {/* Next button */}
            {answerStatus !== null && (
              <div className="mt-6">
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-lg">
                Your score: <span className="font-bold text-blue-600">{score}</span> / {shuffledQuestions.length * 5}
              </p>
              <p className="mt-1 text-gray-500">
                {score >= shuffledQuestions.length * 4 
                  ? 'Excellent! You really know your JavaScript!'
                  : score >= shuffledQuestions.length * 3 
                    ? 'Good job! You have solid JavaScript knowledge.'
                    : score >= shuffledQuestions.length * 2
                      ? 'Not bad! Keep practicing your JavaScript skills.'
                      : 'Time to brush up on your JavaScript knowledge!'}
              </p>
              
              <button
                onClick={restartQuiz}
                className="mt-6 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
            
            {/* Previous scores */}
            {userHistory.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-lg mb-3">Your Quiz History</h3>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {userHistory.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-3 text-sm">{result.date}</td>
                          <td className="py-2 px-3 text-sm font-medium">
                            {result.score} / {result.totalPossible}
                            <span className="ml-2 text-xs text-gray-500">
                              ({Math.round((result.score / result.totalPossible) * 100)}%)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;