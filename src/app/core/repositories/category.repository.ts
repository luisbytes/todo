import { Category, CreateCategoryDTO } from '@app/core/entities';

export abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
  abstract create(category: CreateCategoryDTO): Promise<Category>;
  abstract update(id: number, category: CreateCategoryDTO): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
