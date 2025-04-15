import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import reactLogo from "../RightSidebar/react.png";
import jsLogo from "../RightSidebar/js.png";
import reduxLogo from "../RightSidebar/redux.png";
import firebaseLogo from "../RightSidebar/firebase.png";
import mongodbLogo from "../RightSidebar/mongo.png";
import nodeJSLogo from "../RightSidebar/node.png";
import expressJSLogo from "../RightSidebar/EXPRESS.png";
import HTMLLogo from "../RightSidebar/HTML.png";
import CSSLogo from "../RightSidebar/CSS.png";
import TSLogo from "../RightSidebar/typeScript.png";
import nextLogo from "../RightSidebar/next.js.png";
import tailwindLogo from "../RightSidebar/tailwind.png";
import reactRouterdLogo from "../RightSidebar/reactRouter.png";

const RightSidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="hidden lg:block">
      <div className="space-y-4">
        {user ? (
          <Link to="/myProfile">
            <div className="shadow-md cursor-pointer">
              <img
                className="rounded-full h-12 w-12 mx-auto my-4"
                src={user?.photoURL}
                alt="userPhoto"
              />
              <p className="text-center">{user?.displayName}</p>
              <p className="text-center py-2">{user?.email}</p>
            </div>
          </Link>
        ) : null}
        <h2 className="text-center py-3 text-blue-400 font-bold text-xl">Explore Coding</h2>
        {[
          { name: "React", logo: reactLogo, link: "https://react.dev/" },
          { name: "JavaScript", logo: jsLogo, link: "https://www.javascript.com/" },
          { name: "CSS", logo: CSSLogo, link: "https://www.w3schools.com/css/" },
          { name: "TypeScript", logo: TSLogo, link: "https://www.typescriptlang.org/" },
          { name: "Redux", logo: reduxLogo, link: "https://redux.js.org/" },
          { name: "Next.js", logo: nextLogo, link: "https://nextjs.org/" },
          { name: "Tailwind CSS", logo: tailwindLogo, link: "https://tailwindcss.com/" },
          { name: "React Router", logo: reactRouterdLogo, link: "https://reactrouter.com/" },
          { name: "MongoDB", logo: mongodbLogo, link: "https://www.mongodb.com/" },
          { name: "Node.js", logo: nodeJSLogo, link: "https://nodejs.org/en" },
          { name: "Firebase", logo: firebaseLogo, link: "https://firebase.google.com/" },
          { name: "HTML", logo: HTMLLogo, link: "https://html.com/" },
          { name: "Express.js", logo: expressJSLogo, link: "https://expressjs.com/" },
        ].map((tech, index) => (
          <a href={tech.link} target="_blank" key={index} rel="noreferrer">
            <div className="border border-gray-300 rounded-xl shadow-md p-5 cursor-pointer my-2">
              <div className="flex items-center gap-2">
                <img className="h-12 w-12" src={tech.logo} alt={`${tech.name} logo`} />
                <h3 className="text-lg font-semibold hover:text-blue-500">
                  {tech.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;