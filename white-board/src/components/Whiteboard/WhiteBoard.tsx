// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './whiteboard.css'
import rough from 'roughjs'


const roughGenerator=rough.generator();
// const socket = io('http://localhost:8000');

interface Element {
  // Define the actual structure of elements here
  type: string;
  offsetX: number;
  offsetY: number;
  height:number,
  width:number,
  path: number[][];
  stroke: string;
 
}

type Point = [number, number];



interface WhiteBoardProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  tool:string;

}

const WhiteBoard: React.FC<WhiteBoardProps> = ({ canvasRef, ctxRef, elements, setElements,tool }) => {

  const [isDrawing, setIsDrawing]=useState(false);

useEffect(()=>{
        
  const canvas=canvasRef.current;
  

  if(canvas){
    canvas.height=window.innerHeight*2;
    canvas.width=window.innerWidth*2;
  const ctx=canvas.getContext("2d")

  ctxRef.current=ctx
  }

},[])

useLayoutEffect(() => {
  const canvas = canvasRef.current;
  if(canvasRef.current&&ctxRef.current)
  if(elements.length>0){
    ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
  
}
  if (canvas) {
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      if(element.type==="pencil"){
      const pathPoints: Point[] = element.path.map(([x, y]) => [x, y] as Point);
      roughCanvas.linearPath(pathPoints);
      }
      else if(element.type==="rect"){
roughCanvas.draw(
  roughGenerator.rectangle(
    element.offsetX,
    element.offsetY,
    element.width,
    element.height
  )
)
      }
      else if(element.type==="line"){
        roughCanvas.draw(
        roughGenerator.line(element.offsetX,element.offsetY,element.width,element.height)
        );
      }
    });
  }
}, [elements, canvasRef]);

const handleMouseDown=(e:React.MouseEvent)=>{
    const {offsetX, offsetY}=e.nativeEvent
    

     if(tool==="pencil"){
      setElements((prevElements)=>[
        ...prevElements,
        {
          type:"pencil",  
          offsetX,
          offsetY,
          path:[[offsetX,offsetY]],
          stroke:"black",
  
        },
       ]
  
       )
     }
  else if(tool==="line"){
    setElements((prevElements)=>[
      ...prevElements,
      {
        type:"line",
        offsetX,
        offsetY,
        width:offsetX,
        height:offsetY,
        stroke:"black",

      },
     ])
  }
  else if(tool==="rect"){
    setElements((prevElements)=>[
      ...prevElements,
      {
        type:"rect",
        offsetX,
        offsetY,
        width:0,
        height:0,
        stroke:"black",

      },
     ])
  }
    setIsDrawing(true);
}

const handleMouseMove = (e: React.MouseEvent) => {
  const { offsetX, offsetY } = e.nativeEvent;



  if (isDrawing) {
    if(tool==="pencil"){
    const { path } = elements[elements.length - 1];
    const newPath = [...path, [offsetX, offsetY]];

   
      setElements((prevElements) =>
      prevElements.map((ele, index) => {
        if (index === elements.length - 1) {
          return {
            ...ele,
            path: newPath,
          };
        } else {
          return ele;
        }
      })
    );
    }else if(tool==="line"){
      setElements((prevElements) =>
      prevElements.map((ele, index) => {
        if (index === elements.length - 1) {
          return {
            ...ele,
            width:offsetX,
            height:offsetY,
          };
        } else {
          return ele;
        }
      })
    );
    }
    else if(tool==="rect"){
      setElements((prevElements) =>
      prevElements.map((ele, index) => {
        if (index === elements.length - 1) {
          return {
            ...ele,
            width:offsetX-ele.offsetX,
            height:offsetY-ele.offsetY,
          };
        } else {
          return ele;
        }
      })
    );
    }
 
  }
};

 const handleMouseUp=()=>{
    setIsDrawing(false);
 }

  return(
  
  <div className="main-can"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}>
  <canvas
   ref={canvasRef}

   >

  </canvas> 
  </div>
  
  )

};

export default WhiteBoard;
