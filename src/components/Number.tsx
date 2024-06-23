interface Props {
    value: string
}

const Number : React.FC<Props> = (props) => {
    return (
        <div className={`number n${props.value}`}>
            <span>{props.value}</span>
        </div>
    )
}

export default Number;