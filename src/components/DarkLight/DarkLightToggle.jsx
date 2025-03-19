import { useEffect, useState } from "react";

const DarkLightToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="toggle"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </label>
    </div>
  );
};

export default DarkLightToggle;
