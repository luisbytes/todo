import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonList } from '@ionic/angular';

import { Category } from '@app/core/entities';
import { CategoryRepository } from '@app/core/repositories';
import { ToastService } from '@app/presentation/services/toast.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage {
  private categoryRepository = inject(CategoryRepository);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private categoriesList = viewChild<IonList>('categoriesList');

  categories = signal<Category[]>([]);

  ionViewDidEnter() {
    this.loadCategories();
  }

  goToEditCategory(category: Category) {
    this.router.navigate(['/category-form/', category.id], {
      state: { category },
    });
  }

  async deleteCategory(category: Category) {
    try {
      await this.categoryRepository.delete(category.id);
      await this.loadCategories();
      await this.toastService.showSuccess('Categoría eliminada correctamente');
    } catch (error) {
      await this.toastService.showError('Error al eliminar la categoría');
    }
  }

  private async loadCategories() {
    const categories = await this.categoryRepository.getAll();

    this.categories.set(categories);

    await this.closeSlidingItems();
  }

  private async closeSlidingItems() {
    await this.categoriesList()?.closeSlidingItems();
  }
}
