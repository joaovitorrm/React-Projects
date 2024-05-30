export default function Main(props) {

    return (
        <main className="main-container">

            <h1 className="title">Simon Says</h1>

            <div className="simon-says">
                <div className={`green button ${props.actives?.green ? "active" : ""}`} onClick={() => props.handleColorInput("green")}></div>
                <div className={`red button ${props.actives?.red ? "active" : ""}`} onClick={() => props.handleColorInput("red")}></div>
                <div className={`yellow button ${props.actives?.yellow ? "active" : ""}`} onClick={() => props.handleColorInput("yellow")}></div>
                <div className={`blue button ${props.actives?.blue ? "active" : ""}`} onClick={() => props.handleColorInput("blue")}></div>
                <div className="center">
                    <h2 className="score">{props.score}</h2>     
                    <input type="button" value="Play" className="play-input" onClick={props.handlePlayInput}/>
                </div>
            </div>

        </main>
    )
}