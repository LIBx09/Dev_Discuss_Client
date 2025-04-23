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
import Vue from "../RightSidebar/vue.png"
import bootstrap from"../RightSidebar/bootstrap.jpg"
import django from "../RightSidebar/django.jpg"
import laravel from "../RightSidebar/laravel.jpg"
import mySQL from "../RightSidebar/mysql.jpg"
import postgreSQL from "../RightSidebar/PostgreSQL.png"
import prisma from "../RightSidebar/laravel.jpg"
import sass from "../RightSidebar/mysql.jpg"
import webpack from "../RightSidebar/PostgreSQL.png"
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
        {name: "Vue.js", logo: Vue, link: "https://vuejs.org/"},
        {name: "Bootstrap", logo: bootstrap, link: "https://getbootstrap.com/?utm_source=chatgpt.com"},
        {name: "Django ", logo: django, link: "https://www.djangoproject.com/"},
        {name: "Laravel", logo: laravel, link: "https://laravel.com/"},
        {name: "MySQL", logo: mySQL, link: "https://www.mysql.com/"},
        {name: "PostgreSQL", logo: postgreSQL, link: "https://www.postgresql.org/"},
        {name: "Prisma", logo: prisma, link: "https://www.prisma.io/"},
        {name: "Sass", logo: sass, link: "https://sass-lang.com/"},
        {name: "Webpack ", logo: webpack, link: " https://webpack.js.org/"},

    ];

    return (
        <div className="hidden lg:block">
            <div>
                <h4 className="text-center font-semibold pt-8">Explore Technogies</h4>
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {techLinks.map((tech, index) => (
                        <a
                            key={index}
                            href={tech.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-white shadow-md dark:bg-gray-800 hover:scale-110  hover:shadow-blue-300 px-4 py-4 rounded-md transition-all duration-300 w-full h-12"
                        >
                            <div className="flex items-center justify-center dark:bg-gray-800">
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