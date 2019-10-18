import React from 'react'
import './App.css'
import NavBar from './NavBar.js'
import ListDetails from './ListDetails.js'
import TaskDetails from './TaskDetails.js'

const defaultList = {
  name: "Tasks",
  id: 0,
  tasks: [],
  enteredName: "Tasks",
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isNavBarOpen: false,
      isTaskDetailsOpen: false,
      lists:[defaultList],
      currentList: defaultList,
      currentTask: {},
    }
  }

  toggleMenu = () => {
    this.setState(state => ({ isNavBarOpen: !state.isNavBarOpen }))
  }

  toggleTaskDetails = () => {
    this.setState({ isTaskDetailsOpen: false })
  }

  addList = (event) => {
    if(event.key === 'Enter' && event.target.value !== ""){
      this.setState({
        lists: [...this.state.lists, {
          name: this.getName(event.target.value),
          id: this.state.lists.length,
          tasks: [],
          enteredName: event.target.value,
        }]
      })
      event.target.value = ""
    }
  }

  getName = (name) => {
      var count = this.state.lists.filter(list => list.enteredName === name).length
      return (count !== 0) ? `${name} (${count})` : name
  }

  updateCurrentListName = (event) => {
      const name = event.target.value
      this.setState(state=>({currentList: {...state.currentList, name}}))
  }
  updateListName = (event) => {
    const lists = JSON.parse(JSON.stringify(this.state.lists))
      lists[this.state.currentList.id].name = this.getName(event.target.value)
      this.setState({lists})
  }

  setCurrentList = (list) => {
    const currentList = JSON.parse(JSON.stringify(list))
      this.setState({currentList})
  }

  setCurrentTask = (currentTask) => {
      this.setState({currentTask, isTaskDetailsOpen: true })
  }

  addTask = (event) => {
    if(event.key === 'Enter' && event.target.value !== ""){
      const {lists} = this.state
      const {currentList} = this.state
      const updatedLists = JSON.parse(JSON.stringify(lists))
      updatedLists[currentList.id].tasks.push({
        name: event.target.value,
        id: lists[currentList.id].tasks.length,
        subTasks: [],
        isCompleted: false,
      })
      this.setState({lists: updatedLists})
      event.target.value = ""
    }
  }

  toggleTaskStatus = (currentTask) => {
    const {currentList} = this.state
    const lists = JSON.parse(JSON.stringify(this.state.lists))
    lists[currentList.id].tasks[currentTask.id].isCompleted = !currentTask.isCompleted
    this.setState({lists})
  }

  render(){
    return (
      <div>
        <div className="header">
            <span>To-Do</span>
            <div className="searchBox">
              <i className="material-icons">search</i>
              <input type="text" placeholder="Search"/>
            </div>
        </div>
        <div className="body">
          <NavBar toggleMenu={this.toggleMenu}
                  addList={this.addList}
                  setCurrentList={this.setCurrentList}
                  {...this.state}
          ></NavBar>
            <ListDetails updateCurrentListName={this.updateCurrentListName}
                        updateListName={this.updateListName}
                        addTask={this.addTask}
                        setCurrentTask={this.setCurrentTask}
                        toggleTaskStatus={this.toggleTaskStatus}
                        {...this.state}
            ></ListDetails>
            {this.state.isTaskDetailsOpen &&
                <TaskDetails toggleTaskDetails={this.toggleTaskDetails}
                              {...this.state}
                ></TaskDetails>
            }
        </div>
      </div>
    );}
}

export default App
