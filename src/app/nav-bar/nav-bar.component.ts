import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { defaultList } from '../lists';
import { ListService } from '../list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  status : boolean = true;
  lists : List[]
  selectedList : Object = defaultList;
  defaultList : Object = defaultList;

  ngOnInit() {
    this.getLists();
  }

  constructor(private listService : ListService) {
  }

  /**
   * Gets all lists
   */
  getLists(): void {
    this.lists = this.listService.getLists();
  }

  /**
   * Adds new list
   * 
   * @param addListInput HTML object
   */
  addList(addListInput): void {
    var newList = new List(addListInput.value);
    this.listService.addList(newList);
    this.setList(newList);
    addListInput.value = "";
  }

  /**
   * Toggle the status between true and false
   */
  toggleMenu(){
    this.status = !this.status;
  }

  /**
   * Sets value for list
   * 
   * @param list Object
   */
  setList(list : Object) {
    this.selectedList = list;
  }

}
