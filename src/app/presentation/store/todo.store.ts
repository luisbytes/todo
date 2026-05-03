import { inject } from '@angular/core';

import { Todo } from '@app/core/entities';
import { TodoRepository } from '@app/core/repositories';

import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';

export const TodoStore = signalStore(
  { providedIn: 'root' },

  withEntities<Todo>(),

  withMethods((store) => {
    const todoRepository = inject(TodoRepository);

    return {
      async loadTodos() {
        const todos = await todoRepository.getAll();

        patchState(store, setAllEntities(todos));
      },
      async createTodo(input: { title: string; category: string }) {
        const todo = await todoRepository.create(input);

        patchState(store, addEntity(todo));
      },
      async deleteTodo(id: number) {
        await todoRepository.delete(id);

        patchState(store, removeEntity(id));
      },
      async toggleCompleted(id: number, completed: boolean) {
        await todoRepository.toggleCompleted(id, completed);

        patchState(store, updateEntity({ id, changes: { completed } }));
      },
    };
  }),
);
