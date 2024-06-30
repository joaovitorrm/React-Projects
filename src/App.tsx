import { useState, useEffect } from 'react'
import Glass from './components/Glass';
import Header from './components/Header';
import Win from './components/Win';

const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];

function App() {
  
  const [glassAmount, setGlassAmount] = useState<number>(6);
  const [glasses, setGlasses] = useState<string[][]>([]);
  const [glassesRefs, setGlassesRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [selected, setSelected] = useState<HTMLDivElement | null>();
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  // create random glasses
  useEffect(() => {
    const colorsCopy = [...colors];

    const newColors : string[] = [];
    for (let i = 0; i < glassAmount - 2; i++) {
      newColors.push(colorsCopy.splice(Math.floor(Math.random() * colorsCopy.length), 1)[0]);
      for (let j = 0; j < 3; j++) {
        newColors.push(newColors[newColors.length - 1]);
      }
    }
    newColors.sort(() => Math.random() - 0.5);

    const finalColors : string[][] = [];

    for (let i = 0; i < glassAmount; i++) {      
      finalColors.push(newColors.splice(0, 4));
    }

    setGlasses([...finalColors]);
    setIsResetting(false);
  }, [glassAmount, isResetting]);

  // check if there is a winner
  useEffect(() => {    
    if (glassesRefs.length === 0) return;
    const isWinner = glassesRefs.every((ref, index) => {
      if (ref.current === null) return true;
      if (ref.current.children.length === 0)
        return true;

      return [...ref.current!.children].every((child) => {
        if (glassesRefs[index].current!.children.length < 4)
          return false;
        return (ref.current!.children[0].classList[1] === child.classList[1]);
      })
    });
    if (isWinner) {
      setIsWin(true);
    };    
  }, [selected])

  // set glasses refs
  const glassesRefsSetter = (ref: React.RefObject<HTMLDivElement>) => {
    setGlassesRefs(prev => [...prev, ref]);
  }

  const handleChangeLevelClick = (n : number) => {
    setSelected(null);
    setGlassAmount(prev => {
      if (prev + n < 4) return 4;
      if (prev + n > colors.length + 2) return colors.length + 2;
      return prev + n
    });
  }

  const handleResetClick = () => {
    setIsWin(false);
    setIsResetting(true);
    setSelected(null);
  }

  // main logic
  const handleClick = (ref : React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;

    if (selected === ref.current) {
      ref.current.classList.remove("selected");
      setSelected(null);
      return;
    }

    if (selected && ref.current !== selected) {      
      selected.classList.remove("selected");
      selected.children[0].classList.remove("move-ball");
      if ((selected.children[0].classList[1] === ref.current.children[0]?.classList[1] && ref.current.children.length < 4) || ref.current.children.length === 0) {
        setGlasses(prev => {
          prev[parseInt(ref.current!.id)].unshift(prev[parseInt(selected.id)].shift()!);
          return [...prev];
        })
        setSelected(null);
        return;
      }
    }

    if (ref.current.children.length > 0) {
      ref.current.classList.add("selected");
      ref.current.children[0].classList.add("move-ball");
      setSelected(ref.current);
    }
  }
  
  return (
    <>
      <Win show={isWin} handlePlayAgainClick={handleResetClick} handleNextLevelClick={() => {handleChangeLevelClick(1); handleResetClick()}}/>
      <Header level={glassAmount} handleClick={handleChangeLevelClick} handleResetClick={handleResetClick} />
      <main className="main-container">      
        {glasses.map((bubbles, index) => 
              <Glass key={index}
                    id={index}
                    handleClick={handleClick}
                    bubbles={bubbles}
                    refGetter={glassesRefsSetter}
              />)}
      </main>
    </>
  )
}

export default App
