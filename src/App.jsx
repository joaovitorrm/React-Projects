import React from "react";
import Main from "./components/Main";

const colors = ["green", "red", "yellow", "blue"];

export default function App() {

  // Lista que guarda as cores geradas
  const randomPattern = React.useRef([]);

  // Lista que guarda as cores que o jogador clicou
  const [playerPattern, setPlayerPattern] = React.useState([]);

  // Pontução mostrada na tela
  const [score, setScore] = React.useState(0);

  // Bool para impedir o jogar de selecionar enquanto estiver mostrando o padrão
  const showingPattern = React.useRef(false);

  // Objeto que guarda quais botões estão ligados
  const [colorsOn, setColorsOn] = React.useState({
    green: false,
    red: false,
    yellow: false,
    blue: false
  });  

  // Valor inicial para inicar o jogo
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Irá verificar se o código esta sendo rodado pela primeira vez
  const [isInitialMount, setIsInitialMount] = React.useState(true);

  // Seta o initial mount para falso após a primeira render
  React.useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
    }
  }, [])

  // Adiciona uma cor aleatória quando clicar em play
  React.useEffect(() => {
    if (!isInitialMount) {
      addRandomColor();
    }    
  }, [isPlaying])


  // Checa sempre que o jogador escolhe uma cor
  React.useEffect(() => {
    if (!isInitialMount) {
      // Checa se o jogador não errou
      let rightAnswers = checkPlayerAnswers();

      // Checagem para fazer re-render destes valores antes de ligar o botão do jogador
      if (rightAnswers && playerPattern.length == randomPattern.current.length) {
        setScore(prevScore => prevScore + 1);
      } else if (!rightAnswers) {
        setScore(0);
      }

      // Liga o botão que o jogador clicou
      lightPlayerLastClick().then(() => {        
        if (rightAnswers) {
          if (playerPattern.length == randomPattern.current.length) {
            // Se o jogador acertou então adiciona mais uma cor e reseta o array do jogador
            addRandomColor();
            setPlayerPattern([]);
          }
        } else {
          // Se o jogador errou então reseta o valor de alguns arrays
          resetGame();
        }
      });      
    }
  }, [playerPattern])

  // Função que liga os botões do jogador de maneira assíncrona para ter o delay e o re-render
  async function lightPlayerLastClick() {
    setColorsOn(prevOn => {
      return {...prevOn, [playerPattern.at(-1)] : true}
    })

    await timeout(300);

    setColorsOn(prevOn => {
      return {...prevOn, [playerPattern.at(-1)] : false}
    })

    await timeout(300);
  }

  // Verifica se o array do jogador é igual ao do pattern
  function checkPlayerAnswers() {
    let rightAnswers = true;
    for (let i = 0; i < playerPattern.length; i++) {
      if (playerPattern[i] != randomPattern.current[i]) {
        rightAnswers = false;
        break;
      }
    }
    return rightAnswers;
  }

  // Função que gera uma cor aleatória no array do pattern
  async function addRandomColor() {
    // Seta o showingPattern para o jogador não clicar enquanto é mostrado o pattern
    showingPattern.current = true;    
    randomPattern.current.push(generateRandomColor());
    for (let i = 0; i < randomPattern.current.length; i++) {
      setColorsOn(prevOn => {
        return {...prevOn, [randomPattern.current[i]]: true}
      })

      await timeout(1000);

      setColorsOn(prevOn => {
        return {...prevOn, [randomPattern.current[i]]: false}
      })

      // Se for o último não ter delay final
      if (i != randomPattern.current.length - 1) {
        await timeout(500);
      }
    }
    showingPattern.current = false;
  }

  // Seta o isPlaying quando clica no input play
  function handlePlayInput() {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      resetGame();
    }
  }

  // Adiciona a cor que o jogador clicou ao array do jogador
  function handleColorInput(color) {
    if (!showingPattern.current) {
      setPlayerPattern(prevPlayer => [...prevPlayer, color]);
    }
  }

  // Função assíncrona para o delay
  async function timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  // Função que gera uma cor aleatória do array colors
  function generateRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function resetGame() {    
    randomPattern.current = [];
    setPlayerPattern([]);
    addRandomColor();
    setScore(0);
  }

  return (
    <>
      <Main
        handlePlayInput={handlePlayInput}
        handleColorInput={handleColorInput}
        actives={colorsOn}
        score={score}
      />
    </>
  )  
}


