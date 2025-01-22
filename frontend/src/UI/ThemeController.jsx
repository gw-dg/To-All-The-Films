import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function ThemeController() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const formatThemeName = (themeName) => {
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-2">
      {/* <IoSettingsOutline className="w-5 h-5" /> */}
      <select
        value={theme}
        onChange={handleThemeChange}
        className="select select-ghost w-full max-w-full h-8 min-h-8">
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {formatThemeName(themeName)}
          </option>
        ))}
      </select>
    </div>
  );
}
