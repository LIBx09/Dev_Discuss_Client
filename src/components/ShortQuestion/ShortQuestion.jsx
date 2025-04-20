import { BsLightningCharge } from "react-icons/bs";
import { Link } from "react-router-dom";


const ShortQuestionCard = () => {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-blue-400 transition-all duration-300 border-t-4 border-blue-600 max-w-sm mx-auto">
        <div className="flex items-center gap-4 mb-4">
            <div className="text-blue-600 text-3xl">
            <BsLightningCharge />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Short Q&A Sprint</h2>
                <p className="text-sm text-gray-500">	Rapid-fire theoretical questions</p>
            </div>
        </div>
        <p className="text-gray-700 mb-4">
        Sharpen your core concepts with quick answer challenges. Perfect for brushing up your knowledge.
        </p>
<Link to={'/shortQuestions'}>
<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Start Now
        </button>
</Link>
    </div>
    );
};

export default ShortQuestionCard;