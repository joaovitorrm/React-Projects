import { useEffect, useState } from "react";
import Game from "./components/Game";
import Title from "./components/Title";
import WinScreen from "./components/WinScreen";

function App() {

  const [score, setScore] = useState<number>(0);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  const handleClick = () => {
    setIsResetting(true);
    setIsWin(false);
  };

  const scoreSetter = (newScoreParam : number) => {
    if (newScoreParam > score)
      setScore(newScoreParam);
  }

  useEffect(() => {
    if (isResetting)
      setIsResetting(false);
  }, [isResetting]);

  useEffect(() => {
    if (score >= 2048) {
      setIsWin(true);
    }
  }, [score]);

  return (
    <>
      <Title score={score} handleClick={handleClick} />
      <Game isResetting={isResetting} scoreSetter={scoreSetter} />
      <WinScreen shown={isWin} handleClick={handleClick}/>
    </>
  )
}

export default App;
