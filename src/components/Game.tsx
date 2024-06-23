import { useState, useEffect } from "react"
import Number from "./Number";

interface Props {
    isResetting : boolean;
    scoreSetter : (newScore : number) => void;
}

const Game: React.FC<Props> = (props) => {

    const [grid, setGrid] = useState<string[]>([]);
    const [newScore, setNewScore] = useState<number>(0);

    const generateGrid = () => {
        const random1 = Math.floor(Math.random() * 16);
        let random2 = Math.floor(Math.random() * 16);
        while (random1 === random2) {
            random2 = Math.floor(Math.random() * 16);
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                setGrid(prev => {
                    if (i*4+j === random1 || i*4+j === random2) {
                        return [...prev, "2"]
                    }
                    return [...prev, ""]
                });
            };
        };
    };

    const moveNumbers = (start: string, max : string, step: number, isGoingPositive: boolean) => {
        let gridCopy : string[];
        // EXAMPLE MOVE LEFT => start = "*4-4", max = "*4", step = 1, isGoingPositive = false
        setGrid(prev => {
            gridCopy = [...prev];
            let highestValue = 0;
            // Loop para separar o array em 4 partes ["", "", "", ""] ["", "", "", ""] ["", "", "", ""] ["", "", "", ""] apenas para facilitar os calculos
            for (let x = 1; x < 5; x++) {
                // Valor inicial vai ser sempre o primeiro valor de cada parte
                // 1º atualIndex = x*4-4 = 0
                let atualIndex = eval(x + start);                
                // Todo loop reduz o index atual pelo step
                // 1º while atualIndex < x*4 = 0 < 16
                while (isGoingPositive ? atualIndex > eval(x+max) : atualIndex < eval(x+max)) {
                    // 1º loop atualIndex - step < x*4 = 0 - 1 < 16
                    if (isGoingPositive ? !(atualIndex - step > eval(x+start)) : !(atualIndex - step < eval(x+start))) {
                        if (prev[atualIndex] != "") {
                            if (prev[atualIndex - step] === "") {
                                prev[atualIndex - step] = prev[atualIndex];
                                prev[atualIndex] = "";
                                atualIndex -= step;
                                continue;
                            } else if (prev[atualIndex] == prev[atualIndex - step]) {
                                if (parseInt(prev[atualIndex - step]) + parseInt(prev[atualIndex]) > highestValue)
                                    highestValue = parseInt(prev[atualIndex - step]) + parseInt(prev[atualIndex]);
                                prev[atualIndex - step] = (parseInt(prev[atualIndex - step]) + parseInt(prev[atualIndex])).toString();
                                prev[atualIndex] = "";
                                atualIndex -= step;
                                continue;
                            }
                        }
                    }
                    atualIndex += step;
                }
            }
            setNewScore(highestValue);
            return [...prev];
        });
        setGrid(prev => {
            if (prev.find((value, index) => value != gridCopy[index]) != undefined) {
                while (prev.find(value => value === "") != undefined) {
                    let random = Math.floor(Math.random() * 16);
                    if (prev[random] != "") {                        
                        continue;
                    }
                    prev[random] = "2";
                    break;
                }
                return [...prev];
            }
            return [...prev];            
        })
    }

    const setEventListener = () => {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    moveNumbers("*4-4", "*4", 1, false);
                    break;
                case "ArrowRight":
                    moveNumbers("*4-1", "*4-5", -1, true);
                    break;
                case "ArrowUp":
                    moveNumbers("-1", "+12", 4, false);
                    break;
                case "ArrowDown":
                    moveNumbers("+11", "*0-1", -4, true);
                    break;
            }
        })
    }

    useEffect(() => {
        generateGrid();
        setEventListener();
    }, []);

    useEffect(() => {
        if (props.isResetting) {
            setGrid([]);
            generateGrid();
        }
    }, [props.isResetting]);

    useEffect(() => {
        props.scoreSetter(newScore);
    }, [newScore]);

    return (
        <div className="game-grid">
            {grid.map((value, index) => <Number key={index} value={value} />)}
        </div>
    )
}

export default Game;