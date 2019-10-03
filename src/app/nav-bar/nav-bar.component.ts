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
  list : Object = defaultList;
  defaultList : Object = defaultList;

  ngOnInit() {
  }

  toggleMenu(){
    this.status = !this.status;
  }

  addList(addListInput) {
    var newList = new List(addListInput.value);
    lists.push(newList);
    this.setList(newList);
    addListInput.value = "";
  }

  setList(list) {
    this.list = list;
  }

}
