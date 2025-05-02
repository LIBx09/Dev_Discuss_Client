import { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark");
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkLightToggle;