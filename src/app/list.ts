import { lists } from './lists';
import { Task } from './task';

export class List {
    id: Number;
    name: String;
    tasks: Task[] = [];
    enteredName: String;

    constructor(name: String){
        this.id = lists.length;
        this.name = this.getName(name);
        this.enteredName = name;
    }

    getName(name) {
        var count = lists.filter(list => list.enteredName === name).length;
        if(name === "Tasks") {
            count = count + 1;
        }
        if(count !== 0) {
            return name + " (" + (count) + ")";
        }
        return name;
    }
}
