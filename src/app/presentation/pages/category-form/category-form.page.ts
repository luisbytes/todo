import { Component, computed, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { CategoryRepository } from '@app/core/repositories';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
  standalone: false,
})
export class CategoryFormPage {
  id = input<string>();

  isNew = computed(() => this.id() === 'new');

  title = computed(() => (this.isNew() ? 'Crear Categoría' : 'Editar Categoría'));

  form: FormGroup;

  private formBuilder = inject(FormBuilder);
  private categoryRepository = inject(CategoryRepository);
  private navController = inject(NavController);

  constructor() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    const isNew = this.isNew();

    if (isNew) {
      this.categoryRepository.create(this.form.value);
      this.navController.back();

      return;
    }

    this.categoryRepository.update(Number(this.id()), this.form.value);
    this.navController.back();
  }
}
