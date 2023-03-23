import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css";
import lightMode from "../assets/changeMode.svg";



export default function ThemeSelector() {
  const {  changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={lightMode}
          alt="switch mode icon"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
     
    </div>
  );
}
