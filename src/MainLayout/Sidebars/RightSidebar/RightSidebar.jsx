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
import bootstrap from "../RightSidebar/bootstrap.jpg"
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
    { name: "Vue.js", logo: Vue, link: "https://vuejs.org/" },
    { name: "Bootstrap", logo: bootstrap, link: "https://getbootstrap.com/" },
    { name: "Django", logo: django, link: "https://www.djangoproject.com/" },
    { name: "Laravel", logo: laravel, link: "https://laravel.com/" },
    { name: "MySQL", logo: mySQL, link: "https://www.mysql.com/" },
    { name: "PostgreSQL", logo: postgreSQL, link: "https://www.postgresql.org/" },
    { name: "Prisma", logo: prisma, link: "https://www.prisma.io/" },
    { name: "Sass", logo: sass, link: "https://sass-lang.com/" },
    { name: "Webpack", logo: webpack, link: "https://webpack.js.org/" },
  ];

  return (
    <section 
      className="hidden lg:block w-full px-4 py-10"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-2xl font-bold text-center mb-8"
          style={{
            background: 'linear-gradient(to right, var(--button-bg), var(--button-hover-bg))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Explore Technologies
        </h2>
        <div className="grid gap-6 grid-cols-1">
          {techLinks.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 flex items-center gap-3"
              style={{
                background: 'var(--background)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderLeft: '4px solid var(--button-bg)'
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-6 h-6 rounded-full"
                style={{ border: '1px solid var(--button-bg)' }}
              />
              <span style={{ color: 'var(--text-color)' }}>{tech.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;