import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonList } from '@ionic/angular';

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
  private alertController = inject(AlertController);
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

    this.closeSlidingItems();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message: 'Al eliminar esta categoría se borrarán también todas las todo asociadas. ¿Deseas continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.performDeleteCategory(category);
          },
        },
      ],
    });

    await alert.present();
  }

  private async performDeleteCategory(category: Category) {
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
