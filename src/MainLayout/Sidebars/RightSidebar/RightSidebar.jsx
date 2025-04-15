import { useContext } from "react";
import { FiMessageSquare } from "react-icons/fi";
import AuthContext from "../../../Context/AuthContext";
import reactLogo from "../RightSidebar/react.png"
import jsLogo from "../RightSidebar/js.png"
import reduxLogo from "../RightSidebar/redux.png"
import firebaseLogo from "../RightSidebar/firebase.png"
import mongodbLogo from "../RightSidebar/mongo.png"
import nodeJSLogo from "../RightSidebar/node.png"
import expressJSLogo from "../RightSidebar/EXPRESS.png"
import HTMLLogo from "../RightSidebar/HTML.png"
import CSSLogo from "../RightSidebar/CSS.png"
import TSLogo from "../RightSidebar/typeScript.png"
import nextLogo from "../RightSidebar/next.js.png"
import tailwindLogo from "../RightSidebar/tailwind.png"
import reactRouterdLogo from "../RightSidebar/reactRouter.png"
import { Link } from "react-router-dom";
const RightSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="hidden lg:block ">
            <div className="space-y-4">
                {user ?
                    <Link to="/myProfile">
                        <div className="shadow-md cursor-pointer mb-4">
                            <img className="rounded-full h-12 w-12 mx-auto my-4" src={user?.photoURL} alt="userPhoto" />
                            <p className="text-center">{user?.displayName}</p>
                            <p className="text-center py-2">{user?.email}</p>
                        </div>
                    </Link>
                    : <div></div> }
                <a href="https://react.dev/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={reactLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">React</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components efficiently.</p>
                    </div>
                </a>
                <a href="https://www.javascript.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={jsLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">javaScript</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">JavaScript is a dynamic programming language used to create interactive effects on web pages and build full web applications.</p>
                    </div>
                </a>
                <a href="https://www.w3schools.com/css/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={CSSLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">CSS</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). </p>
                    </div>
                </a>
                <a href="https://www.typescriptlang.org/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={TSLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">TypeScript</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">TypeScript is a superset of JavaScript that adds static typing. It helps in writing safer and more manageable code for large projects.</p>
                    </div>
                </a>
                <a href="https://redux.js.org/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={reduxLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Redux</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Redux is a predictable state container for JavaScript apps, commonly used with React to manage application state.</p>
                    </div>
                </a>
                <a href="https://nextjs.org/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={nextLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Next.js</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Next.js is a React framework that enables server-side rendering, static site generation, and powerful routing.</p>
                    </div>
                </a>
                <a href="https://tailwindcss.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={tailwindLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Tailwind CSS</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Tailwind CSS is a utility-first CSS framework for building custom designs directly in markup with speed and flexibility.</p>
                    </div>
                </a>
                <a href="https://reactrouter.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={reactRouterdLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">React Router</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">React Router enables dynamic routing in React applications, allowing seamless navigation between views.</p>
                    </div>
                </a>
                <a href="https://www.mongodb.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={mongodbLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">MongoDB</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">MongoDB is a NoSQL database designed for flexibility and scalability, storing data in JSON-like documents.</p>
                    </div>
                </a>
                <a href="https://nodejs.org/en" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={nodeJSLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Node.js</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Node.js is a runtime environment that allows running JavaScript on the server side, enabling full-stack development with JS.</p>
                    </div>
                </a>
                <a href="https://firebase.google.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={firebaseLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Firebase</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Firebase is a platform by Google that provides backend services like authentication, database, hosting, and analytics.</p>
                    </div>
                </a>
                <a href="https://html.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={HTMLLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">HTML</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">HTML (Hypertext Markup Language) is a text-based approach to describing how content contained within an HTML file is structured. This markup tells a web browser how to display text, images and other forms of multimedia on a webpage.
                        </p>
                    </div>
                </a>
                <a href="https://expressjs.com/" target="_blank">
                    <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer mb-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12" src={expressJSLogo} alt="reactLogo" />
                            <h3 className="text-lg font-semibold hover:text-blue-500">Express.js</h3>
                        </div>
                        <p className="text-gray-500 pt-2 hover:text-blue-500">Express.js is a minimalist backend framework for Node.js, used to build web APIs and applications efficiently.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default RightSidebar;