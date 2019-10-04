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

  addSubTask(newSubTaskInput) {
    var newSubTask = new SubTask(this.task.subTasks.length, newSubTaskInput.value);
    this.task.subTasks.push(newSubTask);
    newSubTaskInput.value = "";
  }

  addNotes(notes) {
    this.task.notes = notes;
  }

  updateTaskName(taskTitle) {
    this.task.name = taskTitle.value;
  }

  updateTask() {
    this.task.status = !this.task.status;
  }

  updateSubTaskName(subTask, SubTasksInput) {
    subTask.name = SubTasksInput.value;
    setTimeout(() => {
      this.disableContextMenu();
    }, 200);
  }

  updateSubTask(subTask) {
    subTask.status = !subTask.status;
  }

  //activates the menu with the coordinates
  onrightClick(event, subTask) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
    this.subTask = subTask;
  }
  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }

  togglePopUp(){
    this.popUpStatus = !this.popUpStatus;
  }

  deleteSubTask(subTask){
    this.task.subTasks.splice(this.task.subTasks.indexOf(subTask), 1);
    this.togglePopUp();
  }
}
