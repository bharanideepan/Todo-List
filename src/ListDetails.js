import React from 'react'

function ListDetails(props) {
    const {currentList} = props
    const {updateCurrentListName} = props
    const {updateListName} = props
    const {addTask} = props
    const {lists} = props
    const {setCurrentTask} = props
    const {toggleTaskStatus} = props
    
    return (
        <div className="center-column">
            <div className="center tool-bar">
                <input id="list-title" onChange={updateCurrentListName}
                        onBlur={updateListName} value={currentList.name}/>
                <button><i className="material-icons" >more_horiz</i></button>
            </div>
            <div id="tasks" className="center">
                {lists[currentList.id].tasks.map(task => (
                    <Tasks key={task.id} task={task}
                            setCurrentTask={setCurrentTask}
                            toggleTaskStatus={toggleTaskStatus}
                    ></Tasks>
                ))}
            </div>
            <div className="center new-task">
                <div className="task-icon">
                    <label htmlFor="newTask-input">
                        <i className="material-icons">add</i>
                    </label>
                </div>
                <div className="task-input">
                    <input id="newTask-input" type="text" placeholder="Add task"
                        onKeyDown={addTask}/>
                </div>
            </div>
        </div>
    )
}
function Tasks(props){
    const {setCurrentTask} = props
    const {toggleTaskStatus} = props
    const {task} = props;
    const iconName = task.isCompleted ? 'check_circle' : 'radio_button_unchecked'
    return (
        <div className="task" id="idTask">
            <div className="task-icon">
                <i className="material-icons" onClick={() => toggleTaskStatus(task)}>{iconName}</i>
            </div>
            <div className="task-input">
                <input id="TasksInput" type="text" value={task.name}
                    onClick={() => setCurrentTask(task)} readOnly/>
            </div>
        </div>
    )
}

export default ListDetails