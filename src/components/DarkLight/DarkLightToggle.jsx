import { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
