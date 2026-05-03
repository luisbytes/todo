import { Todo } from '@app/core/entities';

export interface CreateTodoInput {
  title: string;
  category: string;
}

export abstract class TodoRepository {
  abstract getAll(): Promise<Todo[]>;
  abstract create(input: CreateTodoInput): Promise<Todo>;
  abstract toggleCompleted(id: number, completed: boolean): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
