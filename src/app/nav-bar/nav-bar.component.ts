import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { lists } from '../lists';
import { defaultList } from '../lists';
import { importants } from '../lists';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  status : boolean = true;
  lists : Object = lists;

  a:boolean=false;

  selectedList : Object = defaultList;




  defaultList : Object = defaultList;

  importants : Object = importants;

  ngOnInit() {
  }

  /**
   * Toggle the status between true and false
   */
  toggleMenu(){
    this.status = !this.status;
  }

  /**
   * Adds a list into the lists
   * 
   * @param addListInput HTML object
   */
  addList(addListInput) {
    if(addListInput.value !== ""){
      var newList = new List(addListInput.value);
      lists.push(newList);
      this.setList(newList);
      addListInput.value = "";}
  }

  /**
   * Sets value for list
   * 
   * @param list Object
   */
  setList(list) {
    this.selectedList = list;
  }

}
