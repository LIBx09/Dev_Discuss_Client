import { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <input
      type="checkbox"
      checked={theme === "dark"}
      className="toggle"
      onChange={toggleTheme}
    />
  );
};

export default DarkLightToggle;
