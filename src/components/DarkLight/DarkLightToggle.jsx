import { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Set data-theme attribute for theme switching
    root.setAttribute("data-theme", theme);

    // Update localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className=" flex items-center justify-center">
      {theme === "dark" ? (
        <span className="text-[var(--button-text)]"><img className="w-8 h-8" src="https://img.icons8.com/ios/50/sun--v1.png" alt="sun--v1"/></span>
      ) : (
        <span className="text-[var(--button-text)]"><img className="w-8 h-8" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/external-night-mode-ecommerce-user-interface-inkubators-detailed-outline-inkubators.png" alt="external-night-mode-ecommerce-user-interface-inkubators-detailed-outline-inkubators"/></span>
      )}
    </button>
  );
};

export default DarkLightToggle;