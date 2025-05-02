import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

const Badges = ({ totalPoints = 0 }) => {
    const [badges, setBadges] = useState([
        {
            badgeTitle: "Bronze",
            Image: "https://i.ibb.co.com/mVxS6d0j/Bronze.png",
            BadegeDescription: "Your first steps on the platform – welcome aboard!",
            pointsRequired: 1,
            unlocked: false,
        },
        {
            badgeTitle: "Silver",
            Image: "https://i.ibb.co.com/pV2ywZN/Silver.png",
            BadegeDescription: "You're participating regularly – becoming a familiar face!",
            pointsRequired: 100,
            unlocked: false,
        },
        {
            badgeTitle: "Gold",
            Image: "https://i.ibb.co.com/7NGMMv7t/Gold.png",
            BadegeDescription: "You've contributed a lot – a truly active community member!",
            pointsRequired: 200,
            unlocked: false,
        },
        {
            badgeTitle: "Platinum",
            Image: "https://i.ibb.co.com/nqZKmJnx/Plutinum.png",
            BadegeDescription: "Your contributions are making a difference – you're valuable!",
            pointsRequired: 300,
            unlocked: false,
        },
        {
            badgeTitle: "Daimond",
            Image: "https://i.ibb.co.com/rRbGP4t7/Daimond.png",
            BadegeDescription: "Outstanding performance – you're lighting up the community!",
            pointsRequired: 400,
            unlocked: false,
        },
        {
            badgeTitle: "Legendary",
            Image: "https://i.ibb.co.com/N6c9zH0b/Legendary.png",
            BadegeDescription: "You're a legend! Your impact will be remembered in community history.",
            pointsRequired: 500,
            unlocked: false,
        },
    ]);

    useEffect(() => {
        const updatedBadges = badges.map((badge) => ({
            ...badge,
            unlocked: totalPoints >= badge.pointsRequired,
        }));
        setBadges(updatedBadges);
    }, [totalPoints]);

    return (
        <div>
            <h2 className="font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text text-center text-3xl pb-8">Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative group p-2 rounded-xl shadow-md text-center transition-all duration-300 border hover:scale-110
                        ${badge.unlocked ? "dark:bg-slate-800 border-pink-400  hover:shadow-lg" : "dark:bg-slate-600 opacity-70 border-purple-300 cursor-not-allowed"}`}
                    >
                        {!badge.unlocked && (
                            <>
                                <div className="absolute top-3 right-3 text-gray-600 dark:text-gray-300">
                                    <FaLock />
                                </div>
                                <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-sm text-purple-400 bg-black/60 px-3 py-1 rounded-md">
                                        Locked – Earn {badge.pointsRequired} points to unlock
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="flex items-center justify-center">
                            <img
                                className="h-28 w-28 object-contain mx-auto transition-transform duration-300 hover:scale-105"
                                src={badge.Image}
                                alt={badge.badgeTitle}
                            />
                        </div>

                        <h3 className="text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text font-semibold mt-2 dark:text-white">{badge.badgeTitle}</h3>
                        <p className="text-sm dark:text-gray-300">{badge.BadegeDescription}</p>
                        <p className="mt-2 text-sm text-purple-400 dark:text-gray-300">Required: {badge.pointsRequired} pts</p>

                        {badge.unlocked ? (
                            <span className="inline-block mt-2 text-pink-400 font-semibold animate-pulse">
                                🏆 Unlocked!
                            </span>
                        ) : (
                            <span className="inline-block mt-2 text-purple-500 dark:text-gray-300 font-semibold">
                                🔒 Locked
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Badges;
