import { useEffect, useState, useRef } from "react";
import Simon from "./components/Simon";
import beep1 from "./sounds/beep1.wav";
import beep2 from "./sounds/beep2.wav";
import beep3 from "./sounds/beep3.wav";
import beep4 from "./sounds/beep4.wav";

const colors = ["green", "red", "yellow", "blue"];

const App : React.FC = () => {

  const [score, setScore] = useState<number>(0);
  const [pattern, setPattern] = useState<string[]>([]);  
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const isShowingPattern = useRef<boolean>(false);
  const isBtnShowing = useRef<boolean>(false);
  const playerClickIndex = useRef<number | null>(null);
  const isMutedRef = useRef<boolean>(false);

  const [showingColors, setShowingColors] = useState({
    green : false,
    red : false,
    yellow : false,
    blue : false
  });

  const audios = useRef<Record<string, HTMLAudioElement | null>>({
    green: new Audio(beep1),
    red: new Audio(beep2),
    yellow: new Audio(beep3),
    blue: new Audio(beep4)
  });

  const startGame = () => {
    setScore(0);
    setPattern([]);
    playerClickIndex.current = null;
    setShowingColors({
      green : false,
      red : false,
      yellow : false,
      blue : false
    });
    setIsGameStart(true);
  }

  const generatePattern = () => {
    setPattern(prev => (
      [...prev, colors[Math.floor(Math.random() * colors.length)]]
    ));
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isGameStart) {setIsGameStart(false); return};

    generatePattern();
  }, [score, isGameStart]);

  const handlePlayerClick = (color : string) => {
    if (isShowingPattern.current || isBtnShowing.current) return;

    if (playerClickIndex.current === null) {
      playerClickIndex.current = 0;
    }

    if (pattern[playerClickIndex.current] !== color) {
      startGame();
      return;
    }

    playerClickIndex.current++;
    changeColor(color);
  }

  const changeColor = (color : string) => {
    if (!isBtnShowing.current) {
      isBtnShowing.current = true;
      setShowingColors(prev => ({
        ...prev,
        [color] : true
      }));
      if (!isMutedRef.current)
        audios.current[color]!.play();
      setTimeout(() => {
          setShowingColors(prev => ({
            ...prev,
            [color] : false
          }));
          if (!isMutedRef.current)
            audios.current[color]!.pause();
          if (playerClickIndex.current != null && playerClickIndex.current === pattern.length) {
            setScore(prev => prev! + 1);
            playerClickIndex.current = null;
          }
          isBtnShowing.current = false;
          return true;
      }, 800);
    }
  }

  useEffect(() => {
    if (pattern.length > 0) {
      isShowingPattern.current = true;
      let showingIndex = 0;
      const changeToNextColor = (showingIndex : number) => {
        if (showingIndex === pattern.length) {
          isShowingPattern.current = false;
          return;
        }        
        setTimeout(() => {
          changeColor(pattern[showingIndex]);
          changeToNextColor(showingIndex + 1);
        }, 900);
      }
      changeToNextColor(showingIndex);
    }
  }, [pattern]);

  return (
    <>
      <h1>Simon Says</h1>
      <div className="btns-container">
        <button className="play-btn" onClick={startGame}>Play</button>
        <span className={`sound-btn ${isMuted ? "clicked" : ""}`} onClick={() => {setIsMuted(prev => !prev); isMutedRef.current = !isMuted}}>{ isMuted ? <>&#128361;</> : <>&#128362;</>}</span>
      </div>
      <Simon score={score!} colors={colors} handlePlayerClick={handlePlayerClick} showingColors={showingColors}/>      
    </>
  );
}

export default App;