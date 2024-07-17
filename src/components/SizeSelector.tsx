interface Props {
    selectedSize : number;
    setSelectedSize : (value : number) => void;
}

const SizeSelector : React.FC<Props> = (props) => {
    return (
        <div className="size-selector">
            {Array.from({length: 7}, (_, index) => index + 3).map((value) => (
                <span key={value} className={`${value === props.selectedSize ? "selected" : ""}`} onClick={() => props.setSelectedSize(value)}>{value}x{value}</span>
            ))}
        </div>
    )
}

export default SizeSelector