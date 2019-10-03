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
  }

  updateSubTask(subTask) {
    subTask.status = !subTask.status;
  }

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  //activates the menu with the coordinates
  onrightClick(event) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
  }
  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }
}
