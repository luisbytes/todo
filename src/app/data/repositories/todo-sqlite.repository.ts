import { inject, Injectable } from '@angular/core';

import { Todo } from '@app/core/entities';
import { CreateTodoInput, TodoRepository } from '@app/core/repositories';
import { DatabaseService } from '@app/core/services/database.service';

@Injectable()
export class TodoSqliteRepository implements TodoRepository {
  private database = inject(DatabaseService);

  async getAll(): Promise<Todo[]> {
    await this.database.initialize();

    const sql = `
      SELECT t.id, t.title, t.completed, c.name AS category
      FROM todos t
      INNER JOIN categories c ON c.id = t.category_id
      ORDER BY t.id DESC
    `;

    const { rows } = await this.database.executeSql(sql, []);

    if (rows.length === 0) {
      return [];
    }

    return Array.from({ length: rows.length }, (_, index) => {
      const row = rows.item(index);

      return {
        id: row.id,
        title: row.title,
        completed: row.completed === 1,
        category: row.category,
      };
    });
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    await this.database.initialize();

    const title = input.title.trim();
    const categoryName = input.category.trim();

    const categoryId = await this.getCategoryId(categoryName);

    const { insertId } = await this.database.executeSql(
      'INSERT INTO todos (title, completed, category_id) VALUES (?, 0, ?)',
      [title, categoryId],
    );

    return {
      id: insertId,
      title,
      completed: false,
      category: categoryName,
    };
  }

  async toggleCompleted(id: number, completed: boolean): Promise<void> {
    await this.database.initialize();

    const completedValue = completed ? 1 : 0;

    await this.database.executeSql('UPDATE todos SET completed = ? WHERE id = ?', [completedValue, id]);
  }

  async delete(id: number): Promise<void> {
    await this.database.initialize();

    await this.database.executeSql('DELETE FROM todos WHERE id = ?', [id]);
  }

  private async getCategoryId(name: string): Promise<number> {
    const findResult = (await this.database.executeSql('SELECT id FROM categories WHERE name = ? LIMIT 1', [name])) as {
      rows: { length: number; item(index: number): { id: number } };
    };

    if (findResult.rows.length > 0) {
      return findResult.rows.item(0).id;
    }

    throw new Error(`Category "${name}" does not exist.`);
  }
}
