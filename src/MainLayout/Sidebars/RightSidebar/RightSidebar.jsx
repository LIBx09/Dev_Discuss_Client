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
    const techLinks = [
        { name: "React", logo: reactLogo, link: "https://react.dev/" },
        { name: "JavaScript", logo: jsLogo, link: "https://www.javascript.com/" },
        { name: "CSS", logo: CSSLogo, link: "https://www.w3schools.com/css/" },
        { name: "TypeScript", logo: TSLogo, link: "https://www.typescriptlang.org/" },
        { name: "Redux", logo: reduxLogo, link: "https://redux.js.org/" },
        { name: "Next.js", logo: nextLogo, link: "https://nextjs.org/" },
        { name: "Tailwind CSS", logo: tailwindLogo, link: "https://tailwindcss.com/" },
        { name: "React Router", logo: reactRouterdLogo, link: "https://reactrouter.com/" },
        { name: "MongoDB", logo: mongodbLogo, link: "https://www.mongodb.com/" },
        { name: "HTML", logo: HTMLLogo, link: "https://html.com/" },
        { name: "Express.js", logo: expressJSLogo, link: "https://expressjs.com/" },
    ];

    return (
        <div className="hidden lg:block">
            <div>
                <h4 className="text-center font-semibold pt-9">Explore Technologies</h4>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {techLinks.map((tech, index) => (
                        <a
                            key={index}
                            href={tech.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-white border dark:bg-gray-800 hover:scale-110  hover:border-blue-300 px-4 py-4 rounded-md transition-all duration-300 w-full h-12"
                        >
                            <div className="flex items-center gap-1 justify-center dark:bg-gray-800">
                                <img src={tech.logo} alt={tech.name} className="h-4 w-4" />
                                <h3 className="hover:text-blue-500 text-xs">{tech.name}</h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;