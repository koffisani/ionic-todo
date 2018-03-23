import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import 'rxjs/add/operator/map';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private todos = [];
  private archedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  archiveTodo (todoIndex) {
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archedTodos.push(todoToBeArchived);
  }

  getTodos() {
    return this.todos;
  }

  getArchivedTodos () {
    return this.archedTodos;
  }

  addTodo (todo) {
    this.todos.push(todo);
  }
}
