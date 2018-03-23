import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;

  constructor(public toastController: ToastController,
    public navCtrl: NavController, 
    private alertController : AlertController, 
    private todoProvider: TodoProvider) {
      this.todos = this.todoProvider.getTodos();
  }

  goToArchivePage () {
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo (todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  toggleReorder () {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Entrez votre Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            //this.todos.push(todoText);
            this.todoProvider.addTodo(todoText);
            
            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000,
              });
              addTodoToast.present();
            });            
          }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodoAlert(todoIndex) {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Entrez la nouvelle valeur de votre Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Modifier Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            //this.todos.push(todoText);
            this.todos = this.todoProvider.editTodo(todoText, todoText);
            
            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Modifié",
                duration: 2000,
              });
              addTodoToast.present();
            });            
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
