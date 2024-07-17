interface Props {
    images : {
        [key : string] : string
    };
    actualImage : string;
    setActualImage : (value : string) => void;
}

const ImageSelector : React.FC<Props> = (props) => {
    
    return (
        <div className="image-selector-container">
            
            {Object.entries(props.images).map(([key, value]) => (
                <span key={key} onClick={() => props.setActualImage(key)} className={`image-selector ${value === props.actualImage ? "selected" : ""}`}>{key}</span>
                )
            )}
            
        </div>
    )
}

export default ImageSelector