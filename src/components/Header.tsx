interface Props {
    level : number;
    handleClick : (n : number) => void;
    handleResetClick : () => void;
}

const Header : React.FC<Props> = (props) => {
    return (
        <header className="header-container">
            <h1 className="title">Bubble Sort</h1>
            <div className="level-container">
                <span onClick={() => props.handleClick(-1)}>&#129080;</span>
                <p>Level {props.level - 3}</p>
                <span onClick={() => props.handleClick(1)}>&#129082;</span>
            </div>
            <span className="reset-icon" onClick={() => props.handleResetClick()}>&#128260;</span>
            
        </header>
    )
}

export default Header;