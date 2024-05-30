import React from "react"

import Card from "./Card"

export default function Main(props) {

    return (
        <main className="main-container">

            <div className={`counter dealer ${props.winStatus.dealer ? "win" : ""}`}><div>Dealer</div><div>{props.totals.dealer}</div></div>
            <div className="dealer-container hand">
                {props.hands.dealer.map((card, index) => 
                    (<Card 
                        isHidden={((props.hands.dealer.length - 1 == index) && !props.stand) ? true : false}
                        number={card.number}
                        suit={card.suit}
                        key={card.id}
                    />)
                )}
            </div>
            <div className={`counter bot1 ${props.winStatus.bot1 ? "win" : ""}`}><div>Bot - 1</div><div>{props.totals.bot1}</div></div>
            <div className="bot1-container hand">
                {props.hands.bot1.map(card =>
                    <Card
                        number={card.number}
                        suit={card.suit}
                        key={card.id}
                    />)}
            </div>
            <div className={`counter bot2 ${props.winStatus.bot2 ? "win" : ""}`}><div>Bot - 2</div><div>{props.totals.bot2}</div></div>
            <div className="bot2-container hand">
                {props.hands.bot2.map(card =>
                    <Card
                        number={card.number}
                        suit={card.suit}
                        key={card.id}
                    />)}
            </div>
            <div className={`counter player ${props.winStatus.player ? "win" : ""}`}><div>Player</div><div>{props.totals.player}</div></div>
            <div className="player-container hand">
                {props.hands.player.map(card =>
                    <Card
                        number={card.number}
                        suit={card.suit}
                        key={card.id}
                    />)}
            </div>
            
            <div className="inputs-container">
                <input type="button" value="Hit" className="hit-input" onClick={props.handleHitClick} />
                <input type="button" value="Stand" className="stand-input" onClick={props.handleStandClick} />
                <input type="button" value="Restart" onClick={props.handleRestartClick} />
            </div>


        </main>
    )
}