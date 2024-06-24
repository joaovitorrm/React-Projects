interface Props {
    score : number;
    handleClick : () => void;
}

const Title : React.FC<Props> = (props) => {
    
    return (
        <div className="title">
            <div className="top">
                <h1 className="title-text">2048</h1>
                <div className="highscore">
                    <span>best</span>
                    <div className="value">{props.score}</div>
                </div>
            </div>
            <div className="bottom">                
                <button className="new-game-btn" onClick={props.handleClick}>New Game</button>
            </div>
        </div>
    )
}

export default Title;