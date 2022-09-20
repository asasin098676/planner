import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

interface Todo {
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
export class AppComponent {
  public labelName: string = '';
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
  public todos: Todo[] = [];
  public todoItemFormGroup = new FormGroup({
    dayOfWeek: new FormControl<string>(''),
    time: new FormControl<string>('', [Validators.required]),
    todoValue: new FormControl<string>('', [Validators.required]),
  });

  selectedTabValue(event: any): void {
    this.currentDay = event.tab.textLabel;
  }

  public add(name: string, clock: string): void {
    this.todos.push({
      name: name,
      clock: clock.slice(0, 5),
      id: clock[0] + clock[1] + clock[3] + clock[4],
      day: this.currentDay,
      date: this.dateMom,
    });
    console.log(this.todos);
    this.todoItemFormGroup.reset();
    this.todos.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  ngOnInit(): void {}
}
