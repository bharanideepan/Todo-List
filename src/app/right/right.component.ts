import { Component, OnInit, Input } from '@angular/core';
import { SubTask } from '../subTask';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {

  @Input() task;
  @Input() taskInfo;
  subTask : SubTask;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  popUpStatus : boolean = false;

  ngOnInit() {
  }

  /**
   * Adds a new sub task into the task
   * 
   * @param newSubTaskInput HTML object
   */
  addSubTask(newSubTaskInput) {
    var newSubTask = new SubTask(this.task.subTasks.length, newSubTaskInput.value);
    this.task.subTasks.push(newSubTask);
    newSubTaskInput.value = "";
  }

  /**
   * Adds notes for the task
   * 
   * @param notes String
   */
  addNotes(notes : String) {
    this.task.notes = notes;
  }

  /**
   * Updates name of the task
   * 
   * @param taskTitle HTML object
   */
  updateTaskName(taskTitle) {
    this.task.name = taskTitle.value;
  }

  /**
   * Updates the status of the task
   */
  updateTask() {
    this.task.status = !this.task.status;
  }

  /**
   * Updates the name of the sub task
   * 
   * @param subTask Object
   * @param SubTasksInput HTML object
   */
  updateSubTaskName(subTask, SubTasksInput) {
    subTask.name = SubTasksInput.value;
    setTimeout(() => {
      this.disableContextMenu();
    }, 200);
  }

  /**
   * Updates the status of the sub task
   * 
   * @param subTask Object
   */
  updateSubTask(subTask) {
    subTask.status = !subTask.status;
  }

  /**
   * Activates the menu with the coordinates
   *  
   * @param event 
   * @param subTask 
   */
  onrightClick(event, subTask) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
    this.subTask = subTask;
  }
  
  /**
   * Disables the menu
   */
  disableContextMenu() {
    this.contextmenu = false;
  }

  /**
   * Toggles the popup status between true and false
   */
  togglePopUp(){
    this.popUpStatus = !this.popUpStatus;
  }

  /**
   * Deletes the subtask from the task
   * 
   * @param subTask Object
   */
  deleteSubTask(subTask){
    this.task.subTasks.splice(this.task.subTasks.indexOf(subTask), 1);
    this.togglePopUp();
  }

  closeInfo(){
    this.task.taskInfo = false;
  }
}
