import { Component, computed, signal } from '@angular/core';

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

  selectedCategory = signal<string>('');

  categories = computed(() => {
    const cats = new Set(this.todos().map((todo) => todo.category));
    return Array.from(cats).sort();
  });

  filteredTodos = computed(() => {
    const selected = this.selectedCategory();

    if (selected) {
      return this.todos().filter((todo) => todo.category === selected);
    }

    return this.todos();
  });

  constructor() {}
}
