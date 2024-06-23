interface Props {
    shown : boolean;
    handleClick : () => void;
}

const WinScreen : React.FC<Props> = (props) => {
    return (
        <div className={`win-screen ${props.shown ? "shown" : ""}`}>
            <h1>You Win!</h1>
            <button className="play-again-btn" onClick={props.handleClick}>Play Again</button>
        </div>
    )
}

export default WinScreen;