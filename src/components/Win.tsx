import { useEffect, useState } from "react";

interface Props {
    isWinner : boolean;
}

const Win : React.FC<Props> = (props) => {

    const [showWin, setShowWin] = useState(true);

    useEffect(() => { if (props.isWinner) setShowWin(true)}, [props.isWinner])

    return (
        <>
        { props.isWinner && showWin &&
            <div className="win-container">
                <span className="win-text">YOU WIN</span>
                <span className="close-icon" onClick={() => setShowWin(false)}>x</span>
            </div>
        }
        </>
    )
}

export default Win;