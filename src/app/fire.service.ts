import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './app.component';
import { map, Observable } from 'rxjs';
import { remove } from 'firebase/database';

interface LoadTodosResponse {
  [id: string]: Todo;
}

@Injectable({ providedIn: 'root' })
export class FireService {
  static url = 'https://romanprogect-default-rtdb.firebaseio.com/task';

  constructor(private http: HttpClient) {}

  create(todos: any, day: any): Observable<Todo> {
    return this.http.post<any>(
      `${FireService.url}/${day}.json`,
      todos[todos.length - 1]
    );
  }

  public loadTodosByDay(day: string): Observable<Todo[]> {
    return this.http
      .get<LoadTodosResponse>(`${FireService.url}/${day}/.json`)
      .pipe(
        map((res: LoadTodosResponse) => {
          if (!res) {
            return [];
          }

          return Object.keys(res).map((key: string) => ({
            ...res[key],
            id: key,
          }));
        })
      );
  }
  remove(task: Todo) {
    return this.http.delete<void>(
      `${FireService.url}/${task.day}/${task.id}.json`
    );
  }
}
