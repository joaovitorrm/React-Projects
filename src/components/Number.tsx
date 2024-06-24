interface Props {
    value: string
}

const Number : React.FC<Props> = (props) => {
    return (
        <div className={`number n${props.value} ${parseInt(props.value) > 2048 ? "small" : ""}`}>
            <span>{props.value}</span>
        </div>
    )
}

export default Number;