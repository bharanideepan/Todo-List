
init();

function init(){
    declareGlobalVariables();
    initializeEventListeners();
}

/**
 * Global variables which are used to store lists
 * And track number of lists and tasks added
 */
function declareGlobalVariables(){
    defaultTasks = {};
    defaultTasks.name = "Tasks";
    defaultTasks.tasks = [];
    lists = [];
    listId = 0;
    currentListId = 0;
    taskId = 0;
    currentTaskId = 0;
    subTaskId = 0;
    currentSubTaskId = 0;

    defaultTaskList = getElementById("default-task");
    defaultTaskList.name = "active";
    newListInput = getElementById("addList-input");
    listsMenu = getElementById("listsMenu");
    listTitle = getElementById("list-title");
    newTaskInput = getElementById("newTask-input");
    tasksContainer = getElementById("tasks");
    subTasksContainer = getElementById("subTasks");
    rightSideTaskInput = getElementById("tasksInput-right");
    rightColumn = getElementById("rightColumn");
    newSubTaskInput = getElementById("newSubTask-input");
    notes = getElementById("add-notes");
    rightSideTaskIcon = getElementById("tasksIcon-right");
    popUp = getElementById("popUpId");
}

/**
 * Adds event listener for the element in the beginning of the application
 */
function initializeEventListeners(){
    addEventListener(getElementById("menu-btn"), "click", openMenu);
    bindEventListener(defaultTaskList, "click", getDefaultTasks, defaultTasks);
    addEventListener(newListInput, "keyup", addList);
    addEventListener(newTaskInput, "keyup", addTask);
    addEventListener(getElementById("close-right-column"), "click", function(){
        rightColumn.classList.remove("display");
    });
    addEventListener(newSubTaskInput, "keyup", addSubTask);
    addEventListener(notes, "blur", addNotes);
    addEventListener(getElementsByClassName("deleteBtn")[0], "click", deleteSubTask);
    addEventListener(getElementsByClassName("cancelBtn")[0], "click", function (){
        popUp.classList.remove("display");
    });
}

/**
 * Gets the element by Id
 * 
 * @param {String} id - Id of the element
 */
function getElementById(id){
    return document.getElementById(id);
}

/**
 * Gets the elements by class name
 * 
 * @param {String} className - class name of the element
 */
function getElementsByClassName(className){
    return document.getElementsByClassName(className);
}

/**
 * Adds event listener for the element
 * 
 * @param {Object} element - Document object which is needed to add event listener
 * @param {String} event - Which is the event
 * @param {myFunction} myFunction - Function which is to be executed when the event is passed on the element
 */
function addEventListener(element, event, myFunction){
    element.addEventListener(event, myFunction);
}

/**
 * Adds event listener for the element and also binds the object
 * 
 * @param {Object} element - Document object which is needed to add event listener
 * @param {String} event - Which is the event
 * @param {myFunction} myFunction - Function which is to be executed when the event is passed on the element
 * @param {Object} bindElement - Object which is to be binded with the function
 */
function bindEventListener(element, event, myFunction, bindElement){
    element.addEventListener(event, myFunction.bind(bindElement));
}

/**
 * Inserts the given text into the given element
 * 
 * @param {Object} element - Document object to which text to be added
 * @param {String} text - Text to be inserted into the element
 */
function writeInnerHTML(element, text){
    element.innerHTML = text;
}

/**
 * Creates an element and adds class name and id if provided
 * 
 * @param {String} elementName - Name of the element to be created
 * @param {String} className - Class name may or may not be present
 * @param {String} id - Id may or may not be present
 */
function createElement(elementName, className = "", id = ""){
    var element = document.createElement(elementName);
    element.className = className;
    element.id = id;
    return element;
}

/**
 * Appends the child element with the parent
 * 
 * @param {Object} parentElement
 * @param {Object} childElement 
 */
function appendChild(parentElement, childElement){
    parentElement.appendChild(childElement);
}

/**
 * Used to open and close menu bar
 */
function openMenu() {
    var itemDescriptions = getElementsByClassName("item-description");
    for(itemDescription of itemDescriptions){
        itemDescription.classList.toggle("display");
    }
    getElementById("nav-bar").classList.toggle("nav-bar-open");
}

/**
 * Used to add a list
 * 
 * @param {*} event
 */
function addList(event) {
    if(event.which === 13 && event.target.value !== ""){
        defaultTaskList.name = "inActive";
        defaultTaskList.classList.add("gray-color");
        rightColumn.classList.remove("display");
        writeInnerHTML(tasksContainer, "");
        var list = {};
        list.originalName = newListInput.value;
        list.name = getListName(list.originalName);
        list.tasks = [];
        list.id = lists.length;
        lists.push(list);
        currentListId = list.id;
        createList(list);
    }
}

