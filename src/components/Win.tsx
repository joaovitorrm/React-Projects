interface Props {
    show : boolean;
    handlePlayAgainClick : () => void;
    handleNextLevelClick : () => void;
}

const Win : React.FC<Props> = (props) => {
    return (
        <div className={`win ${props.show ? "show" : ""}`}>
            <h1>You won!</h1>
            <div className="button-container">
                <button onClick={props.handlePlayAgainClick}>Play again</button>
                <button onClick={props.handleNextLevelClick}>Next level</button>
            </div>
        </div>
    )
}

export default Win;