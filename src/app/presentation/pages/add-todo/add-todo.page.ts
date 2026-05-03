import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { ToastService } from '@app/presentation/services/toast.service';
import { CategoryStore } from '@app/presentation/store/category.store';
import { TodoStore } from '@app/presentation/store/todo.store';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
  standalone: false,
})
export class AddTodoPage implements OnInit {
  private todoStore = inject(TodoStore);
  private categoryStore = inject(CategoryStore);

  form?: FormGroup;
  categories = this.categoryStore.entities;
  isSubmitting = signal(false);

  private formBuilder = inject(FormBuilder);

  private navController = inject(NavController);
  private toastService = inject(ToastService);

  async ngOnInit(): Promise<void> {
    const defaultCategory = this.categories.length > 0 ? this.categories()?.[0].name : '';

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      category: [defaultCategory, Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form?.invalid) {
      return;
    }

    this.isSubmitting.set(true);

    try {
      const { title, category } = this.form?.value;

      await this.todoStore.createTodo({
        title: title.trim(),
        category,
      });

      this.navController.navigateBack('/tabs/home');

      await this.toastService.showSuccess('Tarea agregada correctamente');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
