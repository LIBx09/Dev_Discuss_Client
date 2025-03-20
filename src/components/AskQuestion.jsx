import question from "../assets/Questions.png"

const AskQuestion = () => {
    return (
        <div>
            <div className="flex  justify-between">
                <h2 className="md:text-3xl md:pt-6 pt:0 font-semibold text-lg">Ask a public question</h2>
                <img className="h-28 w-80  hidden md:block" src={question} alt="" />
            </div>
            <div>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend md:text-xl text-md">Title</legend>
                    <p className="fieldset-label">Be specific and imagine you’re asking a question to another person</p>
                    <input type="text" className="input w-full" placeholder="Enter a title for your question" />
                </fieldset>
            </div>
            <fieldset className="fieldset">
                <legend className="fieldset-legend md:text-xl text-md">Body</legend>
                <p className="fieldset-label">Include all the information someone would need to answer your question</p>
                <textarea className="textarea min-h-60 w-full row-span-12" placeholder="Enter a body for your question"></textarea>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend md:text-xl text-md">Tags</legend>
                <p className="fieldset-label">Add  tags to describe what your question is about</p>
                <select defaultValue="Medium" className="select select-md w-full">
                    <option disabled={true}>javascript</option>
                    <option>React.js</option>
                    <option>Next.js</option>
                    <option>redux</option>
                    <option>Node.js</option>
                    <option>Express.js</option>
                    <option>Firebase</option>
                    <option>Tailwind CSS</option>
                    <option>MongoDB</option>
                    <option>typescript</option>
                </select>
            </fieldset>
        <button className="bg-blue-500 hover:bg-blue-700 rounded-sm text-white px-2 py-2 font-semibold mt-8">Add your Question</button>
        </div>
    );
};

export default AskQuestion;