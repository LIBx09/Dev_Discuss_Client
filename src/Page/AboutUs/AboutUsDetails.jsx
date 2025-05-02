import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AboutUsDetails = () => {
  const { id } = useParams();
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    fetch("/we.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id === id);
        setAllData(selected);
      });
  }, [id]);

  return (
    <section
      id="about-us-details"
      className="w-full min-h-screen px-4 py-16 text-white"
    >
      <div className="max-w-6xl mx-auto">
        {allData ? (
          <div className="flex flex-col md:flex-row items-center gap-10 p-8 rounded-2xl shadow-xl">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <img
                src={allData.photoUrl}
                alt={allData.name}
                className="h-44 w-44 rounded-full border-4 border-purple-500 shadow-[0_0_30px_#a855f7] transition-all duration-300 object-cover"
              />
            </div>

            {/* Text Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {allData.name}
              </h2>
              <p className="text-gray-300 text-sm mt-1 mb-3">{allData.email}</p>

              <div className="space-y-2 text-gray-200">
                <p className="font-semibold">🎓 Graduation:</p>
                <p>{allData.graduation}</p>

                <p className="font-semibold mt-3">🗣 Languages:</p>
                <ul className="list-disc list-inside">
                  {allData.languages?.map((lang, idx) => (
                    <li key={idx}>{lang}</li>
                  ))}
                </ul>

                <p className="font-semibold mt-4">🔗 Social Links:</p>
                <div className="flex gap-4 flex-wrap text-sm text-purple-300 underline">
                  {allData.facebook && (
                    <a href={allData.facebook} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  )}
                  {allData.linkedin && (
                    <a href={allData.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  )}
                  {allData.github && (
                    <a href={allData.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {allData.portfolio && (
                    <a href={allData.portfolio} target="_blank" rel="noreferrer">
                      Portfolio
                    </a>
                  )}
                </div>
              </div>

              {/* Career Objective */}
              <div className="mt-6">
                <p className="font-semibold text-purple-400 text-lg">
                  🎯 Career Objective:
                </p>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  {allData.careerObjective}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-300 text-xl mt-10">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default AboutUsDetails;