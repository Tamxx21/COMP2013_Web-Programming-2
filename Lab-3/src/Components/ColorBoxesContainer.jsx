import ColorBox from "./ColorBox.jsx";
import colors from "../data/data.js";
import "../App.css";

export default function ColorBoxesContainer() {
  const boxes = Array.from({ length: 25 }, () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  });

  return (
    <div className="color-grid">
      {boxes.map((color, index) => (
        <ColorBox key={index} initialColor={color} />
      ))}
    </div>
  );
}
