import { Component, OnInit } from '@angular/core';
import { List } from '../list';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  status : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.status = !this.status;
  }
  addList(name : String) {
    const list = new List(1, name, []);
    console.log(list.name);
  }

}
