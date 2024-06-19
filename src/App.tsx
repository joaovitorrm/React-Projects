import { useState } from 'react';
import Task from './components/Task';

function App() {

  const [tasks, setTasks] = useState<JSX.Element[]>([]);
  const [typpingTask, setTypingTask] = useState("");
  const [filter, setFilter] = useState("added");

  function addTask() {
    setTasks(prev => {
        if (prev.length === 0) {
          return [<Task label={typpingTask}
                        key={0}
                        id={0}
                        handleClick={removeTask}
                        hidden={false}
                        setHidden={toggleTaskVisibility}/>]
        }
        return [...prev, <Task label={typpingTask}
                               key={prev[prev.length - 1].key! + 1}
                               id={prev[prev.length - 1].props.id! + 1}
                               handleClick={removeTask}
                               hidden={false}
                               setHidden={toggleTaskVisibility}/>]
    });
  };
  
  function removeTask(id : number) {
    setTasks(prev => prev.filter((task) => task.props.id !== id));
  }

  function toggleTaskVisibility(id: number) {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.props.id === id) {
          return { ...task, props: { ...task.props, hidden: !task.props.hidden } };
        }
        return task;
      })
    );
  }

  function handleAddTask(e : React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    if (typpingTask === "") return;
    addTask();
    setTypingTask("");
  }

  return (
    <div className="list">
      <form className="add-container">
        <input type="text" className="add-text" placeholder="Enter task" value={typpingTask} onChange={(e) => {setTypingTask(e.target.value)}}></input>
        <input type="submit" className="add-button" value="Add" onClick={(e) => handleAddTask(e)}></input>
      </form>
      <div className='filter-container'>
        <p>You have {tasks.filter((task) => !task.props.hidden).length} tasks</p>
        <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)}>
          <option value="added">Added</option>
          <option value="active">Active</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <div className="tasks-container">
        {filter == "added" && tasks}
        {filter == "active" && tasks.filter((task) => !task.props.hidden)}
        {filter == "alphabetical" && tasks.slice().sort((a, b) => a.props.label.localeCompare(b.props.label))}
        {filter == "finished" && tasks.filter((task) => task.props.hidden)}        
      </div>
      
    </div>
  )
}

export default App
