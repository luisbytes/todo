import { Category } from '@app/core/entities';

export abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
}
