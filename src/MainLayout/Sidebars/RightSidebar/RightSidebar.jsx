import reactLogo from "../RightSidebar/react.png"
import jsLogo from "../RightSidebar/js.png"
import reduxLogo from "../RightSidebar/redux.png"
import mongodbLogo from "../RightSidebar/mongo.png"
import expressJSLogo from "../RightSidebar/EXPRESS.png"
import HTMLLogo from "../RightSidebar/HTML.png"
import CSSLogo from "../RightSidebar/CSS.png"
import TSLogo from "../RightSidebar/typeScript.png"
import nextLogo from "../RightSidebar/next.js.png"
import tailwindLogo from "../RightSidebar/tailwind.png"
import reactRouterdLogo from "../RightSidebar/reactRouter.png"
const RightSidebar = () => {

    return (
        <div className="hidden lg:block ">
            <div>
                <h4 className="text-center font-semibold pt-9">Explore now</h4>
                <div className="flex items-center justify-center gap-4 pt-5 pb-7">
                    <a href="https://react.dev/" target="_blank">
                        <div className=" cursor-pointer">
                            <div className="flex items-center gap-1">
                                <img className="h-5 w-5" src={reactLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">React</h3>
                            </div>
                        </div>
                    </a>
                    <a href="https://www.javascript.com/" target="_blank">
                        <div className=" cursor-pointer">
                            <div className="flex items-center gap-1">
                                <img className="h-5 w-5" src={jsLogo} alt="reactLogo" />
                                <h3 className="  hover:text-blue-500">javaScript</h3>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 pb-7">
                    <a href="https://www.w3schools.com/css/" target="_blank">
                        <div className="  cursor-pointer">
                            <div className="flex items-center gap-1">
                                <img className="h-5 w-5" src={CSSLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">CSS</h3>
                            </div>
                        </div>
                    </a>
                    <a href="https://www.typescriptlang.org/" target="_blank">
                        <div className=" cursor-pointer">
                            <div className="flex items-center gap-1">
                                <img className="h-5 w-5" src={TSLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">TypeScript</h3>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 pb-7">
                    <a href="https://redux.js.org/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img className="h-6 w-6" src={reduxLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">Redux</h3>
                            </div>
                        </div>
                    </a>
                    <a href="https://nextjs.org/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img className="h-6 w-6" src={nextLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">Next.js</h3>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 pb-7">
                    <a href="https://tailwindcss.com/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img className="h-7 w-7" src={tailwindLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">Tailwind CSS</h3>
                            </div>
                        </div>
                    </a>
                    <a href="https://reactrouter.com/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img className="h-6 w-6" src={reactRouterdLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">React Router</h3>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center gap-3 px-2 pb-7">
                    <a href="https://www.mongodb.com/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img className="h-5 w-5" src={mongodbLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">MongoDB</h3>
                            </div>
                        </div>
                    </a>
                    <a href="https://html.com/" target="_blank">
                        <div className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                <img className="h-6 w-6" src={HTMLLogo} alt="reactLogo" />
                                <h3 className=" hover:text-blue-500">HTML</h3>
                            </div>
                        </div>
                    </a>
                </div>
                <a href="https://expressjs.com/" target="_blank">
                    <div className="cursor-pointer px-2">
                        <div className="flex items-center gap-2">
                            <img className="h-5 w-5" src={expressJSLogo} alt="reactLogo" />
                            <h3 className=" hover:text-blue-500">Express.js</h3>
                        </div>
                    </div>
                </a>
            </div>
        </div >
    );
};

export default RightSidebar;