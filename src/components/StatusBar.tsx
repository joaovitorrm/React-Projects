interface Props {
    handleHideNumbers : () => void;
    moves : number;
}

const StatusBar : React.FC<Props> = (props) => {
    return (
        <div className="status-bar">
            <span className="status-box">{props.moves} moves</span>
            <div className="status-box">
                <input type="checkbox" id="hide-numbers" onChange={props.handleHideNumbers}></input>
                <label htmlFor="hide-numbers">hide numbers</label>
            </div>
        </div>
    )
}

export default StatusBar