export class Task {
    id: Number;
    name: String;
    subTasks: [] = [];
    notes: String;
    status: boolean;
    taskInfo: boolean;

    constructor(id: Number, name: String){
        this.id = id;
        this.name = name;
        this.status = true;
        this.taskInfo = false;
    }
}