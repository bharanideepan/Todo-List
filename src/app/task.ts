import { SubTask } from './subTask';

export class Task {
    id: Number;
    name: String;
    subTasks: SubTask[] = [];
    notes: String;
    status: boolean;
    taskInfo: boolean;
    completedSubTasksLength: Number = 0;

    constructor(id: Number, name: String){
        this.id = id;
        this.name = name;
        this.status = true;
        this.taskInfo = false;
    }
}