import { Injectable } from '@angular/core';
import { List } from './list';
import { lists, defaultList } from './lists';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getLists() : List[] {
    return lists;
  }

  getList(id : Number) {
    return lists.find(hero => hero.id === id);
  }

  getDefaultList() {
    return defaultList;
  }

  addList(list : List) : void {
    lists.push(list);
  }
}
