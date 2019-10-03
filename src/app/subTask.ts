export class SubTask {
    id: Number;
    name: String;
    status : boolean;

    constructor(id: Number, name: String){
        this.id = id;
        this.name = name;
        this.status = true;
    }
}