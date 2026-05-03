import { inject, Injectable } from '@angular/core';

import { Category, CreateCategoryDTO } from '@app/core/entities';
import { CategoryRepository } from '@app/core/repositories';
import { DatabaseService } from '@app/core/services/database.service';

@Injectable()
export class CategorySqliteRepository implements CategoryRepository {
  private database = inject(DatabaseService);

  async create(category: CreateCategoryDTO): Promise<Category> {
    await this.database.initialize();

    const { insertId } = await this.database.executeSql('INSERT INTO categories (name) VALUES (?)', [category.name]);

    return {
      id: insertId,
      name: category.name,
    };
  }

  async update(id: number, category: CreateCategoryDTO): Promise<void> {
    await this.database.initialize();
    await this.database.executeSql('UPDATE categories SET name = ? WHERE id = ?', [category.name, id]);
  }

  async delete(id: number): Promise<void> {
    await this.database.initialize();
    await this.database.executeSql('DELETE FROM categories WHERE id = ?', [id]);
  }

  async getAll(): Promise<Category[]> {
    await this.database.initialize();

    const { rows } = await this.database.executeSql('SELECT id, name FROM categories ORDER BY name ASC', []);

    if (rows.length === 0) {
      return [];
    }

    return Array.from({ length: rows.length }, (_, index) => {
      const row = rows.item(index);

      return { id: row.id, name: row.name };
    });
  }
}
