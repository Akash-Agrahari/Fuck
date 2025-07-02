import {React, useRef, useEffect} from "react";


function Cursor() {

    let cursorRef = useRef(null);
    useEffect(()=>{
        const cursor = cursorRef.current;

        const mouse = (event) => {
        
            cursor.style.transform = `translate(${event.clientX - 10}px, ${event.clientY - 10}px)`
        
        }

        window.addEventListener("mousemove", mouse);

        return ()=> window.removeEventListener("mousemove", mouse);
    },[])

  return (
    <div ref={cursorRef}
      className="cursor"
      style={{
        transition: "transform 0.2s ease-out",
        pointerEvents: "none",
        border: "none",
        borderRadius: "50%",
        zIndex: 9999,
        position: "absolute",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        backgroundColor: "#e2e2e2",
      }}
    ></div>
  );
}

export default Cursor;
