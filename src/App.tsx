import { useEffect, useState } from "react";

import * as images from "./assets/images";
import ImageSelector from "./components/ImageSelector";

import Slide from "./components/Slide";
import StatusBar from "./components/StatusBar";
import SizeSelector from "./components/SizeSelector";
import Win from "./components/Win";

const App : React.FC = () => {

  const [actualImage, setActualImage] = useState(images.Arvore);
  const [gridSize, setGridSize] = useState(3);
  const [showNumbers, setShowNumbers] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [moves, setMoves] = useState(0);

  const setImage = (value : string) => {
    setActualImage(images[value as keyof typeof images]);
  }

  const increaseMoves = () => {
    setMoves(prev => prev + 1);
  }

  useEffect(() => {
    setMoves(0);
    setIsWinner(false);
  }, [gridSize, actualImage])

  return (
    <div id="app">
      <Slide actualImage={actualImage} showNumbers={showNumbers} gridSize={gridSize} setIsWinner={setIsWinner} increaseMoves={increaseMoves}/>
      <StatusBar handleHideNumbers={() => setShowNumbers(prev => !prev)} moves={moves} />
      <ImageSelector images={images} actualImage={actualImage} setActualImage={setImage}/>
      <SizeSelector selectedSize={gridSize} setSelectedSize={setGridSize} />
      <Win isWinner={isWinner}/>
    </div>
  )
}

export default App;
