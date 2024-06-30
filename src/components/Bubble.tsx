interface Props {
    color : string;
}

const Bubble : React.FC<Props> = (props) => {
    return (
        <div className={`bubble ${props.color}`}></div>
    )
}

export default Bubble;