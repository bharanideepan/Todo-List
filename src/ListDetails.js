import React from 'react';

class ListDetails extends React.Component{
    render() {
        const {currentList} = this.props
        const {updateCurrentListName} = this.props
        const {updateListName} = this.props
        const {addTask} = this.props
        const {lists} = this.props
        const {setCurrentTask} = this.props
      return (
        <div className="center-column">
            <div className="center tool-bar">
                <input id="list-title" onChange={updateCurrentListName}
                        onBlur={updateListName} value={lists[currentList.id].name}/>
                <button><i className="material-icons" >more_horiz</i></button>
            </div>
            <div id="tasks" className="center">
                {lists[currentList.id].tasks.map(task => (
                    <Tasks key={task.id} task={task} setCurrentTask={setCurrentTask}></Tasks>
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
  }
  class Tasks extends React.Component{
    render(){
        const {setCurrentTask} = this.props;
        const {task} = this.props;
      return (
        <div className="task" id="idTask">
            <div className="task-icon">
                <i className="material-icons">radio_button_unchecked</i>
            </div>
            <div className="task-input">
                <input id="TasksInput" type="text" value={task.name}
                    onClick={() => setCurrentTask(task)} readOnly/>
            </div>
        </div>
      );
    }
  }

  export default ListDetails;