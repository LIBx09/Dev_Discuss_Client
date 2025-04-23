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
        <div className="relative w-full min-h-screen overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto border-t-8 border-t-blue-500 rounded-xl">
                {allData ? (
                    <div className="pt-8">
                        <div className="md:flex gap-10 items-center justify-between">
                            {/* Left: Photo */}
                            <div className="md:w-1/2 flex-1">
                                <img
                                    src={allData.photoUrl}
                                    alt={allData.name}
                                    className="w-full h-auto object-cover rounded-xl shadow-md"
                                />
                            </div>

                            {/* Right: Details */}
                            <div className="flex-1 space-y-5">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                    {allData.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-200">{allData.email}</p>
                                <p className="text-gray-700 font-medium dark:text-gray-200">🎓 Graduation:</p>
                                <p className="text-gray-600 dark:text-gray-200">{allData.graduation}</p>

                                <p className="text-gray-700 font-medium dark:text-gray-200">🗣 Languages:</p>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-200">
                                    {allData.languages?.map((lang, index) => (
                                        <li key={index}>{lang}</li>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <p className="text-gray-700 font-medium dark:text-gray-200">🔗 Links:</p>
                                    <div className="flex gap-4 flex-wrap text-blue-600 underline text-sm">
                                        {allData.facebook && (
                                            <a
                                                href={allData.facebook}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
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
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 dark:text-gray-200 font-medium pt-4">
                                    🎯 Career Objective:
                                </p>
                        <p className="text-gray-600 dark:text-gray-200 pt-4">{allData.careerObjective}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-200 text-xl mt-10">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AboutUsDetails;

