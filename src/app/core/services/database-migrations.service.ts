import { Injectable } from '@angular/core';

import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

interface Migration {
  version: number;
  statements: string[];
}

@Injectable({ providedIn: 'root' })
export class DatabaseMigrationsService {
  private readonly migrations: Migration[] = [
    {
      version: 0,
      statements: [
        'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE)',
        `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          completed INTEGER NOT NULL DEFAULT 0,
          category_id INTEGER NOT NULL,
          FOREIGN KEY(category_id) REFERENCES categories(id)
        )`,
        "INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Trabajo')",
        "INSERT OR IGNORE INTO categories (id, name) VALUES (2, 'Personal')",
      ],
    },
  ];

  public async migrate(db: SQLiteObject): Promise<void> {
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS schema_meta (id INTEGER PRIMARY KEY CHECK(id = 1), version INTEGER NOT NULL)',
      [],
    );

    const currentVersion = await this.getCurrentVersion(db);

    const pending = this.migrations
      .filter((migration) => migration.version > currentVersion)
      .sort((left, right) => left.version - right.version);

    for (const migration of pending) {
      for (const statement of migration.statements) {
        await db.executeSql(statement, []);
      }

      await db.executeSql('INSERT OR REPLACE INTO schema_meta (id, version) VALUES (1, ?)', [migration.version]);
    }
  }

  private async getCurrentVersion(db: SQLiteObject): Promise<number> {
    const result = await db.executeSql('SELECT version FROM schema_meta WHERE id = 1 LIMIT 1', []);

    if (result.rows.length === 0) {
      return -1;
    }

    return result.rows.item(0).version as number;
  }
}
