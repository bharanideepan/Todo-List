var lists = [];

var menuButton = document.getElementById("menu-btn");
var navBar = document.getElementById("nav-bar");
var itemDescriptions = document.getElementsByClassName("item-description");
var addNewListInput = document.getElementsByClassName("add-list-input")[0];

menuButton.addEventListener("click", openMenu);
function openMenu() {
    if(menuButton.value === "close") {
        menuButton.value="open";
        navBar.style.width="295px";
        for (i = 0; i < itemDescriptions.length; i++) {
            itemDescriptions[i].style.display = "block";
        }
        addNewListInput.style.display = "block";
    } else {
        menuButton.value="close";
        navBar.style.width="55px";
        for (i = 0; i < itemDescriptions.length; i++) {
            itemDescriptions[i].style.display = "none";
        }
        addNewListInput.style.display = "none";
    }
}
/*function hover(button) {
    button.style.border="1px solid #ededed";
}
function blur(id) {
    document.getElementById(id).style.border="1px solid #f4f4f4";
}*/
var newListInput = document.getElementById("addList-input");
var listsMenu = document.getElementById("listsMenu");
var listTitle = document.getElementById("list-title");
var newTaskInput = document.getElementById("newTask-input");
var tasksContainer = document.getElementById("tasks");

newListInput.addEventListener("keyup", createList);

function createList(event) {
    if(event.which === 13){

        var list = {};
        list.name = newListInput.value;
        list.tasks = [];
    
        var iconName = document.createTextNode("list");
        var icon = document.createElement("I");
        icon.className="material-icons";
        icon.appendChild(iconName);
        
        var itemIcon = document.createElement("DIV");
        itemIcon.className="item-icon";
        itemIcon.appendChild(icon);
        
        var listName = document.createTextNode(list.name);
        var span = document.createElement("SPAN");
        span.appendChild(listName);
        
        var itemDescription = document.createElement("DIV");
        itemDescription.className="item-description";
        itemDescription.appendChild(span);
        itemDescription.style.display="block";
        
        var newListItem = document.createElement("li");
        newListItem.appendChild(itemIcon);
        newListItem.appendChild(itemDescription);
        
        listsMenu.appendChild(newListItem);
        listTitle.value = list.name;
        newListInput.value = "";
        
        lists.push(list);
        
        newListItem.addEventListener("click", getList.bind(list));
        newTaskInput.addEventListener("keyup", addTask.bind(list));
    }
}

 function addTask(event) {
    if(event.which === 13){
        var task = {};
        task.name = newTaskInput.value;
        createTask(task);
        this.tasks.push(task);
        newTaskInput.value = "";
    }
}

function getList(){
    var taskContainers = document.getElementsByClassName("task");
        console.log("taskcontainer before");
    if(taskContainers !== null){
        console.log("taskcontainer");
        for(taskContainer of taskContainers){
            taskContainer.parentNode.removeChild(taskContainer);
        }
    }
    listTitle.value = this.name;
    for (task of this.tasks) {
        createTask(task);
    }
}

function createTask(task){
        var iconName = document.createTextNode("radio_button_unchecked");
        var icon = document.createElement("I");
        icon.className="material-icons";
        icon.appendChild(iconName);
        
        var taskIcon = document.createElement("DIV");
        taskIcon.className="task-icon";
        taskIcon.appendChild(icon);
        
        var taskName = document.createElement("INPUT");
        taskName.value = task.name;
        
        var taskInput = document.createElement("DIV");
        taskInput.className="task-input";
        taskInput.appendChild(taskName);
        
        var taskContainer = document.createElement("DIV");
        taskContainer.className = "task";
        taskContainer.appendChild(taskIcon);
        taskContainer.appendChild(taskInput);
        
        tasksContainer.appendChild(taskContainer);
        //taskContainer.addEventListener("click", getTask.bind(task));
}

function getTask(){
    listTitle.value = this.name;
}
