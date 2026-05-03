import { inject, Injectable } from '@angular/core';

import { Category } from '@app/core/entities';
import { CategoryRepository } from '@app/core/repositories';
import { DatabaseService } from '@app/core/services/database.service';

@Injectable()
export class CategorySqliteRepository implements CategoryRepository {
  private database = inject(DatabaseService);

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
