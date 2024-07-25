import Ball from "./Ball";

interface Props {
    selected : boolean,
    glassRef : React.RefObject<HTMLDivElement>,
    hasBall : boolean,
    canSelect : boolean,
    handleClick : (hasBall : boolean) => void,
    animationClick : (glassRef : React.RefObject<HTMLDivElement>) => void
}

const Glass: React.FC<Props> = (props) => {

    const checkClick = () => {
        if (!props.canSelect) return;
        props.animationClick(props.glassRef);
        props.handleClick(props.hasBall);        
    }

    return (
        <div
            className={`glass ${props.selected ? 'selected' : ''} ${!props.canSelect ? 'disabled' : ''}`}
            ref={props.glassRef}
            onClick={checkClick}
        >
            {props.hasBall && <Ball />}
        </div>
    )
}

export default Glass;