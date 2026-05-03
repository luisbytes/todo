import { Component, signal } from '@angular/core';

import { Todo } from '@app/core/entities';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  todos = signal<Todo[]>([
    {
      category: 'Work',
      title: 'Finish the project report',
      completed: false,
    },
  ]);

  constructor() {}
}
