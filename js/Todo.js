function clickedField(id, value) {
    if(value === "close") {
        document.getElementById(id).value="open";
        document.getElementById("nav-bar").style.width="295px";
        var itemDescriptions = document.querySelectorAll(".item-description");
        for (i = 0; i < itemDescriptions.length; i++) {
            itemDescriptions[i].style.display = "block";
        }
        document.getElementsByClassName("add-list-input")[0].style.display = "block";
    } else {
        document.getElementById(id).value="close";
        document.getElementById("nav-bar").style.width="55px";
        var itemDescriptions = document.querySelectorAll(".item-description");
        for (i = 0; i < itemDescriptions.length; i++) {
            itemDescriptions[i].style.display = "none";
        }
        document.getElementsByClassName("add-list-input")[0].style.display = "none";
    }
}
function mouseOverField(id) {
    document.getElementById(id).style.border="1px solid #ededed";
}
function mouseOutField(id) {
    document.getElementById(id).style.border="1px solid #f4f4f4";
}
