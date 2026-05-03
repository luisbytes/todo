import { inject } from '@angular/core';

import { Category } from '@app/core/entities';
import { CategoryRepository } from '@app/core/repositories';

import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';

export const CategoryStore = signalStore(
  { providedIn: 'root' },

  withEntities<Category>(),

  withMethods((store) => {
    const categoryRepository = inject(CategoryRepository);

    return {
      async loadCategories() {
        const categories = await categoryRepository.getAll();

        patchState(store, setAllEntities(categories));
      },
      async deleteCategory(id: number) {
        await categoryRepository.delete(id);

        patchState(store, removeEntity(id));
      },
      async createCategory(name: string) {
        const category = await categoryRepository.create({ name });

        patchState(store, addEntity(category));
      },
      async updateCategory(id: number, name: string) {
        await categoryRepository.update(id, { name });

        patchState(store, updateEntity({ id, changes: { name } }));
      },
    };
  }),
);
