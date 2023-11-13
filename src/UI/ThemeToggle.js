import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/ThemeReducer";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleThemeHandler = () => dispatch(themeActions.toggleTheme());
  return (
    <button className="mr-4 text-xl bg-purple-400 rounded-full p-2" onClick={toggleThemeHandler} title="mode">
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
