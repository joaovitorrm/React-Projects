interface TaskProps {
    label : string;
    id : number;
    hidden : boolean;
    handleClick : (id: number) => void;
    setHidden : (id: number) => void;
}

const Task : React.FC<TaskProps> = (props) => {

    return (
        <div className="task">
          <input type="checkbox" onChange={() => props.setHidden(props.id)} checked={props.hidden}></input>
          <p className="task-text">{props.label}</p>
          <button className="task-button" onClick={() => props.handleClick(props.id)}>X</button>
        </div>
    )
}

export default Task;