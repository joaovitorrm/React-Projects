interface Props {
    value : number;
    backgroundPosition : string;
    backgroundSize : string;
    backgroundImage : string;
    handleClick : () => void;
    showNumbers : boolean;
    empty : boolean;
}

const Piece : React.FC<Props> = (props) => {
    if (!props.empty) return (
        <div
             style={{backgroundPosition: props.backgroundPosition,
                     backgroundSize: props.backgroundSize,
                     backgroundImage: props.backgroundImage}}
             onClick={props.handleClick}>
             {props.showNumbers && props.value}
        </div>
    )
    return (
        <div className="empty"></div>
    )
}

export default Piece;