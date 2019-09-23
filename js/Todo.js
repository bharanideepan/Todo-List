/**
 * Global variables which are used to store lists
 * And track number of lists and tasks added
 */
var lists = [];
var listId = 0;
var currentListId = 0;
var taskId = 0;
var currentTaskId = 0;
var subTaskId = 0;

/**
 * Elements which are needed from the document 
 */
var menuButton = document.getElementById("menu-btn");
var navBar = document.getElementById("nav-bar");
var itemDescriptions = document.getElementsByClassName("item-description");
var addNewListInput = document.getElementsByClassName("add-list-input")[0];
var newListInput = document.getElementById("addList-input");
var listsMenu = document.getElementById("listsMenu");
var listTitle = document.getElementById("list-title");
var newTaskInput = document.getElementById("newTask-input");
var tasksContainer = document.getElementById("tasks");
var rightSideTaskInput = document.getElementById("tasksInput-right");
var rightSideTaskIcon = document.getElementById("tasksIcon-right");
var rightColumn = document.getElementById("rightColumn");
var closeButton = document.getElementById("close-right-column");
var newSubTaskInput = document.getElementById("newSubTask-input");
var subTasksContainer = document.getElementById("subTasks");
var defaultTaskList = document.getElementById("default-task");

/**
 * Creating default tasks holder which is used when no list is created
 */
var defaultTasks = {};
defaultTasks.name = "Tasks";
defaultTasks.tasks = [];
defaultTaskList.name = "active";
defaultTaskList.style.color = "#117AD8";

/**
 * Event listeners which are initialized at the start of the application
 */
menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeRightColumn);
newListInput.addEventListener("keyup", createList);
newTaskInput.addEventListener("keyup", addTask);
newSubTaskInput.addEventListener("keyup", addSubTask);
defaultTaskList.addEventListener("click", getDefaultTasks.bind(defaultTasks));

/**
 * Used to open and close menu bar
 */
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

/**
 * Creates a list and append the created list with lists menu
 */
function createList(event) {
    if(event.which === 13 && event.target.value !== ""){
        tasksContainer.style.height = "";
        defaultTaskList.name = "inActive";
        defaultTaskList.style.color = "#595b5f";
        tasksContainer.innerHTML = "";
        closeRightColumn()

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
        list.id = lists.length - 1;
        currentListId = list.id;
        if(lists.length > 8){
            listsMenu.style.height = "210px";
        } else {
            listsMenu.style.height = "";
        }
        newListItem.addEventListener("click", getList.bind(list));
    }
}

/**
 * Creates task for a list and append the created task with tasks container
 */
 function addTask(event) {
    if(event.which === 13 && event.target.value !== ""){
        var task = {};
        task.name = newTaskInput.value;
        task.status = true;
        task.subTasks = [];
        task.serialNumber = taskId;
        if(defaultTaskList.name === "active") {
            task.id = defaultTasks.tasks.length;
            createTask(task);
            defaultTasks.tasks.push(task);
            if(defaultTasks.tasks.length > 8){
                tasksContainer.style.height = "450px";
            }
        } else {
            task.id = lists[currentListId].tasks.length;
            createTask(task);
            lists[currentListId].tasks.push(task);
            if(lists[currentListId].tasks.length > 8){
                tasksContainer.style.height = "450px";
            }
        }
        newTaskInput.value = "";
        taskId = taskId + 1;
    }
}

/**
 * Gets the list along with its tasks
 */
function getList(){
    if(lists[currentListId].tasks.length > 8){
        tasksContainer.style.height = "450px";
    } else {
        tasksContainer.style.height = "";
    }
    defaultTaskList.name = "inActive";
    defaultTaskList.style.color = "#595b5f";
    closeRightColumn()
    currentListId = this.id;
    tasksContainer.innerHTML = "";
    listTitle.value = this.name;
    for (task of this.tasks) {
        createTask(task);
    }
}

/**
 * Gets the default task container with its tasks
 */
function getDefaultTasks(){
    if(defaultTasks.tasks.length > 8){
        tasksContainer.style.height = "450px";
    } else {
        tasksContainer.style.height = "";
    }
    defaultTaskList.name = "active";
    defaultTaskList.style.color = "#117AD8";
    closeRightColumn()
    tasksContainer.innerHTML = "";
    listTitle.value = this.name;
    for (task of this.tasks) {
        createTask(task);
    }
}

/**
 * Used to display the created task and excisting task of the list
 */
function createTask(task){
    if(task.status === true) {
        var iconName = document.createTextNode("radio_button_unchecked");
    } else {
        var iconName = document.createTextNode("check_circle_outline");
    }
    var icon = document.createElement("I");
    icon.className="material-icons";
    icon.id = "task-icon" + task.serialNumber;
    icon.appendChild(iconName);
    
    var taskIcon = document.createElement("DIV");
    taskIcon.className="task-icon";
    taskIcon.appendChild(icon);
    
    var taskName = document.createElement("INPUT");
    taskName.value = task.name;
    taskName.id = "task" + task.serialNumber;
    taskName.readOnly = true;
    
    if(task.status === true){
        taskName.style.textDecoration = "none";
    } else {
        taskName.style.textDecoration = "line-through";
    }
    
    var taskInput = document.createElement("DIV");
    taskInput.className="task-input";
    taskInput.appendChild(taskName);
    
    var taskContainer = document.createElement("DIV");
    taskContainer.className = "task";
    taskContainer.appendChild(taskIcon);
    taskContainer.appendChild(taskInput);
    
    tasksContainer.appendChild(taskContainer);
    icon.addEventListener("click", manageTask.bind(task));
    taskName.addEventListener("click", getTask.bind(task));
}

