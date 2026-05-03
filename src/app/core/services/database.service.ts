import { inject, Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { DatabaseMigrationsService } from './database-migrations.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db: SQLiteObject | null = null;
  private initialized = false;

  private sqlite = inject(SQLite);
  private platform = inject(Platform);
  private migrations = inject(DatabaseMigrationsService);

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!this.platform.is('cordova')) {
      return;
    }

    this.db = await this.sqlite.create({
      name: 'todo.db',
      location: 'default',
    });

    await this.db.executeSql('PRAGMA foreign_keys = ON', []);
    await this.migrations.migrate(this.db);

    this.initialized = true;
  }

  isReady(): boolean {
    return this.initialized && this.db !== null;
  }

  async executeSql(statement: string, params: unknown[] = []): Promise<any> {
    if (this.db) {
      return this.db.executeSql(statement, params);
    }

    throw new Error('Database is not initialized.');
  }
}
