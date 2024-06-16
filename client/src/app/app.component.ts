import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  Title = 'Todo App';
  todos: Todo[] = [];

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this._todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(title: string): void {
    const newTodo: Partial<Todo> = { title, completed: false };
    this._todoService.addTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }

  updateTodo(todo: Todo): void {
    this._todoService
      .updateTodo(todo._id, { completed: !todo.completed })
      .subscribe((updatedTodo) => {
        const index = this.todos.findIndex((t) => t._id === updatedTodo._id);
        this.todos[index] = updatedTodo;
      });
  }

  deleteTodo(id: string): void {
    this._todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo._id !== id);
    });
  }
}
