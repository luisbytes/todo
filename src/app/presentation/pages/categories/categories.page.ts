import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonList } from '@ionic/angular';

import { Category } from '@app/core/entities';
import { RemoteConfigService } from '@app/core/services/remote-config.service';
import { ToastService } from '@app/presentation/services/toast.service';
import { CategoryStore } from '@app/presentation/store/category.store';
import { TodoStore } from '@app/presentation/store/todo.store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  private categoryStore = inject(CategoryStore);
  private todoStore = inject(TodoStore);

  private alertController = inject(AlertController);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private categoriesList = viewChild<IonList>('categoriesList');
  private remoteConfig = inject(RemoteConfigService);

  categories = this.categoryStore.entities;
  categoryAddEnabled = signal(false);

  ngOnInit(): void {
    this.getFlag();
    this.loadCategories();
  }

  goToEditCategory(category: Category) {
    this.router.navigate(['/category-form/', category.id], {
      state: { ...category },
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
      await this.categoryStore.deleteCategory(category.id);

      await this.todoStore.loadTodos();

      this.closeSlidingItems();

      await this.toastService.showSuccess('Categoría eliminada correctamente');
    } catch (error) {
      await this.toastService.showError('Error al eliminar la categoría');
    }
  }

  private async loadCategories() {
    await this.categoryStore.loadCategories();
  }

  private async closeSlidingItems() {
    await this.categoriesList()?.closeSlidingItems();
  }

  private async getFlag() {
    try {
      await this.remoteConfig.setConfig(60, 60);
      await this.remoteConfig.fetchAndActivate();

      const value = await this.remoteConfig.getBoolean('enable_category_add');

      this.categoryAddEnabled.set(value === true);
    } catch (error) {
      this.categoryAddEnabled.set(false);
    }
  }
}
