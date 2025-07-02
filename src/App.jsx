import {React, useRef, Suspense} from 'react'
import {Canvas} from "@react-three/fiber"
import { Environment} from '@react-three/drei'
import Tyre from './Tyre'
import Cursor from './Cursor'
import Sound from './Sound'


function App() {

  let hoverSound = useRef(null);


  return (
    <>
      <Cursor />
    <Sound/>
    <Canvas camera={{fov: 75, position: [0, 0, 5]}}>
      <Environment preset="city" />
      <directionalLight position={[0, 2, 3]} intensity={3} />
    <Suspense fallback={null}>
      <Tyre  hoverSound={hoverSound}/>
    </Suspense>
    </Canvas>
    <audio ref={hoverSound} src="/hover.mp3" preload='auto' />
    </>
  )
}

export default App