import { useRef } from "react";

interface Props {
    color: string;
    showingColors : {
        [key : string] : boolean;
    };
    handlePlayerClick : (color : string) => void;
}

const SimonBtn : React.FC<Props> = (props) => {

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={`simon-btn ${props.color} ${props.showingColors[props.color] ? "active" : ""}`} ref={ref} onClick={() => props.handlePlayerClick(props.color)}></div>
    );
}

export default SimonBtn;