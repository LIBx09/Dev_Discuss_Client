import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { FaRocket } from "react-icons/fa";
import Editor from '@monaco-editor/react';
import LoadingPage from "../Loading/LoadingPage";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";

const ProblemSolve = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const [nextButton,setNextButton]=useState(false)
  const {user}= useContext(AuthContext)
  const [code, setCode] = useState("// Write your JavaScript solution here");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://localhost:5000/problem/${id}`);
      setProblem(data);

    } catch (err) {
      console.error("Error fetching problem:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const userCode = editorRef.current ? editorRef.current.getValue() : code;
      const problemDes= problem?.description
      console.log(problemDes, userCode);
      const email = user.email
      // Here you would send the code to your backend
      const {data} = await axios.post(`http://localhost:5000/problemProgress/${id}`, {
         userCode,
        problemDes,
        email
      });
      console.log(data)
      // Process the response as needed
      setTimeout(() => {
   toast.success(data?.message)
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting solution:", error);
      toast.error("Failed to submit solution");
      setIsSubmitting(false);
    }finally{
      setNextButton(true)
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Problem Header */}
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <FaRocket /> {problem?.title}
        </h3>
        {problem?.difficulty && (
          <span className={`text-sm px-2 py-1 rounded-full inline-block mt-2 ${
            problem.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 
            problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {problem.difficulty}
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
     
        <div className="w-full md:w-1/3 p-4 overflow-y-auto border-b md:border-b-0 md:border-r">
          <div className="prose max-w-none">
            <h4 className="text-lg font-medium mb-2">Problem Description</h4>
            <p className="text-gray-700 whitespace-pre-line">{problem?.description}</p>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">JavaScript</span>
    {
      nextButton ? <Link to={'/problems'}><button className="btn bg-green-700 text-white">Back to Problems</button></Link>:        <button 
      onClick={handleSubmit}
      disabled={isSubmitting}
      className={`px-4 py-2 rounded text-white font-medium ${
        isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Solution'}
    </button>
    }
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                lineNumbers: 'on',
                tabSize: 2,
                formatOnPaste: true,
                cursorBlinking: 'smooth',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;