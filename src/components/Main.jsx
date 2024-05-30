import React from "react";

export default function Main(props) {
    return (
        <form className="main-container">
            <h1 className="titulo">Anagram Guess</h1>
            <h3 className="descricao">Descubra a palavra original através de seus anagramas</h3>
            <h2 className="palavra">{props.anagram}</h2>
            <input 
                type="text"
                placeholder="digite aqui"
                value={props.guessingWord}
                onChange={props.checkInputChange}
                className={ (props.right ? "right" : "") + " " + (props.wrong ? "wrong" : "") + " palavra-input"}
            />
            <div className="verificar-div">
                <input type="submit" value="Verificar" className="verificar-input" onClick={props.checkWord}/>
                <input type="button" value="&#8634;" className="reload" onClick={props.anagrameWord}/>
            </div>
            <input type="button" value="Gerar outra palavra" className="gerar-input" onClick={props.generateNewWord}/>
        </form>
    )
}