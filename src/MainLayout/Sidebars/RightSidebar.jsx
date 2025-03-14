import { FiMessageSquare } from "react-icons/fi";


const RightSidebar = () => {
    return (
        <div className="w-2/6 mx-auto space-y-3">
            <div className="border border-gray-300 rounded-md space-y-3 p-5">
                <h3 className="font-bold">The Discuss Blog</h3>
                <p>A look under the hood: How (and why) we built Question Assistant</p>
                <p>Junky data is like an out-of-tune guitar—it prevents AI harmony</p>
            </div>
            <div className="border border-gray-300 rounded-md space-y-3 p-5">
                <h3 className="font-bold">Featured on Meta</h3>
                <p className="flex items-center gap-3"><span><FiMessageSquare /></span>How might Chat evolve? Help us identify problems and opportunities</p>
                <p className="flex items-center gap-3"><span><FiMessageSquare /></span>Community Asks Sprint Announcement - March 2025</p>
                <p className="flex items-center gap-3"><span></span>policy: Generative AI (e.g., ChatGPT) is banned</p>
                <p className="flex items-center gap-3"><span></span>Is it better to redirect users who attempt to perform actions they can't yet...</p>
                <p className="flex items-center gap-3"><span></span>Stacks Editor development and testing</p>
                <div className="border border-gray-300"></div>
                <h3 className="font-bold">Hot Meta Posts</h3>
                <p className="flex items-center gap-1"><span></span>Just how perfect does a question have to be to leave SG?</p>
            </div>
            <div className=" border border-gray-300 rounded-md space-y-3 p-5">
                <h3 className="font-bold">Recently viewed posts</h3>
                <div>
                    <p>Why does TypeScript infer an intersection type (&) instead of a union (|) when assigning a generic mapped type?</p>
                    <div className="flex justify-between py-1">
                        <div className="flex items-center gap-1 text-gray-500">
                            <p>2 Votes .</p>
                            <p>1 Answer</p>
                        </div>
                        <p className="text-blue-500">+ Follow</p>
                    </div>
                </div>
                <div>
                    <p>Why does TypeScript infer an intersection type (&) instead of a union (|) when assigning a generic mapped type?</p>
                    <div className="flex justify-between py-1">
                        <div className="flex items-center gap-1 text-gray-500">
                            <p>2 Votes .</p>
                            <p>1 Answer</p>
                        </div>
                        <p className="text-blue-500">+ Follow</p>
                    </div>
                </div>
                <div>
                    <p>Why does TypeScript infer an intersection type (&) instead of a union (|) when assigning a generic mapped type?</p>
                    <div className="flex justify-between py-1">
                        <div className="flex items-center gap-1 text-gray-500">
                            <p>2 Votes .</p>
                            <p>1 Answer</p>
                        </div>
                        <p className="text-blue-500">+ Follow</p>
                    </div>
                </div>
                <div>
                    <p>Why does TypeScript infer an intersection type (&) instead of a union (|) when assigning a generic mapped type?</p>
                    <div className="flex justify-between py-1">
                        <div className="flex items-center gap-1 text-gray-500">
                            <p>2 Votes .</p>
                            <p>1 Answer</p>
                        </div>
                        <p className="text-blue-500">+ Follow</p>
                    </div>
                </div>
                <div>
                    <p>Why does TypeScript infer an intersection type (&) instead of a union (|) when assigning a generic mapped type?</p>
                    <div className="flex justify-between py-1">
                        <div className="flex items-center gap-1 text-gray-500">
                            <p>2 Votes .</p>
                            <p>1 Answer</p>
                        </div>
                        <p className="text-blue-500">+ Follow</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;