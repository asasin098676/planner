import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from './fire.service';
import * as moment from 'moment';

export interface Todo {
  name: string;
  clock: string;
  id: string;
  day: string;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public labelName: string = '';
  public dayOfWeek: string = '';
  public days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  public dateMom = moment().format('D MMM YYYY');
  public currentDay = moment().format('dddd');

  todos: Todo[] = [];
  public todoItemFormGroup = new FormGroup({
    dayOfWeek: new FormControl<string>(''),
    time: new FormControl<string>('', [Validators.required]),
    todoValue: new FormControl<string>('', [Validators.required]),
  });

  selectedTabValue(event: any): void {
    this.currentDay = event.tab.textLabel;
    this.todos.splice(0);
    this.fireService.loadTodosByDay(this.currentDay).subscribe((todos) => {
      for (let i = 0; i <= todos.length; i++) {
        this.todos.push({
          name: todos[i].name,
          clock: todos[i].clock,
          id: todos[i].id,
          day: todos[i].day,
          date: todos[i].date,
        });
      }
    });
  }

  constructor(public fireService: FireService) {}

  public add(name: string, clock: string): void {
    this.todos.push({
      name: name,
      clock: clock.slice(0, 5),
      id: '2342324',
      day: this.currentDay,
      date: this.dateMom,
    });

    this.fireService
      .create(this.todos, this.currentDay)
      .subscribe((todos) => {});

    this.todoItemFormGroup.reset();
    this.todos.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  remove(task: Todo) {
    this.fireService.remove(task).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== task.id);
    });
  }

  ngOnInit(): void {}
}
