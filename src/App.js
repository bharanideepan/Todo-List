import React from 'react';
import './App.css';
import NavBar from './NavBar.js'
import ListDetails from './ListDetails.js'
import TaskDetails from './TaskDetails.js'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isNavBarOpen: false,
      isTaskDetailsOpen: false,
      lists:[{
        name: "Tasks",
        id: 0,
        tasks: [],
        enteredName: "Tasks",
      }],
      text:'',
      currentList: {
        name: "Tasks",
        id: 0,
        tasks: [],
        enteredName: "Tasks",
      },
      currentTask: {},
    };
  }

  getDefaultList = () => {
      return this.state.lists[0]
  }

  toggleMenu = () => {
    this.setState(state => ({ isNavBarOpen: !state.isNavBarOpen }));
  }

  toggleTaskDetails = () => {
    this.setState(state => ({ isTaskDetailsOpen: !state.isTaskDetailsOpen }));
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }

  addList = (event) => {
    if(event.key === 'Enter' && event.target.value !== ""){
      const newList = {
        name: this.getName(this.state.lists, event.target.value),
        id: this.state.lists.length,
        tasks: [],
        enteredName: event.target.value,
      };
      const lists = JSON.parse(JSON.stringify(this.state.lists));
      lists.push(newList)
      this.setState({
        lists: lists,
        text: ''
      })
    }
  }
  getName = (lists, name) => {
      var count = lists.filter(list => list.enteredName === name).length;
      if(count !== 0) {
          return name + " (" + (count) + ")";
      }
      return name;
  }

  updateCurrentListName = (event) => {
      const currentList = Object.assign({}, this.state.currentList)
      currentList.name = event.target.value
      this.setState({currentList: currentList})
  }
  updateListName = (event) => {
      const lists = Object.assign([], this.state.lists)
      lists[this.state.currentList.id].name = event.target.value
      this.setState({})
  }

  setCurrentList = (list) => {
      this.setState({currentList: list})
  }

  setCurrentTask = (task) => {
      this.setState({currentTask: task})
      this.toggleTaskDetails()
  }

  addTask = (event) => {
    if(event.key === 'Enter' && event.target.value !== ""){
      const newTask = {
        name: event.target.value,
        id: this.state.lists[this.state.currentList.id].tasks.length,
        subTasks: [],
      };
      const lists = Object.assign([], this.state.lists);
      lists[this.state.currentList.id].tasks.push(newTask);
      this.setState({lists: lists});
      event.target.value = "";
    }
  }

  render(){
    return (
      <div>
        <div className="header">
            <span>To-Do</span>
            <i className="material-icons">search</i>
            <input type="text" placeholder="Search"/>
        </div>
        <div className="body">
          <NavBar toggleMenu={this.toggleMenu}
                  isNavBarOpen={this.state.isNavBarOpen}
                  addList={this.addList}
                  lists={this.state.lists}
                  text={this.state.text}
                  handleChange={this.handleChange}
                  setCurrentList={this.setCurrentList}
                  currentList={this.state.currentList}
                  ></NavBar>
            <ListDetails currentList={this.state.currentList}
                        updateCurrentListName={this.updateCurrentListName}
                        updateListName={this.updateListName}
                        addTask={this.addTask}
                        lists={this.state.lists}
                        setCurrentTask={this.setCurrentTask}></ListDetails>
            {this.state.isTaskDetailsOpen &&
                <TaskDetails toggleTaskDetails={this.toggleTaskDetails}></TaskDetails>
            }
        </div>
      </div>
    );}
}

export default App;
