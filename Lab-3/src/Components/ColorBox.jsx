import { useState } from "react";
import colors from "../data/data.js";
import "../App.css";

export default function ColorBox({ initialColor }) {
  const [color, setColor] = useState(initialColor);

  const handleClick = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
  };

  return (
    <div
      className="color-box"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    />
  );
}
