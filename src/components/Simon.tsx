import SimonBtn from "./SimonBtn";

interface Props {
    score : number;
    colors : string[];
    showingColors : {
        [key : string] : boolean;
    };
    handlePlayerClick : (color : string) => void;
}

const Simon : React.FC<Props> = (props) => {
    return (
        <div className="simon-container">
            <div className="center-score">{props.score}</div>
            {props.colors.map(color => <SimonBtn key={color} color={color} handlePlayerClick={props.handlePlayerClick} showingColors={props.showingColors}/>)}
        </div>
    );
}

export default Simon;