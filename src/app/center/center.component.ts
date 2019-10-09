import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  @Input() list;
  task : Task = new Task(1,"");

  ngOnInit() {
  }

  /**
   * Adds a new task into the current list
   * 
   * @param newTaskInput HTML object
   */
  addTask(newTaskInput) {
    if(newTaskInput.value !== ""){
      var newTask = new Task(this.list.tasks.length , newTaskInput.value);
      this.list.tasks.push(newTask);
      newTaskInput.value = "";}
  }

  /**
   * Sets the value for task
   * 
   * @param task Object
   */
  setTask(task) {
    this.task = task;
    this.task.taskInfo = true;
  }

  /**
   * Updates the name of the list
   * 
   * @param listTitle HTML object
   */
  updateListName(listTitle) {
    this.list.name = listTitle.value;
  }

  /**
   * Updates the status of the task
   * 
   * @param task Object
   */
  updateTask(task) {
    task.status = !task.status;
  }
}
