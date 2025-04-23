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
    <div className="mx-4">
      <h2 className="md:text-3xl text-xl font-bold text-center">
        Team PH Polite
      </h2>

      {/* First row with grid */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {firstRowItems.map((data) => (
          <div
            key={data.name}
            className="border-t-8 border-blue-500 mt-8 rounded-2xl shadow-md hover:shadow-blue-300 hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <div className="flex items-center justify-center py-6">
              <img
                className="h-28 w-28 rounded-full border border-blue-500 shadow-[0_0_10px_#006eff] hover:scale-110 transition-all duration-300"
                src={data.photoUrl}
                alt=""
              />
            </div>
            <div className="flex items-center justify-center gap-3 pb-2">
              <a target="_blank" href={data.facebook}><p className="text-blue-500 text-xl"><BsFacebook /></p></a>
              <a target="_blank" href={data.github}><p className="text-xl"><FaGithub /></p></a>
              <a target="_blank" href={data.portfolio}><p className="text-lg text-blue-500"><ImProfile /></p></a>
            </div>
            <h4 className="text-center">{data.name}</h4>
            <Link to={`/aboutUsDetails/${data.id}`}>
              <p className="font-medium text-center pb-4 text-blue-500 hover:underline cursor-pointer hover:text-blue-600 flex items-center justify-center gap-2 "> <span>read more</span> <span className="text-lg pt-1">< BiRightArrowAlt /></span> </p></Link>
          </div>
        ))}
      </div>

      {/* Second row - center items manually */}
      {remainingItems.length > 0 && (
        <div className="md:flex justify-center items-center gap-10 mt-6">
          {remainingItems.map((data) => (
            <div
              key={data.name}
              className="md:w-[30%]  border-t-8 border-blue-500 mt-8 rounded-2xl shadow-md hover:shadow-blue-300 hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <div className="flex items-center justify-center py-6">
                <img
                  className="h-28 w-28 rounded-full border border-blue-500 shadow-[0_0_10px_#006eff] hover:scale-110 transition-all duration-300"
                  src={data.photoUrl}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center gap-3 pb-2">
                <a target="_blank" href={data.facebook}><p className="text-blue-500 text-xl"><BsFacebook /></p></a>
                <a target="_blank" href={data.github}><p className="text-xl"><FaGithub /></p></a>
                <a target="_blank" href={data.portfolio}><p className="text-lg text-blue-500"><ImProfile /></p></a>
              </div>
              <h4 className="text-center">{data.name}</h4>
              <Link to={`/aboutUsDetails/${data.id}`}>
                <p className="font-medium hover:underline cursor-pointer text-center pb-4 text-blue-500 hover:text-blue-600 flex items-center justify-center gap-1 "> <span>read more</span> <span className="text-lg pt-1">< BiRightArrowAlt /></span> </p></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