/**
 * Checks whether the name is already present
 * If yes this method appends number with the name
 * 
 * @param {String} name - Name of the object
 */
function getListName(name) {
    var count = getListsCountByName(name);
    if(name === "Tasks") {
        count = count + 1;
    }
    if(count !== 0) {
        return name + "(" + (count) + ")";
    }
    return name;
}

/**
 * Creates a list and append the created list with lists menu
 * 
 * @param {Object} list - Created list which is to be displayed to the client
 */
function createList(list) {
        var icon = createElement("I", "material-icons");
        writeInnerHTML(icon, "list");
        var itemIcon = document.createElement("DIV", "item-icon");
        appendChild(itemIcon, icon);
        var span = createElement("SPAN", "", "list-name" + list.id);
        writeInnerHTML(span, list.name); 
        var taskCount = createElement("SPAN", "task-count-span", "task-count-span" + list.id);
        var subItemDesc = createElement("DIV", "item-desc-sub");
        appendChild(subItemDesc, span);
        appendChild(subItemDesc, taskCount);
        var itemDescription = createElement("DIV", "item-description");
        appendChild(itemDescription, subItemDesc);
        itemDescription.classList.add("display");
        var newListItem = createElement("li");
        appendChild(newListItem, itemIcon);
        appendChild(newListItem, itemDescription);
        appendChild(listsMenu, newListItem);
        listTitle.value = list.name;
        newListInput.value = "";
        if(lists.length > 8){
            listsMenu.classList.add("lists-menu-height");
        } else {
            listsMenu.classList.remove("lists-menu-height");
        }
        bindEventListener(newListItem, "click", getList, list);
}

/**
 * Gets the list along with its tasks
 */
function getList(){
    if(lists[currentListId].tasks.length > 8){
        tasksContainer.classList.add("tasks-height");
    } else {
        tasksContainer.classList.remove("tasks-height");
    }
    defaultTaskList.name = "inActive";
    defaultTaskList.classList.add("gray-color");
    rightColumn.classList.remove("display");
    currentListId = this.id;
    writeInnerHTML(tasksContainer, "");
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
        tasksContainer.classList.add("tasks-height");
    } else {
        tasksContainer.classList.remove("tasks-height");
    }
    defaultTaskList.name = "active";
    defaultTaskList.classList.remove("grey-color");
    rightColumn.classList.remove("display");
    writeInnerHTML(tasksContainer, "");
    listTitle.value = this.name;
    for (task of this.tasks) {
        createTask(task);
    }
}

/**
 * Creates task for a list and append the created task with tasks container
 * 
 * @param {*} event
 */
 function addTask(event) {
    if(event.which === 13 && event.target.value !== ""){
        var task = {};
        task.name = newTaskInput.value;
        task.status = true;
        task.subTasks = [];
        task.serialNumber = taskId;
        task.isDeleted = false;
        task.notes = "";
        var list = (defaultTaskList.name === "active")
                ? defaultTasks : lists[currentListId];
        task.id = list.tasks.length;
        createTask(task);
        list.tasks.push(task);
        if(list.tasks.length > 8)
        tasksContainer.classList.add("tasks-height");
        if(defaultTaskList.name !== "active") {
            var tasksCountContainer = getElementById("task-count-span" + list.id);
            writeInnerHTML(tasksCountContainer, getArrayCountByStatus(list.tasks, false) + " of " + list.tasks.length);
        }
        newTaskInput.value = "";
        taskId = taskId + 1;
    }
}

/**
 * Used to count of array by status
 * 
 * @param {Array} array - Array of objects to be filtered
 * @param {Boolean} condition - Condition to be applied for filtering
 */
function getArrayCountByStatus(array, condition){
    return array.filter(element => element.status === condition && element.isDeleted === false).length;
}

/**
 * Used to display the created task and excisting task of the list
 * 
 * @param {Object} task - Task to be displayed to the client
 */
