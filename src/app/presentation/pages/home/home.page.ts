import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Todo } from '@app/core/entities';
import { ToastService } from '@app/presentation/services/toast.service';
import { CategoryStore } from '@app/presentation/store/category.store';
import { TodoStore } from '@app/presentation/store/todo.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  private todoStore = inject(TodoStore);
  private categoryStore = inject(CategoryStore);
  private toastService = inject(ToastService);

  todos = this.todoStore.entities;

  categories = computed(() => {
    const entities = this.categoryStore.entities();

    return entities.map((category) => category.name);
  });

  selectedCategory = signal<string>('');

  filteredTodos = computed(() => {
    const selected = this.selectedCategory();

    if (selected) {
      return this.todos().filter((todo) => todo.category === selected);
    }

    return this.todos();
  });

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  onCategoryChange(value: string | null): void {
    this.selectedCategory.set(value ?? '');
  }

  async onTodoChecked(todo: Todo, completed: boolean): Promise<void> {
    await this.todoStore.toggleCompleted(todo.id, completed);

    await this.toastService.showSuccess(`Tarea "${todo.title}" marcada como ${completed ? 'completada' : 'pendiente'}`);
  }

  async onDeleteTodo(todo: Todo): Promise<void> {
    await this.todoStore.deleteTodo(todo.id);

    await this.toastService.showSuccess(`Tarea "${todo.title}" eliminada`);
  }

  private async loadData(): Promise<void> {
    await Promise.all([this.todoStore.loadTodos(), this.categoryStore.loadCategories()]);
  }
}
