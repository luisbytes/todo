import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';

import { CategoryRepository } from '@app/core/repositories';
import { ToastService } from '@app/presentation/services/toast.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
  standalone: false,
})
export class CategoryFormPage implements OnInit {
  id = input<string>();

  isNew = computed(() => this.id() === 'new');

  title = computed(() => (this.isNew() ? 'Crear Categoría' : 'Editar Categoría'));

  form: FormGroup;

  private formBuilder = inject(FormBuilder);
  private categoryRepository = inject(CategoryRepository);
  private navController = inject(NavController);
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.populateForm();
  }

  async onSubmit() {
    try {
      await this.createOrUpdateCategory();
    } catch (error) {
      this.toastService.showError('Ocurrió un error al guardar la categoría');
    }
  }

  private async createOrUpdateCategory() {
    if (this.isNew()) {
      await this.categoryRepository.create(this.form.value);
      await this.toastService.showSuccess('Categoría creada exitosamente');
      this.navController.back();
      return;
    }

    await this.categoryRepository.update(Number(this.id()), this.form.value);
    await this.toastService.showSuccess('Categoría actualizada exitosamente');
    this.navController.back();
  }

  private populateForm() {
    if (this.isNew()) {
      return;
    }

    const { name } = this.router.currentNavigation()?.extras.state as { name: string };

    this.form.patchValue({
      name,
    });

    this.form.markAsPristine();
  }
}
