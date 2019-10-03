export class List {
    id: Number;
    name: String;
    tasks: [];
    enteredName: String;

    constructor(id: Number, name: String, tasks: []){
        this.id = id;
        this.name = this.getName(name);
        this.tasks = tasks;
        this.enteredName = name;
    }

    getName(name : String){
        return name + "12345";
    }
}
