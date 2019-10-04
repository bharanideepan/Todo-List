import { SubTask } from './subTask';

export class Task {
    id: Number;
    name: String;
    subTasks: SubTask[] = [];
    notes: String;
    status: boolean;

    constructor(id: Number, name: String){
        this.id = id;
        this.name = name;
        this.status = true;
    }
}