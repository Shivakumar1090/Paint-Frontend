import React from "react";
import "../App.css";
import Button from "@material-ui/core/Button/Button";
  
const Menu = ({ setLineColor, setLineWidth, 
setLineOpacity ,onErase}) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => {
          setLineOpacity(e.target.value / 100);
        }}
      />
      <Button onClick={onErase} style={{background:'#000' , color: '#fff' }} size='small'>clear</Button>
    </div>
  );
};
  
export default Menu;