/**
 * Used to change the status of the tasks
 */
function manageTask(){
    if(this.status === true) {
        this.status = false;
        document.getElementById("task" + this.serialNumber).style.textDecoration = "line-through";
        document.getElementById("task-icon" + this.serialNumber).innerHTML = "check_circle_outline";
        if(this.name === rightSideTaskInput.value)
            rightSideTaskInput.style.textDecoration = "line-through";
            rightSideTaskIcon.innerHTML = "check_circle_outline";
    } else {
        this.status = true;
        document.getElementById("task" + this.serialNumber).style.textDecoration = "none";
        document.getElementById("task-icon" + this.serialNumber).innerHTML = "radio_button_unchecked";
        if(this.name === rightSideTaskInput.value)
            rightSideTaskInput.style.textDecoration = "none";
            rightSideTaskIcon.innerHTML = "radio_button_unchecked";
    }
}

/**
 * Gets the task along with its subTasks
 */
function getTask(){
    if(this.subTasks.length > 1){
        subTasksContainer.style.height = "80px";
    } else {
        subTasksContainer.style.height = "";
    }
    currentTaskId = this.id;
    rightColumn.style.display = "block";
    rightSideTaskInput.value = this.name;
    if(this.status === true) {
        rightSideTaskInput.style.textDecoration = "none";
            rightSideTaskIcon.innerHTML = "radio_button_unchecked";
    } else {
        rightSideTaskInput.style.textDecoration = "line-through";
            rightSideTaskIcon.innerHTML = "check_circle_outline";
    }
    subTasksContainer.innerHTML = "";
    for (subTask of this.subTasks) {
        createSubTask(subTask);
    }
}

/**
 * Used to close the right column
 */
function closeRightColumn(){
    rightColumn.style.display = "none";
}

/**
 * Creates subTask for a task and append the created subTask with subTasks container
 */
 function addSubTask(event) {
    if(event.which === 13 && event.target.value !== ""){
        var subTask = {};
        subTask.name = newSubTaskInput.value;
        newSubTaskInput.value = "";
        subTask.status = true;
        subTask.serialNumber = subTaskId;
        if(defaultTaskList.name === "active") {
            subTask.id = defaultTasks.tasks[currentTaskId].subTasks.length;
            createSubTask(subTask);
            defaultTasks.tasks[currentTaskId].subTasks.push(subTask);
            if(defaultTasks.tasks[currentTaskId].subTasks.length > 1){
            console.log("> 5");
                subTasksContainer.style.height = "80px";
            }
        } else {
            subTask.id = lists[currentListId].tasks[currentTaskId].subTasks.length;
            createSubTask(subTask);
            lists[currentListId].tasks[currentTaskId].subTasks.push(subTask);
            if(lists[currentListId].tasks[currentTaskId].subTasks.length > 1){
                subTasksContainer.style.height = "80px";
            }
        }
        subTaskId = subTaskId + 1;
    }
}

/**
 * Used to display the created subTask and excisting subTasks of the task
 */
function createSubTask(subTask){
    if(subTask.status === true) {
        var iconName = document.createTextNode("radio_button_unchecked");
    } else {
        var iconName = document.createTextNode("check_circle_outline");
    }
    var icon = document.createElement("I");
    icon.className = "material-icons";
    icon.id = "sub-task-icon" + subTask.serialNumber;
    icon.appendChild(iconName);
    
    var taskIcon = document.createElement("DIV");
    taskIcon.className="task-icon";
    taskIcon.appendChild(icon);
    
    var taskName = document.createElement("INPUT");
    taskName.value = subTask.name;
    taskName.id = "sub-task" + subTask.serialNumber;
    taskName.readOnly = true;
    
    if(subTask.status === true){
        taskName.style.textDecoration = "none";
    } else {
        taskName.style.textDecoration = "line-through";
    }
    
    var taskInput = document.createElement("DIV");
    taskInput.className="task-input";
    taskInput.appendChild(taskName);
    
    var taskContainer = document.createElement("DIV");
    taskContainer.className = "subTask";
    taskContainer.appendChild(taskIcon);
    taskContainer.appendChild(taskInput);
    
    subTasksContainer.appendChild(taskContainer);
    icon.addEventListener("click", manageSubTask.bind(subTask));
}

/**
 * Used to change the status of the subTasks
 */
function manageSubTask(){
    if(this.status === true) {
        this.status = false;
        document.getElementById("sub-task" + this.serialNumber).style.textDecoration = "line-through";
        document.getElementById("sub-task-icon" + this.serialNumber).innerHTML = "check_circle_outline";
    } else {
        this.status = true;
        document.getElementById("sub-task" + this.serialNumber).style.textDecoration = "none";
        document.getElementById("sub-task-icon" + this.serialNumber).innerHTML = "radio_button_unchecked";
    }
}
