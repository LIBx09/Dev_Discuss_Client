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
      className="w-full min-h-screen px-4 py-16 bg-[var(--background)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[var(--button-bg)]">
            Meet The Team
          </h1>
          <p className="text-[var(--text-color)]/70 mt-4 max-w-xl mx-auto">
            The creative minds behind DevDiscuss – passionate developers,
            designers, and dreamers building something impactful.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-[var(--button-bg)] rounded-full" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[...firstRowItems, ...remainingItems].map((data) => (
            <div
              key={data.id}
              className="p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 hover:scale-105 border border-[var(--text-color)]/20"
            >
              <div className="flex justify-center">
                <img
                  src={data.photoUrl}
                  alt={data.name}
                  className="h-28 w-28 rounded-full border-4 border-[var(--button-bg)] shadow-[0_0_20px_var(--button-bg)] transition-all duration-300"
                />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-center text-[var(--button-bg)]">
                {data.name}
              </h3>

              <div className="flex justify-center gap-4 mt-3 text-xl text-[var(--text-color)]">
                {data.facebook && (
                  <a href={data.facebook} target="_blank" rel="noreferrer">
                    <BsFacebook className="hover:text-[var(--button-bg)] transition" />
                  </a>
                )}
                {data.github && (
                  <a href={data.github} target="_blank" rel="noreferrer">
                    <FaGithub className="hover:text-[var(--button-bg)] transition" />
                  </a>
                )}
                {data.portfolio && (
                  <a href={data.portfolio} target="_blank" rel="noreferrer">
                    <ImProfile className="hover:text-[var(--button-bg)] transition" />
                  </a>
                )}
              </div>

              <Link to={`/aboutUsDetails/${data.id}`}>
                <p className="mt-4 text-center text-sm font-medium text-[var(--button-bg)] hover:underline hover:text-[var(--button-hover-bg)] transition flex items-center justify-center gap-2">
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