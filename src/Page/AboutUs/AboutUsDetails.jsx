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
      className="w-full min-h-screen px-4 py-16 bg-[var(--background)]"
    >
      <div className="max-w-6xl mx-auto">
        {allData ? (
          <div className="flex flex-col md:flex-row items-center gap-10 p-8 rounded-2xl shadow-md border border-[var(--text-color)]/20 bg-[var(--background)]">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <img
                src={allData.photoUrl}
                alt={allData.name}
                className="h-44 w-44 rounded-full border-4 border-[var(--button-bg)] shadow-[0_0_30px_var(--button-bg)] transition-all duration-300 object-cover"
              />
            </div>

            {/* Text Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-[var(--button-bg)]">
                {allData.name}
              </h2>
              <p className="text-[var(--text-color)]/70 text-sm mt-1 mb-3">
                {allData.email}
              </p>

              <div className="space-y-2 text-[var(--text-color)]">
                <p className="font-semibold">🎓 Graduation:</p>
                <p>{allData.graduation}</p>

                <p className="font-semibold mt-3">🗣 Languages:</p>
                <ul className="list-disc list-inside">
                  {allData.languages?.map((lang, idx) => (
                    <li key={idx}>{lang}</li>
                  ))}
                </ul>

                <p className="font-semibold mt-4">🔗 Social Links:</p>
                <div className="flex gap-4 flex-wrap text-sm text-[var(--button-bg)] underline">
                  {allData.facebook && (
                    <a
                      href={allData.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--button-hover-bg)] transition"
                    >
                      Facebook
                    </a>
                  )}
                  {allData.linkedin && (
                    <a
                      href={allData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--button-hover-bg)] transition"
                    >
                      LinkedIn
                    </a>
                  )}
                  {allData.github && (
                    <a
                      href={allData.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--button-hover-bg)] transition"
                    >
                      GitHub
                    </a>
                  )}
                  {allData.portfolio && (
                    <a
                      href={allData.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--button-hover-bg)] transition"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>

              {/* Career Objective */}
              <div className="mt-6">
                <p className="font-semibold text-[var(--button-bg)] text-lg">
                  🎯 Career Objective:
                </p>
                <p className="mt-2 text-[var(--text-color)] leading-relaxed">
                  {allData.careerObjective}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-[var(--text-color)] text-xl mt-10">
            Loading...
          </p>
        )}
      </div>
    </section>
  );
};

export default AboutUsDetails;