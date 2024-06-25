interface Props {
    handleInputChange : (term : string) => void
    inputValue : string;
}

const Title : React.FC<Props> = (props) => {
    return (
        <div className="title">
            <h1 className="main-text">My React Projects</h1>
            <p className="sub-text">Some of my projects made with React</p>
            <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" value={props.inputValue} onChange={(e) => props.handleInputChange(e.target.value)}></input>
                <span className="search-icon">&#128269;</span>
            </div>
        </div>
    )
}

export default Title;