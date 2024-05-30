import React from "react"

import Main from "./components/Main"

export default function App() {
    
    const cards = {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                     suits: ["spades", "hearts", "diamonds", "clubs"]};
    
    const allCardsIds = React.useRef([]);
    const [winStatus, setWinStatus] = React.useState({
        player: false,
        bot1: false,
        bot2: false,
        dealer: false
    });

    const [stand, setStand] = React.useState(false);
    const [resetGame, setResetGame] = React.useState(false);    

    const [totals, setTotals] = React.useState({});
    const [hands, setHands] = React.useState({
        player: [],
        dealer: [],
        bot1: [],
        bot2: []
    });

    // Gera as mãos inicias de cada um
    React.useEffect(() => {
        setStand(false);
        setHands(initialHands => {
            let randomHands = {...initialHands};
            for (let hand in randomHands) {
                randomHands[hand] = [generateRandomCard(), generateRandomCard()]
            }
            return randomHands;
            })        
    }, [resetGame]);

    // Gera os valores totais de cada mão
    React.useEffect(() => {
        setTotals(() => {
            let newTotals = {};
            for (let hand in hands) {
                if (hand == "dealer") {
                    if (stand) {
                        newTotals[hand] = hands[hand].reduce((acumulador, elemento) => acumulador + elemento.number, 0);    
                    } else {
                        newTotals[hand] = hands[hand][0]?.number;
                    }                    
                } else {
                    newTotals[hand] = hands[hand].reduce((acumulador, elemento) => acumulador + elemento.number, 0);
                }
            }
            return newTotals;
        });
    }, [hands, stand])

    // Função que finaliza o jogo
    React.useEffect(() => {
        // Se o jogar chegar acima de 21 termina o jogo
        if (totals.player > 21) {
            setStand(true);
        }
        if (stand) {
            // Checa se algum jogar ainda pode comprar
            if (!Object.values(checkHits()).every(item => item === false)) {
                giveCards()
            // Checa se o dealer pode comprar mais cartas
            } else if (totals.dealer <= 16){
                setHands((prevHands) => {
                    return {
                        ...prevHands,
                        dealer: [...prevHands.dealer, generateRandomCard()]
                    }
                })            
            } else {
                // Checa quem venceu a partida
                setWinStatus((prevStatus) => {                    
                    let newStatus = {}

                    let winner = false;
                    for (let status in prevStatus) {
                        newStatus[status] = false;
                        if (status != "dealer") {
                            if (totals[status] <= 21) {
                                if (totals.dealer > 21 || totals[status] >= totals.dealer) {
                                    newStatus[status] = true;
                                    winner = true;
                                }
                            }                            
                        }
                    }
                    if (!winner && totals.dealer <= 21) {
                        newStatus.dealer = true;
                    }
                    return newStatus;
                })
            }
        }
    }, [totals])

    // Função que gera uma carta aleatória
    function generateRandomCard() {
        let newCard = {id: "", number: 0, suit: ""};
        // Gera a primeira carta e depois checa se ja existe para iniciar o loop
        do {            
            newCard.number = cards.numbers[Math.floor(Math.random() * cards.numbers.length)];
            newCard.suit = cards.suits[Math.floor(Math.random() * cards.suits.length)];
            newCard.id = newCard.number + newCard.suit;
        } while (allCardsIds.current.includes(newCard.id));

        // Adiciona a carta gerada em uma lista de todas as cartas do jogo
        allCardsIds.current.push(newCard.id);

        return newCard;
    }

    // Função que retorna as mãos que querem comprar uma carta
    function checkHits() {
        // Objeto com as informações
        let hits = {
            bot1: false,
            bot2: false,
            player: false,
        }

        for (let property in hits) {
            if (property == "player") {                
                if (!stand) {
                    hits[property] = true;
                }
            }
            else if (totals[property] < 21) {                
                hits[property] = true;
            }
        }
        return hits;
    }

    // Função que verifica o click e se o jogador possui um total maior que 21
    function handleHitClick() {
        if (totals.player >= 21) {
            alert("Chegou ao valor máximo!")
        } else {
            giveCards();
        }
    }

    // Função que adiciona uma carta caso a mão total for menor que 21
    function giveCards() {
        setHands(prevHands => {
            const hits = checkHits();
            // Atribuição dinamica dos valores verdadeiros
            return {
                    ...prevHands,                    
                    ...(hits.player && {player: [...prevHands.player, generateRandomCard()]}),                        
                    ...(hits.bot1 && {bot1: [...prevHands.bot1, generateRandomCard()]}),
                    ...(hits.bot2 && {bot2: [...prevHands.bot2, generateRandomCard()]}),                    
                }
        })
    }

    function handleStandClick() {
        setStand(true);
    }

    // Reset variables data
    function handleRestartClick() {
        setResetGame(prevRestart => !prevRestart)
        setWinStatus({
            player: false,
            bot1: false,
            bot2: false,
            dealer: false
        })        
        allCardsIds.current = [];
    }

    return (
        <>
            <Main 
                hands={hands}
                handleHitClick={handleHitClick}
                handleStandClick={handleStandClick}
                handleRestartClick={handleRestartClick}
                totals={totals}
                stand={stand}
                winStatus={winStatus}
            />            
        </>
    )
}