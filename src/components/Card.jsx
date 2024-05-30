import React from "react";

import Coracao from "./suits/Coracao";
import Espada from "./suits/Espada";
import Ouro from "./suits/Ouro";
import Trevo from "./suits/Trevo";

export default function Card(props) {

    let isRed, suit, value;
    const suits = [];

    switch (props.suit) {
        case "diamonds":
            isRed = true;
            suit = <Ouro />;
            break;
        case "hearts":
            isRed = true;
            suit = <Coracao />
            break;
        case "clubs":
            isRed = false;
            suit = <Trevo />
            break;
        case "spades":
            isRed = false;
            suit = <Espada />
            break;
    }

    if (props.number < 11) {
        value = props.number;
        if (props.number === 1) {
            value = "a";
        }
        for (let i = 0; i < props.number; i++) {
            suits.push(<div key={i}>{suit}</div>)
        }        
    } else {
        switch (props.number) {
            case 11:
                value = "j";
                break;
            case 12:
                value = "q";
                break;
            case 13:
                value = "k";
                break;
        }
    }     

    return (
        <div className={`${isRed ? "red" : ""} card ${props.isHidden ? "hidden" : ""}`}>
            <div className="top-number numbers">
                <h2 className="number">{value}</h2>
                <div className="symbol">{suit}</div>
            </div>
            <div className="bottom-number numbers">
                <h2 className="number">{value}</h2>
                <div className="symbol">{suit}</div>
            </div>
            <div className={`center-symbols grid-${props.number}`}>
                {suits}
            </div>
        </div>
    )
}