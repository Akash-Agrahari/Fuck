import {React, useEffect,useRef, useState} from 'react'

function Sound() {

    let [started, setStarted] = useState(false);
    const entrySound = useRef(null)
    const ambientSound = useRef(null)
    
   
  useEffect(() => {
    const handleMouseMove = () => {
      if (started || !entrySound.current) return;

      entrySound.current.play()
        .then(() => {
          entrySound.current.onended = () => {
            if (ambientSound.current) {
              ambientSound.current.loop = true;
              ambientSound.current.play().catch((err) =>
                console.warn("Ambient play error:", err)
              );
            }
          };
        })

      setStarted(true);
      window.removeEventListener("pointerdown", handleMouseMove);
    };

    window.addEventListener("pointerdown", handleMouseMove);

    return () => {
      window.removeEventListener("pointerdown", handleMouseMove);
    };
  }, [started]);


  return (
  <>
      <audio ref={entrySound} src="/transition.mp3" preload='auto' />
      <audio ref={ambientSound} src="/ambient.mp3" preload='auto' />
    </>
  )
}

export default Sound