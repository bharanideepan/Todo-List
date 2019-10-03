import { lists } from './lists';

export class List {
    id: Number;
    name: String;
    tasks: [] = [];
    enteredName: String;

    constructor(name: String){
        this.id = lists.length;
        this.name = this.getName(name);
        this.enteredName = name;
    }

    getName(name : String){
        return name + "12345";
    }
}
