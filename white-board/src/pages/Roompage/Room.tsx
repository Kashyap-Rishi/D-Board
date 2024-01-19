import { useState } from "react"
import WhiteBoard from "../../components/Whiteboard/WhiteBoard";
import './room.css'

const Room = () => {

const [tool,setTool]=useState("pencil");
const [color,setColor]=useState("black");

  return (
    <div>
         <h1>Whiteboard sharing app</h1>
         <div className="board-elements">
            <div className="tool-options">
                <div>
                    <label htmlFor="pencil">Pencil</label>
                <input
                  type="radio"
                  name="tool"
                  value="pencil"
                  checked={tool=== "pencil"}
                  onChange={(e)=>setTool(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="line">Line</label>
                <input
                  type="radio"
                  name="tool"
                  value="line"
                  checked={tool=== "line"}
                  onChange={(e)=>setTool(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="rect">Rect</label>
                <input
                  type="radio"
                  name="tool"
                  value="rect"
                  checked={tool=== "rect"}
                  onChange={(e)=>setTool(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="color">Select Color:</label>
                    <input
                    type="color"
                    id="color" 
                    onChange={(e)=>setColor(e.target.value)}
                    />
                </div>
                
            </div>
            <div >
<button>Undo</button>
<button>Redo</button>
            </div>
            <div>
                <button>Clear Canvas</button>
            </div>
         </div>

          <div className="canvas-box">
            <WhiteBoard/>
          </div>

    </div>
  )
}

export default Room