function createTask(task){
    var list = lists[currentListId];
    var iconName = (task.status) ? "radio_button_unchecked" : "check_circle_outline";
    var icon = createElement("I", "material-icons", "task-icon" + task.serialNumber);
    writeInnerHTML(icon, iconName);
    var taskIcon = createElement("DIV", "task-icon");
    appendChild(taskIcon, icon);
    var taskName = createElement("INPUT", "", "task" + task.serialNumber);
    taskName.value = task.name;
    taskName.readOnly = true;
    if(task.status){
        taskName.classList.remove("line-through");
    } else {
        taskName.classList.add("line-through");
    }
    var taskInput = createElement("DIV", "task-input");
    appendChild(taskInput, taskName);
    var subTaskLength = createElement("span", "", "sub-task-length" + task.serialNumber);
    var notesSpan = createElement("span", "", "notes" + task.serialNumber);
    if(task.subTasks.length > 0){
        taskName.classList.add("task-height");
        writeInnerHTML(subTaskLength,
                getArrayCountByStatus(task.subTasks, false) + " of " +
                        getUndeletedArrayCount(task.subTasks));
    }
    if(task.notes !== "") {
        taskName.classList.add("task-height");
        createNotesContainer(notesSpan);
    }
    var taskShortDetails = createElement("DIV", "taskShortDetails");
    appendChild(taskShortDetails, subTaskLength);
    appendChild(taskShortDetails, notesSpan);
    appendChild(taskInput, taskShortDetails);
    var taskContainer = createElement("DIV", "task");
    taskContainer.contextMenu = "mymenu";
    appendChild(taskContainer, taskIcon);
    appendChild(taskContainer, taskInput);
    appendChild(tasksContainer, taskContainer);
    bindEventListener(icon, "click", manageTask, task);
    bindEventListener(taskInput, "click", getTask, task);
    //bindEventListener(taskContainer, "contextmenu", getContextMenu, taskContainer);
}

/**
 * Gets the task along with its subTasks
 */
function getTask(){
    if(this.subTasks.length > 1){
        subTasksContainer.classList.add("sub-tasks-height");
    } else {
        subTasksContainer.classList.remove("sub-tasks-height");
    }
    currentTaskId = this.id;
    rightColumn.classList.add("display");
    rightSideTaskInput.value = this.name;
    if(this.status) {
        rightSideTaskInput.classList.remove("line-through");
        writeInnerHTML(rightSideTaskIcon, "radio_button_unchecked");
    } else {
        rightSideTaskInput.classList.add("line-through");
        writeInnerHTML(rightSideTaskIcon, "check_circle_outline");
    }
    writeInnerHTML(notes, this.notes);
    writeInnerHTML(subTasksContainer, "");
    for (subTask of this.subTasks) {
        if(!subTask.isDeleted)
            createSubTask(subTask);
    }
}

/**
 * Creates subTask for a task and append the created subTask with subTasks container
 * 
 * @param {*} event
 */
 function addSubTask(event) {
    if(event.which === 13 && event.target.value !== ""){
        var subTask = {};
        subTask.name = newSubTaskInput.value;
        newSubTaskInput.value = "";
        subTask.status = true;
        subTask.serialNumber = subTaskId;
        subTask.isDeleted = false;
        var list = (defaultTaskList.name === "active") ? defaultTasks : lists[currentListId];
        subTask.id = list.tasks[currentTaskId].subTasks.length;
        createSubTask(subTask);
        list.tasks[currentTaskId].subTasks.push(subTask);
        if(list.tasks[currentTaskId].subTasks.length > 1){
            subTasksContainer.classList.add("sub-tasks-height");
        }
        subTaskId = subTaskId + 1;
        changeSubTasksCount();
    }
}

/**
 * Used to display the created subTask and excisting subTasks of the task
 * 
 * @param {Object} subTask - Subtask to be displayed to the client
 */
function createSubTask(subTask){
    var iconName = (subTask.status) ? "radio_button_unchecked" : "check_circle_outline";
    var icon = createElement("I", "material-icons", "sub-task-icon" + subTask.serialNumber);
    writeInnerHTML(icon, iconName);
    var taskIcon = createElement("DIV", "task-icon");
    appendChild(taskIcon, icon);
    var taskName = createElement("INPUT", "", "sub-task" + subTask.serialNumber);
    taskName.value = subTask.name;
    taskName.readOnly = true;
    if(subTask.status){
        taskName.classList.remove("line-through");
    } else {
        taskName.classList.add("line-through");
    }
    var taskInput = createElement("DIV", "task-input");
    appendChild(taskInput, taskName);
    var dltIcon = createElement("I", "material-icons", "sub-task-dlt-icon" + subTask.serialNumber);
    writeInnerHTML(dltIcon, "clear");
    var deleteDiv = createElement("DIV", "task-delete");
    appendChild(deleteDiv, dltIcon);
    deleteDiv.classList.add("delete-task");
    var taskContainer = createElement("DIV", "subTask");
    appendChild(taskContainer, taskIcon);
    appendChild(taskContainer, taskInput);
    appendChild(taskContainer, deleteDiv);
    appendChild(subTasksContainer, taskContainer);
    bindEventListener(icon, "click", manageSubTask, subTask);
    addEventListener(taskContainer, "mouseover", function(){
        deleteDiv.classList.remove("delete-task");
    });
    addEventListener(taskContainer, "mouseout", function(){
        deleteDiv.classList.add("delete-task");
    });
    bindEventListener(dltIcon, "click", getConfirmation, subTask);
}

