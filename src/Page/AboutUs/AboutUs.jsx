import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    fetch("/we.json")
      .then((res) => res.json())
      .then((data) => setTeamData(data));
  }, []);

  const firstRowItems = teamData.slice(0, 3);
  const remainingItems = teamData.slice(3);

  return (
    <section
      id="about-us"
      className="w-full min-h-screen px-4 py-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Meet The Team
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            The creative minds behind DevDiscuss – passionate developers, designers, and dreamers building something impactful.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[...firstRowItems, ...remainingItems].map((data) => (
            <div
              key={data.id}
              className="p-6 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition duration-300 hover:scale-105"
            >
              <div className="flex justify-center">
                <img
                  src={data.photoUrl}
                  alt={data.name}
                  className="h-28 w-28 rounded-full border-4 border-purple-500 shadow-[0_0_20px_#a855f7] transition-all duration-300"
                />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {data.name}
              </h3>

              <div className="flex justify-center gap-4 mt-3 text-xl text-gray-300">
                {data.facebook && (
                  <a href={data.facebook} target="_blank" rel="noreferrer">
                    <BsFacebook className="hover:text-blue-500 transition" />
                  </a>
                )}
                {data.github && (
                  <a href={data.github} target="_blank" rel="noreferrer">
                    <FaGithub className="hover:text-gray-200 transition" />
                  </a>
                )}
                {data.portfolio && (
                  <a href={data.portfolio} target="_blank" rel="noreferrer">
                    <ImProfile className="hover:text-purple-400 transition" />
                  </a>
                )}
              </div>

              <Link to={`/aboutUsDetails/${data.id}`}>
                <p className="mt-4 text-center text-sm font-medium text-purple-400 hover:underline hover:text-pink-400 transition flex items-center justify-center gap-2">
                  Read More <BiRightArrowAlt className="text-lg" />
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;