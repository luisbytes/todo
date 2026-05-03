import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '@app/core/entities';
import { CategoryRepository } from '@app/core/repositories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage {
  private categoryRepository = inject(CategoryRepository);
  private router = inject(Router);

  categories = signal<Category[]>([]);

  ionViewDidEnter() {
    this.loadCategories();
  }

  goToEditCategory(category: Category) {
    this.router.navigate(['/category-form/', category.id], {
      state: { category },
    });
  }

  private async loadCategories() {
    const categories = await this.categoryRepository.getAll();
    this.categories.set(categories);
  }
}
