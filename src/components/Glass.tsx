import Bubble from "./Bubble";
import { useRef, useEffect } from "react";

interface Props {
    bubbles : string[];
    id: number;
    handleClick : (ref : React.RefObject<HTMLDivElement>) => void;
    refGetter : (ref : React.RefObject<HTMLDivElement>) => void;
}

const Glass : React.FC<Props> = (props) => {

    const glassRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.refGetter(glassRef);
    }, []);

    return (
        <div className="glass" id={props.id.toString()} onClick={() => props.handleClick(glassRef)} ref={glassRef}>
            {props.bubbles.map((bubble, index) => ( bubble ? <Bubble key={index} color={bubble} /> : null))}
        </div>
    )
}



export default Glass;