/**
 * Used to count array by name
 * 
 * @param{String} name - Name of the list
 */
function getListsCountByName(name){
    return lists.filter(list => list.originalName === name).length;
}

/**
 * Used to change the status of the tasks
 */
function manageTask(){
    var iconName = (this.status) ? "check_circle_outline": "radio_button_unchecked";
    var text = getElementById("task" + this.serialNumber);
    var icon = getElementById("task-icon" + this.serialNumber);
    writeInnerHTML(icon, iconName);
    writeInnerHTML(rightSideTaskIcon, iconName);
    if(this.status) {
        this.status = false;
        text.classList.add("line-through");
        if(this.name === rightSideTaskInput.value)
            rightSideTaskInput.classList.add("line-through");
    } else {
        this.status = true;
        text.classList.remove("line-through");
        if(this.name === rightSideTaskInput.value)
            rightSideTaskInput.classList.remove("line-through");
    }
    changeTasksCount();
}

/**
 * Used to change the status of the subTasks
 */
function manageSubTask(){
    var iconName = (this.status) ? "check_circle_outline": "radio_button_unchecked";
    var text = getElementById("sub-task" + this.serialNumber);
    writeInnerHTML(getElementById("sub-task-icon" + this.serialNumber), iconName);
    if(this.status) {
        this.status = false;
        text.classList.add("line-through");
    } else {
        this.status = true;
        text.classList.remove("line-through");
    }
    changeSubTasksCount();
}

/**
 * Used to display status of subTasks
 */
function changeTasksCount(){
    if(defaultTaskList.name === "inActive") {
        var list = lists[currentListId];
        writeInnerHTML(getElementById("task-count-span" + list.id),
                getArrayCountByStatus(list.tasks, false) + " of " + list.tasks.length);
    }
}

/**
 * Used to count of array by status
 * 
 * @param{Array} array - Array which is to be counted after filtering
 */
function getUndeletedArrayCount(array){
    return array.filter(element => element.isDeleted === false).length;
}

/**
 * Adds notes for a task
 */
function addNotes(){
    var task = (defaultTaskList.name === "active")
            ? defaultTasks.tasks[currentTaskId]
            : lists[currentListId].tasks[currentTaskId];
    task.notes = notes.textContent;
    createNotesContainer(getElementById("notes" + task.serialNumber));
}
/**
 * Displays notes icon under the task
 * 
 * @param {Object} notesContainer
 */
function createNotesContainer(notesContainer) {
    writeInnerHTML(notesContainer, "");
    var dot = createElement("i", "material-icons dot");
    writeInnerHTML(dot, "lens");
    appendChild(notesContainer, dot);
    var icon = createElement("i", "material-icons notes-icon");
    writeInnerHTML(icon, "description");
    appendChild(notesContainer, icon);
    var lable = document.createTextNode("Notes");
    appendChild(notesContainer, lable);
}

/**
 * Used to display status of subTasks
 */
function changeSubTasksCount(){
    var task = (defaultTaskList.name === "active")
            ? defaultTasks.tasks[currentTaskId]
            : lists[currentListId].tasks[currentTaskId];
    writeInnerHTML(document.getElementById("sub-task-length" + task.serialNumber),
            getArrayCountByStatus(task.subTasks, false) + " of " + getUndeletedArrayCount(task.subTasks));
}

/**
 * Used to display popUp confirmation
 */
function getConfirmation(){
    currentSubTaskId = this.id;
    popUp.classList.add("display");
}

/**
 * Used to delete the sub-task
 */
function deleteSubTask() {
    var task = (defaultTaskList.name === "active")
            ? defaultTasks.tasks[currentTaskId]
            : lists[currentListId].tasks[currentTaskId];
    task.subTasks[currentSubTaskId].isDeleted = true;
    changeSubTasksCount();
    writeInnerHTML(subTasksContainer, "");
    for (subTask of task.subTasks) {
        if(!subTask.isDeleted)
            createSubTask(subTask);
    }
    popUp.classList.remove("display");
}
/*
function getContextMenu(event) {
    console.log("inside context menu");
    var menu = document.createElement("menu");
    menu.type = "context";
    menu.id = "mymenu";
    var menuitem = document.createElement("menuitem");
    menuitem.label = "Delete task";
    menu.appendChild(menuitem);
    this.appendChild(menu);
    event.preventDefault();
}*/
