import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Partial<Todo>): Observable<Todo> {
    return this._http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this._http.patch<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
