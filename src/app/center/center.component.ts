import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  @Input() list;
  task = {};

  ngOnInit() {
  }

  addTask(newTaskInput) {
    var newTask = new Task(this.list.tasks.length , newTaskInput.value);
    this.list.tasks.push(newTask);
    this.setTask(newTask);
    newTaskInput.value = "";
  }

  setTask(task) {
    this.task = task;
  }

  updateListName(listTitle) {
    this.list.name = listTitle.value;
  }

  updateTask(task) {
    task.status = !task.status;
  }
}
