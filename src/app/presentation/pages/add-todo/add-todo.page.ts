import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { Category } from '@app/core/entities';
import { CategoryRepository, TodoRepository } from '@app/core/repositories';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
  standalone: false,
})
export class AddTodoPage implements OnInit {
  form?: FormGroup;
  categories: Category[] = [];
  isSubmitting = false;

  private formBuilder = inject(FormBuilder);
  private todoRepository = inject(TodoRepository);
  private categoryRepository = inject(CategoryRepository);
  private navController = inject(NavController);

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryRepository.getAll();

    const defaultCategory = this.categories.length > 0 ? this.categories[0].name : '';

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      category: [defaultCategory, Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form?.invalid) {
      return;
    }

    this.isSubmitting = true;

    try {
      const { title, category } = this.form?.value;

      await this.todoRepository.create({
        title: title.trim(),
        category,
      });

      this.navController.navigateBack('/tabs/home');
    } finally {
      this.isSubmitting = false;
    }
  }
}
