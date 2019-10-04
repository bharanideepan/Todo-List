import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { lists } from '../lists';
import { defaultList } from '../lists';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  status : boolean = true;
  lists : Object = lists;
  selectedList : Object = defaultList;
  defaultList : Object = defaultList;

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
    var newList = new List(addListInput.value);
    lists.push(newList);
    this.setList(newList);
    addListInput.value = "";
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
