import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../App.css";
import { Link} from "react-router-dom";
import { Button } from "@material-ui/core";
import './style.css'

const Paint = ({isAuth}) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    
    // Initialization when the component
    // mounts for the first time
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = lineOpacity;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);
    
    // Function for starting the drawing
    const startDrawing = (e) => {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(
        e.nativeEvent.offsetX, 
        e.nativeEvent.offsetY
      );
      setIsDrawing(true);
    };
    
    // Function for ending the drawing
    const endDrawing = () => {
      ctxRef.current.closePath();
      setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
          return;
        }
        ctxRef.current.lineTo(
          e.nativeEvent.offsetX, 
          e.nativeEvent.offsetY
        );
          
        ctxRef.current.stroke();
    };

    const onErase = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    return ( 
        <div>
            {
                isAuth ? 
                    <div>
                        <h1>Paint App</h1>
                            <div className="draw-area">
                                <Menu
                                setLineColor={setLineColor}
                                setLineWidth={setLineWidth}
                                setLineOpacity={setLineOpacity}
                                onErase ={onErase}
                                />
                                <canvas
                                onMouseDown={startDrawing}
                                onMouseUp={endDrawing}
                                onMouseMove={draw}
                                ref={canvasRef}
                                width={`1280px`}
                                height={`720px`}
                                />
                            </div>
                    </div>
            : <div>
                <h4>Press login to continue</h4>
                <Button><Link to='/'>Login</Link></Button>
            </div>
            }
     </div>
     );
}
 
export default Paint;