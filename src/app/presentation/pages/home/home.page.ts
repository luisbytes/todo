import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Todo } from '@app/core/entities';
import { CategoryRepository, TodoRepository } from '@app/core/repositories';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  todos = signal<Todo[]>([]);
  categories = signal<string[]>([]);

  selectedCategory = signal<string>('');

  filteredTodos = computed(() => {
    const selected = this.selectedCategory();

    if (selected) {
      return this.todos().filter((todo) => todo.category === selected);
    }

    return this.todos();
  });

  private todoRepository = inject(TodoRepository);
  private categoryRepository = inject(CategoryRepository);

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async ionViewWillEnter(): Promise<void> {
    await this.loadData();
  }

  onCategoryChange(value: string | null): void {
    this.selectedCategory.set(value ?? '');
  }

  async onTodoChecked(todo: Todo, completed: boolean): Promise<void> {
    await this.todoRepository.toggleCompleted(todo.id, completed);
    await this.loadData();
  }

  async onDeleteTodo(todo: Todo): Promise<void> {
    await this.todoRepository.delete(todo.id);
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    const [todos, categories] = await Promise.all([this.todoRepository.getAll(), this.categoryRepository.getAll()]);

    this.todos.set(todos);
    this.categories.set(categories.map((category) => category.name));
  }
}
